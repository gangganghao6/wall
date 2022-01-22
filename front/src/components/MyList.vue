<template>
  <ul class="mylist">
    <MyListItem v-for="(select,name,index) in selects" :key="index" v-bind:select="select" v-bind:name="name"
                :user="user">
    </MyListItem>
  </ul>
</template>

<script>
import MyListItem from "@/components/MyListItem";

export default {
  name: "MyList",
  components: {MyListItem},
  props: ['user'],
  data() {
    return {
      selects: {
        'userdata': '个人资料',
        'publishnewthing': '我发布的新鲜事',
        'responsenewthing': '我回复的新鲜事',
        'publishwall': '我发布的表白墙',
        'responsewall': '我回复的表白墙',
        'settings': '设置'
      },

    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5%;
  margin-top: 5%;
}

.mylist {
  width: 100%;
}
</style>
