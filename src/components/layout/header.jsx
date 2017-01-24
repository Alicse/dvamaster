import React, {PropTypes} from 'react'
import {Menu, Icon, Popover} from 'antd'
import {Link} from 'dva/router'
import styles from './main.less'

const SubMenu = Menu.SubMenu;

const Header = ({
  user, logout, switchSider, siderFold
}) => {
  let handleLogout = e => e.key === 'logout' && logout;

  return (
    <div className={styles.header}>
      <div className={styles.siderbutton} onClick={switchSider}>
        <Icon type={ !siderFold ? 'menu-unfold' : 'menu-fold'}/>
      </div>
      <Menu className="header-menu" mode="horizontal" onClick={handleLogout}>
        <SubMenu style={{float: right}} title={<span><Icon type="notification"/>{user.name}</span>}>
          <Menu.Item key="logout">
            <Link>注销</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default Header;
