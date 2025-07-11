<script setup lang="ts">
import { getCaptchaAPI, loginAPI } from '@/api/login'
import type { LoginForm } from '@/types/login'
import { randomNum } from '@/utils/random.ts'
import type { FormInstance, FormRules } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

const randomId = randomNum(24, 16)
const codeImg = ref<string>()

const getCaptcha = async () => {
  const res = await getCaptchaAPI({ key: randomId, 0: randomId })
  const imageUrl = `data:image/png;base64,${btoa(
    new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')
  )}`
  codeImg.value = imageUrl
}

onMounted(() => {
  getCaptcha()
})

const getImageCaptcha = () => {}

const loginForm = reactive<LoginForm>({
  // demo 995itheima.CN032@.当前日期
  account: 'demo',
  password: '995itheima.CN032@.20250711',
  code: '',
  tenant: '0000',
  key: randomId,
})

const loading = ref<boolean>(false)

const loginFormRules = reactive<FormRules<LoginForm>>({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const loginFormRef = ref<FormInstance>()
const onSubmit = (loginFormRef: FormInstance) => {
  loginFormRef.validate(async (valid, _) => {
    if (!valid) return
    loading.value = true
    const { code } = await loginAPI(loginForm)
    if (code !== 200) {
      loading.value = false
      return
    } else {
    }
    loading.value = false
    console.log('登录表单数据:', loginForm)
  })
}
</script>

<template>
  <div class="xl-login">
    <div class="xl-login__shadow"></div>
    <!--  <video
      src="../../assets/video.mp4"
      autoplay
      loop
      muted
      style="width: 100%; height: 100%; object-fit: fill"
    ></video> -->
    <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" class="xl-login__form">
      <div class="xl-login__form--title">
        <img src="../../assets/logo1.png" />
      </div>
      <el-form-item prop="account">
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="账号"
          autocomplete="off"
          name="account"
          type="text"
        />
        <img src="../../assets/icon-account.png" class="icon-img" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          placeholder="密码"
          show-password
          autocomplete="off"
          name="password"
          type="password"
        />
        <img src="../../assets/icon-password.png" class="icon-img" />
      </el-form-item>
      <el-form-item prop="code" class="code-input">
        <el-input
          ref="code"
          v-model="loginForm.code"
          placeholder="验证码"
          autocomplete="off"
          name="code"
          style="width: 100%"
          type="text"
        />
        <img src="../../assets/icon-code.png" class="icon-img" />
        <img
          v-show="codeImg"
          :src="codeImg"
          alt="codeImage"
          class="xl-login__form--code-img"
          @click="getImageCaptcha"
        />
      </el-form-item>
      <el-button
        class="xl-login__form--login-button"
        type="primary"
        :loading="loading"
        @click="onSubmit(loginFormRef!)"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
$bg: #283443;
$cursor: #555;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

@include b(login) {
  .el-input {
    display: inline-block;
    input {
      background: transparent;
      border: 0;
      border-radius: 5px;
      color: #000000;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  :deep(.el-input--prefix .el-input__inner) {
    padding-left: 48px;
    height: 50px;
  }
  :deep(.el-input__icon) {
    line-height: 54px;
    font-size: 20px;
    padding-left: 12px;
  }
  :deep(.el-form-item__content) {
    position: relative;
    .icon-img {
      width: 21px;
      height: 21px;
      position: absolute;
      left: 14px;
      top: 14px;
    }
    .el-input__inner {
      padding-left: 36px;
      height: 50px;
    }
  }
  :deep(.el-form-item) {
    border-radius: 5px;
    color: #454545;
    transition: all 0.3s;
    &:hover {
      border-color: #000408;
    }
  }
  :deep(.el-input__wrapper) {
    width: 95%;
  }
}
</style>

<style lang="scss" scoped>
@include b(login) {
  block-size: 100% 100%;
  height: 100vh;
  overflow-y: hidden;
  position: relative;
  @include e(shadow) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.3;
    background: #1a1c41;
  }
  @include e(form) {
    border-radius: 10px;
    position: absolute;
    top: 45%;
    left: 45%;
    margin: -180px 0 0 -160px;
    width: 370px;
    height: 419px;
    padding: 36px 40px;
    background: #fff;
    border-radius: 10px;
    @include m(title) {
      position: relative;
      margin-bottom: 28px;
      text-align: center;
      img {
        height: 54px;
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 54px;
        border-radius: 5px;
        background-color: rgba(85, 83, 83, 0.972);
        z-index: 2;
        pointer-events: none;
      }
    }
    @include m(code-img) {
      display: inline-block;
      vertical-align: top;
      width: 71px;
      height: 32px;
      cursor: pointer;
      margin-left: 10px;
      position: absolute;
      right: 10px;
      top: 9px;
    }
    @include m(login-button) {
      width: 100%;
      height: 54px;
      margin-bottom: 14px;
      margin-top: 22px;
      background-color: #e15536;
      border: 0px;
      font-size: 18px;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
