const express = require('express');

const app = express();
const apiData = require('./data.json');

const { seller } = apiData;
const { goods } = apiData;
const { ratings } = apiData;
const apiRouters = express.Router();

// 使用express路由获取本地数据
apiRouters.get('/seller', (req, res) => {
  res.json({
    stu: 0,
    data: seller,
  });
});

apiRouters.get('/goods', (req, res) => {
  res.json({
    stu: 0,
    data: goods,
  });
});

apiRouters.get('/ratings', (req, res) => {
  res.json({
    stu: 0,
    data: ratings,
  });
});

app.use('/', apiRouters);
app.listen(8080, () => {
  console.log('mock data is running...');
});
