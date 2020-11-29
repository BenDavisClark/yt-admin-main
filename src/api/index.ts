export const emptyApi = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

// export const listApi = () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       let data = {
//         content: [
//           {
//             id: '1',
//             name: '王二',
//             username: 'view',
//             type: 1,
//             createDate: '2019-08-25',
//             idcard: '330327198908884422',
//             desc:
//               '特别说明：平时开发，大家可以把npm的registry设置成淘宝镜像源来加快开发效率，但是大家如果要发布包，建议一开始就把npm的registry配置成官方镜像地址，不然后面发布还会出问题!!!'
//           },
//           {
//             id: '2',
//             name: '阿米娅',
//             username: 'amiya',
//             type: 2,
//             createDate: '2020-12-05',
//             idcard: '330327202012059527',
//             desc:
//               '特别说明：平时开发，大家可以把npm的registry设置成淘宝镜像源来加快开发效率，但是大家如果要发布包，建议一开始就把npm的registry配置成官方镜像地址，不然后面发布还会出问题!!!'
//           }
//         ]
//       }
//       resolve(data)
//     })
//   })
// }
