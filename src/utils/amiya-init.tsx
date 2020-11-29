import { setDefaultDataFilter, setDefaultSearchFilter, registerField, registerAction, success, info } from 'amiya'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { copy } from '.'
import { Modal } from 'antd'
import React from 'react'
import { FORM_DEFAULT_VALUE_EDITOR, FORM_DEFAULT_VALUE_ORG, FORM_TYPE_EDITOR, FORM_TYPE_ORG } from '@/constant'
import YtOrg from '@/components/YtOrg'
import YtEditor from '@/components/YtEditor'

/**
 * 表格请求前过滤
 */
setDefaultSearchFilter((params: AnyKeyProps) => {
  console.log(params)
  return {
    pagination: {
      pageNumber: params.currentPage,
      pageSize: params.pageSize
    },
    search: {
      ...params.search,
      ...params.filters
    }
  }
})

/**
 * 表格请求后过滤
 */
setDefaultDataFilter((data: AnyKeyProps) => {
  return {
    content: data.rows,
    totalCount: data.total
  }
})

// /**
//  * 注册【删除】事件
//  */
// registerAction('delete', (props: any, record: any, searchTable: any) => {
//   return {
//     confirm: true,
//     confirmMsg: '你确定要删除此行吗？',
//     onConfirm: () => {
//       if (searchTable?.deleteApi && record) {
//         const params = {
//           list: [
//             {
//               id: record[searchTable?.rowKey || 'id']
//             }
//           ]
//         }
//         searchTable?.deleteApi(params).then((data: any) => {
//           success('删除成功')
//           searchTable?.tableRef.current.refresh()
//         })
//       }
//     },
//     ...props
//   }
// })

// /**
//  * 注册【批量删除】事件
//  */
// registerAction('batch-delete', (props: any, record: any, searchTable: any) => {
//   return {
//     icon: <DeleteOutlined />,
//     tableFooterExtraOnly: true,
//     onClick: () => {
//       let selection = searchTable?.selection || []
//       if (!selection.length) {
//         info('请先选择一条数据')
//         return
//       }
//       if (searchTable?.deleteApi) {
//         Modal.confirm({
//           title: '确定',
//           content: `您勾选了 ${selection.length} 个，确定要删除吗？`,
//           icon: <ExclamationCircleOutlined />,
//           onOk: () => {
//             let params: AnyKeyProps = {
//               list: selection.map((row: any) => {
//                 return {
//                   id: row[searchTable?.rowKey || 'id']
//                 }
//               })
//             }
//             searchTable?.deleteApi(params).then((data: any) => {
//               success('批量删除成功')
//               searchTable?.clearSelection()
//               searchTable?.tableRef.current.refresh()
//             })
//           }
//         })
//       }
//     },
//     ...props
//   }
// })

/**
 * 注册【其他批量删除】事件
 */
registerAction('process-patch-delete', (props: any, record: any, searchTable: any) => {
  return {
    icon: <DeleteOutlined />,
    onClick: () => {
      let selection = searchTable?.selection || []
      if (!selection.length) {
        info('请先选择一条数据')
        return
      }
      if (searchTable?.deleteApi) {
        Modal.confirm({
          title: '确定',
          content: `您勾选了 ${selection.length} 个，确定要删除吗？`,
          icon: <ExclamationCircleOutlined />,
          onOk: () => {
            let params: AnyKeyProps = {
              list: selection
            }
            searchTable?.deleteApi(params).then((data: any) => {
              success('批量删除成功')
              searchTable?.clearSelection()
              searchTable?.tableRef.current.refresh()
            })
          }
        })
      }
    },
    ...props
  }
})

/**
 * OrgSelect 注册
 */
registerField(FORM_TYPE_ORG, {
  type: FORM_TYPE_ORG,
  defaultValue: FORM_DEFAULT_VALUE_ORG,
  render: ({ field, readonly }: AnyKeyProps) => (
    <YtOrg placeholder={`请选择${field.title || ''}`} disabled={readonly} {...field.props} />
  )
})

/**
 * YtEditor 注册附文本框
 */
registerField(FORM_TYPE_EDITOR, {
  type: FORM_TYPE_EDITOR,
  defaultValue: FORM_DEFAULT_VALUE_EDITOR,
  render: ({ field, readonly }: AnyKeyProps) => {
    return <YtEditor placeholder={`请输入${field.title || ''}`} disabled={readonly} {...field.props} />
  }
})
