const apiRoutes = require('../controller');

const routers = (app) => {
    app.use('/api/v1', apiRoutes);
}

module.exports = routers;