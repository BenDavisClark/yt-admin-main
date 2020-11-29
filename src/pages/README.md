## 文件命名规则

## 文件名称

入口文件名: index.tsx

其它页面名称： MarketXxx.tsx。

ModuleNameXxx.tsx ✅

detail ❌ —— 首字母应该大写，哪怕自由一个名字

Detail ❌ —— 需要带上模块名称

marketDetail ❌ —— 首字母应该大写

    Market
    -- index.tsx        // 主文件入口
    -- MarketDetail.tsx // 其它详情页面

### 如果子页面内容非常多则，应该建立文件夹。

    Market                  // market 模块
    ｜ index.less           // 样式文件  
    ｜ index.tsx            // market 模块主文件入口，一般是列表页
    ｜ MarketDetail.tsx     // 详情页面
    ｜ MarketEdit           // 编辑页面
      ｜ index.tsx          // 编辑页面主入口
      ｜ index.less         // 编辑页面样式
      ｜ MarketCustomer.tsx // 编辑页面子模块
      ｜ MarketEvent.tsx    // 编辑页面子模块
      ｜ images             // 图片直接放在当前文件夹下面
        ｜ customer-bg.png


## 文件内容命名

```javascript
import React from 'react'

/**
 * 必须写清楚名称，跟文件名一致，如果是 index.tsx 那就命名成副文件夹名称。
 */
export default function SystemConfig(){
  return <div className="system-config"></div> // 带 className，采用模块化写法，就是函数名 小写 + 横杆
}
```

Q： 什么时候应该用文件夹下建立个 index.tsx 还是直接建立文件?

A： 如果是一个简单的页面，没有子模块，那就没有必要建立文件夹了。

Q： 如果需要图片素材，应该放在哪里？

A： 直接放在当前文件夹 images 下面。
