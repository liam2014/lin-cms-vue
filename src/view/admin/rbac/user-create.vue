<template>
  <div class="container">
    <div class="title">新建用户</div>
    <div class="wrap">
      <div class="formBox">
        <el-form
          :model="form"
          status-icon
          :rules="rules"
          :label-position="labelPosition"
          ref="form"
          label-width="100px"
          @submit.native.prevent
        >
          <el-form-item label="用户名" prop="username">
            <el-input size="medium" clearable v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input size="medium" clearable v-model="form.email" auto-complete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              size="medium"
              clearable
              type="password"
              v-model="form.password"
              auto-complete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_password" label-position="top">
            <el-input
              size="medium"
              clearable
              type="password"
              v-model="form.confirm_password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="pageType !== 'password'" label="选择分组">
            <el-checkbox-group v-model="form.group_ids" size="small" style="transform: translateY(5px);">
              <el-checkbox v-for="item in groups" :key="item.id" :label="item.id" border style="margin-left: 0">{{
                item.name
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item v-show="submit" class="submit">
            <el-button type="primary" :loading="loading" @click="submitForm('form')">保 存</el-button>
            <el-button @click="resetForm('form')">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Admin from '@/model/rbac'

export default {
  props: {
    labelPosition: {
      type: String,
      default: 'right',
    },
  },
  components: {},
  data() {
    // 验证回调函数
    const checkUserName = (rule, value, callback) => {
      // eslint-disable-line
      if (!value) {
        callback(new Error('用户名不能为空'))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位数'))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('confirm_password')
        }
        callback()
      }
    }
    const validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false, // 加载动画
      isEdited: true, // 能否编辑
      form: {
        username: '',
        password: '',
        confirm_password: '',
        email: '',
        group_ids: [],
      },
      groups: [],
      // 表单label位置
      // labelPosition: {
      //   type: String,
      //   default: 'right',
      // },
      submit: {
        type: Boolean, // 表单是否显示功能按钮
        default: true,
      },
      // 验证规则
      rules: {
        username: [
          {
            validator: checkUserName,
            trigger: ['blur', 'change'],
            required: true,
          },
        ],
        password: [{ validator: validatePassword, trigger: 'blur', required: true }],
        confirm_password: [{ validator: validatePassword2, trigger: 'blur', required: true }],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址或者不填',
            trigger: ['blur', 'change'],
          },
        ],
      },
      pageType: {
        type: String,
        default: 'add', // 区分编辑页面/添加页面
      },
    }
  },
  methods: {
    // 提交表单
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res
          try {
            this.loading = true
            console.log('form=', this.form)
            res = await Admin.createOneUser(this.form)
            if (res.code < window.MAX_SUCCESS_CODE) {
              this.loading = false
              this.$message.success(`${res.message}`)
              this.resetForm(formName)
            }
          } catch (e) {
            this.loading = false
            this.$message.error('新增用户失败')
            console.log(e)
          }
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.form.group_ids = []
      this.$refs[formName].resetFields()
    },
  },
  async created() {
    try {
      this.loading = true
      const db1 = await Admin.getAllGroups()
      this.loading = false
      if (db1.code !== 0) {
        return
      }
      this.groups = db1.data.list
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .wrap {
    padding: 0px 20px;
  }
  .formBox {
    margin-top: 20px;
    margin-left: -5px;
    max-width: 800px;
  }
}
</style>
