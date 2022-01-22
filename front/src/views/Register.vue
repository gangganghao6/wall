<template>
  <div class="register">
    <div class="layout">
      <div class="empty">
      </div>
      <div class="kind">
        <span class="kindalert">账户名：</span>
        <span class="kindalert">手机：</span>
        <span class="kindalert">密码：</span>
        <span class="kindalert">确认密码：</span>
        <span class="kindalert">年龄：</span>
        <span class="kindalert">性别：</span>
      </div>
      <class class="input">
        <div class="account">
          <input type="text" class="inputaccount" v-model="name">
        </div>
        <div class="phone">
          <input type="text" class="inputphone" v-model="phone">
        </div>
        <div class="password">
          <input type="password" class="inputpassword" v-model="password" required="required">
        </div>
        <div class="passwordconfirm">
          <input type="password" class="inputpasswordconfirm" v-model="passwordConfirm" required>
        </div>
        <div class="age">
          <input type="text" class="inputpasswordconfirm" v-model="age" required>
        </div>
        <div class="sex">
          <input type="text" class="inputpasswordconfirm" v-model="sex" required>
        </div>
      </class>
      <div class="alert">
      </div>
    </div>
    <div class="submit">
      <router-link :to="{name:'login'}">已有账号？</router-link>
      <t-button block theme="primary" variant="base" @click="register">注册</t-button>
    </div>

  </div>

</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      age: '',
      sex: ''
    }
  },
  methods: {
    async register() {
      if (this.password !== this.passwordConfirm) {
        alert('两次密码输入不一致！')
      }
      let result = await this.axios.post('/user/register', {
        name: this.name,
        phone: this.phone,
        password: this.password,
        age: this.age,
        sex: this.sex
      })
      if (result.data.status === 'success') {
        alert('注册成功！')
        await this.$router.push('/login');
      } else {
        alert('注册失败！')
      }
    }
  }
}
</script>

<style scoped>
.register {
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
  /* border: 1px solid black; */
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
