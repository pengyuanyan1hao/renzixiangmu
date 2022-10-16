import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

export function addDepartments(data) {
  return request({
    url: '/company/departments',
    method: 'post',
    data
  })
}

export function updateDepartments(data) {
  return request({
    url: `/company/department${data.id}`,
    method: 'put',
    data
  })
}
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
