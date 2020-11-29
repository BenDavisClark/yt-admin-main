import { defineConfig } from 'umi'

export default defineConfig({
  theme: {
    '@primary-color': '#FF8712' // 主题颜色
  },
  dva: {
    immer: true, // 表示是否启用 immer 以方便修改 reducer
    hmr: true // 表示是否启用 dva model 的热更新
  },
  nodeModulesTransform: {
    type: 'none'
  },
  locale: {
    default: 'zh-CN',
    antd: true
  },
  proxy: {
    '/api': {
      target: '',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  },
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'slave', // 唯一 id
          entry: '//localhost:5000' // html entry
        }
      ]
    }
  },
  routes: [
    {
      path: '/login',
      exact: true,
      component: '@/pages/Login/index.tsx'
    },
    {
      path: '/',
      component: '@/layouts',
      routes: [
        { path: '/home', component: '@/pages/Home/index.tsx' },
        { path: '/system/config', component: '@/pages/System/SystemConfig.tsx' },
        {
          path: '/slave',
          microApp: 'slave'
        }
      ]
    }
  ]
})
