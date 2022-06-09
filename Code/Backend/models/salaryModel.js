const mongoose = require ('mongoose')

const Schema = mongoose.Schema;

const salarySchema = new Schema({
    employeeName:{
        type: String,
        required:true
    },
    nic:{
        type: String,
        required:true
    },
    employeeEmail: {
        type: String,
        required:true
    },
    salaryDate:{
        type: Date,
        required: true
    },
    basicSalary:{
        type: Number,
        required:true
    },
    overTime:{
        type: Number,
        required:true
    },
    paymentAmount:{
        type: Number,
        required: true
    }
})

const salaryModel = mongoose.model("salaries", salarySchema);
module.exports = salaryModel;