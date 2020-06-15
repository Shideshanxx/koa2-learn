/**
 * post 数据处理
 * 中间件koa-bodyparser
 */

const Koa = require('koa')
const app = new Koa()
// 使用中间件koa-bodyparser来处理post数据
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

app.use(async(ctx)=>{
    if(ctx.url === '/' && ctx.method === "GET") {
        let html = `
        <form method="POST" action="/">
            <input type="text" name="name"></input>
            <input type="text" name="age"></input>
            <button type="submit">submit</button>
        </form>
        `
        ctx.body = html;
    } else if (ctx.url === '/' && ctx.method === "POST") {
        // let postData = await parsePostData(ctx)
        let postData = ctx.request.body;
        ctx.body = postData;
    } else {
        ctx.body ='<h3>404 Page</h3>'
    }
})

function parsePostData(ctx) {
    return new Promise((resolve,reject) => {
        try {
            let postdata = '';
            ctx.req.on('data',(data) => {
                console.log('data',data)
                // 将post数据解析成querystring字符串
                postdata += data
            })
            ctx.req.addListener("end",function(){
                // 将字符串解析成JSON对象
                let parseData = parseQueryStr(postdata)
                resolve(parseData)
            })
        } catch(error) {
            reject(error)
        }
    })
}

function parseQueryStr(queryStr) {
    console.log('queryStr',queryStr)
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log('queryStrList',queryStrList)
    for (let [index,queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        console.log('itemList',itemList)
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    console.log('queryData',queryData)
    return queryData;
}

app.listen(5000,()=>{
    console.log('[demo] is listen at port 5000')
})