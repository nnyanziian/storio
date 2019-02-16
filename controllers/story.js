
var mongoose = require('./connect').mongoose;
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var ObjectId = require('mongodb').ObjectID;
const config = require('../config/jwt.json');

const thisApp = this;
const saltRounds = 10;
const secret = config.secret;


exports.verifyAfterLogin = function(req, res){
    var sent_token = req.headers['authorization'];
    if(!sent_token){
        console.log("Error: authorization is required in headers");
        res.status(400).json({
            error:"authorization is required in headers"
        });
    }else{
        jwt.verify(sent_token, secret, function(err, decoded) {
            if (err) return res.status(400).json({ auth: false, message: 'Failed to authenticate token.'}); 
            res.status(200).json({
                msg:"Token verified"
            });
        });
    }
}
exports.verifyLogin = function(req, res, next){
    var sent_token = req.headers['authorization'];
    if(!sent_token){
        res.status(400).json({
            error:"Authorization is required in headers"
        });
    }else{
        jwt.verify(sent_token, secret, function(err, decoded) {
            if (err) return res.status(400).send({ auth: false, message: 'Authentication failure.'}); 
            next()
        });
    }
}
exports.checkuserAvailability = function (req, res) {
    if(req.body.username){
        
    User.countDocuments({username:req.body.username}, function (err, data) {
        if (err) {
           res.status(500).json({error:err});
        } else {
            if(data>0){
                res.status(400).json({error:"Username already taken"});

            }else{
                res.status(200).json({msg:"Username available"});
            }
            
        }
    });
}
else{
    res.status(400).json({error:"Username is required"});
}

};
exports.register = function (req, res, next) {

    User.countDocuments({username:req.body.username}, function (err, data) {
        if (err) {
           res.status(500).json({error:err});
        } else {
            if(data>0){
                //check to see if not approved send link
                thisApp.checkApproval(req, res, next);
            }else{

    bcrypt.hash(req.body.password, saltRounds,function(err, hash){
        var x = req.body;
        x.password = hash;
        var newUser = new User(x);
        newUser.save(function (err, data) {
            if (err) {
               res.status(500).json({error:err});
            } else {
                res.status(201).json({msg:"User registered successfully"});
            }
        });
    
    });
            }
            
        }
    });

};

exports.returnUploaded = function (req, res, next) {
       
        if(req.file){
            res.status(201).json({
                file:req.file
            });
        }else{
            res.status(400).json({
                error:"audio is required to upload a file",
            });
        }
};

exports.checkApproval = function (req, res, next){
    User.findOne({username:req.body.username}, function (err, data) {
        if (err) {
           res.status(500).json({error:err});
        } else {
            if(data>0){
                //check to see if not approved send link
                
                
                next();
            }
            
                
            else{
                res.status(400).json({
                    error:"username is already in use",
                });
            }
        }
        
});
}
exports.login = function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    if(!username){
        res.status(400).json({
            error:"username is required",
        });
    }
    else if(!password){
        res.status(400).json({
            error:"Password is required"
        });
    }
    else{
    User.findOne({"username":username,},function(err, datax){
            if (err) {
                res.status(400).json({
                    error:err
                });
             } else {
                 if(datax !=null){
                    bcrypt.compare(password, datax.password, function(err, data) {
                        if(data===false){
                            console.log({
                                error:"400 :: Authentication has failed"
                            });
                            res.status(400).json({
                                error:"Authentication has failed"
                            });
                        }
                        else{
                            var token = jwt.sign({ id: data._id }, secret, {
                                expiresIn: 86400*360 // expires in One year
                              });
                            res.status(200).json({
                                token:token,
                                id:datax._id,
                                name:datax.username
                            });
                        }
                    });
                 }
                 else{
                    console.log({
                        error:"400 :: User account not found"
                    })
                    res.status(400).json({
                        error:"User account not found",
                    });
                 }

             }  
        });
    }
  
}

exports.search = function (req, res) {
    let searchString = req.body.searchString;
    console.log(searchString);
    User.find({$text:{$search:searchString.toString()}}, function (err, data) {
        if (err) {
           res.status(500).json({error:err});
        } else {
            res.status(200).json(data);
        }
    });
};

exports.getById = function (req, res) {
    var id = req.params.id;
    User.findById(id, function (err, data) {
        if (err) {
           res.status(500).json({error:err});
        } else {
            res.status(200).json(data);
        }
    });
};
exports.update = function (req, res) {
    var updateData =req.body;
    var id  = req.params.id;

    User.findByIdAndUpdate(id,updateData,{new:true},function (err, data) {
        if (err) {
           res.status(500).json({error:err});
        } else {
            res.status(201).json({"msg":"User updated successfully", data});
        }
    });
};



exports.delete = function (req, res) {
    var updateData ={
        
    };
    var id  = req.params.id;
    //find if user attached to any other collection if so prompt error and dod not continue
    User.findByIdAndDelete(id,updateData,function (err, data) {
        if (err) {
           res.status(500).json({error:err});
        } else {
            res.status(201).json({"msg":"User updated successfully"});
        }
    });


};








