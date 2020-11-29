import axios from '@/utils/axios'
import qs from 'qs'

/**
 * ------------------------------------------------------------
 * ----------------------- 配置管理 ----------------------------
 * ------------------------------------------------------------
 */

/** 获取配置管理列表 */
export const getSystemConfig = (params: AnyKeyProps) => axios.post('/sysConfigure/listByPage', params)

/** 添加配置管理 */
export const addSystemConfig = (params: AnyKeyProps) => axios.post('/sysConfigure/create', params)

/** 添加配置管理 */
export const updateSystemConfig = (params: AnyKeyProps) => axios.post('/sysConfigure/update', params)

/** 删除配置管理 */
export const deleteSystemConfig = (params: AnyKeyProps) => axios.delete('/sysConfigure/deleteAll', params)

/**
 * ------------------------------------------------------------
 * ----------------------- 用户管理 ----------------------------
 * ------------------------------------------------------------
 */

/** 获取用户列表 */
export const getUserList = (params: AnyKeyProps) => axios.post('/sysUser/listByPage', params)

/** 创建用户 */
export const addUser = (params: AnyKeyProps) => axios.post('/sysUser/create', params)

/** 删除用户 */
export const deleteUser = (params: AnyKeyProps) => axios.post('/sysUser/deleteAll', params)

/** 修改用户 */
export const updateUser = (params: AnyKeyProps) => axios.post('/sysUser/update', params)

/** 获取用户所有权限 */
export const getAllRole = (params: AnyKeyProps) => axios.post('/sysRole/list', params)

/** 获取用户已经拥有的权限 */
export const getUserRoles = (params: AnyKeyProps) => axios.post('/sysRole/findByUser', params)

/** 添加用户角色 */
export const addUserRoles = (params: AnyKeyProps) => axios.post('/sysUserXRole/createAll', params)

/** 删除用户角色 */
export const deleteUserRoles = (params: AnyKeyProps) => axios.post('/sysUserXRole/deleteAll', params)

/**
 * ------------------------------------------------------------
 * ----------------------- 角色管理 ----------------------------
 * ------------------------------------------------------------
 */

/** 获取角色列表 */
export const getRoleList = (params: AnyKeyProps) => axios.post('/sysRole/listByPage', params)

/** 添加角色 */
export const addRole = (params: AnyKeyProps) => axios.post('/sysRole/create', params)

/** 修改角色 */
export const updateRole = (params: AnyKeyProps) => axios.post('/sysRole/update', params)

/** 删除角色 */
export const deleteRole = (params: AnyKeyProps) => axios.post('/sysRole/deleteAll', params)

/** 根据角色获取相应的权限树 */
export const findResByRole = (id: string) => axios.post(`/sysRoleXRes/findResByRole/${id}`)

/** 更新权限树 */
export const updatePermission = (params: AnyKeyProps) =>
  axios.post('/sysRoleXRes/updatePermission', { ...params, transform: true })

/**
 * ------------------------------------------------------------
 * ----------------------- 机构管理 ----------------------------
 * ------------------------------------------------------------
 */

/** 获取机构树 */
export const getSystemOrg = (params: AnyKeyProps) => axios.post('/sysOrg/listAll', params)

/** 添加机构 */
export const addOrg = (params: AnyKeyProps) => axios.post('/sysOrg/create', params)

/** 修改机构 */
export const updateOrg = (params: AnyKeyProps) => axios.post('/sysOrg/update', params)

/** 删除机构 */
export const deleteOrg = (params: AnyKeyProps) => axios.post('/sysOrg/delete', params)

/** 根据机构编码查询机构详情 */
export const getOrgDetail = (params: AnyKeyProps) => axios.post('/sysOrg/listAll', params)

/**
 * ------------------------------------------------------------
 * ----------------------- 菜单管理 ----------------------------
 * ------------------------------------------------------------
 */

/** 获取所有的菜单权限 */
export const getAllMenu = (params: AnyKeyProps) => axios.post('/sysResources/findAllRes', params)

/** 添加菜单 */
export const addMenu = (params: AnyKeyProps) => axios.post('/sysResources/create', params)

/** 修改菜单 */
export const updateMenu = (params: AnyKeyProps) => axios.post('/sysResources/update', params)

/** 删除菜单 */
export const deleteMenu = (id: string) => axios.post(`/sysResources/deleteById/${id}`)

/**
 * ------------------------------------------------------------
 * ----------------------- 参数管理 ----------------------------
 * ------------------------------------------------------------
 */

/** 获取参数列表 */
export const getParamList = (params: AnyKeyProps) => axios.post('/sysParam/listAll', params)

/** 新增参数 */
export const addParam = (params: AnyKeyProps) => axios.post('/sysParam/create', params)

/** 修改参数 */
export const updateParam = (params: AnyKeyProps) => axios.post('/sysParam/update', params)

/** 删除参数 */
export const deleteParam = (id: string) => axios.post(`/sysParam/deleteById/${id}`)

/** 发布参数 */
export const buildParam = () => axios.post('/sysParam/build')

/**
 * ------------------------------------------------------------
 * ----------------------- 日志管理 ----------------------------
 * ------------------------------------------------------------
 */

/** 获取日志列表 */
export const getLogList = (params: AnyKeyProps) => axios.post('/sysLog/listByPage', params)

/**
 * ------------------------------------------------------------
 * ----------------------- 流程管理 ----------------------------
 * ------------------------------------------------------------
 */

/** 获取流程列表 */
export const getDeployList = (params: AnyKeyProps) => axios.post('/dgp/workFlowDeploy/getDeployList', params)

/** 新增流程 */
export const addDeploy = (params: AnyKeyProps) => axios.post('/dgp/workFlowDeploy/deploy', params)

/** 中止流程 */
export const abortDeploy = (params: AnyKeyProps) => axios.post(`/dgp/workFlowDeploy/${params.id}/${params.state}`)

/** 批量删除 */
export const delDeploy = (params: AnyKeyProps) => axios.post('/dgp/workFlowDeploy/deleteAll/true', params)

/** 查看流程图 */
export const viewPic = (params: AnyKeyProps) =>
  axios.post(`/dgp/workFlowDeploy/viewPic/${params.id}/${params.dgrmResourceame}`)

/**
 * ------------------------------------------------------------
 * ----------------------- 有效期管理 ----------------------------
 * ------------------------------------------------------------
 */

/** 保存数据有效期 */
export const saveDataExpire = (params: AnyKeyProps) => axios.post('/dgp/sysconfig/saveDataExpire', params)

/** 初始化血缘关系 */
export const initLinkMap = () => axios.post('/adapter/portal/email/initCreateLinkAnalysisMap')

/** 初始化元数据 */
export const initMdData = () => axios.post('/adapter/portal/email/initForceMdDataTreeToRedis')
