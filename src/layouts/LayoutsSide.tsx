import React, { useMemo } from 'react'
import { Layout, Menu } from 'antd'
import menu, { MenuItem, menuMap } from './menu'
import { IRouteComponentProps } from 'umi'
import { SmileOutlined } from '@ant-design/icons'

const { Sider } = Layout
const { Item, SubMenu } = Menu

interface LayoutSideProps extends IRouteComponentProps {
  collapsed: boolean
}

const getMenu = (data: Array<MenuItem>) => {
  return data.map((menu: MenuItem) => {
    let children = menu.children
    children = children?.filter(menu => menu.visible !== false)
    if (children && children.length) {
      return (
        <SubMenu key={menu.title} title={menu.title} icon={<SmileOutlined />}>
          {getMenu(children)}
        </SubMenu>
      )
    } else {
      return (
        <Item key={menu.path} title={menu.title}>
          {menu.title}
        </Item>
      )
    }
  })
}

export default function LayoutsSide(props: LayoutSideProps) {
  const { collapsed, history, location } = props

  // 添加页面
  const handleSelect = (item: AnyKeyProps) => {
    history.push(item.key)
  }

  // 默认选中左侧菜单key
  const selectedKeys = useMemo(() => {
    let menu: MenuItem = menuMap[location.pathname]
    let keys: Array<string> = []
    if (menu && menu.routes && menu.routes.length) {
      menu.routes.forEach(item => {
        if (item.path) {
          keys.push(item.path)
        }
      })
    }
    return keys
  }, [location])

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/home']}
        selectedKeys={selectedKeys}
        onClick={handleSelect}
        defaultOpenKeys={[]}
      >
        {getMenu(menu)}
      </Menu>
    </Sider>
  )
}
