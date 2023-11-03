<template>
  <van-popup v-model:show="isShow" position="bottom" style="width: 100%;height: 70%;">
    <van-tabs v-model:active="activeName">
      <van-tab title="登录" name="Login">

        <!--        实现LoginPage定义的接口-->
        <LoginPage @loginSuccess="loginSuccess"/>

      </van-tab>
      <van-tab title="注册喵" name="Register">

        <RegisterPage @registerSuccess="registerSuccess"/>


        <van-cell-group inset>


        </van-cell-group>

      </van-tab>
    </van-tabs>

  </van-popup>

</template>

<script setup>
import {EditPen, Lock, Message, User} from '@element-plus/icons-vue'
import {ref} from "vue";
import {authed} from "@/plugins/globalData.ts";
import LoginPage from "@/pages/auths/LoginPage.vue";
import RegisterPage from "@/pages/auths/RegisterPage.vue";


const isShow = ref(false)
const activeName = ref('Register')
// login

// 定义接口保留给 Home.vue
const emit = defineEmits(['loginSuccess'])
const loginSuccess = () => {
  // 调用 Home 定义的方法，给 Home.vue 传信息
  emit('loginSuccess')
  isShow.value = false;
  authed.value = true;
}

const registerSuccess = () => {
  activeName.value = 'Login'
}

// Home直接使用
defineExpose({
  isShow,
  activeName,
})




</script>


<style scoped>

.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}

</style>