<template>
  <div class="search">
    <SearchConponent/>
  </div>
</template>

<script>
import SearchConponent from "@/components/SearchComponent";
export default {
  name: "Search",
  components: {SearchConponent}
}
</script>

<style scoped>
.search{
  width: 100%;
  height: 80%;
  top:13%;
  position:absolute;
}

</style>
