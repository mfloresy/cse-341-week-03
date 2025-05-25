const mongodb = require("../database/init")

const objectId = require("mongodb").ObjectId

const getAll = async (req, res) => {
    //#swagger.tags=['Students']
    const result = await mongodb.getDB().db().collection("contacts").find()
    result.toArray().then((students)=>{
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(students)
    })
}

const getOne = async (req, res) => {
    //#swagger.tags=['Students']
    const studentId = new objectId(req.params.id)
    const result = await mongodb.getDB().db().collection("contacts").find({_id: studentId})
    result.toArray().then((students)=>{
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(students[0])
    })
}

const createStudent = async (req, res) => {
    //#swagger.tags=['Students']
    const student = {
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        universityMajor: req.body.universityMajor,
        nationality: req.body.nationlity
    }
    const result = await mongodb.getDB().db().collection("contacts").insertOne(student)
    if (result.acknowledged){
        res.status(204).json()
    }else{
        res.status(500).json(result.error | "Error creating student in database")
    }
}

const updateStudent = async (req, res) => {
    //#swagger.tags=['Students']
    const student = {
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        universityMajor: req.body.universityMajor,
        nationality: req.body.nationlity
    }
    const result = await mongodb.getDB().db().collection("contacts").replaceOne({_id: new objectId(req.params.id)},student)
    if (result.modifiedCount > 0){
        res.status(204).json()
    }else{
        res.status(500).json(result.error | "Error updating student in database")
    }
}

const deleteStudent = async (req, res) => {
    //#swagger.tags=['Students']
    const result = await mongodb.getDB().db().collection("contacts").deleteOne({_id: new objectId(req.params.id)}, true)
    if (result.acknowledged){
        res.status(204).json()
    }else{
        res.status(500).json(result.error | "Error updating student in database")
    }
}

module.exports = {
    getAll, 
    getOne,
    createStudent,
    updateStudent,
    deleteStudent
}
