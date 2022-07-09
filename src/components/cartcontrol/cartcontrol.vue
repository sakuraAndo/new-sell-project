<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
export default {
  name: 'cartcontrol',
  props: {
    food: {
      type: Object,
    },
  },
  methods: {
    addCart(event) {
      // eslint-disable-next-line
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        // 注意，原本没有这个属性，现在要加上这个属性，为了响应式需要用set设置
        this.$set(this.food, 'count', 1);
      } else {
        // eslint-disable-next-line
        this.food.count += 1;
      }
    },

    decreaseCart(event) {
      // eslint-disable-next-line
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) return;
      // eslint-disable-next-line
      this.food.count--;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-control {
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    height: 24px;
    opacity: 1;
    transform: translate3d(0, 0, 0);
    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
      transition: all 0.4s linear;
      transform: rotate(0);
    }
    &.move-enter-active, &.move-leave-active {
      transition: all 0.4s linear;
    }
    &.move-enter,
    &.move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
