import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 使用别名路径
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue({
      reactivityTransform: true, // 手动开启实验性响应性语法糖
    }),
    // 自动实现路由,要导航的页面都应该放在pages中,所用插件'vite-plugin-pages‘
    Pages(),
    // 配置详见unocss.config.ts
    Unocss(),
    // 自动导包，不需要再页面中 "import{ xxx } from 'vue' or import { xxx } from 'vue-router"
    // 所用插件'unplugin-auto-import'
    AutoImport({
      // 自动导入vue、vue-router、vueuse、实验性语法糖等相关函数
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'vue/macros',
      ],
      // 自动导入组合式API文件，即混入自定义的函数
      dirs: [
        './src/composables',
      ],
      dts: true, // 自动生成auto-imports.d.ts全局声明文件
      vueTemplate: true, // 能够自动引入unref对于ref的自动引入在volar中生成新的提示错误
    }),
    // 自动全局导入./src/components文件夹下的文件,所用插件'unplugin-vue-components'
    Components({
      dts: true, // 使用typescript时默认开启，自动生成components.d.ts声明文件
    }),
  ],
})
