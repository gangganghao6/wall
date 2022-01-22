<template>
  <div class="publish">
    <textarea class="title" maxlength="20" rows="1" cols="1" placeholder="标题(不超过20字)" v-model="title"/>
    <textarea class="content" rows="1" cols="1" placeholder="内容(不超过140字)" v-model="content" maxlength="140"/>
    <div class="select">
      <select v-model="selected">
        <option value="newThing">新鲜事</option>
        <option value="wall">表白墙</option>
      </select>
      <button @click="publish">发布</button>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Publish",
  data() {
    return {
      title: '',
      content: '',
      selected: 'newThing'
    }
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  methods: {
    async publish() {
      let result = await this.axios.post("/user/publish", {
        title: this.title,
        content: this.content,
        type: this.selected,
        user: this.user
      }, {
        withCredentials: true
      })
      console.log(result)
      alert('发布成功！')
      this.$router.push(`/${this.selected}`);
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let user = vm.$store.state.user;
      if (user === null || user === undefined || user === '') {
        alert("未登录")
        vm.$router.push('/login')
      } else {
        vm.$router.push('/publish')
      }
    });
  },
}
</script>

<style scoped>
textarea {
  overflow: hidden;
  resize: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  padding-left: 10px;
  border-radius: 10px;
}

.publish {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 84%;
  top: 10%;
}

.title {
  width: 90%;
  height: 10%;
  border: 1px solid black;
  font-size: 30px;
  line-height: 250%;
  margin: 10px;
  margin-bottom: 0;
}

.content {
  width: 90%;
  height: 40%;
  font-size: 20px;
  padding-top: 10px;
  border: 1px solid black;
  margin: 10px;
}

button {
  width: 15%;
  font-size: 20px;
}

.select {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;

}

select {
  height: 40%;
  margin-right: 5%;
  border-radius: 5px;
}

select:focus {
  outline: none;
}

button:focus {
  outline: none;
}

textarea:focus {
  outline: none;
}

button {
  border-radius: 5px;
}
</style>
