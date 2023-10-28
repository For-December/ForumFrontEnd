<template>
  <van-popup v-model:show="showBottom" position="bottom" style="width: 100%;height: 70%;">

  </van-popup>
</template>

<script>
import {ref} from "vue";

export default {
  setup() {
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    return {
      show,
      showPopup,
    };
  },
  name: "auth.vue"
}

</script>


<style scoped>


</style>