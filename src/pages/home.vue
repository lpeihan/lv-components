<template>
  <div class="home">
    <mt-header :title="pkg.name"></mt-header>
    <mt-cell title="scroll-picker" to="/scroll-picker" is-link></mt-cell>
    <mt-cell title="popup" to="/popup" is-link></mt-cell>
    <mt-cell title="address-picker" to="/address-picker" is-link></mt-cell>
    <mt-cell title="message-box" to="/message-box" is-link></mt-cell>
  </div>
</template>

<script>
import pkg from '../../package.json';
import LvHeader from '../components/lv-header';

export default {
  components: {
    LvHeader
  },
  data() {
    return {
      pkg
    };
  }
};
</script>
