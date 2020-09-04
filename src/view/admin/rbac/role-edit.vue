<template>
  <div class="container">
    <div class="title">编辑分组权限</div>
    <el-row>
      <el-col :lg="16" :md="20" :sm="24" :xs="24">
        <div class="content">
          <div style="margin: 30px 0;">id:{{ $route.query.id }}</div>
          <div class="boxSelAll">
            <el-checkbox @change="confirmSellAll">全选</el-checkbox>
          </div>
          <div class="listBox">
            <div v-for="(item, index) in allPermissions" :key="index" class="item">
              <el-checkbox v-model="item.checked">
                {{ item.name }}
              </el-checkbox>
            </div>
          </div>
          <br /><br />
          <div style="padding-left:0px;margin-top: 30px;clear: both;">
            <el-button type="primary" @click="confirmEdit">确 定</el-button>
            <el-button @click="goBack">返回</el-button>
          </div>
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
    return {
      isSelectAll: true,
      roleInfo: {},
      id: 0,
      allPermissions: [], // 所有权限
      permissions: [], // 最终选择的权限
      loading: false,
    }
  },
  methods: {
    updatePermissions(permissions) {
      this.permissions = permissions
    },
    updateAllPermissions(allPermissions) {
      this.allPcrmissions = allPermissions
    },
    // 页面打开时候，记录缓存所拥有的全部权限
    getCacheAuthIds(ids) {
      this.cachePermissions = ids
    },
    async confirmEdit() {
      const finalPermissions = this.getPermissionsIDs(this.allPermissions)
      let res
      try {
        this.loading = true
        res = await Rbac.updateOneGroupPower(this.id, finalPermissions) // eslint-disable-line
      } catch (e) {
        this.loading = false
        console.log(e)
      }
      if (res.code === 0) {
        this.$message.success('权限修改成功')
      }
    },
    goBack() {
      this.$router.go(-1)
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
      this.id = this.$route.query.id
      const db1 = await Rbac.getOneGroup(this.id)
      if (db1.code !== 0) {
        return
      }
      this.roleInfo = db1.data
      console.log('info=', this.roleInfo)
      const db = await Rbac.getAllPowers()
      if (db.code !== 0) {
        return
      }
      const ls = db.data.list
      this.allPermissions = []
      ls.forEach(i => {
        const ck = this.roleInfo.power_ids.indexOf(i.id) >= 0
        console.log('ck=', ck, this.roleInfo.power_ids, i.id)
        this.allPermissions.push({ id: i.id, name: i.name, checked: ck })
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
    padding-left: 33px;
    padding-right: 40px;
    margin-bottom: 30px;
  }

  .submit {
    float: left;
  }
  .item {
    float: left;
    width: 33%;
    display: block;
  }
  .listBox {
    clear: both;
    margin: 30px 0 30px 0;
  }
}
</style>
