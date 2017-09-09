const getters = {
  sidebar: state => state.app.sidebar,
  status: state => state.user.status,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  userProfile: state =>state.user
};
export default getters
