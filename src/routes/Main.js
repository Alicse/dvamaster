import React, {PropTypes} from 'react'
import {connect} from 'dva'
import Login from './Login'
import Header from '../components/layout/header'
// import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import {Spin,message} from 'antd'
// import {classnames} from '../utils'
import '../components/layout/common.less'

const Main = ({children, location, dispatch, main})=> {

  const { isLogin, loading, loginButtonLoading, siderFold, user, darkTheme} = main;

  const loginProps = {
    loading,
    loginButtonLoading,
    onLogin(data) {
      dispatch({type: 'main/login', payload: data});
    }
  }

  const headerProps = {
    user,
    siderFold,
    location,
    logout() {
      dispatch({type: 'main/logout'})
    },
    switchSider() {
      dispatch({type: 'main/switchSider'})
    }
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    changeTheme(){
      dispatch({type: 'main/changeTheme'})
    }
  }

  return (
     <div>
       {isLogin ?<div><Sider {...siderProps}/>
         <div className={styles.main}>
           <Header {...headerProps}/>
           <div className={styles.container}>
             <div className={styles.content}>
              {children}
             </div>
           </div>
         </div>
         <Footer />
       </div> : <div><Login {...loginProps}/></div>
       }
     </div>
    );

}

Main.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  isLogin: PropTypes.bool,
  user: PropTypes.object,
  siderFold:PropTypes.bool,
  darkTheme:PropTypes.bool,
}

function mapStateToProps({main}) {
  return {main};
}

export default connect(mapStateToProps)(Main);
