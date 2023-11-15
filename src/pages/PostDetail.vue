<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {getPostById} from "@/api/post.ts";
import PostRecords = Items.PostRecords;
import {onMounted, reactive, Ref, ref} from "vue";
import CommentRecords = Items.CommentRecords;
import {ElMessage} from "element-plus";
import {getComments} from "@/api/comment.ts";
import CommentCreator from "@/pages/CommentCreator.vue";

const route = useRoute()
const router = useRouter()
const id: number = route.query.id as unknown as number;
const post = ref<PostRecords>();

console.log(route)
console.log(router)
onMounted(() => {
  console.log(id)
  getPostById(id).then(data => {
    post.value = data;
  });
})

const comments: Ref<CommentRecords[]> = ref([]);
const loadComments = reactive({
  loading: false,
  finished: false,
  refreshing: false,
});

const onLoad = () => {
  ElMessage.warning("test")

  comments.value.length = 0;

  getComments(id, 0, 10).then((data) => {
    data.records.forEach(
        (comment) => {
          comments.value.push(comment)
        }
    )
  })
  loadComments.loading = false;
  loadComments.finished = true;
};
const count = ref(0);
const onRefresh = () => {
  setTimeout(() => {
    // showToast('刷新成功');
    // ElMessage.success("刷新成功！")
    loadComments.refreshing = false;
    loadComments.finished = false;
    count.value++;
    onLoad();
  }, 1000);
}

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
    {{ post?.title }} <br/>
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

  <CommentCreator @loadAgain="onLoad" :post-id="id"/>
  <van-pull-refresh v-model="loadComments.refreshing" @refresh="onRefresh" success-text="好好好！">
    <van-list
        v-model:loading="loadComments.loading"
        :finished="loadComments.finished"
        finished-text="没有更多了"
        @load="onLoad"
    >

      <div v-for="item in comments" :key="item.id as number">
        <van-divider
            :style="{ color: '#678cb2', borderColor: '#78b2b2',marginTop: '7px'}"
        />

        <!--          <van-skeleton title avatar :row="3" :loading="true">-->
        <el-container>
          <el-aside width="12vw">
            <!--              <Avatar style="width: 10vw;height: 10vw; margin: 0;border-radius: 50%"></Avatar>-->
            <el-avatar size="default" style="width: 12vw;height: 12vw;margin: 0;border-radius: 50%"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </el-aside>
          <el-main style="padding-top: 0;">
            <el-row>
              <el-col :span="12">forDece @{{ item.authorName }}</el-col>
              <el-col :span="12">
                <div style="float: right">删除 回复</div>
              </el-col>
            </el-row>

            <!--              <p style="margin: 0;font-size: 15px">2 分钟前</p>-->
            <p style="margin: 0;font-size: 15px">
              00000
            </p>
            <div>
              <!--                <br/>-->
              <!--                {{ item.title + "\n" }}-->
              <!--                <p style="margin: 0;">芝士雪豹</p>-->
            </div>
            <!--              :title="item.title"-->
            <p></p>
            {{ item.content }}
            <!--              + "我是帖子的内容，没想到吧！！"-->
          </el-main>
        </el-container>

        <!--          </van-skeleton>-->
        <div>


        </div>

      </div>
      <!--                  <van-skeleton title avatar :row="3" :loading="true">-->
      <van-divider
          :style="{ color: '#7ade7b', borderColor: '#5d9671', padding: '0 16px' }"
      >
        ######
      </van-divider>
    </van-list>


  </van-pull-refresh>
</template>

<style scoped>

</style>