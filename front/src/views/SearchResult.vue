<template>
<div class="searchresult">
  <div class="searchcomponent">
    <SearchComponent :searchContentBefore="$route.query.searchContent"/>
  </div>
  <ul class="postlist">
    <PostList :posts="posts"/>
  </ul>

</div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent";
import PostList from "@/components/PostList";
export default {
  name: "SearchResult",
  components: {SearchComponent,PostList},
  data(){
    return{
      posts:[{
        id:1,
        title:'title1',
        content:`contenftttttttttttttttttt`,
        time:'2022-01-15-18:23:11',
        userName:'userName'
      },{
        id:2,
        title:'title2',
        content:'<button>212</button>>'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      },{
        id:2,
        title:'title2',
        content:'content2'
      }]
    }
  }
}
</script>

<style scoped>
.searchresult{
  width: 100%;
  height: 80%;
  top:8%;
  position:absolute;
  display: flex;
  flex-direction: column;
}
.postlist{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 14%;
}
.searchcomponent{
  width: 100%;
  height: 45px;
  margin-bottom: 10px;
}
</style>
