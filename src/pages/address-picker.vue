<template>
  <div class="address-picker">
    <mt-header :title="$route.name">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="container">
      <mt-cell :title="addressValue" @click.native="open" is-link></mt-cell>
      <lv-address-picker v-model="address" ref="picker"></lv-address-picker>
    </div>
  </div>
</template>

<script>
import LvAddressPicker from '../components/lv-address-picker';

export default {
  components: {
    LvAddressPicker
  },
  data() {
    return {
      address: {
        province: '',
        city: '',
        county: '',
        town: ''
      }
    };
  },
  computed: {
    addressValue() {
      const { province, city, county } = this.address;
      if (province && city && county) {
        return `${province} ${city} ${county}`;
      } else {
        return '请选择地址';
      }
    }
  },
  methods: {
    open() {
      this.$refs.picker.open();
    }
  }
};
</script>
