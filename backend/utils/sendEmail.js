const nodemailer=require("nodemailer")
//const { options } = require("../route/productroute")

const sendEmail=async(options)=>{
     const transporter=nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
     })
     const mailoptions={
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message 
     }
     await transporter.sendMail(mailoptions)        

}
module.exports=sendEmail