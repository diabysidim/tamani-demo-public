

const  nodemailer = require('nodemailer');
const handlebars =  require('handlebars');
const fs  = require('fs');


const transporter= nodemailer.createTransport({
        service: 'gmail',

        auth:{

            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,

        }

})






const option = (email, link, template) => {

    return {

            from: process.env.EMAIL,
            to: email, 
            subject: 'registration sur tamanii.com',
            html: template({link: link})
    }


}

module.exports = (emailInfo, callback) => {

    try{


    
        const source = fs.readFileSync(`helper-functions/hbs-templates/${emailInfo.type}-template.hbs`,'utf8')       
        const template = handlebars.compile(source);

        transporter.sendMail(option(emailInfo.email, emailInfo.link, template), (err, info) =>{

            if(err) throw new Error(err);

            else return callback(info);
        })


    }
    catch (e){


        return callback(undefined, e);

    }
      

}
