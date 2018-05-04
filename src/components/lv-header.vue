<template>
  <div class="lv-header">
    <i class="fas fa-angle-left" v-if="show" @click="$router.go(-1)"></i>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'home'
    },
    show: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="stylus">
  @import "../styles/variables"
  @import "../styles/mixins"

  .lv-header
    position: relative
    height: 50px
    color: $white
    font-size: 18px
    text-align: center
    line-height: 50px
    background: $primary
    .fa-angle-left
      absolute: top 50% left 0
      transform: translateY(-50%)
      padding: 10px 20px
      font-size: 24px
</style>
