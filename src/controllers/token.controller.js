
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
            console.log("user", user)

            try{
                let token = await prisma.token.findUnique({
                    where:{
                        userId: user?.Id_Utilisateur,
                    }
                })
                console.log("token1", token)
                // if(token){
                    sendEmail.sendEmail(req, res, token, req.body.Email)
                        res.status(200).send({
                            success: true,
                            message: "Email sended",
                            // email: user?.email,
                        });
                // }
                // else{
                   
                // }
                
            }
            catch(err){
                console.log("err", err)
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
                    sendEmail.sendEmail(req, res, token, req.body.email)
                    res.status(200).send({
                        success: true,
                        message: "Email sended",
                        // email: user?.email,
                    });
                }
                catch(err){
                    console.log(err)
                }
                finally {
                    await prisma.$disconnect();
                }
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
