import React, {Component, PropTypes} from 'react';
import { routerRedux } from 'dva/router';
// Users 的 Presentational Component
// 暂时都没实现
import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModal from '../components/Users/UserModal';
import {connect} from 'dva'

import styles from './Users.less';


const Users = ({location, dispatch, users}) => {

  const {
    loading, list, total, current, field, keyword,
    currentItem, modalVisible, modalType
  } = users;

  const userSearchProps = {
    field,
    keyword,
    onSearch(key) {
      dispatch(
        routerRedux.push({
          pathname: '/users',
          query: {...key},
        })
      );
    },
    onAdd() {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create',
        }
      })
    },
  };
  const userListProps = {
    total,
    current,
    loading,
    dataSource: list,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/users',
        query: { field, keyword, page },
      }));
    },
    onDeleteItem(id) {
      dispatch({
        type: 'users/delete',
        payload: id
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        }
      });
    }
  };
  const userModalProps = {
    item: modalType =='create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type:`users/${modalType}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type:'users/hideModal',
      });
    }
  };

  return (
    <div className={styles.normal}>
      {/*用户搜索框*/}
      <UserSearch {...userSearchProps}/>
      {/*用户信息展示列表*/}
      <UserList {...userListProps}/>
      {/* 添加用户 & 修改用户弹出的浮层 */}
      {<UserModal {...userModalProps}/>}

    </div>);
}

Users.PropTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据，这里关联了 users, ？？没搞懂
function mapStateToProps({users}) {
  return {users};
}

export default connect(mapStateToProps)(Users);
