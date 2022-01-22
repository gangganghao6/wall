<template>
  <t-list-item>
    <div class="headerchange">
      <div class="headerchangespan">头像：</div>
      <t-avatar :image="image" :hide-on-load-failed="false" size="large"/>
    </div>
    <template #action>
      <t-upload
          v-model="files"
          :size-limit="{ size: 10, unit: 'MB' }"
          :requestMethod="upload"
          tips="上传文件大小在 5M 以内"
          @fail="handleFail"
          accept="image/*"
      />
    </template>
  </t-list-item>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "HeaderChange",
  data() {
    return {
      isModifying: false,
      image: '/images/header.png' + '?' + new Date().getTime(),
      files: [],
      rerender: true
    }
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  methods: {
    modify() {
      this.isModifying = !this.isModifying;
    },
    handleFail(err) {
      alert(err)
    },
    async upload(args) {
      let datas = new FormData();
      datas.append('file', args.raw, args.name)
      let result = await axios.post('/user/headerchange?phone=' + this.user.phone, datas, {})
      this.image = '/images/' + this.user.phone + '.png' + '?' + new Date().getTime();
      return {
        status: result.data.status,
        response: {
          url: result.data.response
        }
      }
    },
  },
  beforeMount() {
    this.image='/images/'+this.user.phone+'.png'
  }

}
</script>

<style scoped>
.headerchangespan {
  width: 60%;
  line-height: 300%;
}

.headerchange {
  display: flex;
  width: 40%;
}
</style>
