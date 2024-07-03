const express = require("express");
const path = require("path");
const usuariosRutas = require("./routers/usuariosRutas")
const app = express();
app.set("view engine","ejs");
app.use("/", express.static(path.join(__dirname,"/web")));
app.use(express.urlencoded({extended:true}));
app.use("/", usuariosRutas);


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Sitio en http://localhost:"+port);
});