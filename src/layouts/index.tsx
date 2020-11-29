import React, { useState } from 'react'
import { Layout } from 'antd'
import { IRouteComponentProps } from 'umi'
import LayoutsSide from './LayoutsSide'
import LayoutsHeader from './LayoutsHeader'
import './index.less'

const { Content } = Layout

export default function Layouts(props: IRouteComponentProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  return (
    <Layout className={`layouts ${collapsed ? 'collapsed' : ''}`}>
      <LayoutsSide collapsed={collapsed} {...props} />
      <Layout className="site-layout">
        <LayoutsHeader collapsed={collapsed} setCollapsed={setCollapsed} {...props} />
        <Content className="layouts-content" id="ytAdminContent">
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}
