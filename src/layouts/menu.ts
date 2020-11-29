import { copy } from '@/utils'

export interface MenuItem {
  /** 标题 */
  title: string
  /** 路径 */
  path?: string
  key?: string
  /** icon */
  icon?: string
  /** 是否要隐藏，如果不希望在左侧，设置这个为 true */
  visible?: boolean
  /** 子菜单 */
  children?: Array<MenuItem>
  routes?: Array<MenuItem>
}

export interface MenuMap {
  [key: string]: MenuItem
}

const menu: Array<MenuItem> = [
  {
    title: '主页',
    path: '/home'
  },
  {
    title: '系统管理',
    icon: 'SmileOutlined',
    children: [
      {
        title: '配置管理',
        path: '/system/config'
      }
    ]
  },
  {
    title: '子应用示例',
    icon: 'SmileOutlined',
    path: '/slave'
  }
]

/**
 * menu 组成的 map，path 为 key
 */
export const menuMap: MenuMap = {}

/**
 * 初始化 menu map
 */
const initMenuMap = () => {
  const loop = (list: Array<MenuItem>, routes: Array<MenuItem> = []) => {
    for (let i = 0; i < list.length; i++) {
      let menu: MenuItem = list[i]
      const c = copy(routes)
      c.push(menu)
      menu.routes = copy(c)
      if (menu.path) {
        // 复制路径
        menuMap[menu.path] = menu
      }
      if (menu.children && menu.children.length) {
        loop(menu.children, menu.routes ? [...menu.routes] : [])
      }
    }
  }

  loop(menu, [])
}

initMenuMap()

export default menu
