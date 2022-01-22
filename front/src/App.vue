<template>
  <div class="app" :style="{height:webHeight+'px'}">
    <UpSide/>
    <router-view/>
    <BottomSide/>
  </div>
</template>
<script>
import axios from "axios";
import UpSide from "@/components/UpSide";
import BottomSide from "@/components/BottomSide";

export default {
  name: 'app',
  components: {BottomSide, UpSide},
  methods: {},
  computed: {
    webHeight() {
      return window.screen.availHeight;
    }
  },
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}

html, body {
  width: 100%;
  /*height: 100%;*/
  margin: 0;
}

#app {
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  /*height: 100%;*/
}

.app {
  max-width: 800px;
  width: 100%;
  /*height: 100%;*/
  position: relative;
}

.router-link-active {
  color: white;
}
</style>
