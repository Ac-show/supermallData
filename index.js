const express = require('express')
const app = express()
const history = require('connect-history-api-fallback')

const route = require('./router/route')

app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})
// http://localhost:3000/home/data?type=new&page=2
app.use('/', route)
app.use(history())

app.listen(8000, () => {
  console.log('服务器启动成功！',  8000);
})