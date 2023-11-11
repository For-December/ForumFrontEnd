<template>
  <van-nav-bar
      title="标题"
      :left-text="leftText"
      :left-arrow="isChild"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :fixed="true"
      :placeholder="true"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>


  <!-- 导航按钮 -->
  <!--  <van-button type="primary" @click="toggleSidebar">Toggle Sidebar</van-button>-->

  <div id="content">
    <router-view>
    </router-view>
    <!--    <template v-if="active === 0">-->
    <!--      <Home/>-->
    <!--    </template>-->
    <!--    <template v-if="active === 1">-->
    <!--      <TreeHole/>-->
    <!--    </template>-->
    <!--    <template v-if="active === 2">-->
    <!--      <Self/>-->
    <!--    </template>-->
    <!--    <template v-if="active === 3">-->
    <!--      <Settings/>-->
    <!--    </template>-->


  </div>

  <van-popup v-model:show="show" position="left" :style="{ width: '50%', height: '100%' }">
    <!--    <van-button type="primary">主要按钮</van-button>-->
    <van-sidebar v-model="active" @change="onChange" :style="{width: 'auto',marginTop:'20vh'}">
      <van-sidebar-item class="test" to="/home" title="广场" dot/>
      <van-sidebar-item class="test" to="/tree-hole" title="树洞" dot/>
      <van-sidebar-item class="test" to="profile" title="个人"/>
      <van-sidebar-item class="test" to="settings" title="设置"/>

    </van-sidebar>

    <el-button @click="userLogout">退出登录</el-button>
  </van-popup>
</template>

<script setup>
import {showToast} from 'vant';
import {ElMessage} from "element-plus";
import {computed, ref} from 'vue';
import Home from '../pages/Home.vue'
import Profile from '../pages/Profile.vue'
import Settings from '../pages/Settings.vue'
import {logout} from "@/api/auth.ts";
import {authed} from "@/plugins/globalData.ts";
import {deleteAccessToken} from "@/plugins/myAxios.ts";
import TreeHole from "@/pages/TreeHole.vue";
import {useRoute, useRouter} from "vue-router";


const active = ref(0);
const route = useRoute();
const router = useRouter();
const onChange = (index) => showToast(`标签 ${index}`);
const leftText = computed(() => isChild.value ? '返回' : '菜单')
const isChild = computed(() => {
  return active.value === 0 && route.path !== '/home';
});


const show = ref(false);
const onClickLeft = () => {
  if (!isChild.value) {
    show.value = true;
  } else {
    router.push({
      name: 'home',
    });
  }
};
const onClickRight = () => showToast('按钮');
const userLogout = () => {
  logout().then((data) => {
    ElMessage.success("成功退出登录！");
    authed.value = false;
    show.value = false;
    deleteAccessToken();
  })
}


</script>

<style scoped>
.test {
  font-size: 25px;
  width: 100%;
}


</style>