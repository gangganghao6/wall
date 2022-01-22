<template>
  <div class="wall">
    <ul class="postlist">
      <PostList :posts="posts" @get-data="getData" :isResponse="false" :postsize="postsize" type="wall"/>
    </ul>
  </div>
</template>

<script>

import PostList from "@/components/PostList";

export default {
  name: "Wall",
  components: {PostList},
  data() {
    return {
      posts: [],
      postsize:0
    }
  },
  methods: {
    getData({current = 1, pageSize = 8, previous = 1}) {
      this.axios.get('/wall/get?page=' + current).then((res) => {
        this.posts = res.data.data.data;
        this.postsize = res.data.data.dataSize;
      })
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

.postlist {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.wall {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  top: 7%;
  /*bottom: 14%;*/
}
</style>
