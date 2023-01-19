const server = require('./server')

if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

server.listen(process.env.PORT || 3000);

server.on('error', err => {
    console.log(err);
})

require('./routes')(server);