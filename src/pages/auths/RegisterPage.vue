<script setup lang="ts">

import {EditPen, Lock, Message, User} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";


const registerForm = reactive({
  username: "",
  password: "",
  passwordAgain: "",
  email: "",
  code: "",
});


// 为 Auth 定义接口
const emit = defineEmits(['registerSuccess'])

const rules = {
  username: [
    {required: true, message: '请输入用户名'}
  ],
  password: [
    {required: true, message: '请输入密码'}
  ]
}
const afterRead = (file:any) => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
};

const onRegister = ()=>{

  emit('registerSuccess',registerForm.username)
  ElMessage.success('注册成功！')
}
defineExpose({
  registerForm
})

const registerFormRef = ref();


</script>

<template>
  <div style="margin-left: 8%;margin-right: 8%">

    <p></p>
    <van-row justify="center">
      <van-col span="6"></van-col>
      <van-col span="6" offset="3">
        <van-uploader :after-read="afterRead"/>
      </van-col>
      <van-col span="6"></van-col>
    </van-row>
    <van-row justify="center">
      <van-col span="6"></van-col>
      <van-col span="6" offset="3">
        点击设头像
      </van-col>
      <van-col span="6"></van-col>
    </van-row>

    <p></p>

    <el-form :model="registerForm" :rules="rules" ref="registerFormRef">

      <el-form-item size="default" prop="username">
        <el-input v-model="registerForm.username" maxlength="25" type="text" placeholder="用户名">
          <template #prefix>
            <el-icon>
              <User/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item size="default" prop="password">
        <el-input v-model="registerForm.password" maxlength="25" type="password" placeholder="密码">
          <template #prefix>
            <el-icon>
              <Lock/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item size="default" prop="passwordAgain">
        <el-input v-model="registerForm.passwordAgain" maxlength="25" type="password" placeholder="再输一次密码">
          <template #prefix>
            <el-icon>
              <Lock/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item size="default" prop="email">
        <el-input v-model="registerForm.email" maxlength="25" type="text" placeholder="邮箱">
          <template #prefix>
            <el-icon>
              <Message/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="15">
            <el-input v-model="registerForm.code" maxlength="6" type="text" placeholder="请输入验证码">
              <template #prefix>
                <el-icon>
                  <EditPen/>
                </el-icon>
              </template>
            </el-input>

          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="5">
            <el-button type="success">获取验证码</el-button>

          </el-col>
        </el-row>
      </el-form-item>


    </el-form>

    <van-button round type="primary" size="large" @click="onRegister">注册</van-button>


  </div>


</template>

<style scoped>

</style>