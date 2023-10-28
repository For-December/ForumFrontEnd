<template>


  <template v-if="false">
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
        <van-cell v-for="item in list" :key="item" :title="item">
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
        <van-button round type="success" size="small">登录</van-button>
      </van-col>
      <van-col span="4">
        <van-button round type="primary" size="small">注册</van-button>
      </van-col>
      <van-col span="4"></van-col>
      <van-col span="4"></van-col>
    </van-row>
  </template>


  <!--    <p>刷新次数: {{ count }}</p>-->


  <van-back-top/>


</template>

<script>
import {ref} from "vue";
import {showToast} from "vant";

export default {
  setup() {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);


    const count = ref(0);
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
      list,
      onRefresh,
      refreshing,
      onLoad,
      loading,
      finished,
    };
  },
  name: "home.vue"
}

</script>


<style scoped>


</style>