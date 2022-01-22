<template>
  <div class="publishwall">
    <ul class="postlist">
      <PostList :posts="posts" :isresponse="false" @get-data="getData" :ismy="true" type="wall" :postsize="postsize"/>
    </ul>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import {mapState} from "vuex";

export default {
  name: "PublishWall",
  components: {
    PostList
  },
  data() {
    return {
      posts: [],
      postsize: 0
    }
  },
  computed:{
    ...mapState({
      user:'user'
    })
  },
  methods: {
    getData({current = 1, pageSize = 8, previous = 1}) {
      this.posts = this.user.walls.reverse();
      this.postsize = this.posts.length;
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

.publishwall {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  top: 7%;
}
</style>
