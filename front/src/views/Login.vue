<template>
  <div class="login">
    <div class="layout">
      <div class="empty">
      </div>
      <div class="kind">
        <span class="kindalert">手机：</span>
        <span class="kindalert">密码：</span>
      </div>
      <div class="input">
        <div class="phone">
          <input type="text" class="inputphone" v-model="phone">
        </div>
        <div class="password">
          <input type="password" class="inputpassword" v-model="password">
        </div>
      </div>
      <div class="alert">
      </div>
    </div>
    <div class="submit">
      <router-link :to="{name:'register'}">还没有账号？</router-link>
      <t-button block theme="primary" variant="base" @click="login">登录</t-button>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "login",
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    async login() {
      let result = await this.axios.post('/user/login', {
        phone: this.phone,
        password: this.password
      }, {
        withCredentials: false
      })
      if (result.data.status === 'success') {
        this.updateUser(result.data.data)
        alert("登陆成功!")
        await this.$router.push('/my');
      } else {
        alert("账号或密码错误！")
      }
    },
    ...mapMutations({
      updateUser: 'updateUser'
    })
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
}
</script>
<style scoped>
.login {
  width: 100%;
  height: 93%;
  top: 7%;
  position: absolute;
  display: flex;
  flex-direction: column;
}

.layout {
  height: 60%;
  width: 100%;
  display: flex;
  align-items: center;
}

.empty {
  flex-grow: 1;
}

.kind, .input, .alert {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  flex-grow: 1;
}

.input {
  flex-grow: 1;
}

.alert {
  flex-grow: 1;
}

.kindalert {
  text-align: right;
}

.input div {
  text-align: left;
}

.kind span {
  margin-top: 12px;
  margin-bottom: 12px;
}

.input div input {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid black;
}

.submit {
  height: 40%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.submit button {
  transform: translateY(-100px);
  width: 15%;
  height: 10%;
  border-radius: 5px;
  margin-left: 30px;
}

.submit a {
  transform: translateY(-95px);
}

/* input:focus, button:focus {
  outline: none;
} */

input {
  padding-left: 3px;
}
</style>
