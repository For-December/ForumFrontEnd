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
<!--  {{ id }}-->
<!--  {{ post?.title }}-->
<!--  {{ post?.content }}-->

  <el-row>
    <el-col :span="4">
      <el-avatar size="default" style="width: 12vw;height: 12vw;margin: 0;border-radius: 50%"
                 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </el-col>
    <el-col :span="20">
      forDece @{{ post?.authorName }}<br/>
      2 分钟前
    </el-col>
  </el-row>

  <!--              <p style="margin: 0;font-size: 15px">2 分钟前</p>-->
  <p style="margin: 0;font-size: 15px">

  </p>
  <div>
    <!--                <br/>-->
    <!--                {{ item.title + "\n" }}-->
    <!--                <p style="margin: 0;">芝士雪豹</p>-->
  </div>
  <!--              :title="item.title"-->
  <p></p>
  <div style="margin: 5vw">
    {{post?.title}} <br/>
    {{ post?.content }}

  </div>
  <!--              + "我是帖子的内容，没想到吧！！"-->
<p></p>
  <van-row style="margin: 5vw">
    <van-col span="8" style="text-align: left">点赞: 8</van-col>
    <van-col span="8" style="text-align: center">转发: 8</van-col>
    <van-col span="8" style="text-align: right">
      <el-button type="primary">评论</el-button>
    </van-col>
  </van-row>
</template>

<style scoped>

</style>