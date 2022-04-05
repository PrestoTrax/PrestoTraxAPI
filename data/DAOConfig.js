export default class DAOConfig {
    
    static config = {
        authentication: {
            options: {
                userName: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
            },
            type: 'default',
        },
        server: process.env.DB_SERVER,
        options: {
            database: process.env.DB_NAME,
            encrypt: true,
            trustServerCertificate: true,
        },
    };
}
