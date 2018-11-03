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
        if (process.env.ENV === 'develop') {
            return urlDB = 'mongodb://localhost:27017/Almacenero';
        } else {
            return urlDB = 'mongodb://nksoft-admin:nksoftdevelop2018@ds151383.mlab.com:51383/nksoft-alamcenero-prototype';
        }
    }

}
//port
process.env.PORT = process.env.PORT || 4300;
//envirioment
process.env.ENV = process.env.ENV || 'develop';

const configuration = new Configuration();
//Url database intance 
process.env.URLDB = configuration.dbConfigUrl();

module.exports = configuration;