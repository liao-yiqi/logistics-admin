<script setup lang="ts">
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import useLayoutStore from '@/store/modules/layout'
import { computed } from 'vue'
import useUserInfo from '@/store/modules/user'
const layoutStore = useLayoutStore()
const { sidebar } = layoutStore
const { user, logout } = useUserInfo()
const userAvatar = computed(() => {
  if (!user['avatar']) {
    return new URL('@/assets/avatar/default.jpg', import.meta.url).href
  }
  return ''
})
</script>

<template>
  <div class="navbar">
    <Hamburger class="navbar-hamburger" :is-active="sidebar.opened" />
    <Breadcrumb class="navbar-breadcrumb" />
    <div class="navbar-menu">
      <div class="avatar-container navbar-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img :src="userAvatar" class="user-avatar" alt="avatar" />
          <span class="user-name new-name" style="margin-right: 8px">
            {{ user.name }}
          </span>
          <el-divider direction="vertical" />
          <img
            src="@/assets/tuichu.png"
            alt=""
            class="user-avatar"
            style="width: 18px; height: 19px; border-radius: 0; margin-left: 8px"
            @click="logout"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: relative;
  .navbar-hamburger {
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .navbar-breadcrumb {
    float: left;
  }
}
.navbar-menu {
  float: right;
  height: 100%;
  position: relative;
  bottom: 5px;
  &:focus {
    outline: none;
  }
  .navbar-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
        width: 100%;
      }
    }
  }
  .avatar-container {
    margin-right: 10px;
    .avatar-wrapper {
      position: relative;
      .user-name {
        vertical-align: middle;
        font-size: 1rem;
        margin-left: 5px;
        margin-top: -4px;
        display: inline-block;
      }
      .new-name {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #072c56;
      }
      .user-avatar {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
}
</style>
