<template>
  <div class="bottomside" :style="{height:webHeight+'px'}">
    <router-link :to="{name:'newthing'}">新鲜事</router-link>
    <router-link :to="{name:'wall'}">表白墙</router-link>
    <router-link :to="{name:'publish'}">发布</router-link>
    <router-link :to="{name:'search'}">搜索</router-link>
    <router-link :to="{name:'my'}">我的</router-link>
  </div>
</template>

<script>
export default {
  name: "BottomSide",
  computed: {
    webHeight() {
      return window.screen.height * 0.07;
    }
  }
}
</script>

<style>
.bottomside {
  width: 100%;
  /*height: 8%;*/
  background-color: purple;
  position: fixed;
  bottom: 0;
  max-width: 800px;
  z-index: 9;
  display: flex;
  justify-content: space-around;
}

.bottomside a {
  font-size: 22px;
  line-height: 275%;
}

a:focus {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
