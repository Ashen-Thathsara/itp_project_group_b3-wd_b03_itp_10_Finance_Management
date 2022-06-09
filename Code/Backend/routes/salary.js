const router = require("express").Router();
const { route } = require("express/lib/application");
const res = require("express/lib/response");
const salaryModel = require("../models/salaryModel");
const { update } = require("../models/salaryModel");

//http://localhost:8000/salary/addsalary
//POST means http request method
//Create Implementation

router.post('/addsalary', (req,res) => {
    let newSalary = new salaryModel(req.body);

    newSalary.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Salary Added Successfully"
        })
    });
});

//Read Implementation
//http://localhost:8000/salary/readsalary


router.get("/readsalary", (req,res) =>{
    salaryModel.find().exec((err,salaries) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingSalary:salaries
        });
    });
});

//Update Implementation
//http://localhost:8000/salary/updatesalary/:id


router.put('/updatesalary/:salaryid',(req,res)=>{
    salaryModel.findByIdAndUpdate(
        req.params.salaryid,
        {
            $set:req.body
        },
        (err,update)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Salary Update Successfuly"
            });
        }
    );
});

//Delete Implementation //Not working
//http://localhost:8000/salary/deletesalary/:id


router.delete('/deletesalary/:salaryid',(req,res)=>{
    salaryModel.findByIdAndDelete(req.params.salaryid).exec((err,deleteSalary) =>{
        if(err) return res.status(400).json({
            message:"Salary Delete Unsuccesfully",err
        });

        return res.json({
            message:"Salary Delete Succesfully",deleteSalary
        });
    });
});

//Get specific payment
//http://localhost:8000/salary/getsalary/:id

router.get("/getsalary/:salaryid", (req,res) =>{
    let salaryID = req.params.salaryid;

    salaryModel.findById(salaryID,(err,salaries) => {
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            salaries
        })
    })
})

module.exports = router;