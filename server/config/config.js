class Configuration{
    constructor(){
        this.rolesValidos = {
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            message: '{VALUE} no es un rol valido'
        };
    }
}
//puerto
process.env.PORT = process.env.PORT || 4300;

const configuration = new Configuration();

module.exports = configuration;