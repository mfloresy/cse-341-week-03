const dotenv = require("dotenv")
dotenv.config()

const mongoClient = require("mongodb").MongoClient

let db

const init = async (callback) => {
    if (db){
        console.log("Connection with Database already established")
        return callback(null, db)
    }
    mongoClient.connect(process.env.MONGODB_URL)
    .then((client)=>{
        db = client
        callback(null, db)
    })
    .catch((err)=>{
        callback(err)
    })
}

const getDB = () => {
    if (!db){
        throw Error("DB not yet initialized")
    }
    return db
}

module.exports = {
    init, 
    getDB
}