<template>


  <template v-if="authed">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="好好好！">
      <van-cell>

        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </van-cell>
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item as number" :title="item as number">
          好好好！
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </template>
  <template v-else>
    <p></p>
    <van-row justify="center">
      <van-col span="24" style="text-align: center">登录以了解更多……</van-col>
    </van-row>
    <p></p>
    <van-row justify="center">
      <!--      加起来是24-->
      <van-col span="4"></van-col>
      <van-col span="4"></van-col>
      <van-col span="4">
        <van-button round type="success" size="small" @click="onAuth(0)">登录</van-button>
      </van-col>
      <van-col span="4">
        <van-button round type="primary" size="small" @click="onAuth(1)">注册</van-button>
      </van-col>
      <van-col span="4"></van-col>
      <van-col span="4"></van-col>
    </van-row>
    <!--    父组件操作子组件-->
    <Auth ref="authParamRef"/>

  </template>


  <!--    <p>刷新次数: {{ count }}</p>-->


  <van-back-top/>


</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import {showToast} from "vant";
import Auth from "./Auth.vue";


export default defineComponent({
  setup() {
    const list: Ref<Number[]> = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);
    const showAuth = ref(false);
    const isLogin = ref(false);
    const username = ref();
    const password = ref();
    const count = ref(0);
    const authed = ref(false);

    authed.value = false;
    const authParamRef = ref<InstanceType<typeof Auth>>();

    // 根据点击判断登录or注册
    const onAuth = (index: Number) => {
      console.log(authParamRef.value)
      authParamRef.value.authParam = true;
      if (index === 0) {
        console.log(index)
        authParamRef.value.activeName = 'Login';
      }else{
        authParamRef.value.activeName = 'Register';
        console.log(index)
      }
    }
    const onRefresh = () => {
      setTimeout(() => {
        showToast('刷新成功');
        refreshing.value = false;
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
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };

    return {
      authed,
      authParamRef,
      username,
      password,
      isLogin,
      onAuth,
      showAuth,
      list,
      onRefresh,
      refreshing,
      onLoad,
      loading,
      finished,
    };
  },
  components: {
    Auth
  },
  name: "home.vue"
})

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