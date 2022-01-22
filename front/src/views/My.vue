<template>
  <div class="my">
    <div class="myhead">
      <img :src="src">
      <!--      <p>{{ user.name }}</p>-->
    </div>
    <MyList :user="userStringify"/>

    <router-link to="/login" class="logout" @click="logout">
      注销
    </router-link>
  </div>
</template>

<script>
import MyList from "@/components/MyList";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "My",
  components: {MyList},
  data() {
    return {
      src: ''
    }
  }, computed: {
    userStringify() {
      return JSON.stringify(this.user);
    },
    ...mapState({
      user: 'user'
    })
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let user = vm.$store.state.user;
      if (user === null || user === undefined || user === '' || user === {}) {
        alert("未登录")
        vm.$router.push('/login')
      } else {
        vm.$router.push('/my')
      }
    });
  },
  methods: {
    ...mapMutations({
      updateUser: 'updateUser'
    }),
    ...mapActions({
      getUserInfo:'getUserInfo'
    }),
    logout() {
      this.updateUser(null)
    }
  },
  beforeMount() {
    if (this.user === null || this.user === undefined || this.user === '' || this.user === {}) {
      return;
    }
    this.src = '/images/' + this.user.phone + '.png'
    this.getUserInfo()
  }
}
</script>

<style scoped>
.my {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10%;
  width: 100%;
  align-items: center;
}

.myhead {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 100%;
  border: 1px solid black;
  justify-content: center;
}

img {
  width: 75px;
  height: 75px;
}

.logout {
  width: 25%;
  height: 40px;
  border: 1px solid red;
  text-align: center;
  line-height: 40px;
  color: red;
}
</style>
