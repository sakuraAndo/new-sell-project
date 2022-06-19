<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">{{ seller.description }}/{{ seller.deliveryTime }}送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="support-content">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div @click="showDetail" class="support-count">
        <span class="count">{{ seller.supports.length }}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div @click="showDetail" class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-content">{{ seller.bulletin }}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background-image">
      <img :src="seller.avatar" alt="" />
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="content">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{ item.description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="content">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div @click="hideDetail" class="detail-close">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '@/components/star/star.vue';

export default {
  components: {
    star,
  },

  props: {
    seller: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      detailShow: false,
    };
  },

  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  },

  methods: {
    showDetail() {
      this.detailShow = true;
    },

    hideDetail() {
      this.detailShow = false;
    },
  },
};
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';
.header {
  position: relative;
  color: #fff;
  background: rgba(7, 17, 27, 0.5);
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        width: 64px;
        height: 64px;
        border-radius: 4px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        .brand {
          display: inline-block;
          vertical-align: top;
          margin-right: 6px;
          margin-bottom: 8px;
          width: 30px;
          height: 18px;
          @include bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          font-size: 16px;
          color: rgb(255, 255, 255);
          font-weight: bold;
          line-height: 18px;
        }
      }
      .description {
        margin-bottom: 10px;
        font-size: 12px;
        color: rgb(255, 255, 255);
        font-weight: 200;
        line-height: 12px;
      }
      .support {
        .icon {
          display: inline-block;
          vertical-align: top;
          margin-right: 4px;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('decrease_1');
          }
          &.discount {
            @include bg-image('discount_1');
          }
          &.guarantee {
            @include bg-image('guarantee_1');
          }
          &.invoice {
            @include bg-image('invoice_1');
          }
          &.special {
            @include bg-image('special_1');
          }
        }
        .support-content {
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 255, 255);
          font-weight: 200;
          line-height: 12px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        vertical-align: top;
        font-size: 10px;
        color: rgb(255, 255, 255);
        font-weight: 200;
        line-height: 24px;
      }
      .icon-keyboard_arrow_right {
        line-height: 24px;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      margin-top: 8px;
      margin-right: 4px;
      display: inline-block;
      vertical-align: top;
      width: 22px;
      height: 12px;
      background-size: 22px 12px;
      background-repeat: no-repeat;
      @include bg-image('bulletin');
    }
    .bulletin-content {
      font-size: 10px;
      color: rgb(255, 255, 255);
      font-weight: 200;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      right: 8px;
      top: 7px;
    }
  }
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);
    .detail-wrapper {
      width: 100%;
      min-height: 100%;
      .detail-main {
        margin-top: 64px;
        margin-bottom: 64px;
        .name {
          font-size: 16px;
          line-height: 16px;
          font-weight: 700;
          text-align: center;
          color: rgb(255, 255, 255);
        }
        .star-wrapper {
          margin: 16px auto 28px auto;
          text-align: center;
        }
        .title {
          display: flex;
          margin: 0 auto;
          width: 80%;
          .line {
            flex: 1;
            position: relative;
            top: -8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .content {
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        .supports {
          width: 80%;
          margin: 24px auto 28px auto;
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              margin-right: 6px;
              background-repeat: no-repeat;
              background-size: 16px 16px;
              &.decrease {
                @include bg-image('decrease_2');
              }
              &.discount {
                @include bg-image('discount_2');
              }
              &.guarantee {
                @include bg-image('guarantee_2');
              }
              &.invoice {
                @include bg-image('invoice_2');
              }
              &.special {
                @include bg-image('special_2');
              }
            }
            .text {
              vertical-align: top;
              font-size: 12px;
              font-weight: 200;
              line-height: 16px;
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 24px auto 0 auto;
          p {
            font-size: 12px;
            font-weight: 200;
            line-height: 24px;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      margin: -64px auto 0 auto;
      width: 24px;
      height: 24px;
      clear: both;
      font-size: 32px;
    }
  }
}
</style>
