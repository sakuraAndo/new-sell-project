<template>
  <button @click="clickContent">sdfds</button>
</template>

<script>
import { getSellers } from '../../api';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    clickContent() {
      console.log('dddd');
      getSellers().then((res) => {
        console.log('111', res);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
