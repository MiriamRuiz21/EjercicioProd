const ruta = require("express").Router();
const UsuarioClase=require("../clases/UsuarioClase");
const UsuarioBD = require("../bd/UsuarioBD");
const ProductoClase = require("../clases/ProductoClase");
const ProductoBD = require("../bd/ProductoBD");

ruta.get("/",async(req,res)=>{
    const usuariobd = new UsuarioBD();
    var usuarios= await usuariobd.mostrarUsuarios();
    var usuariosCorrectos=[];
    usuarios.forEach(usuario => {
        const usuario1 = new UsuarioClase (usuario);
        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
            usuariosCorrectos.push(usuario1.obtenerDatos); //arreglo multidimensional
        }
    });
    //console.log(usuarios); 
    //console.log(usuarios.data);
    res.render("mostrarUsuarios",{usuariosCorrectos});
});

ruta.get("/agregarUsuario", (req,res)=>{
    res.render("formulario");

});

ruta.post("/agregarUsuario",(req,res)=>{
    console.log(req.body);
    const usuario1=new UsuarioClase(req.body);
    //console.log(usuario1);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd = new UsuarioBD();
        usuariobd.nuevoUsuario(usuario1.obtenerDatos);
        res.render("mostrarDatos", usuario1.obtenerDatos);
    }else{
        res.render("error");
    }
});

ruta.get("/editarUsuario/:idusuarios",async(req,res)=>{
    const usuariobd= new UsuarioBD();
    const [[usuario]] = await usuariobd.buscarUsuarioPoiId(req.params.idusuarios);
    console.log(usuario);
    res.render("editarUsuario",usuario);
});

ruta.post("/editarUsuario", async(req,res)=>{
    const usuariobd = new UsuarioBD();
    const usuario1 = new UsuarioClase(req.body);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        await usuariobd.editarUsuario(req.body);
        res.redirect("/");
    }
    
});

ruta.post("/borrarUsuario",async(req,res)=>{
    const usuarioBd = new UsuarioBD();
    const usuario1 = new UsuarioClase(req.body);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        await usuarioBd.editarUsuario(req.body);
        res.redirect("/");
    }else{
        res.redirect("error");
    }
    
});

ruta.get("/borrarUsuario/:idusuarios",async(req,res)=>{
    const usuariobd = new UsuarioBD();
    await usuariobd.borrarUsuario(req.params.idusuarios);
    res.redirect("/");
});
module.exports=ruta;


//aqui empeiza producto
// ver tabla
ruta.get("/tablaProductos", async (req, res) => {
    const productobd = new ProductoBD();
    var productos = await productobd.mostrarProductos();
    var productosCorrectos = [];
    productos.forEach(producto => {
        const producto1 = new ProductoClase(producto);
        if (producto1.producto != undefined && producto1.precio != undefined && producto1.codigo != undefined) {
            productosCorrectos.push(producto1.obtenerProductos);
            console.log(productosCorrectos);
        }
    });
    res.render("mostrarProducto", { productosCorrectos });
});
//////////////////////////editar producto
ruta.get("/editarProducto/:idproductos", async (req, res) => {
    const productobd = new ProductoBD();
    const [[producto]] = await productobd.buscarProductoPorId(req.params.idproductos);
    //console.log(producto);
    res.render("editarProducto", producto);
});

ruta.post("/editarProducto", async (req, res) => {
    const productobd = new ProductoBD();
    const producto1 = new ProductoClase(req.body);
    if (producto1.producto != undefined && producto1.precio != undefined && producto1.codigo != undefined) {
        await productobd.editarProducto(req.body);
        res.redirect("/tablaProductos");
    }
});
///////////////// producto editado


////////// agregar producto 

ruta.get("/agregarProducto", (req,res)=>{
    res.render("formularioProducto");
});

ruta.post("/agregarProducto",(req,res)=>{
    console.log(req.body);
    const producto1 = new ProductoClase(req.body);
    if (producto1.producto != undefined && producto1.precio != undefined && producto1.codigo != undefined) {
        const productobd = new ProductoBD();
        productobd.nuevoProducto(producto1.obtenerProductos);
        res.render("mostrarDatosProducto", producto1.obtenerProductos);
    } else {
        res.render("error");
    }
});

////////////////////////////////


///////// eliminar un producto


ruta.get("/borrarProducto/:idproductos", async (req, res) => {
    const productobd = new ProductoBD();
    await productobd.borrarProductos(req.params.idproductos);
    res.redirect("/tablaProductos");
});



module.exports=ruta;