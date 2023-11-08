<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import {login} from "@/api/auth.ts";

// 这里引入后会继承上下文，从当前VUE页面对象中弹出
import {ElMessage} from "element-plus";
import {storeAuthInfo} from "@/plugins/myAxios.ts";
import {Lock, User} from "@element-plus/icons-vue";
import {curUser} from "@/plugins/globalData.ts";

const rules = {
  username: [
    {required: true, message: '请输入用户名'}
  ],
  password: [
    {required: true, message: '请输入密码'}
  ]
}

// 为Auth定义接口
const emit = defineEmits(['loginSuccess'])
const loginForm = reactive({
  username: "",
  password: "",
  remember: false
});

watch(curUser, (newValue, _) => {
  loginForm.username = newValue;

})
const userLogin = () => {
  loginFormRef.value.validate((valid: Boolean) => {
    if (valid) { // 格式校验合法
      login(loginForm).then((data) => {
        console.log(data);

        // 调用Auth中的函数来传递信息
        emit('loginSuccess');
        // isShow.value = false; 该语句通过上句在Auth执行
        ElMessage.success("登陆成功！")
        curUser.value = loginForm.username;
        storeAuthInfo(data)
      }).catch((err) => {
        console.log(err)
        console.log("出错了")
      });


      // ElMessage.success("哈哈哈哈哈！！！！！！")
    }
  })
}
const loginFormRef = ref();


</script>

<template>
  <div style="margin-left: 5%;margin-right: 5%">
    <p></p>
    <van-row justify="center">
      <van-col span="6"></van-col>
      <van-col span="6" offset="2">
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
    <!--          <van-field v-model="username" label="用户名"/>-->
    <div>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item size="large" prop="username">
          <el-input v-model="loginForm.username" maxlength="25" type="text" placeholder="用户名/邮箱">
            <template #prefix>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item size="large" prop="password">
          <el-input v-model="loginForm.password" maxlength="25" type="password" placeholder="密码">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 输入手机号，调起手机号键盘 -->
    <!--        <van-field v-model="tel" type="tel" label="手机号" />-->
    <!-- 允许输入正整数，调起纯数字键盘 -->
    <!--        <van-field v-model="digit" type="digit" label="整数" />-->
    <!-- 允许输入数字，调起带符号的纯数字键盘 -->
    <!--        <van-field v-model="number" type="number" label="数字" />-->
    <!-- 输入密码 -->
    <!--          <van-field v-model="password" type="password" label="密码"/>-->
    <el-row>
      <el-col :span="12" style="text-align: left">
        <el-form-item prop="remember">
          <el-checkbox v-model="loginForm.remember" label="记住我"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-link type="success">忘记密码？</el-link>
      </el-col>
    </el-row>
    <div>
      <van-button round type="success" size="large" @click="userLogin">登录</van-button>
    </div>
  </div>

</template>

<style scoped>

</style>