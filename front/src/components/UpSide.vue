<template>
  <div class="upside" :style="{height:webHeight+'px'}">
    <h1>河南工业大学</h1>
    <h1 @click="log">{{ name[`${$route.name}`] }}</h1>
    <h1></h1>
  </div>
</template>

<script>
export default {
  name: "UpSide",
  data() {
    return {
      name: {
        newthing: '新鲜事',
        wall: '表白墙',
        publish: '发布',
        search: '搜索',
        my: '我的',
        searchresult: '搜索结果',
        login: '登录',
        register: '注册',
        userdata: '用户资料',
        publishnewthing: '我发布的新鲜事',
        responsenewthing: '我回复的新鲜事',
        publishwall: '我发布的表白墙',
        responsewall: '我回复的表白墙',
        settings: '设置'
      }
    }
  },
  methods: {
    log() {
      console.log(this.$route)
    }
  },
  computed: {
    webHeight() {
      return window.screen.height * 0.07;
    }
  }
}
</script>

<style scoped>
.upside {
  width: 100%;
  background-color: purple;
  position: fixed;
  top: 0;
  max-width: 800px;
  z-index: 9;
  display: flex;
  justify-content: space-evenly;
}

h1 {
  font-size: 175%;
  line-height: 125%;
}
</style>
