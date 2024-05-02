const nodemailer = require("nodemailer");
require('dotenv').config()

// async..await is not allowed in global scope, must use a wrapper
exports.sendEmail = async(req, res, destinataire, token) => {
    console.log("DANS SEND EMAIL")

    console.log(destinataire, "destinataire")
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
    //   user: "thibault2399@hotmail.fr", // generated ethereal user
      user: "m.mercier1998@hotmail.com",
      pass: process.env.PASSWORD, // generated ethereal password
   
    },
  });
  let infoMail = {
    // from: "thibault2399@hotmail.fr", // sender address
    from: "m.mercier1998@hotmail.com",
    to: destinataire, // list of receivers
    // to: "melly.lucas32@yahoo.fr",
    subject: "Reset mot de passe", // Subject line
    // text: "Hello world?", // plain text body
    html: `Cliquer sur ce lien : <a href='http://localhost:3000/auth/resetpassword?token=${token.token}'>reset password</a>`
  };


  transporter.sendMail(infoMail, (err)=>{
    if(err){
      return console.log(err)
    }else{
      console.log(`Success`)
      res.status(200).send({
        success: true,
        message: "Email sended",
        // email: user?.email,
    });
    }
})

transporter.close()
}
