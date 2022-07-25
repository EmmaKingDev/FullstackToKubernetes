const dotenv = require('dotenv');
let instance = null;
const { Pool } = require('pg')
dotenv.config();


const pool = new Pool({ connectionString: process.env.DB_CONNECTIONSTRING })

pool.connect((err) => {
    if (err) {
        console.log(err.message);
    }
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    insertNewName = (name) => {
        const date = new Date()
        pool.query('INSERT INTO names (name, date) VALUES ($1, $2)', [name, date])
    }

    getAllData = () => {
        return pool.query('SELECT * FROM names')
    }

    updateNameById = (id, name) => {
        pool.query('UPDATE names SET name = $1 WHERE id = $2', [name, id])
    }

    deleteRowById = (id) => {
        pool.query('DELETE FROM names WHERE id = $1', [id])
    }

    searchByName = (name) => {
        return pool.query('SELECT * FROM names WHERE id = $1', [name])
    }
}

module.exports = DbService;