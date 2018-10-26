// 自定义的中间件

function pv (ctx) {
    ctx.session.count++
    console.log(ctx.path)
}

module.exports = function () {
    return async function(ctx, next) {
        pv(ctx)
        await next();
    }
}