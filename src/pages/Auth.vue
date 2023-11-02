<template>
  <van-popup v-model:show="isShow" position="bottom" style="width: 100%;height: 70%;">
    <van-tabs v-model:active="activeName">
      <van-tab title="登录" name="Login">

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
            <el-form :model="form" :rules="rules" ref="formRef">

              <el-form-item size="large" prop="username">
                <el-input v-model="form.username" maxlength="25" type="text" placeholder="用户名/邮箱">
                  <template #prefix>
                    <el-icon>
                      <User/>
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item size="large" prop="password">
                <el-input v-model="form.password" maxlength="25" type="password" placeholder="密码">
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
                <el-checkbox v-model="form.remember" label="记住我"/>
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
      </van-tab>
      <van-tab title="注册喵" name="Register">
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


        <div>
          <el-form :model="form" :rules="rules" ref="formRef">

            <el-form-item size="large" prop="username">
              <el-input v-model="form.username" maxlength="25" type="text" placeholder="用户名/邮箱">
                <template #prefix>
                  <el-icon>
                    <User/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item size="large" prop="password">
              <el-input v-model="form.password" maxlength="25" type="password" placeholder="密码">
                <template #prefix>
                  <el-icon>
                    <Lock/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>


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

<script setup>
import {Lock, User} from '@element-plus/icons-vue'
import {ref, reactive} from "vue";
// 这里引入后会继承上下文
import {ElMessage} from 'element-plus'
import {login} from "@/api/auth.ts";

const emit = defineEmits(['loginSuccess'])


const form = reactive({
  username: "",
  password: "",
  remember: false
});
const rules = {
  username: [
    {required: true, message: '请输入用户名'}
  ],
  password: [
    {required: true, message: '请输入密码'}
  ]
}


const isShow = ref(false)
const activeName = ref('Register')
const username = ref('')
const password = ref('')
const passwordRetry = ref('')
const email = ref('')
const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
};
const userLogin = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      login(form).then((res) => {
        isShow.value = false;
        emit('loginSuccess');
        ElMessage.success("登陆成功！")
      }).catch((err) => {
        console.log(err)
        console.log("出错了")
      });


      // ElMessage.success("哈哈哈哈哈！！！！！！")
    }
  })
}
const formRef = ref();
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