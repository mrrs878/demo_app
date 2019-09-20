import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

import { Toast, List, InputItem, Button, WhiteSpace } from 'antd-mobile'

//@ts-ignore
import loginStyle from './login.module.less'

interface ILoginProps extends RouteComponentProps {

}

const Login: React.FC<ILoginProps> = (props) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ usernameError_f, setUsernameError_f ] = useState(false)
  const [ passwordError_f, setPasswordError_f ] = useState(false)

  function handleUsernameInput(value: string) {
    setUsername(value)
  }
  function handlePasswordInput(value: string) {
    setPassword(value)
  }
  function handleLogin() {
    console.log(username, password);
    
  }

  return (
    <div className={ loginStyle.content }>
      <div className={ loginStyle.loginForm }>
        <div className={ loginStyle.inputContainer }>
          <List className={ loginStyle.listItem }>
            <InputItem
              type="phone"
              placeholder="用户名"
              clear
              error={ usernameError_f }
              onErrorClick={ () => { if(usernameError_f) Toast.info('please enter right phone number') } }
              onChange={ handleUsernameInput }
              value={ username }
            />
          </List>
          <List className={ `${loginStyle.listItem} ${loginStyle.listItemPwd}` }>
            <InputItem
              type="password"
              placeholder="密码"
              clear
              editable
              error={ passwordError_f }
              onErrorClick={ () => { if(usernameError_f) Toast.info('please enter right password') } }
              onChange={ handlePasswordInput }
              value={ password }
            />
            <span className={ loginStyle.forgetPwd }>忘记密码</span>
          </List>
        </div>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <div className={ loginStyle.actions }>
          <span onClick={ () => props.history.push('/login/loginByCode') }>手机号登录</span>
          <span onClick={ () => props.history.push('/login/register') }>注册</span>
        </div>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <Button type="primary" onClick={ handleLogin }>登录</Button>
      </div>
    </div>
  )
}

export default withRouter(Login)