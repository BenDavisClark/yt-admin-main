import React from 'react'
import { useState } from 'react'
import { Option } from 'amiya'
import { TreeSelect } from 'antd'
import { copy, listToMap, listToTree } from '@/utils'
import { ORG_ON } from '@/constant'
import { getOrgList } from '@/api/user'
import { useMount } from 'react-use'

const ALL_ORG = 'all'

interface YtOrgProps {
  value?: string
  type?: 'all'
  onChange?: (value: string) => void
  [key: string]: any
}

interface YtOrgCacheProps {
  /** 当前的 options */
  options: Array<Option> | null
  /** 转化成 tree 之后的 options */
  tree: Array<Option> | null
  /** 过滤了禁用选项后的 options */
  filterDisabledTree: Array<Option> | null
  /** 当前所有 options 对象 */
  map: AnyKeyProps
  /** 是否正在加载中 */
  loading: boolean
  /** 所有的请求队列，完成后会被清空 */
  stack: Array<any>
}

const all: YtOrgCacheProps = {
  options: null,
  tree: null,
  filterDisabledTree: null,
  map: {},
  loading: false,
  stack: []
}

/**
 * 清空机构缓存
 */
export function clearOrgCache() {
  let list = [all]
  list.forEach((item: YtOrgCacheProps) => {
    item.options = null
    item.tree = null
    item.filterDisabledTree = null
    item.map = {}
    item.loading = false
    item.stack = []
  })
}

/**
 * 过滤掉禁用的 org
 * @param tree 当前机构 tree 数据
 */
function filterDisabledTree(tree: Array<Option>) {
  return tree
    .filter((option: AnyKeyProps) => option.state === ORG_ON)
    .map(option => {
      if (option.children) {
        filterDisabledTree(option.children)
      }
      return option
    })
}

/**
 * 获取 org tree
 * @param type org 类型
 * @param filterDisabled 是否过滤掉禁用的
 */
function getOrgTree(type: string = ALL_ORG, filterDisabled?: boolean) {
  let target = all
  const api = getOrgList
  switch (type) {
    case ALL_ORG:
      target = all
      break
  }

  return new Promise(resolve => {
    if (target.options !== null) {
      resolve(filterDisabled ? target.filterDisabledTree : target.tree)
    } else {
      if (target.loading) {
        // 如果正在请求过程中，则先存到对应栈
        target.stack.push({ resolve, filterDisabled })
      } else {
        target.loading = true
        api({})
          .then((data: any) => {
            let options = data
            target.map = listToMap(options)
            target.options = options
            target.filterDisabledTree = filterDisabledTree(copy(options))
            target.tree = listToTree({
              data: options,
              parentKey: 'fatherOrgId',
              labelKey: 'orgName',
              valueKey: 'orgCode',
              hasChildren: true,
              rootValue: null
            })
            target.stack.forEach(stack => {
              stack.resolve(stack.filterDisabled ? target.filterDisabledTree : target.tree)
            })
            target.stack = []
            resolve(filterDisabled ? target.filterDisabledTree : target.tree)
          })
          .finally(() => {
            target.loading = false
          })
      }
    }
  })
}

export default function YtOrg(props: YtOrgProps) {
  const [treeData, setTreeData] = useState<Array<Option>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useMount(() => {
    setLoading(true)
    getOrgTree()
      .then((data: any) => {
        setTreeData(data)
      })
      .finally(() => {
        setLoading(false)
      })
  })

  return <TreeSelect allowClear treeData={treeData} {...props} loading={loading} />
}
