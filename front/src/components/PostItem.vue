<template>
  <a href="javascript:" class="postitem">
    <p class="postitemtitle">
      <span class="postitemtitletitle">
        <span v-if="isresponse">原文：</span>
        {{ post.title }}</span>
      <span class="postitemtitleusername">
        <span v-if="!isresponse">{{ post.name }}&nbsp&nbsp&nbsp&nbsp</span>{{ post.time }}</span>
    </p>
    <p class="postitemcontent">
      <span v-if="isresponse">回复：</span>{{ post.content }}</p>
  </a>
  <div class="postitembox" v-if="!isresponse&&!ismy">
    <a href="javascript:" class="postitemlike" @click="like">
      <icon name="heart" size="large" :class="{like:isLike}"></icon>
      {{ likeCount }}
    </a>
    <a href="javascript:" class="postitemjudge">
      <icon name="chat" size="large"/>
      {{ judgeCount }}
    </a>
  </div>
  <div class="postitembox" v-if="isresponse">
    <a href="javascript:" class="postitemdelete" v-if="post.delete===false">
      删除回复
    </a>
    <a href="javascript:" class="postitemdelete isdeleted" v-if="post.delete===true">
      回复已删除
    </a>
  </div>
  <div class="postitembox" v-if="ismy">
    <a href="javascript:" class="postitemdelete" v-if="ismy&&post.delete===false" @click="deletePublish">
      删除发布
    </a>
    <a href="javascript:" class="postitemdelete isdeleted" v-if="ismy&&post.delete===true">
      发布已删除
    </a>
  </div>

</template>

<script>
import {Icon} from 'tdesign-icons-vue-next';
import {mapActions, mapState} from "vuex";

export default {
  name: "PostItem",
  props: ['post', 'isresponse', 'type', 'ismy'],
  data() {
    return {
      isLike: false,
      likeCount: 0,
      judgeCount: 0
    }
  },
  components: {
    Icon
  },
  methods: {
    async like() {
      if (this.user === null || this.user === undefined || this.user === '' || this.user === {}) {
        alert('请先登录');
        this.$router.push('/login');
      }
      if (this.isLike === true) {
        await this.axios.post('/user/cancelLike', {
          id: this.post.id,
          user: this.user,
          type: this.type
        })
        this.likeCount--;
        this.isLike = false;
        await this.getUserInfo();
      } else {
        await this.axios.post('/user/like', {
          id: this.post.id,
          user: this.user,
          type: this.type
        })
        this.likeCount++;
        this.isLike = true;
        await this.getUserInfo();
      }
    },
    ...mapActions({
      getUserInfo: 'getUserInfo'
    }),
    deletePublish() {
      this.axios.post('/user/deletePublish', {
        type: this.type,
        id: this.post.id,
        phone: this.user.phone
      }).then((res)=>{
        this.getUserInfo().then(()=>{
          alert('已删除')
          this.$router.go(0);
        });
      })
    }
  },
  computed: {
    ...mapState({
      user: 'user'
    }),
  },
  beforeMount() {
    if (this.user === null || this.user === undefined || this.user === '' || this.user === {}) {
      this.judgeCount = this.post.judge;
      return;
    }
    for (let id of this.user.likes) {
      if (id === this.post.id) {
        this.isLike = true
      }
    }
    this.likeCount = this.post.like;
  },
}
</script>

<style scoped>
.postitem {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 80%;
  border-top: 1px solid black;
}

.postitemtitle {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 55%;
  font-size: 150%;
  padding: 12px 0 0 12px;
  border-bottom: 1px dashed black;
  margin: 0;
}

.postitemcontent {
  display: block;
  height: 50%;
  font-size: 150%;
  padding: 5px 0 0 10px;
  margin: 0;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  /*border-bottom: 1px solid black;*/
}

.postitembox {
  height: 20%;
  display: flex;
}

.postitemlike, .postitemjudge {
  display: block;
  width: 50%;
  font-size: 15px;
  line-height: 175%;
  border-radius: 5px;
}

.postitemlike {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
}

.postitemjudge {
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
}

.postitemdelete {
  width: 100%;
  height: 100%;
  border-top: 1px solid black;
  line-height: 200%;
}

.postitemtitleusername {
  font-size: 10px;
  line-height: 10px;
  padding-top: 5px;
}

.like {
  color: red
}

.isdeleted{
  color: gray;
}
</style>
