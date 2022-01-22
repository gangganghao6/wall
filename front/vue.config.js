module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.5.7:3000/',
                changeOrigin: true,
            }
        }
    },
    configureWebpack: {
        externals: {
            vue: "Vue",
            "vue-router": "VueRouter",
            vuex: "Vuex",
            axios:"axios",
            'tdesign-vue-next':'TDesign'
        }
    },
}
