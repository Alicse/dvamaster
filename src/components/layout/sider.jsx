import React, {PropTypes} from 'react'
import {Menu, Icon, Switch} from 'antd'
import {Link} from 'dva/router'
import styles from './main.less'
import {config} from '../../utils/config'
import Menus from './menu'

const Sider = ({
  siderFold,
  darkTheme,
  location,
  changeTheme,
}
) => {
  const menusProps = {
    siderFold,
    darkTheme,
    location,
  }

  return (
    <div>
      <div className={styles.logo}>
        <img src={config.logoSrc}/>
        {siderFold ? '' : <span>{config.logoText}</span>}
      </div>
      <Menus {...menusProps}/>
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type="bulb"/>切换主题</span>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白"/>
      </div> : ''}
    </div>
  );
}

export default Sider;
