// import express from 'express';
// // const bodyParser = require('body-parser');
// import bodyParser from 'body-parser';
// import configViewEngine from "./config/viewEngine.js";
// import initWebRoutes from './route/web';
// import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine.js';
import initWebRoutes from './route/web.js';
import dotenv from 'dotenv';
dotenv.config();
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// // Sử dụng middleware cho JSON
// app.use(bodyParser.json());

// // Sử dụng middleware cho urlencoded với tùy chọn extended
// app.use(bodyParser.urlencoded({ extended: true }));

// config app
configViewEngine(app);
initWebRoutes(app);
let port = process.env.PORT || 6969;
app.listen(port, () => {
    // callback
    console.log("backend is running on the port : " + port);
});
// import express from 'express';
// import bodyParser from 'body-parser';
// import configViewEngine from './config/viewEngine.js';
// import initWebRoutes from './route/web.js';
// import dotenv from 'dotenv';

// dotenv.config();

// let app = express();

// // Sử dụng middleware cho JSON
// app.use(bodyParser.json());

// // Sử dụng middleware cho urlencoded với tùy chọn extended
// app.use(bodyParser.urlencoded({ extended: true }));

// // Cấu hình view engine
// configViewEngine(app);

// // Khởi tạo các routes
// initWebRoutes(app);

// let port = process.env.PORT || 6969;

// app.listen(port, () => {
//     console.log("backend is running on the port : " + port);
// });
