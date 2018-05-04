<template>
  <div class="address-picker">
    <transition name="pop">
      <div class="content" v-show="show">
        <div class="title" @touchmove="$event.preventDefault()">
          所在地区<span class="back" @click="back()">X</span>
        </div>

        <div class="tabs" @touchmove="$event.preventDefault()">
          <div
            class="tab"
            :key="addr.tab"
            v-for="addr in address"
            v-show="addr.name"
            @click="tabActive = addr.tab"
            :class="{ 'tab-active': addr.tab == tabActive }">{{addr.name}}
          </div>
          <div class="scrollbar" :style="scrollbar"></div>
        </div>

        <div
          class="area" ref="area"
          @touchstart="handleTouchstart($event)"
          @touchmove="handleTouchmove($event)"
          @touchend="handleTouchend($event)">
          <ul v-show="tabActive === 0">
            <li
              :key="code"
              v-for="(province, code) in provinces"
              :class="{ 'selected': province == address.province.name }"
              @click="changeAddresss('province', province, code)">
              {{province}}
            </li>
          </ul>

          <ul v-show="tabActive === 1">
            <li
              :key="code"
              v-for="(city, code) in cities"
              :class="{ 'selected': city == address.city.name }"
              @click="changeAddresss('city', city, code)">
              {{city}}
            </li>
          </ul>

          <ul v-show="tabActive === 2">
            <li
              :key="code"
              v-for="(county, code) in counties"
              :class="{ 'selected': county == address.county.name }"
              @click="changeAddresss('county', county, code)">
              {{county}}
            </li>
          </ul>

          <ul v-show="tabActive === 3">
            <li
              :key="code"
              v-for="(town, code) in towns"
              :class="{ 'selected': town == address.town.name }"
              @click="changeAddresss('town', town, code)">
              {{town}}
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="overlay">
      <div class="overlay" v-if="show" @click="back()" @touchmove="$event.preventDefault()"></div>
    </transition>
  </div>
</template>

<script>
import area from 'china-area-data';

const DEFAULT_ADDRESS_NAME = '请选择';

function getAngle(dx, dy) {
  return Math.atan2(dy, dx) * 180 / Math.PI;
}

function getDirection(startX, startY, endX, endY) {
  const dy = startY - endY;
  const dx = endX - startX;

  const angle = getAngle(dx, dy);

  if (angle >= -45 && angle < 45) {
    return 'right';
  } else if (angle >= 45 && angle < 135) {
    return 'top';
  } else if (angle >= -135 && angle < -45) {
    return 'bottom';
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    return 'left';
  }
}

export default {
  data: function() {
    return {
      address: {
        province: { code: 0, name: DEFAULT_ADDRESS_NAME, tab: 0, pos: 0 },
        city: { code: 0, name: '', tab: 1, pos: 0 },
        county: { code: 0, name: '', tab: 2, pos: 0 },
        town: { code: 0, name: '', tab: 3, pos: 0 }
      },
      tabActive: 0,
      show: false,
      startX: 0,
      endX: 0,
      starY: 0,
      endY: 0
    };
  },
  props: {
    value: {
      type: Object
    }
  },
  computed: {
    scrollbar() {
      return { transform: `translateX(${this.tabActive * 100 * 18 / 14}%)` };
    },
    provinces() {
      return area[86];
    },
    cities() {
      return area[this.address.province.code];
    },
    counties() {
      return area[this.address.city.code];
    },
    towns() {
      return area[this.address.county.code];
    },
    fillin() {
      let count = 0;
      for (const key of Object.keys(this.address)) {
        this.address[key].name && count++;
      }
      return count - 1;
    },
    addressValue() {
      const result = {
        province: this.address.province.name,
        city: this.address.city.name,
        county: this.address.county.name,
        town: this.address.town.name
      };
      for (const key of Object.keys(result)) {
        result[key] = result[key] === DEFAULT_ADDRESS_NAME ? '' : result[key];
      }
      return result;
    }
  },
  methods: {
    open() {
      history.pushState({ page: 'address' }, 'address', `${window.location.href}#`);
      this.show = true;
    },
    back() {
      history.go(-1);
    },
    close() {
      this.show = false;
    },
    setValue(value) {
      this.$emit('input', value);
    },
    changeAddresss(type, name, code) {
      this.address[type].name = name;
      this.address[type].code = code;
      this.address[type].pos = this.$refs.area.scrollTop;

      setTimeout(() => {
        if (type === 'province') {
          this.address.city.name = DEFAULT_ADDRESS_NAME;
          this.address.city.code = 0;
          this.address.city.pos = 0;
          this.address.county.name = '';
          this.address.county.code = 0;
          this.address.county.pos = 0;
          this.address.town.name = '';
          this.address.town.code = 0;
          this.address.town.pos = 0;
          this.tabActive = 1;
        }

        if (type === 'city') {
          if (this.counties) {
            this.address.county.name = DEFAULT_ADDRESS_NAME;
            this.address.county.code = 0;
            this.address.county.pos = 0;
            this.address.town.name = '';
            this.address.town.code = 0;
            this.address.town.pos = 0;
            this.tabActive = 2;
          } else {
            this.setValue(this.addressValue);
            this.back();
          }
        }

        if (type === 'county') {
          if (this.towns) {
            this.address.town.name = DEFAULT_ADDRESS_NAME;
            this.address.town.code = 0;
            this.address.town.pos = 0;
            this.tabActive = 3;
          } else {
            this.setValue(this.addressValue);
            this.back();
          }
        }

        if (type === 'town') {
          this.setValue(this.addressValue);
          this.back();
        }
      }, 300);
    },
    handleTouchstart(e) {
      const point = e.touches ? e.touches[0] : e;
      this.startX = point.pageX;
      this.startY = point.pageY;
    },
    handleTouchmove(e) {
      const point = e.changedTouches ? e.changedTouches[0] : e;
      const centerX = point.pageX;
      const centerY = point.pageY;

      const d = getDirection(this.startX, this.startY, centerX, centerY);

      if (d === 'bottom' && this.$refs.area.scrollTop <= 0) {
        e.preventDefault();
      } else if (d === 'top' && this.isBottom()) {
        e.preventDefault();
      }
    },
    isBottom() {
      const el = this.$refs.area;
      if (el.scrollHeight - el.scrollTop === el.clientHeight) {
        return true;
      }
      if (el.scrollHeight <= el.clientHeight) {
        return true;
      }
      return false;
    },
    handleTouchend(e) {
      const point = e.changedTouches ? e.changedTouches[0] : e;
      this.endX = point.pageX;
      this.endY = point.pageY;

      if (Math.abs(this.endX - this.startX) < 50) {
        return;
      }

      const d = getDirection(this.startX, this.startY, this.endX, this.endY);

      if (d === 'left' && this.tabActive > 0) {
        this.tabActive--;
      } else if (d === 'right' && this.tabActive < this.fillin) {
        this.tabActive++;
      }
    }
  },
  watch: {
    tabActive(value) {
      let pos = 0;
      if (value === 0) {
        pos = this.address.province.pos;
      } else if (value === 1) {
        pos = this.address.city.pos;
      } else if (value === 2) {
        pos = this.address.county.pos;
      } else if (value === 3) {
        pos = this.address.town.pos;
      }
      this.$nextTick(() => {
        this.$refs.area.scrollTop = pos;
      });
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
  @import "../styles/mixins"
  @import "../styles/variables"

  .address-picker
    .content
      fixed: bottom 0 left 0 right 0
      z-index: 10
      text-align: center
      background: white
      &.pop
        &-enter-active
        &-leave-active
          transition: all .4s ease
        &-enter
        &-leave-to
          transform: translateY(100%)
      .title
        position: relative
        background: $primary
        color: $white
        line-height: $default-height
        .back
          absolute: right 16px

      .tabs
        position: relative
        display: flex
        height: 42px
        border-top: 1px solid $default-border
        border-bottom: 1px solid $default-border
        .tab
          width: 18%
          line-height: 42px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          &-active
            color: $primary
            transition: all .3s
        .scrollbar
          absolute: bottom 0 left 0
          size: 14% 2px
          border-radius: 10px
          margin: 0 2%
          background: $primary
          transition: all 0.3s

      .area
        height: 304px
        padding-left: 12px
        text-align: left
        line-height: $default-height
        overflow: auto
        .selected
          color: $primary

    .overlay
      fixed: top 0 left 0 right 0 bottom 0
      z-index: 9
      background: $overlay
      &.overlay
        &-enter-active
        &-leave-active
          transition: all .4s ease
        &-enter
        &-leave-to
          opacity: 0

</style>
