<template>
  <div class="newthing">
    <ul class="postlist">
      <PostList :posts="posts" @get-data="getData" :postsize="postsize" :isResponse="false" type="newThing"/>
    </ul>
  </div>
</template>

<script>

import PostList from "@/components/PostList";

export default {
  name: 'Home',
  components: {PostList},
  data() {
    return {
      posts: [],
      postsize: 0
    }
  },
  methods: {
    async getData({current = 1, pageSize = 8, previous = 1}) {
      let result = await this.axios.get('/newthing/get?page=' + current)
      this.posts = result.data.data.data;
      this.postsize = result.data.data.dataSize;
    },

  }
}
</script>
<style scoped>
ul {
  margin: 0;
  padding: 0;
  /*margin-top: 14%;*/
  margin-bottom: 14%;
}

.newthing {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  top: 7%;
}

.postlist {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
