<template>
  <div>
    <div class="list" v-for="(item, index) in list" :key="index">
      <div class="item">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ['1', '2'],
    }
  },
}
</script>

<style scoped lang="scss">
.list {
  margin: 10px;
}
.item {
  width: 30%;
  margin: 3%;
  float: left;
  height: 100px;
}
</style>
