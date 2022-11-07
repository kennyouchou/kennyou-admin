import axios from "@/axios"
// 获取公告列表
export function getCouponList(page) {
    return axios.get(`/admin/coupon/${page}`)
}

// 创建优惠券
export function createCoupon(data) {
  return axios.post("/admin/coupon",data)
}

// 修改优惠券
export function updateCoupon(id,data) {
  return axios.post("/admin/coupon/"+id,data)
}

// 删除优惠券
export function deleteCoupon(id) {
  return axios.post(`/admin/coupon/${id}/delete`)
}

// 删除优惠券
export function updateCouponStatus(id) {
  return axios.post(`/admin/coupon/${id}/update_status`,{
    status:0
  })
}