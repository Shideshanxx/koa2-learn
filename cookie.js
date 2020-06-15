/**
 * cookie读存
 * ctx.cookies.get(name,[optins]):读取上下文请求中的cookie。
 * ctx.cookies.set(name,value,[options])：在上下文中写入cookie。
 */

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
    if(ctx.url === '/index') {
        ctx.cookies.set('myInfo',{
            name: 'koa',
            passWord: '123456'
        },{
            domain: '127.0.0.1', // 写cookie所在的域名
            path: '/index', // 写cookie所在的路径
            maxAge:1000*60*60*24, // cookie有效时长
            expires: new Date('2020-06-16'), // cookie 失效时间
            httpOnly: false, // 是否只用于 http请求中获取
            overwrite: false // 是否允许重写
        })
        ctx.body = 'cookie is seted'
    } else {
        if (ctx.cookies.get('myInfo')) {
            ctx.body = ctx.cookies.get('myInfo')
        } else {
            ctx.body = 'cookie is none'
        }
    }
})

app.listen(5000, () => {
    console.log('starting at port 5000')
})