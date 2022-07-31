<template>
  <div class="good">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="menu-item"
          :class="{ current: currentIndex === index }"
          @click="selectMenu(index, $event)"
        >
          <span class="text"
            ><span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            {{ item.name }}</span
          >
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" ref="foodList">
          <h2 class="title">{{ item.name }}</h2>
          <ul>
            <li v-for="(food, index) in item.foods" :key="index" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="" />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span v-show="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cart-wrapper">
                  <cartcontrol :food="food" @add-food="addFood"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart
      ref="shopcart"
      :selectFoods="selectFoods"
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
    ></shopcart>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import { getGoods } from '../../../api';
import shopcart from '../shopcart/shopcart.vue';
import cartcontrol from '../cartcontrol/cartcontrol.vue';

export default {
  props: {
    seller: {
      type: Object,
    },
  },
  components: {
    shopcart,
    cartcontrol,
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
    };
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    getGoods().then((res) => {
      this.goods = res;

      this.$nextTick(() => {
        this.initScroll();
        this.calculateHeight();
      });
    });
  },

  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i += 1) {
        const height1 = this.listHeight[i];
        const height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },

    selectFoods() {
      const foods = [];
      this.goods.forEach((item) => {
        item.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    },
  },

  methods: {
    addFood(event) {
      this.$refs.shopcart.drop(event);
    },
    selectMenu(index, event) {
      // eslint-disable-next-line
      if (!event._constructed) {
        return;
      }
      const { foodList } = this.$refs;
      const el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true,
      });

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3,
      });

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },

    calculateHeight() {
      let height = 0;
      const { foodList } = this.$refs;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i += 1) {
        const foodHeight = foodList[i].clientHeight;
        height += foodHeight;
        this.listHeight.push(height);
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';
.good {
  display: flex;
  position: absolute;
  top: 176.5px;
  bottom: 46px;
  left: 0;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    background-color: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      &.current {
        background-color: aqua;
      }
      .text {
        display: table-cell;
        vertical-align: middle;
        font-size: 12px;
        font-weight: 200;
        line-height: 14px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('decrease_3');
          }
          &.discount {
            @include bg-image('discount_3');
          }
          &.guarantee {
            @include bg-image('guarantee_3');
          }
          &.invoice {
            @include bg-image('invoice_3');
          }
          &.special {
            @include bg-image('special_3');
          }
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      background-color: #f3f5f7;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        @include border-none();
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
        }
        .extra {
          margin-top: 8px;
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cart-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
