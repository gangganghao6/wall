<template>
  <t-list-item>
    <div v-if="!isModifying" class="username">
      <span class="usernamespan">{{ name }}：</span>
      {{ this.currentData }}
    </div>
    <div v-if="isModifying" class="username">
      <span class="usernamespan">{{ name }}：</span>
      <input type="text" v-model="changingData">
    </div>
    <template #action>
      <t-button v-if="!isModifying" variant="text" @click="modify" :disabled="disabled">修改</t-button>
      <t-button v-if="isModifying" variant="text" @click="save">保存</t-button>
      <t-button v-if="isModifying" variant="text" @click="cancel">取消</t-button>
    </template>
  </t-list-item>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "UserDataListItem",
  props: ['data', 'name'],
  data() {
    return {
      isModifying: false,
      currentData: '',
      changingData: '',
      disabled: false
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
      this.changingData = this.currentData;
    },
    save() {
      this.isModifying = !this.isModifying;
      this.currentData = this.changingData;
      this.axios.post('/user/changeInfo', {
        type: this.name,
        data: this.currentData,
        phone: this.user.phone
      })
      this.getUserInfo();
    },
    cancel() {
      this.isModifying = !this.isModifying;
    },
    ...mapActions({
      getUserInfo:'getUserInfo'
    })
  },
  mounted() {
    this.currentData = this.data;
    if (this.name === '手机') {
      this.disabled = true;
    }
  },
}
</script>

<style scoped>
.username {
  display: flex;
  width: 60%;
}

.usernamespan {
  width: 40%;
}

input {
  width: 70%;
}
</style>
