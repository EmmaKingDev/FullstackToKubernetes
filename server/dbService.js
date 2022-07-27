const dotenv = require('dotenv');
let instance = null;
const { Pool } = require('pg')
const { v4: uuidv4 } = require('uuid');
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

    quidity() {
        return uuidv4();
    }


    async getAllData(){
        try {
            const result = await pool.query('SELECT * FROM names');
            return result.rows;
        } catch (err) {
            console.log(err.message);
        }
    }

    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            let id = this.quidity()
            let minutes = dateAdded.getMinutes();
            if (parseInt(minutes) < 10) {
                minutes = "0" + minutes;
            }
            let date = dateAdded.getDate() + "/" + dateAdded.getMonth() + "/" + dateAdded.getFullYear() + " " + dateAdded.getHours() + ":" + minutes;
             const response = await new Promise((resolve, reject) => {
                pool.query("INSERT INTO names (id, nimi, date_added) VALUES ($1,$2,$3) RETURNING id", [id, name, date])
            }).resolve 
            return {
                id : id,
                name : name,
                date_added : date
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                pool.query("DELETE FROM names WHERE id =  $1", [id])}).resolve
            
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(name, id) {
        try {
            const response = await new Promise((resolve, reject) => {
                pool.query("UPDATE names SET nimi = $1 WHERE id = $2", [name, id])}).resolve
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
/*         try {
            const response = await new Promise((resolve, reject) => {
                pool.query("SELECT * FROM names WHERE nimi = $1", [name])}).resolve

            return response;
        } catch (error) {
            console.log(error);
        } */
        try {
            const result = await pool.query("SELECT * FROM names WHERE nimi = $1", [name]);
            console.log(result.rows);
            return result.rows;
        } catch (err) {
            console.log(err.message);
        }
    }
}

module.exports = DbService;