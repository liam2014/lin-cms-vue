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
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        // eslint-disable-line
        if (!valid) {
          this.$message.error('请将信息填写完整')
          return false
        }
        let res
        const finalPermissions = this.getPermissionsIDs(this.allPermissions)
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
          this.$router.push('/rbac/role/list')
          this.resetForm('form')
        } else {
          this.loading = false
          this.$message.error(`${res.message}`)
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    confirmSellAll() {
      this.allPermissions = this.allPermissions.map(item => {
        item.checked = this.isSelectAll
        return item
      })
      this.isSelectAll = !this.isSelectAll
    },
    getPermissionsIDs(list) {
      const ls = []
      list.forEach(item => {
        if (item.checked === true) {
          ls.push(item.id)
        }
      })
      return ls
    },
    async getPermisssionsList() {
      const db = await Rbac.getAllPowers()
      if (db.code !== 0) {
        return
      }
      const ls = db.data.list
      this.allPermissions = []
      ls.forEach(i => {
        this.allPermissions.push({ id: i.id, name: i.name, checked: false })
      })
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
