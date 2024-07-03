require('dotenv').config();

class ConectarBD{
    constructor(){
        this.conexion=null;
        this.mysql=require("mysql2/promise"); 
    }
    async conectarMySql(){
        try {
            this.conexion=await this.mysql.createConnection({
                host:process.env.HOSTMYSQL,
                user:process.env.USERMYSQL,
                password:process.env.PASSWORDMYSQL,
                database:process.env.DATABASEMYSQL,
                port:process.env.PORTMYSQL
                /*host:'127.0.0.1',
                user:'root',
                password:'#MiriamRuiz21.',
                database:'tiendaut',
                port:'3306' 
                host:'bdrlivfs9khhrasjsm1p-mysql.services.clever-cloud.com',
                user:'udeai21xqzwk1yna',
                password:'aFDmVrpMlm6ApI15hx7z',
                database:'bdrlivfs9khhrasjsm1p',
                port:'3306' */
                
            });
            console.log("conexion creada a mysql");
        } catch (error) {
            console.error("Error al crear la conexion "+error);
        }
    }
    async cerrarConexion(){
        if(this.conexion!=null){
            try {
                this.conexion.end();
                console.log("Conexion cerrada de Nysql chao");
            } catch (error) {
                console.error("Error al cerar conexion "+error);
            }
        }
    }
}

module.exports=ConectarBD;