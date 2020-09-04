import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '../util/token'
import store from '@/store'

export default class User {
  /**
   * 分配用户
   * @param {object} data 注册信息
   */
  static register(data) {
    return _axios({
      method: 'post',
      url: 'api_cms/cms/v1/user/register', // 'cms/user/register',
      data,
      handleError: true,
    })
  }

  /**
   * 登陆获取tokens
   * @param {string} username 用户名
   * @param {string} password 密码
   */
  static async getToken(username, password) {
    const tokens = await post('api_cms/api/v1/login', {
      // cms/user/login
      username,
      password,
      client: 1,
      login_flag: 0,
    })
    // const tokens = {
    //   access_token: `access_token${username}`,
    //   refresh_token: `refresh_token${password}`
    // }
    if (tokens === null || tokens.code !== 0) {
      return null
    }
    saveTokens(tokens.data.access_token, tokens.data.refresh_token)
    return tokens.data
  }

  /**
   * 获取当前用户信息，并返回User实例
   */
  static async getInformation() {
    const info = await get('api_cms/cms/v1/user/information') // ('cms/user/information')
    const storeUser = store.getters.user === null ? {} : store.getters.user
    return Object.assign({ ...storeUser }, info.data)
  }

  /**
   * 获取当前用户信息和所拥有的权限
   */
  static async getPermissions() {
    // const info = await get('cms/user/permissions')
    const info = await get('api_cms/cms/v1/user/permissions')
    const storeUser = store.getters.user === null ? {} : store.getters.user
    return Object.assign({ ...storeUser }, info.data)
  }

  /**
   * 用户修改密码
   * @param {string} newPassword 新密码
   * @param {string} confirmPassword 确认新密码
   * @param {string} oldPassword 旧密码
   */
  static updatePassword({ old_password, new_password, confirm_password }) {
    return put('api_cms/cms/v1/user/change_password', {
      // ('cms/user/change_password', {
      new_password,
      confirm_password,
      old_password,
    })
  }
}
