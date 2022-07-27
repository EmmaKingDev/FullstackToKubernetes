const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');   

const port = process.env.PORT || 5000;
const path = __dirname

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

router.get('/', (req, res) => {
    res.sendFile(path + 'index.html');
})

app.use(express.static(path));
app.use('/', router);

// create
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(name);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { name } = request.body;
    const { id } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(name, id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.listen(port, () => console.log('app is running'));