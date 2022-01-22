<template>
  <div class="publishnewthing">
    <ul class="postlist">
      <PostList :posts="posts" :isresponse="false" @get-data="getData" :postsize="postsize" :ismy="true" type="newthing"/>
    </ul>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import {mapState} from "vuex";

export default {
  name: "PublishNewThing",
  components: {
    PostList
  },
  data() {
    return {
      posts: [],
      postsize: 0
    }
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  methods: {
    getData({current = 1, pageSize = 8, previous = 1}) {
      this.posts = this.user.newThings.reverse();
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

.publishnewthing {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  top: 7%;
}
</style>
