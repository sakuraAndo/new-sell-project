<template>
  <div class="header">
      <div class="content-wrapper">
          <div class="avatar">
              <img :src="seller.avatar" alt=""/>
          </div>
          <div class="content">
              <div class="title">
                  <span class="brand"></span>
                  <span class="name">{{ seller.name }}</span>
              </div>
              <div class="description">{{ seller.description }}/{{ seller.deliveryTime }}送达</div>
              <div class="support"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object,
      default: () => {},
    },
  },

  created() {
    console.log(this.seller);
  },
};
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';
.header {
    color: #fff;
    background-color: antiquewhite;
    .content-wrapper {
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
                    color: rgb(255,255,255);
                    font-weight: bold;
                    line-height: 18px;
                }
            }
            .description {
                font-size: 12px;
                color: rgb(255,255,255);
                font-weight: 200;
                line-height: 12px;
            }
        }
    }
}
</style>
