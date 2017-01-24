/**
 * Created by ChunlingHuang on 2016/12/25.
 */
import request from '../utils/request';
import qs from 'qs'

export async function query(params) {
  return request(`/api/users?${qs.stringify(params)}`);
}

export async function remove(params) {
  return request('/api/users', {
    method: 'delete',
    body: qs.stringify(params),
  });
}

export async function update(params) {
  return request('/api/users', {
    method: 'put',
    body: qs.stringify(params),
  });
}

export async function create(params) {
  return request('/api/users', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function userInfo(params) {
  return request('/api/userInfo', {
    method: 'get',
    data: params,
  });
}

export async function login(params) {
  return request('/api/login', {
    method: 'post',
    data: params,
  });
}
