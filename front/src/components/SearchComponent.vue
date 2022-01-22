<template>
  <div class="searchcomponent">
    <t-select v-model="searchType" placeholder="请选择云产品" style="width: 100px" size="large">
      <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" style="
      width: 100px"></t-option>
    </t-select>
    <input type="search" v-model="searchContent"/>
    <input type="button" value="搜索" @click="search">
  </div>
</template>

<script>
export default {
  name: "SearchComponent",
  props: ['searchContentBefore'],
  data() {
    return {
      searchContent: '',
      searchType: 'newthing',
      options: [{
        label: '新鲜事',
        value: 'newthing'
      }, {
        label: '表白墙',
        value: 'wall'
      }]
    }
  },
  methods: {
    search() {
      this.$router.push({name: 'searchresult', query: {searchContent: this.searchContent}})
    }
  },
  mounted() {
    if (typeof this.searchContentBefore === 'string') {
      this.searchContent = this.searchContentBefore;
    }
  }
}
</script>

<style scoped>
.searchcomponent {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

input[type=search] {
  width: 50%;
  margin-top: 20px;
  height: 45px;
  margin: 0;
  padding: 0;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 20px;
  border-radius: 5px;
  padding-left: 5px;
}

input::-webkit-search-cancel-button {
  display: none;
}

input[type="button"] {
  width: 50px;
  height: 40px;
  border-radius: 5px;
}

button:focus {
  outline: none;
}

input:focus {
  outline: none;
}

ul {
  padding: 0;
}
</style>
