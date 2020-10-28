const mongoose = require('mongoose');

const Department = mongoose.model('Department');
// require('dotenv/config');

module.exports = {

    // Metodo Index
    async Index(req,res){
        const departments = await Department.find();
        return res.json(departments);
    },

    // Metodo Details
    async Details(req, res){
        const department = await Department.findById(req.params.id);

        if(!department)
        return res.status(404).json({error: 'department not found'});

        return res.json(department);
    },

    // Metodo Create
    async Create(req,res){
        const department = await Department.create(req.body);
        return res.json(department)
    },

    // Metodo Update
    async Update(req,res){
        const department = await Department.findByIdAndUpdate(req.params.id,req.body,{new: true});
        return res.json(department);
    },

    // Metodo Delete
    async Delete(req,res){
        const department = await Department.findByIdAndDelete(req.params.id);
        return res.json({msg:'Excluido com sucesso'});
    },
}