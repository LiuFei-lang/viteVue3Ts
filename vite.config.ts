import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//导入解析jsx或者tsx的工具包
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  css:{
    modules:{
      /**
       * css文件模块化规则以:nabBar.modules.css  为例
       * 在使用的时候类名为: nabBar-modules_css文件中的类名 
       * 在DOM中命名规则为:[nabBar-modules]_[类名]
       */
      generateScopedName: '[name]_[local]', 
      //哈希值前缀
		  hashPrefix: 'prefix',
      //在本地可以使用
      scopeBehaviour:'local'
    },
    preprocessorOptions:{
      scss:{
        additionalData:`@import "./src/assets/main.scss";`
      }
    }
  },
  base:"./",
  build:{
    chunkSizeWarningLimit:1500,//包的大小
  }
})


