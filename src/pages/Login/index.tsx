import React from 'react'
import './index.less'
import { AyForm, AyButton, success, AyFormField } from 'amiya'
import { IRouteComponentProps, useModel } from 'umi'
import { generateThemeColor, changeAntdTheme } from 'dynamic-antd-theme'

const fields: Array<AyFormField> = [
  {
    title: '账号',
    key: 'username',
    required: true
  },
  {
    title: '密码',
    key: 'password',
    required: true
  }
]

export default function Login(props: IRouteComponentProps) {
  const { login, loading } = useModel('useUserModel', (model: AnyKeyProps) => ({
    login: model.login,
    loading: model.loading
  }))

  const handleSubmit = (values: AnyKeyProps) => {
    changeAntdTheme(generateThemeColor('#FF8712'))
    window.localStorage.setItem('THEME', '#FF8712')
    props.history.push('/home')
    success('登录成功')
  }

  return (
    <div className="login-container">
      <AyForm
        fields={fields}
        span={24}
        layout={{
          labelCol: { flex: '60px' }
        }}
        onConfirm={handleSubmit}
      >
        <div className="title">
          <h2>数据资产管理平台</h2>
        </div>
        <AyButton type="primary" htmlType="submit" loading={loading} style={{ width: '100%', marginLeft: '60px' }}>
          {loading ? '登录中' : '登录'}
        </AyButton>
      </AyForm>
    </div>
  )
}
