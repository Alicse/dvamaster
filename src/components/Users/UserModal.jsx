import React, {PropTypes} from 'react';
import {Form, Input, Modal, Icon} from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const UserModal = ({
  visible,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  item,
  onOk,
  onCancel,
}) => {
  function handleOk() {
    validateFields((err) => {
      if (err)
        return;
      const data = {...getFieldsValue()};
      onOk(data);
    });
  }

  function checkNumber(rules, value, callback) {
    if (!value) {
      callback(new Error('年龄未填写'));
    }
    if (!/^[\d]{1,2}$/.test(value)) {
      callback(new Error('年龄不合法'));
    } else {
      callback();
    }
  }

  const modalOption = {
    title: '修改用户',
    visible,
    onOk: handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOption}>
      <Form horizontal>
        <FormItem
          label="姓名："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{required: true, message: 'Please input your username!'}],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem
          label="年龄："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('age', {
            initialValue: item.age,
            rules: [
              {validator: checkNumber},
            ],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem
          label="住址："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('address', {
            initialValue: item.address,
            rules: [
              {required: true, message: '不能为空'},
            ],
          })(
            <Input type="address"/>
          )}
        </FormItem>
      </Form>
    </Modal>);
};

UserModal.prototype = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(UserModal);
