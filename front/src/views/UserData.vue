<template>
  <div class="userdata">
    <t-list :split="true" :stripe="true" style="width: 100%">
      <HeaderChange v-if="rerender"/>
    </t-list>
    <t-list v-for="(data,name) in user" :split="true" :stripe="true" style="width: 100%">
      <UserDataListItem :data="data" :name="name"/>
    </t-list>
  </div>
</template>

<script>
import UserDataListItem from "@/components/UserDataListItem";
import HeaderChange from "@/components/HeaderChange";
import {mapState} from "vuex";

export default {
  name: "UserData",
  components: {HeaderChange, UserDataListItem},
  data() {
    return {
      rerender: true,
      user: {}
    }
  },
  created() {
    // this.user = JSON.parse(this.$route.params.user);
    this.user['姓名']=this.uservuex.name;
    this.user['手机']=this.uservuex.phone;
    this.user['年龄']=this.uservuex.age;
    this.user['性别']=this.uservuex.sex;
    this.user['密码']=this.uservuex.password;
  },
  computed: {
    ...mapState({
      uservuex: 'user'
    })
  }
}
</script>

<style scoped>
.userdata {
  width: 100%;
  height: 80%;
  top: 10%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
