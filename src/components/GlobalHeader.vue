<template>
  <div id="globalHeader">
    <a-row :wrap="false" align="middle" class="header-row">
      <a-col flex="200px">
        <div class="logo-title">
          <img src="@/assets/inari.ico" alt="logo" class="logo" />
          <div class="title">{{ $t('appName') }}</div> <!-- 替换为翻译 -->
        </div>
      </a-col>

      <a-col flex="1">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="menuItems"
          @click="doMenuClick"
          class="nav-menu"
        />
      </a-col>

      <a-col flex="230px"> <!-- 为切换按钮留出足够宽度，可以用 flex 自适应 -->
        <div class="user-login-status">
          <!-- 语言切换下拉菜单 -->
          <lang-selector />
          <!-- 主题切换按钮 -->
          <theme-selector />

          <!-- 用户状态区域：已登录显示用户信息下拉，否则显示登录按钮 -->
          <a-dropdown v-if="userStore.userInfo" placement="bottomCenter">
            <div class="user-info">
              <a-avatar :src="userStore.userInfo.avatar" style="margin-right: 8px;">
                {{ userStore.userInfo.username.charAt(0).toUpperCase() }}
              </a-avatar>
              <span>{{ userStore.userInfo.username }}</span>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="handleLogout">{{ $t('logout') }}</a-menu-item> <!-- 翻译 -->
              </a-menu>
            </template>
          </a-dropdown>
          <a-button v-else type="primary" @click="() => router.push('/user/login')">{{ $t('login') }}</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { h, ref, computed } from 'vue';
import { HomeOutlined, CrownOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useI18n } from 'vue-i18n';
import { message } from 'ant-design-vue';
import ThemeSelector from './icons/ThemeSelector.vue';
import LangSelector from './icons/LangSelector.vue';

const { t } = useI18n(); // 获取翻译函数，用于脚本中的翻译
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 点击菜单跳转
const doMenuClick = ({ key }: { key: string }) => {
  if (key === 'others') return; // 外部链接不跳转
  router.push({ path: key });
};

// 当前选中菜单项，根据路由初始化
const current = ref<string[]>([route.path]);

router.afterEach((to) => {
  current.value = [to.path];
});

// 菜单项配置（响应式，随语言变化）
const menuItems = computed<MenuProps['items']>(() => [
  { key: '/', icon: () => h(HomeOutlined), label: t('home') },
  { key: '/user/login', label: t('login') },
  { key: '/user/register', label: t('register') },
  { key: '/admin/userManage', icon: () => h(CrownOutlined), label: t('userManage') },
  {
    key: 'others',
    label: h(
      'a',
      { href: 'https://space.bilibili.com/522470519', target: '_blank' },
      t('personalPage') // 外部链接也需要翻译
    ),
  },
]);

// 退出登录
const handleLogout = async () => {
  const res = await userStore.logout();
  if (res.data?.code === 0) {
    message.success(t('logoutSuccess')); // 翻译
    router.push('/user/login');
  } else {
    message.error(res.data?.message || t('logoutFailed')); // 翻译，可定义一个通用失败信息
  }
};
</script>

<style scoped>
#globalHeader {
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  margin: 0 auto;
}

.header-row {
  width: 100%;
}

.nav-menu {
  border-bottom: none !important;
  line-height: 64px;
}

.logo-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 40px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
}

.user-login-status {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px; /* 按钮之间的间距 */
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}


</style>