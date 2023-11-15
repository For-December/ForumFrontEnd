<script setup lang="ts">
import {ref} from 'vue';
import {ElMessage} from "element-plus";
import {curUser, curUserId} from "@/plugins/globalData.ts";
import {createComment} from "@/api/comment.ts";

const message = ref("");

const emit = defineEmits(['loadAgain']) // 定义接口，PostDetail.vue实现

const props = defineProps({
  postId: {
    type: String, // 这里填Number会有警告，不知道为什么...
    required: true,
    default: -1,  // 为负值后端返回错误码并拒绝处理
    validator: value => {
      return value as number >= 0;
    }
  }
});
const newComment = () => {
  createComment({
    authorId: curUserId.value,
    authorName: curUser.value,
    content: message.value,
    postId:props.postId
  }).then(
      () => {
        // 调用 Home.vue的方法
        emit('loadAgain')
        ElMessage.success("评论成功！");
      }
  )
}
</script>

<template>
  <el-container>
    <el-aside width="15vw">
      <el-avatar size="large">User</el-avatar>
      <!--          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"-->
      <!--      />-->
    </el-aside>
    <el-main style="padding-top: 0;">

      <van-field
          v-model="message"
          rows="1"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入您的评论~"
          show-word-limit
      />
      <el-button type="success" style="float: right" @click="newComment">评论</el-button>
    </el-main>
  </el-container>

</template>

<style scoped>

</style>