/**
 * 模板引擎ejs
 * 在koa2中使用模板机制必须依靠中间件
 * 这里选择koa-views中间件
 */

const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const app = new Koa();

app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

app.use(async (ctx) => {
    let title = 'hello koa2';
    await ctx.render('index', {
        title
    })
})

app.listen(5000,() => {
    console.log('[demo] is listen at port 5000')
})