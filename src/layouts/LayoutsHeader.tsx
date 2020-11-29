import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import { Breadcrumb, Dropdown, Menu } from 'antd'
import { Layout } from 'antd'
import { getProfile } from '@/api/user'
import { useMount } from 'react-use'
import { IRouteComponentProps, useModel } from 'umi'
import { MenuItem, menuMap } from './menu'
import { AyButton } from 'amiya'

const { Header } = Layout

export interface HeaderLayoutProps extends IRouteComponentProps {
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

/**
 * 面包屑导航
 * @param props
 */
const LayoutHeaderBread = (props: HeaderLayoutProps) => {
  const { location, history } = props

  const routes: Array<MenuItem> = useMemo(() => {
    let menu: MenuItem = menuMap[location.pathname]
    return menu ? menu.routes || [] : []
  }, [location])

  return (
    <Breadcrumb>
      {routes.map(route => {
        return (
          <Breadcrumb.Item key={route.title}>
            {route.path && route.path !== location.pathname ? (
              <AyButton type="link" style={{ padding: 0 }} onClick={() => route.path && history.push(route.path)}>
                {route.title}
              </AyButton>
            ) : (
              route.title
            )}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default function LayoutHeader(props: HeaderLayoutProps) {
  const { collapsed, setCollapsed, history } = props
  // 全局数据 用户信息，设置用户信息，登出
  const { profile, setProfile, logout } = useModel('useUserModel', (model: AnyKeyProps) => ({
    profile: model.profile,
    setProfile: model.setProfile,
    logout: model.logout
  }))

  /**
   * 处理菜单选择
   * @param menu 命中菜单
   */
  function handleMenuSubmit(menu: MenuInfo) {
    const { key } = menu
    if (key === 'logout') {
      logout()
      history.replace('/login')
    }
  }

  /**
   * 折叠左侧
   */
  const handleToggle = () => {
    setCollapsed(!collapsed)
  }

  useMount(() => {
    /**
     * 初始化加载用户信息
     */
    getProfile().then((data: any) => {
      setProfile(data)
    })
  })

  const menu = (
    <Menu onClick={handleMenuSubmit}>
      <Menu.Item key="setPwd">
        <SettingOutlined />
        设置密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined /> 退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="layouts-header site-layout-background">
      <div className="layouts-header-left">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: handleToggle
        })}
        <LayoutHeaderBread {...props} />
      </div>
      <div className="layouts-header-right">
        <Dropdown overlay={menu} placement="bottomRight">
          <span style={{ cursor: 'pointer', color: '#333', fontSize: 16 }}>
            <span className="mr-10">{profile.realName}</span>
            <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}
