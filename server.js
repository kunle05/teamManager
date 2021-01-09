const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

require('./server/config/mongoose');
require('./server/routes/appRoutes')(app);

app.listen(8200)