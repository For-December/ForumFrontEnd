<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {getPostById} from "@/api/post.ts";
import PostRecords = Items.PostRecords;
import {onMounted, ref} from "vue";

const route = useRoute()
const router = useRouter()
const id = route.query.id as unknown as number;
const post = ref<PostRecords>();

console.log(route)
console.log(router)
onMounted(() => {
  console.log(id)
  getPostById(id).then(data => {
    post.value = data;
  });
})


</script>

<template>
  {{ id }}
  {{ post?.title }}
  {{ post?.content }}
</template>

<style scoped>

</style>