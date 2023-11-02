<template>


  <template v-if="authed">
    <van-pull-refresh v-model="loadPosts.refreshing" @refresh="onRefresh" success-text="好好好！">
      <van-cell>

        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </van-cell>
      <van-list
          v-model:loading="loadPosts.loading"
          :finished="loadPosts.finished"
          finished-text="没有更多了"
          @load="onLoad"
      >

        <van-cell v-for="item in list" :key="item as number" :title="item as number">
          <p>好好好！</p>
          <p>好好好！</p>
          <p>好好好！</p>
          <p>好好好！</p>
          <p>好好好！</p>
          <p>好好好！</p>
        </van-cell>
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
import {authTokenKey} from "@/plugins/myAxios.ts";
import {userInfo} from "@/api/auth.ts";

const list: Ref<Number[]> = ref([]);
const loadPosts = reactive({
  loading: false,
  finished: false,
  refreshing: false,
});
const count = ref(0);
const authed = ref(false);

onMounted(() => {
  // 实现自动认证并登录
  const token = localStorage.getItem(authTokenKey) || ''
  if (token) {
    userInfo().then((data) => {
      authed.value=true;
      console.log(data.username);
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
  authNode.value.isShow = true;
  if (index === 0) {
    console.log(index)
    authNode.value.activeName = 'Login';
  } else {
    authNode.value.activeName = 'Register';
    console.log(index)
  }
}
const onRefresh = () => {
  setTimeout(() => {
    // showToast('刷新成功');
    ElMessage.success("刷新成功！")
    loadPosts.refreshing = false;
    count.value++;
  }, 1000);
}
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loadPosts.refreshing = false;

    // 数据全部加载完成
    if (list.value.length >= 40) {
      loadPosts.finished = true;
    }
  }, 1000);
};

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

</style>