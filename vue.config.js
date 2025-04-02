module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://api.fanyi.baidu.com/',
                changeOrigin: true,
                pathRewrite: {
                    "^/CodeVariableTranslation": "/"
                }
            }
        }
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "appId": "com.example.app",
                "productName": "图书管理Electron", //项目名，也是生成的安装文件名，即aDemo.exe
                "copyright": "zzf © 2025", //版权信息
                // "directories": {
                //     "output": "./dist_electron" //输出文件路径，之前编译的默认是dist_electron
                // },
                "win": {
                    "icon": "books.ico", //这里注意配好图标路径
                    "target": [{
                        "target": "nsis", //利用nsis制作安装程序
                        "arch": [
                            "x64", //64位
                            "ia32" //32位
                        ]
                    }]
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "books.ico",// 安装图标
                    "uninstallerIcon": "books.ico",//卸载图标
                    "installerHeaderIcon": "books.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                    "shortcutName": "图书管理Electron", // 图标名称
                }
                // options placed here will be merged with default configuration and passed to electron-builder
            }
        }
    }
}
