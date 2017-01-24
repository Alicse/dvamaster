import React, {PropTypes} from 'react';
import { Form, Button, Select, Input } from 'antd';
import Style from './UserSearch.less';

const FormItem = Form.Item;
const UserSearch = ({
  field,
  keyword,
  onSearch,
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((error) => {
      if(error)
        return;
      console.log(getFieldsValue());
      onSearch(getFieldsValue());
    });
  }

  return (
    <div className={Style.normal}>
      <div className={Style.search}>
        <Form inline onSubmit={handleSubmit}>
          <FormItem
          >
            {getFieldDecorator("field", {
              initialValue: field || 'name',
            })
            (
              <Select  style={{width: 60}}>
                <Option defaultProps value="name">名字</Option>
                <Option value="address">地址</Option>
              </Select>
            )
            }
          </FormItem>
          <FormItem
            hasFeedback
          >
            {
              getFieldDecorator("keyword", {
                initialValue: keyword || '',
              })
              (
                <Input type="text"/>
              )
            }
          </FormItem>
          <Button style={{marginRight: '10px'}} type="primary" htmlType="submit">搜索</Button>
        </Form>
      </div>
      <div className={Style.create}>
        <Button type="ghost" onClick={onAdd}>添加</Button>
      </div>
    </div>);
};

UserSearch.prototype = {
  field: PropTypes.string,
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  form: PropTypes.object.isRequired,
};

export default Form.create()(UserSearch);
