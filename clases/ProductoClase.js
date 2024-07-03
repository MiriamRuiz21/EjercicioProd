const { text } = require("express");

class Producto{
    constructor(producto){
        this.id=producto.idproductos,
        this.producto=producto.producto,
        this.precio=producto.precio,
        this.codigo=producto.codigo
    }
    set id(id){
        this._id=id;
    }
    set producto(producto){
       /* var regexProducto = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if(regexProducto.test(producto)){*/
            this._producto=producto;
        //}
    }
    set precio(precio) {
       /* var regexprecio = /^\d{2,}$/;
        if (regexprecio.test(precio)) {*/
        this._precio = precio;
    //}
    }
    set codigo(codigo) {
        /*var regexcodigo = /^\d{5}$/;
        if (regexcodigo.test(codigo)) {*/
            this._codigo = codigo;
     //   }
    }
    get id(){
        return this._id;
    }
    get producto(){
        return this._producto;
    }
    get precio(){
        return this._precio;
    }
    get codigo(){
        return this._codigo;
    }
    get obtenerProductos(){
        return{
            idproductos:this.id,
            producto:this.producto,
            precio:this.precio,
            codigo:this.codigo
        }
    }
}

module.exports=Producto;

