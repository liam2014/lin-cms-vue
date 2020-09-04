<template>
  <div class="container">
    <div class="title">编辑分组权限</div>
    <div class="content">
      <ul class="boxSelAll">
        <el-checkbox @change="confirmSellAll">全选</el-checkbox>
      </ul>
      <ul>
        <li v-for="(item, index) in list" :key="index" class="item">
          <el-checkbox v-model="item.checked" @change="handleCheckedChange(index, item)">
            {{ item.name }}
          </el-checkbox>
        </li>
      </ul>
      <ul style="margin-top: 30px;">
        <div style="padding-left:5px;margin-top: 30px;clear:both;">
          <el-button type="primary" @click="confirmEdit">全选</el-button>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      list: [],
      allTags: [],
      selList: [],
      isAll: true,
    }
  },
  methods: {
    getList() {
      setTimeout(() => {
        this.allTags = [
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
        // this.list = this.allTags.map(item => {
        //   item.checked = true
        //   return item
        // })
        this.list = this.allTags
      }, 10)
    },
    handleCheckedChange(idx, item) {
      console.log('index=', idx)
      console.log('item=', item)
      // this.getIDs(this.list)
    },
    getIDs(list) {
      this.selList = []
      list.forEach(item => {
        if (item.checked === true) {
          this.selList.push(item.id)
        }
      })
      console.log('sel=', this.selList)
    },
    confirmSellAll() {
      this.list = this.list.map(item => {
        item.checked = this.isAll
        return item
      })
      this.isAll = !this.isAll
    },
    confirmEdit() {
      this.getIDs(this.list)
    },
  },
  mounted() {
    this.getList()
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
  }
  .boxSelAll {
    clear: both;
    margin-bottom: 20px;
  }
  ul {
    clear: both;
    display: block;
  }
  .item {
    float: left;
    width: 33%;
    display: block;
  }
  .submit {
    float: left;
  }
}
</style>
