import React, {PropTypes} from 'react';
import {
  Icon,
  message,
  Button,
  Row,
  Col,
  Form,
  Input,
  Select
} from 'antd';
import config from '../utils/config.js';
import styles from './Login.less';

const FormItem = Form.Item;


const Login = ({
  loginButtonLoading,
  onLogin,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}
) => {
  function handleOk(){
    validateFieldsAndScroll((errors, values)=>{
      if (errors)
        return;

      onLogin(values);
    });
  };

  document.onkeyup = e => {
    e.keyCode === 13 ? handleOk() : null
  };

  return (
    <div className={styles.window}>
      <div className={styles.form}>
        <Form vertical className={styles.input}>
          <FormItem>
            <div className={styles.logo}>
              <img src={config.logoSrc}/>
              <span>Ant Design</span>
            </div>
          </FormItem>
          <FormItem
            hasFeedback>
            {(<Input size="large" addonBefore={<Icon type="user"/>} placeholder="username"/>)}
          </FormItem>
          <FormItem
            hasFeedback>
            {(<Input size="large" addonBefore={<Icon type="lock"/>} placeholder="password"/>)}
          </FormItem>
          <Button type="primary" size="large" onClick={handleOk} loading={loginButtonLoading} >login</Button>
          <p>
            <span>账号：guest</span>
            <span>密码：guest</span>
          </p>
        </Form>
      </div>
    </div>
  );

}

Login.prototype = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onLogin: PropTypes.func,
};

export default Form.create()(Login);
