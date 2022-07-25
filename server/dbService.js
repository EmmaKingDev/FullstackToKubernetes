const dotenv = require('dotenv');
let instance = null;
const { Pool } = require('pg')
dotenv.config();


const pool = new Pool({ connectionString: process.env.DB_CONNECTIONSTRING })

pool.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});


class DbService {
    constructor() {
        this.id = 0;
    }

    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                pool.query("SELECT * FROM names")}).resolve
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewName(name, id) {
        this.id++;
        try {
            const dateAdded = new Date();
            const response = await new Promise((resolve, reject) => {
                pool.query("INSERT INTO names (name, date_added) VALUES ($1,$2) RETURNING *", [name, dateAdded])
            }).resolve

            return {
                id : this.id,
                name : name,
                dateAdded : dateAdded
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
                pool.query("UPDATE names SET name = $1 WHERE id = $2", [name, id])}).resolve
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                pool.query("SELECT * FROM names WHERE name = $1", [name])}).resolve

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;