import { defineConfig } from 'umi'

export default defineConfig({
  title: '宁波银行数据资产门户测试环境', // 文档标题
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
  }
})
