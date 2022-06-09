const router = require("express").Router();
const { route } = require("express/lib/application");
const res = require("express/lib/response");
const { update } = require("../models/financeModel");
let financeModel = require("../models/financeModel");

//http://localhost:8000/payment/addpayment
//POST means http request method
//Create Implementation


router.post('/addpayment', (req,res) => {
    let newPayment = new financeModel(req.body);

    newPayment.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Payment Added Successfully"
        })
    });
});

//Read Implementation
//http://localhost:8000/payment/read


router.get("/readpayment", (req,res) =>{
    financeModel.find().exec((err,payments) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPayments:payments
        });
    });
});

//Update Implementation
//http://localhost:8000/payment/update/:id


router.put('/updatepayment/:payid',(req,res)=>{
    financeModel.findByIdAndUpdate(
        req.params.payid,
        {
            $set:req.body
        },
        (err,update)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Payment Update Successfuly"
            });
        }
    );
});

//Delete Implementation //Not working
//http://localhost:8000/payment/delete/:id


router.delete('/deletepayment/:payid',(req,res)=>{
    financeModel.findByIdAndDelete(req.params.payid).exec((err,deletePayment) =>{
        if(err) return res.status(400).json({
            message:"Payment Delete Unsuccesfully",err
        });

        return res.json({
            message:"Payment Delete Succesfully",deletePayment
        });
    });
});

//Get specific payment


router.get("/getpayment/:payid", (req,res) =>{
    let paymentID = req.params.payid;

    financeModel.findById(paymentID,(err,payments) => {
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            payments
        })
    })
})

module.exports = router;