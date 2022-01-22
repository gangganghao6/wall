<template>
  <li v-for="post in posts" :key="post.id">
    <PostItem :post="post" :isresponse="isresponse" :type="type" :ismy="ismy">
    </PostItem>
  </li>
  <div class="pagesplit">
    <t-pagination
        :defaultPageSize=5
        :pageSize="pageSize"
        :total="postsize"
        :pageSizeOptions="pageSizeOptions"
        size="small"
        theme="simple"
        @change="onChange"
        @currentChange="onCurrentChange"
    />
  </div>

</template>

<script>
import PostItem from "@/components/PostItem";
import {mapActions, mapState} from "vuex";

export default {
  name: "PostList",
  emits: ['getData'],
  components: {PostItem},
  props: ['posts', 'isresponse', 'postsize', 'type', 'ismy'],
  data() {
    return {
      pageSize: 8,
    }
  },
  methods: {
    onChange(pageInfo) {
      this.$emit("getData", pageInfo);
    },
    onCurrentChange(index, pageInfo) {
      this.$emit("getData", pageInfo);
    },
    ...mapActions({
      getUserInfo: 'getUserInfo'
    })
  },
  computed: {
    pageSizeOptions() {
      return [this.pageSize]
    },
    ...mapState({
      user:'user'
    })
  },
  created() {
    this.$emit('getData', {current: 1, pageSize: 8, previous: 1});
    if (this.user === null || this.user === undefined || this.user === '' || this.user === {}) {
      return;
    }
    this.getUserInfo();
  }
}
</script>

<style scoped>


li {
  list-style: none;
  display: block;
  width: 100%;
  height: 150px;
  position: relative;
}

.pagesplit {
  width: 80%;
  margin-bottom: 5%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: stretch
}
</style>
