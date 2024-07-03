const ConectarBD = require("./ConexionBD");

class ProductoBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoProducto(producto){
        const sql="insert into productos values(null,'"+producto.producto+"','"+producto.precio+"','"+producto.codigo+"');";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Producto Insertado");
        } catch (error) {
            console.error("Producto no insertado "+error);
            console.error(sql);
        }
    }
    async mostrarProductos(){
        const sql="SELECT * FROM productos";
        var productosBD;
        try {
            await this.conectarMySql();
            [productosBD]= await this.conexion.execute(sql); //tiene que esperar antes de que muestre el resultado
            await this.cerrarConexion();
            console.log("Productos recuperados");
            //console.log(usuariosBD);
            return productosBD;
        } catch (error) {
            console.log("Error al recuperar los datos"+error);
            console.log(sql);
        }
    }
    async buscarProductoPorId(idproductos){
        const sql="select * from productos where idproductos="+idproductos;
        try {
            await this.conectarMySql();
            const producto=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("producto seleccionado correctamente");
            return producto;
        } catch (error) {
            console.log("Error al recuperar el producto "+error);
            console.log(sql);
        }
    }
    async editarProducto(producto){
        //const sql="UPDATE usuarios SET nombre="+usuario.nombre+"',celular='"+usuario.celular+"', correo='"+usuario.correo+"';";
        const sql2=`
        UPDATE productos 
        SET producto="${producto.producto}",
            precio="${producto.precio}",
            codigo="${producto.codigo}"
            where idproductos=${producto.idproductos}
        `;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql2);
            await this.cerrarConexion();
        } catch (error) {
            console.error("ERRO AL EDITAR USUARIO"+error);
            console.error(sql2);
        }
    }
    async borrarProductos(idproductos){
        const sql="DELETE from productos WHERE idproductos="+idproductos;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
        } catch (error) {
            console.error("ERROR AL BORRAR EL USUARIO"+ error);
            console.error(sql);
        }
    }
}

module.exports=ProductoBD;