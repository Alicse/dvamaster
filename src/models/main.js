import {userInfo, login} from "../services/serviceHelper";
import { parse } from 'qs';

export default {
  namespace: 'main',

  state: {
    isLogin: false,
    loading: false,
    loginButtonLoading: false,
    siderFold: localStorage.getItem("siderFoldItem")=== "true" ? true: false,
    darkTheme: localStorage.getItem("darkTheme")=== "true" ? true: false,
    user: {
      uername: '刘德华'
    }
  },

  subscriptions:{
    setup({dispatch}) {
      dispatch({
        type: "queryUser",
      })
    }
  },

  effects: {
    *queryUser({payload}, {call, put}){
      yield put({type: "showLoading"});
      const data = call(userInfo, parse(payload));

      if (data.success) {
        yield put({
          type: "loginSuccess",
          payload: {
            user: {
              uername: data.username
            }
          },
        });
      } else {
        yield put({
          type: "hideLoading",
        })
      }
    },

    *login({payload}, {call, put}) {
      yield put({type: "showLoginButtonLoading"});
      const data = call(login, parse(payload));
      if (data.success) {
        yield put({
          type: "loginSuccess",
          payload: {data},
        });
      } else {
        yield put({
          type: "loginFailed",
          payload: {data},
        });
      }
    },

  },

  reducers: {
    showLoading(state) {
      return {...state, loading: true};
    },

    hideLoading(state) {
      return {...state, loading: false};
    },

    loginSuccess(state, action) {
      return {...state, ...action.payload, loginButtonLoading: false, isLogin: true};
    },

    loginFailed(state, action) {
      return {...state, ...action.payload, loginButtonLoading: false, isLogin: false};
    },

    showLoginButtonLoading(state) {
      return {...state, loginButtonLoading: true};
    },

  }

}
