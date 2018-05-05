<template>
  <div class="lv-message-box">
    <transition name="popup">
      <div class="wrapper" v-if="show">
        <div class="title">
          {{title}}
        </div>
        <div class="content">
          <div class="message">
          {{message}}
          </div>
        </div>
        <div class="footer">
          <div class="cancel" v-if="cancelShow" @click="cancel">取消</div>
          <div class="confirm" @click="confirm">确定</div>
        </div>
      </div>
    </transition>

    <div v-if="show" class="overlay"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '提示'
    },
    message: {
      type: String,
      default: '操作成功!'
    },
    cancelShow: {
      type: Boolean,
      default: false
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

      return new Promise((resolve, reject) => {
        this.$on('btn:confirm', function() {
          resolve();
        });

        this.$on('btn:cancel', function() {
          reject();
        });
      });
    },
    confirm() {
      this.$emit('btn:confirm');
      this.back();
    },
    cancel() {
      this.$emit('btn:cancel');
      this.back();
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

  .lv-message-box
    .wrapper
      fixed: top 50% left 50%
      size: 85% auto
      z-index: 10
      background: $white
      transform: translate(-50%, -50%)
      border-radius: 5px
      &.popup
        &-enter-active
        &-leave-active
          transition: all .2s
        &-enter
        &-leave-to
          transform: translate(-50%, -50%) scale(0.9)
          opacity: 0
      .title
        margin-top: 15px
        font-weight: 700
        color: $default-color
      .content
        padding: 10px 20px 15px
        border-bottom: 1px solid $default-border
        .message
          line-height: 44px
          color: $gray
      .footer
        text-align: center
        display: flex
        color: $primary
        line-height: 44px
        .confirm
          flex: 1
        .cancel
          position: relative
          flex: 1
          color: $gray
          &::after
            content: ''
            absolute: top 0 right 0 bottom 0
            width: 1px
            background: $default-border
    .overlay
      fixed: top 0 left 0 bottom 0  right 0
      z-index: 9
      background: $overlay
</style>
