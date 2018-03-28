fork by element admin


# 克隆项目
git clone https://github.com/fecshopsoft/vue-element-admin.git

# 安装依赖
npm install
   
# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 配置

配置后端支持，config文件夹 `BASE_API` 都改成相应的后端api地址

# 启动服务 - 开发模式
npm run dev

This will automatically open http://localhost:9527.


## Build - 生产模式
```bash
# build for test environment
npm run build:sit

# build for production environment
npm run build:prod
```

## Advanced - 生产模式
```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

## More - 关于element admin ，更多信息

https://github.com/PanJiaChen/vue-element-admin


## 权限设置

1.菜单显示控制：`router/index.js` 在 `asyncRouterMap` 中配置

2.权限设置：后台，控制面板-权限设置，添加各个资源。

3.后台权限控制：gin部分，添加middleware，通过2部分后台设置的权限，查看是否有权限访问。

因此，添加的新菜单，新功能，需要：

1.在菜单部分添加roles

2.在权限设置中添加资源权限

3.gin部分添加权限控制

4.如果需要做数据过滤，需要在程序内部根据用户级别做数据过滤
