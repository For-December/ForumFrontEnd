import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from '@vant/auto-import-resolver';
import AutoImport from 'unplugin-auto-import/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import path from 'path';

export default {
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver(),VantResolver()],
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
};
