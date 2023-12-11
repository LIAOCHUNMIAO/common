const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  province: state => state.user.province,
  phone: state => state.user.phone,
  hasPhone: state => state.user.hasPhone,
  gender: state => state.user.gender,
  // 商家信息
  studioWechatId: state => state.studio.studioWechatId,
  studioPhone: state => state.studio.studioPhone,
  studioName: state => state.studio.studioName,
  studioId: state => state.studio.studioId,

}
export default getters
