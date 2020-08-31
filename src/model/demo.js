/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Demo {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async createDemo(data) {
    return _axios({
      method: 'post',
      url: 'api_cms/cms/v1/demo',
      data,
    })
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  async getDemo(id) {
    const res = await get(`api_cms/cms/v1/demo/${id}`)
    return res
  }

  async editDemo(id, info) {
    const res = await put(`api_cms/cms/v1/demo/${id}`, info)
    return res
  }

  async deleteDemo(id) {
    const res = await _delete(`api_cms/cms/v1/demo/${id}`)
    return res
  }

  async getDemos() {
    return _axios({
      method: 'get',
      url: 'api_cms/api/v1/demos',
      handleError: true,
    })
  }
}

export default new Demo()
