<template>
  <a-config-provider :theme="themeConfig" :locale="antLocale">
    <!-- 根元素上添加动态类名，用于自定义 CSS 变量 -->
    <div :class="`theme-${settingsStore.themeName}`" id="app">
      <BasicLayout />
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { theme } from 'ant-design-vue'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import jaJP from 'ant-design-vue/es/locale/ja_JP'
import BasicLayout from '@/layouts/BasicLayout.vue'
import { useSettingsStore, type ThemeName } from '@/stores/settings'
import { onMounted } from 'vue';
import myAxios from 'axios';  // 或者你封装的 myAxios

onMounted(async () => {
  try {
    const res = await myAxios.get('https://user-center-backend.onrender.com');
    console.log('后端响应：', res.data);
  } catch (error) {
    console.error('后端连接失败：', error);
  }
});

const settingsStore = useSettingsStore()

const antLocale = computed(() => {
  switch (settingsStore.language) {
    case 'zh': return zhCN
    case 'ja': return jaJP
    default: return enUS
  }
})

// 定义多个主题的配置
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const themeConfigMap: Record<ThemeName, any> = {
  light: {
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 4,
      // 可以继续自定义其他 token
    }
  },
  dark: {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 4,
    }
  },
  blue: {
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1677ff',
      borderRadius: 6,
      colorBgContainer: '#f0f5ff',
      colorText: '#1f2a44',
    }
  },
}

const themeConfig = computed(() => themeConfigMap[settingsStore.themeName])
</script>