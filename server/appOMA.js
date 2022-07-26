const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbServiceOma');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


app.post('/insert', (request, response) => {
    const result = dbService.insertNewName(request, response);
    console.log(result)
    return response.json({data: result})
}) 

app.get('/getAll', (request, response) => {
    const result = dbService.getAllData(request, response);
    console.log(result)
    return response.json({data: result})
})

//app.get('/getAll', dbService.getAllData)
//app.post('/insert', dbService.insertNewName)
app.patch('/update', dbService.updateNameById)
app.delete('/delete/:id', dbService.deleteRowById)
app.get('/search/:name', dbService.searchByName)

app.listen(port, () => console.log('app is running'));