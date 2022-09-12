import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    Pages(),
    Unocss({
      presets: [
        presetIcons({ /* options */ }),
      ],
    }),
    AutoImport({
      // 自动导入vue、vue-router、vueuse相关函数
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      // 自动导入组合式API文件
      dirs: [
        './src/composables',
      ],
      dts: true, // 自动生成auto-imports.d.ts全局声明文件
      vueTemplate: true, // 能够自动引入unref对于ref的自动引入在volar中生成新的提示错误
    }),
    Components({
      dts: true,
    }),
  ],
})
