<template>
  <div class="popup">
    <mt-header :title="$route.name">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="container">
      <mt-button type="default" size="large" @click="open('center')">中部弹出 popup</mt-button>
      <mt-button type="default" size="large" @click="open('top')">上侧弹出 popup</mt-button>
      <mt-button type="default" size="large" @click="open('left')">左侧弹出 popup</mt-button>
      <mt-button type="default" size="large" @click="open('right')">右侧弹出 popup</mt-button>
      <mt-button type="default" size="large" @click="open('bottom')">下侧弹出 popup</mt-button>
      <lv-popup ref="center" type="center"></lv-popup>
      <lv-popup ref="top" type="top"></lv-popup>
      <lv-popup ref="left" type="left"></lv-popup>
      <lv-popup ref="right" type="right"></lv-popup>
      <lv-popup ref="bottom" type="bottom"></lv-popup>
    </div>
  </div>
</template>

<script>
import LvPopup from '../components/lv-popup';

export default {
  components: {
    LvPopup
  },
  methods: {
    open(type) {
      this.$refs[type].open();
    }
  }
};
</script>

<style lang="stylus">
  .popup
    .container
      padding: 30px
      text-align: center
      .mint-button
        margin-bottom: 20px
</style>
