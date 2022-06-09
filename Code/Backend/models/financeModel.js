const mongoose = require ('mongoose')

const Schema = mongoose.Schema;

const financeSchema = new Schema({
    recieptNo:{
        type: String,
        required:true
    },
    customerCode:{
        type: String,
        required:true
    },
    fullName:{
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required:true
    },
    quntity:{
        type: Number,
        required:true
    },
    paymentDate:{
        type: Date,
        required:true
    },
    unitPrice:{
        type: Number,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    amount:{
        type: Number,
        required: true
    }
})

const financeModel = mongoose.model("payments", financeSchema);
module.exports = financeModel;