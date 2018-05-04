<template>
  <div class="popup">
    <transition :name="type">
      <div v-show="show" class="wrapper" :class="type">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </transition>

    <transition name="overlay">
      <div v-show="show" class="overlay" @click="back()"></div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'bottom'
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    open() {
      history.pushState({ page: 'popup' }, 'popup', `${window.location.href}#`);
      this.show = true;
    },
    back() {
      history.go(-1);
    },
    close() {
      this.show = false;
    }
  },
  mounted: function() {
    addEventListener('popstate', this.close);
  },
  beforeDestroy: function() {
    removeEventListener('popstate', this.close);
  }
};
</script>

<style lang="stylus">
  @import "../styles/variables"
  @import "../styles/mixins"

  .popup

    & > .bottom
      fixed: bottom 0 left 0 right 0
    & > .top
      fixed: top 0 left 0 right 0
    & > .left
      fixed: top 0 bottom 0 left 0 right 50%
    & > .right
      fixed: top 0 bottom 0 left 50% right 0
    & > .center
      fixed: top 50% left 50%
      transform: translate(-50%, -50%)
      width: 60%
      border-radius: 5px

    & > .wrapper
      transition: all .4s ease
      z-index: 10
      min-height: 150px
      background: $white

      &.bottom-enter
      &.bottom-leave-to
        transform: translateY(100%)

      &.top-enter
      &.top-leave-to
        transform: translateY(-100%)

      &.left-enter
      &.left-leave-to
        transform: translateX(-100%)

      &.right-enter
      &.right-leave-to
        transform: translateX(100%)
      &.center-enter
      &.center-leave-to
        opacity: 0

    & > .overlay
      fixed: top 0 right 0 bottom 0 left 0
      z-index: 9
      background: rgba(0, 0, 0, .6)
      transition: all .4s

      &.overlay-enter
      &.overlay-leave-to
        opacity: 0
</style>
