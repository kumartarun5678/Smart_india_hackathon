const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
const BASE_URL = process.env.BASE_URL;
const port = process.env.PORT || 8000
connectToMongo();
const app = express()


app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))




app.listen(port, () => {
  console.log(`Server is running on port ${BASE_URL}`);
});
