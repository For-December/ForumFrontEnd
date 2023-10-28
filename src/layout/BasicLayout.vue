<template>
  <van-nav-bar
      title="标题"
      left-text="菜单"
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
    <template v-if="active === 0">
      <Home/>
    </template>
    <template v-if="active === 1">
      <Self/>
    </template>
    <template v-if="active === 2">
      <Settings/>

    </template>

  </div>

  <van-popup v-model:show="show" position="left" :style="{ width: '50%', height: '100%' }">
    <!--    <van-button type="primary">主要按钮</van-button>-->
    <van-sidebar v-model="active" @change="onChange" :style="{width: 'auto',marginTop:'20vh'}">
      <van-sidebar-item class="test" to="/" title="广场" dot/>
      <van-sidebar-item class="test" to="self" title="个人"/>
      <van-sidebar-item class="test" to="settings" title="设置"/>

    </van-sidebar>
  </van-popup>
</template>

<script setup>
import {showToast} from 'vant';

const onClickLeft = () => {
  show.value = true;
};
const onClickRight = () => showToast('按钮');

import {ref} from 'vue';
import Home from '../pages/Home.vue'
import Self from '../pages/Self.vue'
import Settings from '../pages/Settings.vue'


const active = ref(0);
const onChange = (index) => showToast(`标签 ${index}`);

const show = ref(false);


</script>

<style scoped>
.test {
  font-size: 25px;
  width: 100%;
}


</style>