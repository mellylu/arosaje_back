
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const sendEmail = require("../utils/sendEmailForForgotPassword")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var JWT_SECRET = process.env.JWT_SECRET;



exports.sendEmailToResetPassword = async(req, res) => {

    if (req.body.Email) {
        try{
            let user = await prisma.user.findUnique({
                where: {
                    Email: req.body.Email,
                },
            })
           

            try{
                console.log("user", user)
                let token = await prisma.token.findUnique({
                    where:{
                        userId: user?.Id_Utilisateur,
                    }
                })
                console.log("token1", token)
                if(token){
                    sendEmail.sendEmail(req, res, req.body.Email, token)
                        
                }
                else{
                    const userToken = jwt.sign(
                        {
                            hash: randomString.generate(100),
                        },
                        JWT_SECRET,
                        {
                            expiresIn: 86400,
                        },
                    );
    
                    try{
                        const token = await prisma.token.create({
                            data: {
                                userId: user.Id_Utilisateur, 
                                token: userToken,
                            }
                        })
                        console.log("token2", token)
                        sendEmail.sendEmail(req, res, req.body.email, token)
                        
                    }
                    catch(err){
                        console.log(err)
                    }
                    finally {
                        await prisma.$disconnect();
                    }
                   
                }
                
            }
            catch(err){
                console.log("err", err)
                
            }
            finally {
                await prisma.$disconnect();
            }
        }
        catch(err){
            console.log(err)
        }
        finally {
            await prisma.$disconnect();
        }
    } 
    else {
        res.status(500).send({
            success: false,
            message: "Missing data",
        });
    }
    
                        
}


exports.formResetPassword = async(req, res) => {
    try{
        let token = await prisma.token.findUnique({
            where:{
                token: req.body.token,
            }
        })
        res.status(200).send({
            token: token
        })
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    }
    finally {
        await prisma.$disconnect();
    }
    
            
}


exports.updatepassword = async(req, res) => {
        
    try{
        console.log(user, "USER")
        const userUpdate = await prisma.user.update({
            where: {
                Id_Utilisateur: parseInt(req.body.Id_Utilisateur)
            },
            data: 
            {
                Mdp: bcrypt.hashSync(req.body.Mdp, 10),
            }
            })

            
        res.status(200).send({
                update: true
            })
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    }
    finally {
        await prisma.$disconnect();
    }
        
    
   
    
      
}