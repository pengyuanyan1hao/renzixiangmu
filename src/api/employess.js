import request from '@/utils/request'

export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
export const getEmployeesInfo = (id) => {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
export function saveEmployeesInfo(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
export function getEmployeesJobInfo(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}
export function saveEmployeesJobInfo(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
