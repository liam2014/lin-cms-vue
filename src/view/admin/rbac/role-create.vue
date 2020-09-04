<template>
  <div class="container">
    <div class="title">新建分组信息</div>
    <el-row>
      <el-col :lg="16" :md="20" :sm="24" :xs="24">
        <div class="content">
          <el-form
            status-icon
            :rules="rules"
            :model="form"
            ref="form"
            label-position="right"
            label-width="100px"
            @submit.native.prevent
          >
            <el-form-item label="分组名称" prop="name">
              <el-input size="medium" clearable v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="分组描述" prop="info">
              <el-input size="medium" clearable v-model="form.info"></el-input>
            </el-form-item>
            <el-form-item>
              <ul class="boxSelAll">
                <el-checkbox @change="confirmSellAll">全选</el-checkbox>
              </ul>
              <ul>
                <li v-for="(item, index) in allPermissions" :key="index" class="item">
                  <el-checkbox v-model="item.checked">
                    {{ item.name }}
                  </el-checkbox>
                </li>
              </ul>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" :loading="loading" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Rbac from '@/model/rbac'

export default {
  components: {},
  inject: ['eventBus'],
  data() {
    const checkName = (rule, value, callback) => {
      // eslint-disable-line
      if (!value) {
        return callback(new Error('分组名称不能为空'))
      }
      callback()
    }
    return {
      isSelectAll: true,
      allPermissions: [], // 所有权限
      permissions: [], // 最终选择的权限
      form: {
        name: '',
        info: '',
      },
      rules: {
        name: [{ validator: checkName, trigger: ['blur', 'change'], required: true }],
        info: [],
      },
      loading: false,
    }
  },
  methods: {
    updatePermissions(permissions) {
      this.permissions = permissions
    },
    updateAllPermissions(allPermissions) {
      this.allPermissions = allPermissions
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        // eslint-disable-line
        if (!valid) {
          this.$message.error('请将信息填写完整')
          return false
        }
        let res
        this.getPermissionsIDs(this.allPermissions)
        const finalPermissions = this.permissions
        try {
          this.loading = true
          res = await Rbac.createOneRole(this.form.name, this.form.info, finalPermissions) // eslint-disable-line
        } catch (e) {
          this.loading = false
          console.log(e)
        }
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.loading = false
          this.$message.success(`${res.message}`)
          this.eventBus.$emit('addGroup', true)
          this.$router.push('/admin/group/list')
          this.resetForm('form')
        } else {
          this.loading = false
          this.$message.error(`${res.message}`)
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$refs.groupPermissions.getGroupPermissions()
    },
    confirmSellAll() {
      this.allPermissions = this.allPermissions.map(item => {
        item.checked = this.isSelectAll
        return item
      })
      this.isSelectAll = !this.isSelectAll
    },
    getPermissionsIDs(list) {
      this.permissions = []
      list.forEach(item => {
        if (item.checked === true) {
          this.permissions.push(item.id)
        }
      })
      console.log('sel=', this.permissions)
    },
    getPermisssionsList() {
      setTimeout(() => {
        this.allPermissions = [
          { id: '1', pid: 1, name: '地区', checked: true },
          { id: '2', pid: 2, name: '游戏类型', checked: true },
          { id: '3', pid: 4, name: '性别', checked: true },
          { id: '4', pid: 5, name: '设备类型', checked: true },
          { id: '5', pid: 6, name: '休闲时间', checked: true },
          { id: '6', pid: 7, name: '王者荣耀', checked: true },
          { id: '7', pid: 8, name: '音乐', checked: true },
          { id: '8', pid: 9, name: '品牌手表', checked: true },
          { id: '9', pid: 10, name: '相机', checked: true },
          { id: '10', pid: 12, name: '游戏人群', checked: false },
        ]
      }, 10)
    },
  },
  mounted() {
    this.getPermisssionsList()
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

  .content {
    margin-top: 10px;
    padding-left: 25px;
    padding-right: 40px;
  }

  .submit {
    float: left;
  }
  .item {
    float: left;
    width: 33%;
    display: block;
  }
}
</style>
