<template>
  <van-popup v-model:show="isShow" position="bottom" style="width: 100%;height: 70%;">
    <van-tabs v-model:active="activeName">
      <van-tab title="登录" name="Login">

<!--        实现LoginPage定义的接口-->
        <LoginPage @loginSuccess="loginSuccess"/>

      </van-tab>
      <van-tab title="注册喵" name="Register">

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

          <van-button round type="primary" size="large" @click="">注册</van-button>


        </div>


        <!--        <van-field v-model="email" label="邮箱"/>-->
        <!--        &lt;!&ndash; 输入任意文本 &ndash;&gt;-->
        <!--        <van-field v-model="username" label="用户名"/>-->
        <!--        &lt;!&ndash; 输入手机号，调起手机号键盘 &ndash;&gt;-->
        <!--        &lt;!&ndash;        <van-field v-model="tel" type="tel" label="手机号" />&ndash;&gt;-->
        <!--        &lt;!&ndash; 允许输入正整数，调起纯数字键盘 &ndash;&gt;-->
        <!--        &lt;!&ndash;        <van-field v-model="digit" type="digit" label="整数" />&ndash;&gt;-->
        <!--        &lt;!&ndash; 允许输入数字，调起带符号的纯数字键盘 &ndash;&gt;-->
        <!--        &lt;!&ndash;        <van-field v-model="number" type="number" label="数字" />&ndash;&gt;-->
        <!--        &lt;!&ndash; 输入密码 &ndash;&gt;-->
        <!--        <van-field v-model="password" type="password" label="密码"/>-->
        <!--        <van-field v-model="passwordAgain" type="password" label="再输密码"/>-->


        <van-cell-group inset>


        </van-cell-group>

      </van-tab>
    </van-tabs>

  </van-popup>

</template>

<script setup>
import {EditPen, Lock, Message, User} from '@element-plus/icons-vue'
import {ref, reactive} from "vue";
// 这里引入后会继承上下文
import {ElMessage} from 'element-plus'
import {login} from "@/api/auth.ts";
import {storeAuthInfo} from "@/plugins/myAxios.ts";
import {authed} from "@/plugins/globalData.ts";
import LoginPage from "@/pages/auths/LoginPage.vue";




const registerForm = reactive({
  username: "",
  password: "",
  passwordAgain: "",
  email: "",
  code: "",
});







const isShow = ref(false)
const activeName = ref('Register')
const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
};

const registerFormRef = ref();
defineExpose({
  isShow,
  activeName,
})

// login

// 定义接口保留给 Home.vue
const emit = defineEmits(['loginSuccess'])
const loginSuccess = () => {
  // 调用 Home 定义的方法，给 Home.vue 传信息
  emit('loginSuccess')
  isShow.value = false;
  authed.value = true;
}


const rules = {
  username: [
    {required: true, message: '请输入用户名'}
  ],
  password: [
    {required: true, message: '请输入密码'}
  ]
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