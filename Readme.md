### 功能

```
1.查询可用预约 api
2.预约申请 api
3.使用 ava 和 supertest 做测试用例
4.使用 swagger 写说明文档
5.同时可以使用 docker 部署
6.使用joi进行传参校验
```

### 设想改进地方

1.可以使用定时任务，事先生成未来 7 天的预约初始单

### 目录说明

config 目录放配置文件，目前有 dev 测试环境和 prod 生产环境
app 放置系统文件

### 启动

运行环境 node v12.7.0 运行
npm run start 启动文件
npm run test 使用 ava 运行测试用例
npm run build 打 docker images 并且打 container
