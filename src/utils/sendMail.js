const nodemailer = require("nodemailer");

const sendMail = async (clint)=>{
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
        user: 'axel.bernhard65@ethereal.email',
        pass: 'CCKWEkHYrWKejjUpUB'
    },
    });

    let info = await transporter.sendMail({
        from: 'axel.bernhard65@ethereal.email',
        to: clint,
        subject:subject,
        text: text
    })

}