<template>


  <template v-if="authed">
    <van-pull-refresh v-model="loadPosts.refreshing" @refresh="onRefresh" success-text="好好好！">
      <PostCreater />
      <van-list
          v-model:loading="loadPosts.loading"
          :finished="loadPosts.finished"
          finished-text="没有更多了"
          @load="onLoad"
      >

        <div v-for="item in list" :key="item.id as number">
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
              forDece @forDece
              <p style="margin: 0;font-size: 15px">2 分钟前</p>
              <div>
<!--                <br/>-->
<!--                {{ item.title + "\n" }}-->
<!--                <p style="margin: 0;">芝士雪豹</p>-->
              </div>
              <!--              :title="item.title"-->
              <p></p>
              {{ item.content  }}
<!--              + "我是帖子的内容，没想到吧！！"-->

              <van-row>
                <van-col span="8" style="text-align: left">点赞: 8</van-col>
                <van-col span="8" style="text-align: center">转发: 8</van-col>
                <van-col span="8" style="text-align: right">
                  <el-button type="primary">评论</el-button>
                </van-col>
              </van-row>
            </el-main>
          </el-container>

          <!--          </van-skeleton>-->
          <div>


            <!--            <van-cell title="单元格" icon="shop-o">-->
            <!--              &lt;!&ndash; 使用 right-icon 插槽来自定义右侧图标 &ndash;&gt;-->
            <!--              <template #right-icon>-->
            <!--                ssm 阿哲-->
            <!--                <van-icon name="search" class="search-icon" />-->
            <!--              </template>-->
            <!--            </van-cell>-->

            <!--            <van-skeleton title avatar :row="3" :loading="loading">-->
            <!--              <div>实际内容</div>-->
            <!--            </van-skeleton>-->


          </div>

        </div>
        <!--                  <van-skeleton title avatar :row="3" :loading="true">-->

        <van-divider
            :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
        >
          ######
        </van-divider>
        <!--                  </van-skeleton>-->


      </van-list>
    </van-pull-refresh>

  </template>
  <template v-else>
    <p></p>
    <van-row justify="center">
      <van-col span="10" offset="2" style="text-align: center">登录以了解更多……</van-col>
    </van-row>
    <p></p>
    <van-row justify="center">
      <!--      加起来是24-->

      <!--      设置居中样式不行，最终通过偏移量解决-->
      <van-col span="4" offset="2">
        <van-button round type="success" size="small" @click="onAuth(0)">登录</van-button>
      </van-col>
      <van-col span="4" offset="2">
        <van-button round type="primary" size="small" @click="onAuth(1)">注册</van-button>
      </van-col>

    </van-row>
    <!--    父组件操作子组件-->
    <Auth ref="authNode" @login-success="loginSuccess"/>

  </template>


  <!--    <p>刷新次数: {{ count }}</p>-->


  <van-back-top/>


</template>

<script setup lang="ts">
import {onMounted, reactive, Ref, ref} from "vue";
import Auth from "./Auth.vue";
import {ElMessage} from "element-plus";
import {takeAuthObj} from "@/plugins/myAxios.ts";
import {userInfo} from "@/api/auth.ts";
import {authed} from "@/plugins/globalData.ts";
import {getPosts} from "@/api/post.ts";
import PostRecords = Items.PostRecords;
import {Avatar} from "@element-plus/icons-vue";
import PostCreater from "@/pages/PostCreater.vue";

const loading = ref(true);

onMounted(() => {
  loading.value = false;
});
const list: Ref<PostRecords[]> = ref([]);
const loadPosts = reactive({
  loading: false,
  finished: false,
  refreshing: false,
});
const count = ref(0);
// const authed = ref(false);

onMounted(() => {
  // 实现自动认证并登录
  const authObj = takeAuthObj();
  console.log(authObj)
  if (authObj) {
    userInfo(authObj.username).then((data) => {
      authed.value = true;
      // authed.value=true;
      console.log(data);
    }).catch((err) => {
      console.log(err);
    })

  }
})
const loginSuccess = () => {
  authed.value = true;
}
authed.value = false;
const authNode = ref<InstanceType<typeof Auth>>();

// 根据点击判断登录or注册
const onAuth = (index: Number) => {
  console.log(authNode.value)
  authNode.value!.isShow = true; // ! 是非空断言，表明前面的一定不是空或者undefined
  if (index === 0) {
    console.log(index)
    authNode.value!.activeName = 'Login';
  } else {
    authNode.value!.activeName = 'Register';
    console.log(index)
  }
}


const onLoad = () => {
  // ElMessage.warning("test")

  list.value.length = 0;

  getPosts(0, 10).then((data) => {
    data.records.forEach(
        (post) => {
          list.value.push(post)
        }
    )
  })
  loadPosts.loading = false;
  loadPosts.finished = true;
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  // setTimeout(() => {
  //   for (let i = 0; i < 10; i++) {
  //     // list.value.push(list.value.length + 1);
  //   }
  //
  //   // 加载状态结束
  //   loadPosts.loading = false;
  //
  //   // 数据全部加载完成
  //   if (list.value.length >= 40) {
  //     loadPosts.finished = true;
  //   }
  // }, 1000);
};
const onRefresh = () => {
  setTimeout(() => {
    // showToast('刷新成功');
    // ElMessage.success("刷新成功！")
    loadPosts.refreshing = false;
    loadPosts.finished = false;
    count.value++;
    onLoad();
  }, 1000);
}
</script>


<style scoped>
.username {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.password {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}

.search-icon {
  font-size: 16px;
  line-height: inherit;
}

</style>