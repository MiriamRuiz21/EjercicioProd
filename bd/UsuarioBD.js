const ConectarBD = require("./ConexionBD");

class UsuarioBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoUsuario(usuario){
        const sql="INSERT INTO usuarios VALUES(null, '"+usuario.nombre+"','"+usuario.celular+"','"+usuario.correo+"');";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuario Insertado");
        } catch (error) {
            console.error("Usuario no insertado "+error);
            console.error(sql);
        }
    }

    async mostrarUsuarios(){
        const sql="SELECT * FROM usuarios";
        var usuariosBD;
        try{
            await this.conectarMySql();
            [usuariosBD]=await this.conexion.execute(sql); //tiene que esperar antes de que muestre el resultado
            await this.cerrarConexion();
            console.log("Usuarios recuperados");
            //console.log(usuariosBD);
            return usuariosBD;
        } catch (error) {
            console.log("Error al recuperar los datos"+error);
            console.log(sql);
        }
    }

    async buscarUsuarioPoiId(idUsuario){
        const sql="SELECT * FROM usuarios WHERE idusuarios="+idUsuario;
    try{
        await this.conectarMySql();
        const usuario=await this.conexion.execute(sql);
        await this.cerrarConexion();
        console.log("Usuario seleccionado correctamente");
        return usuario;
    } catch (error) {
        console.error("Error al recuperar el usuariuo"+error);
        console.error(sql);
    }
    }

    async editarUsuario(usuario){
        //const sql="UPDATE usuarios SET nombre="+usuario.nombre+"',celular='"+usuario.celular+"', correo='"+usuario.correo+"';";
        const sql2=`
            UPDATE usuarios
            SET nombre="${usuario.nombre}",
                celular="${usuario.celular}",
                correo="${usuario.correo}"
                WHERE idusuarios=${usuario.idusuarios}
        `;
        try{
            await this.conectarMySql();
            await this.conexion.execute(sql2);
            await this.cerrarConexion()
        }catch(error){
            console.error("ERRO AL EDITAR USUARIO"+error);
            console.error(sql2);
        }
    }

    async borrarUsuario(idusuario){
        const sql = "DELETE FROM usuarios WHERE idusuarios="+idusuario;
        try{
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
        }catch(error){
            console.error("ERROR AL BORRAR EL USUARIO"+error);
            console.error(sql);
        }
    }
}

module.exports=UsuarioBD;
