const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/noderest', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;