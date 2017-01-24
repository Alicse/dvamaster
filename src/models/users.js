/**
 * Created by ChunlingHuang on 2016/12/22.
 */
import { hashHistory } from  'dva/router'
import { query, remove, update, create} from '../services/serviceHelper';
import { parse } from 'qs';

export default {
  namespace: 'users',

  state: {
    list: [],
    field: '',
    keyword: '',
    total: null,
    loading: false, // 控制加载状态
    current:null, // 当前分页s
    currentItem: {}, // 当前操作的对象
    modalVisible: false, // 弹出框的显示状态
    modalType: 'create' // 弹出框的类型
  },

  // Quick Start 已经介绍过 subscriptions 的概念，这里不在多说
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },
  },

  effects: {
    *query({payload}, {call, put}){
      yield put({type: 'showLoading'});
      yield put({
        type: 'updateQueryKey',
        payload: {page: 1, field: '', keyword: '', ...payload}
      });
      const {data} = yield call(query, parse(payload));
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    },
    *'delete'({payload}, {call, put}){
      yield put({type:'showLoading'});
      const {data} = yield call(remove, {id: payload});
      if (data && data.success) {
        yield put({
          type:'deleteSuccess',
          payload,
        });
      }
    },
    *create({payload}, {call, put}){
      yield put({type: 'hideModal'});
      yield put({type: 'showLoading'});
      console.log(payload);
      const {data} = yield call(create, payload);
      if (data && data.success) {
        yield put({
          type: 'createSuccess',
          list: data.data,
          total: data.page.total,
          current: data.page.current,
          field: '',
          keyword: '',
        });
      }
    },
    *update({payload}, {select, call, put}){
      yield  put({type:'hideModal'});
      yield  put({type:'showLoading'});
      console.log({...payload});
      const id = yield select(function({users}){
        return users.currentItem.id;
      }); // 为什么需要select?
      const newUser = { ...payload, id:id };
      const { data } = yield call(update, newUser);
      if (data && data.success) {
        yield put({
          type: 'updateSuccess',
          payload: newUser,
        });
      }
    },
  },

  reducers: {
    showLoading(state){
      return {...state, loading: true};
    }, // 控制加在状态的reducer
    showModal(state, action){
      console.log(action.payload);
      return {...state, ...action.payload, modalVisible: true};
    }, // 控制Modal的显示状态的reducer
    hideModal(state){return {...state, modalVisible: false};
    },
    querySuccess(state, action){
      // 返回新的状态组装成的新的对象
      return {...state, ...action.payload, loading:false};
    },
    createSuccess(state, action){
      return { ...state, ...action.payload, loading: false };
    },
    deleteSuccess(state, action){
      const id = action.payload;
      const newList = state.list.filter(user => user.id !== id);
      return {...state, list: newList, loading: false};
    },
    updateSuccess(state, action){
      const updateUser = action.payload;
      const newList = state.list.map(user => {
        if (user.id === updateUser.id) {
          return {...user, ...updateUser};
        }
        return user;
      });
      return {...state, list: newList, loading: false};
    },
    updateQueryKey(state, action) {
      return {...state, ...action.payload};
    },
  }

}
