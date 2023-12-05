<script setup lang="ts">
import {ref} from 'vue';
import {createPost} from "@/api/post.ts";
import {ElMessage} from "element-plus";
import {curUser, curUserId} from "@/plugins/globalData.ts";
import {PictureFilled} from "@element-plus/icons-vue";
import {Numeric} from "vant/lib/utils";
import {UploaderFileListItem} from "vant/lib/uploader/types";
import {showConfirmDialog} from "vant";

const message = ref("");

const emit = defineEmits(['loadAgain']) // 定义接口，home.vue实现

const isUploading = ref<boolean>(false);
const fileList = ref<UploaderFileListItem[]>([])

const onBeforeRead = (file: File | File[], detail: {
  name: Numeric;
  index: number;
}): boolean => {
  console.log(detail)
  if (file instanceof File) {
    if (!file.type.includes('image')) {
      ElMessage.warning('这里只能上传图片嗷');
      return false
    }
  } else {
    // The some method returns true
    // if at least one element in the array
    // satisfies the provided testing function.
    if (file.some(f => f.type.includes('image'))) {
      return false;
    }
    // 相当于下面
    // for (let i = 0; i < file.length; i++) {
    //   if (file[i].type.includes('image')) {
    //     return false
    //   }
    // }
  }
  return true

}

const onAfterRead = (items: UploaderFileListItem | UploaderFileListItem[], detail: {
  name: Numeric;
  index: number;
}) => {
  let fileListItem = items as UploaderFileListItem
  let file: File = fileListItem?.file!
  console.log(file)
  console.log(detail)
  ElMessage.success('图片添加成功！')

};

const onBeforeDelete = (file: any): boolean => {
  console.log(file)
  ElMessage.success('删除成功！')
  return true
}
const uploadImage = () => {
  isUploading.value = !isUploading.value
}
const newPost = () => {
  console.log(fileList.value)
  let files: File[] = fileList.value.map(t => t?.file!);
  console.log(files)
  createPost({
    authorId: curUserId.value,
    authorName: curUser.value,
    text: message.value,
    images: files,
    tags: "test"
  }).then(
      () => {
        // 调用 Home.vue的方法
        emit('loadAgain')
        ElMessage.success("发帖成功！");
        message.value = ''
        files.length = 0
        isUploading.value = false
      }
  )
}
</script>

<template>
  <el-container>
    <el-aside width="15vw">
      <el-avatar size="large">User</el-avatar>
      <!--          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"-->
      <!--      />-->
    </el-aside>
    <el-main style="padding-top: 0;">

      <van-field
          v-model="message"
          rows="1"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入帖子内容"
          show-word-limit
      />
      <div>
        <el-button type="success" :icon="PictureFilled" circle @click="uploadImage"/>
        <el-button type="success" style="float: right" @click="newPost" loading>发帖</el-button>
      </div>


    </el-main>
  </el-container>
  <div v-if="isUploading">
    <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa' }"
    >
      选择并上传图片
    </van-divider>

    <!-- 上传组件 -->
    <van-uploader
        v-model="fileList"
        accept="image/*"
        multiple
        :before-read="onBeforeRead"
        :after-read="onAfterRead"
        :before-delete="onBeforeDelete"
    />

    <!-- 预览图展示 -->
    <!--    <van-image-->
    <!--        v-for="(item, index) in fileList"-->
    <!--        :key="index"-->
    <!--        :src="item.url"-->
    <!--        :preview-src-list="fileList.map(file => file.url)"-->
    <!--        @click="onPreviewClick(index)"-->
    <!--    />-->
    <!--    <van-uploader v-model="fileList" multiple />-->
  </div>


</template>

<style scoped>

</style>