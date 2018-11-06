class Configuration {
    constructor() {
        this.rolesValidos = {
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            message: '{VALUE} no es un rol valido'
        };
    }
    //database configuration
    dbConfigUrl() {
        let urlDB;
        if (process.env.NODE_ENV === 'develop') { 
            return urlDB = 'mongodb://localhost:27017/Almacenero';
        } else {
            return urlDB = process.env.MONGO_URI;
        }
    }

}
//port
process.env.PORT = process.env.PORT || 4300;
//envirioment
process.env.NODE_ENV = process.env.NODE_ENV || 'develop';
console.log('EL ENTORNO ES: ', process.env.NODE_ENV);
//token lifetime
process.env.TOKEN_LIFE = 60 * 60 * 24 * 30;
//token seed
process.env.SEED = process.env.SEED || 'nksoft-sign-develop';

const configuration = new Configuration();
//Url database intance 
process.env.URLDB = configuration.dbConfigUrl();

module.exports = configuration;
