<template>
  <van-popup v-model:show="authParam" position="bottom" style="width: 100%;height: 70%;">
    <van-tabs v-model:active="activeName">
      <van-tab title="登录" name="Login">
        <p></p>
        <van-row justify="center">
          <van-col span="6"></van-col>
          <van-col span="6">
            <van-image
                style="margin: 0 auto"
                round
                width="6rem"
                height="6rem"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
          </van-col>
          <van-col span="6"></van-col>
        </van-row>


        <p></p>
        <!-- 输入任意文本 -->
        <van-field v-model="username" label="用户名"/>
        <!-- 输入手机号，调起手机号键盘 -->
        <!--        <van-field v-model="tel" type="tel" label="手机号" />-->
        <!-- 允许输入正整数，调起纯数字键盘 -->
        <!--        <van-field v-model="digit" type="digit" label="整数" />-->
        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
        <!--        <van-field v-model="number" type="number" label="数字" />-->
        <!-- 输入密码 -->
        <van-field v-model="password" type="password" label="密码"/>
        <van-button round type="success" size="large" @click="">登录</van-button>

      </van-tab>
      <van-tab title="注册喵" name="Register">
        <p></p>
        <van-row justify="center">
          <van-col span="6"></van-col>
          <van-col span="6">
            <van-uploader :after-read="afterRead" />
          </van-col>
          <van-col span="6"></van-col>
        </van-row>
        <van-row justify="center">
          <van-col span="6"></van-col>
          <van-col span="6">
            点击设头像
          </van-col>
          <van-col span="6"></van-col>
        </van-row>


        <van-field v-model="email" label="邮箱"/>
        <!-- 输入任意文本 -->
        <van-field v-model="username" label="用户名"/>
        <!-- 输入手机号，调起手机号键盘 -->
        <!--        <van-field v-model="tel" type="tel" label="手机号" />-->
        <!-- 允许输入正整数，调起纯数字键盘 -->
        <!--        <van-field v-model="digit" type="digit" label="整数" />-->
        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
        <!--        <van-field v-model="number" type="number" label="数字" />-->
        <!-- 输入密码 -->
        <van-field v-model="password" type="password" label="密码"/>
        <van-field v-model="passwordRetry" type="password" label="再输密码"/>
        <van-button round type="primary" size="large" @click="">注册</van-button>


        <van-cell-group inset>


        </van-cell-group>

      </van-tab>
    </van-tabs>

  </van-popup>

</template>

<script>

import {ref} from "vue";

export default {

  setup() {
    const authParam = ref(false)
    const activeName = ref('Register')
    const username = ref('')
    const password = ref('')
    const passwordRetry = ref('')
    const email = ref('')
    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    };
    return {
      afterRead,
      email,
      username,
      password,
      passwordRetry,
      authParam,
      activeName,

    };
  },
  name: "auth.vue"
}

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