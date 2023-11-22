<template>
  个人主页捏

  我赞过的贴子（）：
  <van-list v-for="item in postList">
    <a :href="`${baseUrl}/post-detail?id=${item}`">贴子{{item}}</a>
  </van-list>
</template>

<script setup lang="ts">

import {getStaredPost} from "@/api/user.ts";
import {baseUrl, curUserId} from "@/plugins/globalData.ts";
import {onMounted, ref} from "vue";

const postList = ref<number[]>();

onMounted(() => {
  getStaredPost(curUserId.value).then((list) => {
    postList.value = list;
    console.log(postList.value)
  })

});


</script>


<style scoped>


</style>