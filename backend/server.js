const express = require("express");
// not necessary
require("colors");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");

// connection DB
const connectDB = require("./config/DB");

//  نقدر نغير البورت .. هنا عرف البورت داخل متغير .. وعرف هذا البورت في ملف الإي ان في
const port = process.env.port || 6000; // أضفنا شرط أو ٦٠٠٠ لو صار مشكلة وما اشتغل

connectDB();
// initialize express
const app = express();

app.use(express.json()); // to enable body contain data
app.use(express.urlencoded({ extended: false })); // to encoded the data مانحتاج نكتبها ندخلها في الخانات الجاهزة
app.use(errorHandler); // call error handel middileware

app.use("/api/projects", require("./Routes/projectsRoutes")); // Basic Routes for page projects
app.use("/api/authors", require("./Routes/authorRoutes"));
app.use("/api/admin", require("./Routes/adminRoutes"));

// create listen object نستدعي الداله لفتح البورت واستدعى المتغير الي خزن البورت فيه
//'Server is Started on 6000' مجرد رسالة طباعة
app.listen(port, () => console.log(`Server is Started on ${port}`.yellow.bold));
