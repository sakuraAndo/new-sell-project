<template>
  <div id="app">
    <header>我是头部</header>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评价</div>
      <div class="tab-item">商家</div>
    </div>
    <div class="content">我是内容部分</div>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/> -->
  </div>
</template>

<style lang="scss">
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .tab-item {
    flex: 1;
    text-align: center;
  }
}
</style>
