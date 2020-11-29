import { AySearchTableField } from 'amiya'
import React, { useState } from 'react'
import { useMount } from 'react-use'
import { copy } from '.'
import { getOptionsForSystemParams } from './system-params'

const getFieldsOptionsKeys = (fields: AnyKeyProps) => {
  let optionsKeys: Array<string> = []
  let indexs: Array<number> = []
  fields.forEach((field: AnyKeyProps, i: number) => {
    if (field.optionsKey) {
      optionsKeys.push(field.optionsKey)
      indexs.push(i)
    }
  })
  return {
    optionsKeys,
    indexs
  }
}

export default function useFields(data: Array<AySearchTableField>) {
  const [fields, setFields] = useState<Array<AySearchTableField>>(data)
  const [loading, setLoading] = useState<boolean>(true)
  useMount(() => {
    let newFields: Array<any> = [...fields]
    let { optionsKeys, indexs } = getFieldsOptionsKeys(newFields)
    if (optionsKeys.length) {
      setLoading(true)
      getOptionsForSystemParams(optionsKeys)
        .then((group: any) => {
          group.forEach((options: AnyKeyProps, i: number) => {
            if (newFields[indexs[i]]) {
              newFields[indexs[i]].options = options
            }
          })
        })
        .finally(() => {
          setLoading(false)
        })
      setFields(newFields)
    } else {
      setLoading(false)
    }
  })

  return {
    fields,
    loading
  }
}
