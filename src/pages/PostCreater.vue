<script setup lang="ts">
import {ref} from 'vue';

const message = ref("");
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
            placeholder="请输入帖子内容"
            show-word-limit
        />
      <el-button type="success" style="float: right">发帖</el-button>
    </el-main>
  </el-container>

</template>

<style scoped>

</style>