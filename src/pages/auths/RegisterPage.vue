<script setup lang="ts">

import {EditPen, Lock, Message, User} from "@element-plus/icons-vue";
import {computed, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {askCode, register} from "@/api/auth.ts";


const registerForm = reactive({
  username: "",
  password: "",
  passwordAgain: "",
  email: "",
  code: "",
});


// 为 Auth 定义接口
const emit = defineEmits(['registerSuccess'])

const validateUsername = (_: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error('用户名不能包含特殊字符~'))
  } else {
    callback()
  }

}
const validatePassword = (_: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致~'))
  } else {
    callback()
  }
}
const rules = {
  username: [
    {validator: validateUsername, trigger: ['blur', 'change']},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 25, message: '密码长度应在6-25个字符之间', trigger: ['blur', 'change']}
  ],
  passwordAgain: [
    {validator: validatePassword, trigger: ['blur', 'change']}
  ],
  email: [
    {required: true, message: '请输入邮件地址', trigger: ['blur', 'change']},
    {type: 'email', message: '邮件地址格式不合法~', trigger: ['blur', 'change']}
  ],
  code: [
    {required: true, message: '请输入刚刚获取的验证码', trigger: ['blur','change']}
  ]

}

const coldTime = ref(0);
const isEmailValid = computed(() =>
    /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        .test(registerForm.email))
const verifyCode = () => {
  coldTime.value = 30
  if (isEmailValid.value) {

    askCode(registerForm.email, 'register').then(() => {
      ElMessage.success(`验证码已发送至您的邮箱：${registerForm.email}，请注意查收~`)
    }).catch((data) => {
      console.log(data)
    })
  } else {
    ElMessage.warning('您输入的电子邮件格式不正确~')
  }
  setInterval(() => coldTime.value--, 1000)

}
const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
};

const onRegister = () => {
  registerFormRef.value.validate((valid: Boolean) => {
    if (valid) { // 格式校验合法
      register(registerForm).then(() => {

        emit('registerSuccess', registerForm.username)
        ElMessage.success('注册成功！')
      })
    }
  })
  // emit('registerSuccess', registerForm.username)


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
      <el-form-item size="default" prop="code">
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
            <el-button @click="verifyCode" type="success" :disabled="!isEmailValid||coldTime>0">
              {{ coldTime > 0 ? `还剩${coldTime}秒` : (isEmailValid ? '获取验证码' : '先输入邮箱') }}
            </el-button>

          </el-col>
        </el-row>
      </el-form-item>


    </el-form>

    <van-button round type="primary" size="large" @click="onRegister">注册</van-button>


  </div>


</template>

<style scoped>

</style>