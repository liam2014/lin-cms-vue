<template>
  <div class="container">
    <div class="header">
      <div class="title">用户列表</div>
    </div>
    <!-- 表格 -->
    <lin-table :tableColumn="tableColumn" :tableData="tableData" :operate="operate" v-loading="loading"></lin-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :background="true"
        :page-size="pageCount"
        :current-page="currentPage"
        v-if="refreshPagination"
        layout="prev, pager, next, jumper"
        :total="total_nums"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Demo from '@/model/demo'
import LinTable from '@/component/base/table/lin-table'

export default {
  components: { LinTable },
  data() {
    return {
      tableColumn: [
        { prop: 'title', label: '书名' },
        { prop: 'email', label: '邮件' },
      ],
      tableData: [],
      operate: [],
      total_nums: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
    }
  },
  async created() {
    this.loading = true
    this.getLists()
    this.loading = false
  },
  methods: {
    async getLists() {
      const books = await Demo.getDemos()
      console.log('list=', books)
      this.tableData = books.data.list
      this.total_nums = books.data.pagination.tatal
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}

.info {
  margin-left: -55px;
  margin-bottom: -30px;
}

.password {
  margin-top: 20px;
  margin-left: -55px;
  margin-bottom: -20px;
}
</style>
