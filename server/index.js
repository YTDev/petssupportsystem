const sequelize = require('./config/database');

const syncDatabase = async () => {
    try {
        await sequelize.sync({});
        console.log('Database connected');
    } catch (error) {
        console.log('Error', error);
    }
}

module.exports = {
    sequelize,
    syncDatabase,
}