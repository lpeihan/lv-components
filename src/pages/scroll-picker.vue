<template>
  <div class="scroll-picker">
    <mt-header :title="$route.name">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="container">
      <mt-cell :title="pickerValue" @click.native="open" is-link></mt-cell>
      <lv-scroll-picker :options="options" v-model="pickerValue" ref="picker"></lv-scroll-picker>
    </div>
  </div>
</template>

<script>
import LvScrollPicker from '../components/lv-scroll-picker';

export default {
  components: {
    LvScrollPicker
  },
  data() {
    return {
      options: ['中专', '高职', '本科', '硕士', '博士', '博士后'],
      pickerValue: '本科'
    };
  },
  methods: {
    open() {
      this.$refs.picker.open();
    }
  }
};
</script>

<style lang="stylus">
</style>
