<template>
  <router-link class="mylistitem" :to="{name,params:{user}}">{{ select }}</router-link>
</template>

<script>
export default {
  name: "MyListItem",
  props: ['select', 'name', 'user'],
}
</script>

<style scoped>
a {
  width: 90%;
  border: 1px solid black;
  height: 60px;
  font-size: 20px;
  line-height: 60px;
  text-align: left;
  border-radius: 3px;
  padding-left: 20px;
}
</style>
