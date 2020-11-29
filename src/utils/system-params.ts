import { getSystemParams } from '@/api/user'

let rootMap: any = null
let map: any = null
let loading: boolean = false
let stack: Array<any> = []
const ROOT_KEY: string = 'bigsales'

const getStaticData = () => {
  return new Promise((resolve, reject) => {
    if (map !== null) {
      resolve()
    } else {
      if (loading) {
        stack.push(resolve)
      } else {
        loading = true
        getSystemParams().then(
          (data: AnyKeyProps) => {
            map = data[ROOT_KEY]
            rootMap = data || {}
            stack.forEach(item => item())
            stack = []
            loading = false
            resolve()
          },
          () => {
            loading = false
          }
        )
      }
    }
  })
}

export const getOptionsForSystemParams = (key: any) => {
  if (Array.isArray(key)) {
    let promiseList: Array<AnyKeyProps> = []
    let keys = key
    keys.forEach(key => {
      let promise = getPromise(key)
      promiseList.push(promise)
    })
    return Promise.all(promiseList)
  } else {
    return getPromise(key)
  }
}

export const loadOptions = (key: string) => {
  console.log(key, map)
  try {
    let list = key.split('.')
    let target = map
    if (list[0] === 'root') {
      target = rootMap
      list = list.slice(1, list.length)
    }
    list.forEach((item: any) => {
      target = target[item]
    })
    if (target) {
      let list = Object.entries(target).map(item => {
        return { label: item[1], value: item[0] }
      })
      return list
    } else {
      return []
    }
  } catch {
    return []
  }
}

export const getPromise = (key: any) => {
  return new Promise(resolve => {
    getStaticData().then(() => {
      // let item = list.find(item => item.value === key)
      let list = key.split('.')
      let target = map
      if (list[0] === 'root') {
        target = rootMap
        list = list.slice(1, list.length)
      }
      list.forEach((item: any) => {
        target = target[item]
      })
      if (target) {
        let list = Object.entries(target).map(item => {
          return { label: item[1], value: item[0] }
        })
        resolve(list)
      } else {
        resolve([])
      }
    })
  })
}

export const listToMap = (list: AnyKeyProps) => {
  let map: AnyKeyProps = {}
  list.forEach((item: any) => {
    map[item.value] = item.label
  })
  return map
}
