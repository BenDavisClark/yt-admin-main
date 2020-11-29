import { Option } from 'amiya'

const uuidv1 = require('uuid/v1')

/**
 * 将接口的多个数组或对象合并成一个数组
 * @param data 元数据
 */
export const mergeList = (data: AnyKeyProps) => {
  let list: Array<AnyKeyProps> = []
  for (let key in data) {
    if (Array.isArray(data[key])) {
      list.push(...data[key])
    } else if (data[key]) {
      list.push(data[key])
    }
  }
  return list
}

/**
 * 列表转对象
 * @param list 列表数据
 */
export const listToMap = (list: Array<AnyKeyProps>) => {
  let map: AnyKeyProps = {}

  list.forEach(item => {
    map[item.indDesc] = item.balance
  })

  return map
}

/**
 * 将列表的数据转成页面所需要的数据
 * @param list 列表数据
 * @param map 页面上需要的数据对象
 */
export const translateData = (list: Array<AnyKeyProps>, map: AnyKeyProps) => {
  let newMap: AnyKeyProps = {}
  let listMap: AnyKeyProps = listToMap(list)
  for (let name in map) {
    let key = map[name]
    newMap[key] = listMap[name] || 0
  }

  return newMap
}

/**
 * 复制数据
 * @param data 被复制的数据
 */
export const copy = (data: AnyKeyProps) => {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 填充标题和值
 * @param item 当前循环项
 * @param labelKey 标题
 * @param valueKey 值
 */
const fillKey = (
  item: AnyKeyProps,
  labelKey: string,
  valueKey: string,
  format?: (data: AnyKeyProps) => AnyKeyProps
) => {
  // title 为 tree 需要的属性
  item.title = item[labelKey]
  // label 为其它类型需要的属性，如 checkbox-group...
  item.label = item[labelKey]
  // key
  item.key = item[valueKey]
  // 值
  item.value = item[valueKey]
  if (format) {
    item = format(item)
  }
  return item
}

interface ListToTreeProps {
  /** 数据源 */
  data: Array<AnyKeyProps>
  /** 父节点 key */
  parentKey?: string
  /** 标题 key */
  labelKey?: string
  /** 子节点 key */
  childrenKey?: string
  /** 值 key */
  valueKey?: string
  /** 根节点值 */
  rootValue?: string | null
  /** 是否拥有 children */
  hasChildren?: boolean
  /** 节点格式化 */
  format?(props: AnyKeyProps): AnyKeyProps
}

/**
 * 列表转树结构
 * @param props 配置参数
 */
export const listToTree = (props: ListToTreeProps): Array<Option> => {
  const {
    data = [],
    parentKey = 'parentId',
    labelKey = 'name',
    childrenKey = 'children',
    valueKey = 'id',
    rootValue = null,
    hasChildren = false,
    format
  } = props
  let list = copy(data)
  let map: AnyKeyProps = {}
  let roots: Array<any> = []

  list.forEach((item: any, i: number) => {
    map[item[valueKey]] = i
    item[childrenKey] = []
  })
  list.forEach((node: AnyKeyProps) => {
    node = fillKey(node, labelKey, valueKey, format)
    let target = node[parentKey]
    if (target === rootValue) {
      roots.push(node)
    } else {
      if (map[target] !== undefined) {
        list[map[target]].children.push(node)
      } else {
        roots.push(node)
      }
    }
  })
  if (!hasChildren) {
    list.forEach((item: AnyKeyProps) => {
      if (!item.children.length) {
        delete item.children
      }
    })
  }
  return roots
}

/**
 * 树结构转列表
 * @param tree = []
 * @param childrenKey = 'children' 下级节点key
 * @returns []
 */
export const treeToList = ({ tree = [], childrenKey = 'children' }: AnyKeyProps) => {
  let queen: Array<AnyKeyProps> = [],
    list: Array<AnyKeyProps> = [],
    first: any = {}
  queen = queen.concat(tree)
  while (queen.length) {
    first = queen.shift()
    if (first[childrenKey]) {
      queen = queen.concat(first[childrenKey])
      delete first[childrenKey]
    }
    list.push(first)
  }
  return list
}

/**
 * 判断obj是否为空
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = (obj: any) => {
  if (typeof obj === 'undefined') {
    return true
  } else {
    if (obj == null) {
      return true
    }
    if (typeof obj === 'string' && obj === '') {
      return true
    } else if (obj instanceof Object && Object.keys(obj).length === 0) {
      return true
    } else if (obj instanceof Array && obj.length === 0) {
      return true
    }
    return false
  }
}

/**
 * @description 生成uuid
 * @export {function}
 * @returns {string}
 */
export const createUuid = () => {
  let uuid = uuidv1()
  return uuid
}

/**
 * 实现深拷贝
 * @params {obj}
 * @returns {obj}
 */
export const deepCopy = (target: any) => {
  let copyed_objs: any[] = [] //此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
  function _deepCopy(target: any) {
    if (typeof target !== 'object' || !target) {
      return target
    }
    for (let i = 0; i < copyed_objs.length; i++) {
      if (copyed_objs[i].target === target) {
        return copyed_objs[i].copyTarget
      }
    }
    let obj: any = {}
    if (Array.isArray(target)) {
      obj = [] //处理target是数组的情况
    }
    copyed_objs.push({ target: target, copyTarget: obj })
    Object.keys(target).forEach(key => {
      if (obj[key]) {
        return
      }
      obj[key] = _deepCopy(target[key])
    })
    return obj
  }
  return _deepCopy(target)
}

/**
 * 判断数组中 某个 key 是否重复
 * @param arr 判断的数组
 * @param key 判断的key
 * @returns 重复返回false 不重复返回true
 */
export const arrValidRepeat = (arr: any[], key: any) => {
  let obj: any = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key]) {
      if (obj[arr[i][key]]) {
        return false
      } else {
        obj[arr[i][key]] = arr[i]
      }
    }
  }
  return true
}
