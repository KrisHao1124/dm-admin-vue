<template>
  <div>
    <transition name="fade" mode="out-in">
      <steps>
      </steps>
    </transition>
    <divide-main>
    </divide-main>
  </div>

</template>

<script>
  import DivideMain from './divideMain';
  import Steps from './steps';

  export default {
    components: {DivideMain, Steps},
    name: "DivideLayout",
  }
</script>

<style scoped>

</style>
