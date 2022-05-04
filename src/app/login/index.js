export const getCode = (ctx,next) => {
    ctx.response.body = {
        status: 200,
        msg: '验证信息接收成功！',
        result: {
          code: '000112'
        }
      }
}

export const codeLogin = (ctx, next) => {
    console.log(ctx.request.body);
    ctx.response.body = {
        ...ctx.request.body
    }
}