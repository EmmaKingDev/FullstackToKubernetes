const dotenv = require('dotenv');
const { Pool } = require('pg')
dotenv.config();


const pool = new Pool({ connectionString: process.env.DB_CONNECTIONSTRING })

pool.connect((err) => {
    if (err) {
        console.log(err.message);
    }
});

function insertNewName(request, response) {
    const { name } = request.body
    const id = parseInt(request.params.id)
    const date = new Date()
    pool.query('INSERT INTO names (name, date) VALUES ($1, $2)', [name, date], (error, results) => {
        if (error) {
            throw error
        }
        return response.json({
            id: id,
            name: name,
            date: date
        })
    })
}

function getAllData(request, response) {
    pool.query('SELECT * FROM names LIMIT 20', (error, results) => {
        if (error) {
            throw error
        }
        return results
    })
}

const updateNameById = (request, response) => {
    const id = parseInt(request.params.id)
    const { name } = request.body
    pool.query('UPDATE names SET name = $1 WHERE id = $2', [name, id], (error, results) => {
        if (error) {
            throw error
        }
        return response === 1 ? true : false
    })
}

const deleteRowById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM names WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        return response === 1 ? true : false
    })
}

const searchByName = (request, response) => {
    const name = request.params.name
    pool.query('SELECT * FROM names WHERE name = $1', [name], (error, results) => {
        if (error) {
            throw error
        }
        return results
    })
}

module.exports = {
    insertNewName,
    getAllData,
    updateNameById,
    deleteRowById,
    searchByName
}