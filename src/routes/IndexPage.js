import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.css';

function IndexPage() {

  const state = {
    a:1,
    b:2,
    c:3
  };
  let b = state;
  console.log(b == state);
  console.log({...state} == state);

 for(var a in {...state}){

   console.log(a);
 }

 function fun(...agrs){
   console.log(agrs);
 }

 fun(state,b,state,b);

 function fun2({a,b}){
   console.log(a);
   console.log(b);
 }
 fun2(state);

const fun3 = ({a,b})=>{
  console.log(a);
  console.log(b);
}

  fun3(state);

const fun4 = (...args) =>{
  console.log(args);
}
  const fun5 = (args) =>{
    console.log(args);
  }
let c = {
  state:state,
  b:b,
  fun2:fun2,
  fun3:fun3
}
  fun4(state,b,fun2,fun3);
  fun5(c);
  fun4({...c});


  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md" target="_blank">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
