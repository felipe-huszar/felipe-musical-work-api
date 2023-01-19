const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    maxPoolSize: 10
});
const db = mongoose.connection;
db.on('error', error => console.log('Database error', error));
db.once('open', () => console.log('Connected to the database'));

module.exports = mongoose;