/* eslint-disable class-methods-use-this */
import { post, get, put, _delete } from '@/lin/plugin/axios'

export default class Rbac {
  constructor(uPage = 0, uCount = 10, gPage = 0, gCount = 5) {
    this.uPage = uPage
    this.uCount = uCount
    this.lPage = gPage
    this.gCount = gCount
  }

  async increaseUPage() {
    this.uPage += 1
  }

  async increaseGPage() {
    this.lPage += 1
  }

  async decreaseUPage() {
    this.uPage -= 1
    if (this.uPage < 0) {
      this.uPage = 0
    }
  }

  async decreaseGPage() {
    this.lPage -= 1
    if (this.lPage < 0) {
      this.lPage = 0
    }
  }

  // power
  static async getAllPowers() {
    const list = await get('api_cms/cms/v1/rbac/powers?size=10000&current=1')
    return list
  }

  static async updateOnePower(name, tag, id) {
    const res = await put(`api_cms/cms/v1/rbac/power/${id}`, {
      name,
      tag,
    })
    return res
  }

  static async getPowers(size, current) {
    const list = await get(`api_cms/cms/v1/rbac/powers?size=${size}&current=${current}`)
    return list
  }

  static async createOnePower(name, tag) {
    const res = await post('api_cms/cms/v1/rbac/power', {
      name,
      tag,
    })
    return res
  }

  static async deleteOnePower(id) {
    const res = await put('api_cms/cms/v1/rbac/power-status', {
      ids: [id],
    })
    return res
  }

  static getAllPermissions() {
    return get('cms/admin/permission')
  }

  static async getAdminUsers({ group_id, count = this.uCount, page = this.uPag }) {
    let res
    if (group_id) {
      res = await get('cms/admin/users', {
        count,
        page,
        group_id,
      })
    } else {
      res = await get('cms/admin/users', {
        count,
        page,
      })
    }
    return res
  }

  async nextUsersPage() {
    await this.increaseUPage()
    return this.getAdminUsers({})
  }

  async preUsersPage() {
    await this.decreaseUPage()
    return this.getAdminUsers({})
  }

  async getGroupsWithPermissions({ count = this.uCount, page = this.uPag }) {
    const res = await get('cms/admin/groups', {
      count,
      page,
    })
    return res
  }

  async nextGroupsPage() {
    await this.increaseGPage()
    return this.getGroupsWithPermissions({})
  }

  async preGroupsPage() {
    await this.decreaseGPage()
    return this.getGroupsWithPermissions({})
  }

  static async getAllGroups() {
    // cms/admin/group/all
    const groups = await get('api_cms/cms/v1/rbac/roles')
    return groups
  }

  static async getOneGroup(id) {
    const group = await get(`api_cms/cms/v1/rbac/role/${id}`)
    return group
  }

  static async createOneRole(name, info, power_ids) {
    const res = await post('api_cms/cms/v1/rbac/role', {
      name,
      extended: { info }, // 支持扩展属性
      power_ids,
    })
    return res
  }

  static async updateOneGroup(name, info, id) {
    const res = await put(`api_cms/cms/v1/rbac/role/${id}`, {
      name,
      extended: { info },
    })
    return res
  }

  static async updateOneGroupPower(id, power) {
    const res = await put(`api_cms/cms/v1/rbac/role-power/${id}`, {
      power_ids: power,
    })
    return res
  }

  static async deleteOneGroup(id) {
    const res = await put('api_cms/cms/v1/rbac/role-status', {
      ids: [id],
    })
    return res
  }

  static async deleteOneUser(id) {
    const res = await _delete(`cms/admin/user/${id}`)
    return res
  }

  static async updateOneUser(email, group_ids, id) {
    const res = await put(`cms/admin/user/${id}`, {
      email,
      group_ids,
    })
    return res
  }

  static async dispatchPermissions(group_id, permission_ids) {
    const res = await post('cms/admin/permission/dispatch/batch', {
      group_id,
      permission_ids,
    })
    return res
  }

  static async changePassword(new_password, confirm_password, id) {
    const res = await put(`cms/admin/user/${id}/password`, {
      new_password,
      confirm_password,
    })
    return res
  }

  static async removePermissions(group_id, permission_ids) {
    const res = await post('cms/admin/permission/remove', {
      group_id,
      permission_ids,
    })
    return res
  }
}
