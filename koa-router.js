/**
 * 使用中间件设置路由
 */

const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
// 给路由添加层级
const router = new Router({
    prefix: '/routerLearn'
})

router
    .get('/', (ctx, next) => {
        ctx.body = 'hello world'
    })
    .get('/todo',(ctx,next)=>{
        ctx.body="Todo page"
    });

// router.allowedMethods() 的意义：校验接口的method；比如当接口设置成get，而客户端发送的请求是post就会报错
app
    .use(router.routes())
    .use(router.allowedMethods())
    
// 也可以像下面这样添加层级
// app.use('/routerLearn',router.routes(),router.allowedMethods())

app.listen(5000,() => {
    console.log('starting at port 5000')
})