/**
 * 静态资源访问
 * 使用中间件koa-static
 */

 const Koa = require('koa');
 const path = require('path');
 const static = require('koa-static');

 const app = new Koa();

 const staticPath = './static';

 // 调用中间件，并配置资源的路径
 // 然后通过 http://localhost:5000/view.jpg 就可以访问到static目录下的静态资源
 app.use(static(
     path.join(__dirname, staticPath)
 ))

 app.use(async (ctx) => {
    ctx.body = 'hello world'
 })

 app.listen(5000,() => {
     console.log('starting at port 5000')
 })