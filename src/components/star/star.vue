<template>
  <div class="star" :class="starType">
    <span v-for="(item, index) in itemClasses" :key="index" :class="item" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_OFF = 'off';
const CLS_HALF = 'half';

export default {
  props: {
    size: {
      type: Number,
    },
    score: {
      type: Number,
    },
  },

  computed: {
    starType() {
      return `star-${this.size}`;
    },

    itemClasses() {
      const result = [];
      // 四舍五入取0.5的倍数
      const score = Math.floor(this.score * 2) / 2;
      const hasDecimal = score % 1 !== 0;
      const integer = Math.floor(score);
      for (let i = 0; i < integer; i += 1) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    },
  },
};
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';

.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      background-size: 10px 10px;
      margin-right: 3px;
      &:last-child {
        margin-right: 0px;
      }
      &.on {
        @include bg-image('star24_on');
      }
      &.half {
        @include bg-image('star24_half');
      }
      &.off {
        @include bg-image('star24_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      background-size: 15px 15px;
      margin-right: 6px;
      &:last-child {
        margin-right: 0px;
      }
      &.on {
        @include bg-image('star36_on');
      }
      &.half {
        @include bg-image('star36_half');
      }
      &.off {
        @include bg-image('star36_off');
      }
    }
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
      margin-right: 22px;
      &:last-child {
        margin-right: 0px;
      }
      &.on {
        @include bg-image('star48_on');
      }
      &.half {
        @include bg-image('star48_half');
      }
      &.off {
        @include bg-image('star48_off');
      }
    }
  }
}
</style>
