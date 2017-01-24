import React, { Component, PropTypes } from 'react';

// 采用antd的UI组件
import {Form, Table, message, Popconfirm, Pagination } from 'antd';
import Style from  './UserList.less';

const UserList = ({
  total,
  current,
  loading,
  dataSource,
  onPageChange,
  onDeleteItem,
  onEditItem,
}) => {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a href="#">{text}</a>
    },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <p>
            <a onClick={()=>{ onEditItem(record) }}>编辑</a>
            &nbsp;
            <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
              <a>删除</a>
            </Popconfirm>
          </p>
        ),
      },
    ];
    // 定义分页对象
    const pagination = {
      total,
      current,
      pageIndex: 10,
      onChange: {onPageChange},
    };

  return (
    <Form className = {Style.normal} vertical>
      <Form.Item>
        <Table
               columns={columns}
               dataSource={dataSource}
               loading={loading}
               rowKey={record => record.id}
               pagination={false}
        />
      </Form.Item>
      <Form.Item>
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={10}
          onChange={onPageChange}
        />
      </Form.Item>
    </Form>
  );
}

UserList.prototype = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
}

export default UserList;
