<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {getPostById, getStar, getStarsList, postStar} from "@/api/post.ts";
import PostRecords = Items.PostRecords;
import {onMounted, reactive, Ref, ref} from "vue";
import CommentRecords = Items.CommentRecords;
import {ElMessage} from "element-plus";
import {deleteCommentById, getComments} from "@/api/comment.ts";
import CommentCreator from "@/pages/CommentCreator.vue";
import {getTimeGap} from "../plugins/globalFunc.ts";
import {Delete, InfoFilled} from "@element-plus/icons-vue";
import {curUser, curUserId} from "@/plugins/globalData.ts";
import {showToast} from "vant";
import {Icon} from "@vicons/utils";
import HeartOutline from "@vicons/ionicons5/HeartOutline"
import Heart from "@vicons/ionicons5/Heart"
import PostMeta = Items.PostMeta;

const route = useRoute()
const router = useRouter()
const id: number = route.query.id as unknown as number;
const post = ref<PostRecords>() as Ref<PostRecords>;
const isStar = ref(false);
const starNum = ref<number>();

const loading = ref<boolean>(true);
const starTimer = ref();
const onStar = () => {
  isStar.value = !isStar.value;
  if (isStar.value) {
    starNum.value!++;
  } else {
    starNum.value!--;
  }
  // 重置计时器
  clearTimeout(starTimer.value)
  // 在3秒后执行异步API调用
  starTimer.value = setTimeout(() => {
    postStar(id, curUserId.value, curUser.value, isStar.value).then((status) => {
      console.log(status)
    })
  }, 1000);
}
console.log(route)
console.log(router)

const postMetas = ref<PostMeta[]>([])
onMounted(() => {
  console.log(id)
  getPostById(id).then(data => {
    console.log(data)
    post.value = data;

    // 添加原信息
    postMetas.value = JSON.parse(post.value.contentJson) as PostMeta[]
    postMetas.value.filter(t => t.type === 'image').forEach(
        t => images.value.push(t.url)
    );
    console.log(images.value)

    // 异步加载完贴子即可展示，点赞信息允许稍后加载
    loading.value = false
  });

  getStar(id, curUserId.value, curUser.value).then((status) => {
    console.log("set star: ", status);
    isStar.value = status;
  })

  getStarsList([id]).then((starsList) => {
    starNum.value = starsList.length > 0 ? starsList[0] : 0;
    console.log(starsList)
    console.log(starNum.value)
  })
})

const comments: Ref<CommentRecords[]> = ref([]);
const loadComments = reactive({
  loading: false,
  finished: false,
  refreshing: false,
});
const replyMessage = ref('');


const show = ref(false);
const index = ref(0);

const curPosition = ref(0);
const images = ref<string[]>([]);
const onClickImage = (url: string) => {
  curPosition.value = images.value.indexOf(url);
  show.value = true
  // showImagePreview({
  //   images: images.value,
  //   closeable: true,
  //   startPosition: images.value.indexOf(url)
  // });
}
// const onChange = (newIndex) => {
//   index.value = newIndex;
// };

// 评论区装载
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

const onDelete = (id: number, postId: number, authorName: string) => {
  deleteCommentById(id, postId, authorName).then(() => {
    onLoad();
    ElMessage.success("评论删除成功！")
  })
}


const showPopover = ref(false);

// 通过 actions 属性来定义菜单选项
const actions = [
  {text: '选项一'},
  {text: '选项二'},
  {text: '选项三'},
];
const onSelect = (action) => showToast(action.text);
</script>

<template>


  <!--  <van-loading vertical>-->
  <!--    <template #icon>-->
  <!--      <van-icon name="star-o" size="30" />-->
  <!--    </template>-->
  <!--    加载中...-->
  <!--  </van-loading>-->
  <van-skeleton title :row="5" :loading="loading">
    <div>
      <el-row>
        <el-col :span="4">
          <el-avatar size="default" style="width: 12vw;height: 12vw;margin: 0;border-radius: 50%"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </el-col>
        <el-col :span="20">
          {{ post?.authorName }} @{{ post?.authorName }}<br/>
          {{ getTimeGap(new Date(), new Date(post?.latestRepliedTime!)) }}
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
        <van-image-preview closeable v-model:show="show"
                           :images="images"
                           :start-position="curPosition">
          <!--                           @change="onChange"-->

          <!--          <template v-slot:index>第{{ index + 1 }}页</template>-->
        </van-image-preview>
        <div v-for="meta in postMetas">
          <div v-if="meta.type==='image'" @click="onClickImage(meta.url)">
            <van-image
                :src="meta.url"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20"/>
              </template>
              <template v-slot:error>图片加载失败</template>
            </van-image>
            <br/>
            <br/>
          </div>
          <div v-if="meta.type==='text'">
            {{ meta.text }}
            <br/>
            <br/>
          </div>
        </div>

      </div>
      <p></p>
      <van-row style="margin: 5vw;">
        <van-col span="2" style="text-align: left">
          <Icon @click="onStar" size="5vw">
            <HeartOutline v-if="!isStar"/>
            <Heart v-else style="color: red"/>
          </Icon>
        </van-col>
        <van-col span="6" style="text-align: left">
          {{ starNum }}
        </van-col>
        <van-col span="8" style="text-align: center">转发: 8</van-col>
        <van-col span="8" style="text-align: right">
          评论：8
        </van-col>
      </van-row>
      <van-divider
          :style="{ color: '#7ade7b', borderColor: '#5d9671', padding: '0 16px' }"
      >
        评论
      </van-divider>
    </div>
  </van-skeleton>


  <!--  {{ id }}-->
  <!--  {{ post?.title }}-->
  <!--  {{ post?.content }}-->


  <CommentCreator @loadAgain="onLoad" :post-id="id"/>


  <van-pull-refresh v-model="loadComments.refreshing" @refresh="onRefresh" success-text="好好好！">
    <van-divider
        :style="{ color: '#7ade7b', borderColor: '#5d9671', padding: '0 16px' }"
    >
      下拉刷新
    </van-divider>

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
              <el-col :span="12">{{ item.authorName }} @{{ item.authorName }}</el-col>
              <el-col :span="12">
                <div style="float: right">
                  <!--                  <van-popover v-model:show="showPopover" :actions="actions" @select="onSelect">-->
                  <!--                    <template #reference>-->
                  <!--                      <van-button type="primary">浅色风格</van-button>-->
                  <!--                    </template>-->
                  <!--                  </van-popover>-->


                  <el-popconfirm
                      v-if="curUserId===item.authorId"
                      confirm-button-text="Yes"
                      cancel-button-text="No"
                      :icon="InfoFilled"
                      icon-color="#626AEF"
                      title="确定要删除此评论?"
                      @confirm="onDelete(item.id,item.postId,item.authorName)"
                      @cancel=""
                  >
                    <template #reference>
                      <el-button v-if="curUserId===item.authorId" :type="'warning'" :icon="Delete" size="small"
                                 circle
                      />
                    </template>
                  </el-popconfirm>


                </div>
              </el-col>
            </el-row>

            <!--              <p style="margin: 0;font-size: 15px">2 分钟前</p>-->
            <p style="margin: 0;font-size: 15px">
              <!--              00000-->{{ getTimeGap(new Date(), new Date(item.modifyTime)) }}
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
            <!--            <p></p>-->
            <!--            <el-button>回复</el-button>-->

            <!--            <div v-if="true">-->
            <!--              <el-row>-->
            <!--                <el-col :span="18">-->
            <!--                  <el-input v-model="replyMessage" size="small" placeholder="在此输入回复" :maxlength="50"-->
            <!--                            show-word-limit-->
            <!--                            clearable/>-->
            <!--                </el-col>-->
            <!--                <el-col :span="6">-->
            <!--                  <el-button type="primary" size="small" @click="">-->
            <!--                    回复-->
            <!--                  </el-button>-->
            <!--                </el-col>-->
            <!--              </el-row>-->


            <!--            </div>-->
          </el-main>
        </el-container>

        <!--          </van-skeleton>-->

      </div>
      <!--                  <van-skeleton title avatar :row="3" :loading="true">-->
      <van-divider
          :style="{ color: '#7ade7b', borderColor: '#5d9671', padding: '0 16px' }"
      >
        ######
      </van-divider>
    </van-list>
  </van-pull-refresh>

  <!--  回到顶端-->
  <van-back-top/>

</template>

<style scoped>

</style>