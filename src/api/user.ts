import ajax from '@/utils/axios'
import axios from '@/utils/axios'

/** 登录 */
export const login = (params: AnyKeyProps) =>
  axios.post('/j_spring_security_check', { ...params, transform: true, token: 'none' })

/** 获取登录人信息 */
export const getProfile = () => axios.post('/sysUser/findCurrentUser')

/** 获取系统参数 */
export const getSystemParams = () => axios.get('/sysParam/getSysparam')

/** 获取机构信息 */
export const getOrgList = (params: AnyKeyProps) => ajax.post('/sysOrg/listAll', params)

export const getDeployList = (params: AnyKeyProps) => ajax.post('/dgp/workFlowDeploy/getDeployList', params)
