<template>
  <div class="message-box">
    <mt-header :title="$route.name">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="container">
      <mt-button type="default" size="large" @click="alert">打开 alert 提示框</mt-button>
      <mt-button type="default" size="large" @click="confirm">打开 confirm 提示框</mt-button>
      <lv-message-box ref="alert"></lv-message-box>
      <lv-message-box ref="confirm" :cancelShow="true"></lv-message-box>
    </div>
  </div>
</template>

<script>
import LvMessageBox from '../components/lv-message-box';

export default {
  components: {
    LvMessageBox
  },
  methods: {
    alert() {
      this.$refs.alert.open().then(() => {
        console.log('我选择了确定');
      });
    },
    confirm() {
      this.$refs.confirm.open()
        .then(() => {
          console.log('我选择了确定');
        })
        .catch(() => {
          console.log('我选择了取消');
        });
    }
  }
};
</script>

<style lang="stylus">
  .message-box
    .container
      padding: 30px
      text-align: center
      .mint-button
        margin-bottom: 20px
</style>
