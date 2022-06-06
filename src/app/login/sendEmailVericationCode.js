import nodemailer from 'nodemailer'
import emailUser from '../../config/email.config.js'

//发送邮件验证码
export const sendVerificationCode = async (email, code) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.163.com",
        port: 25,
        secure: false,
        auth: {
            user: emailUser.user, // 测试用户
            pass: emailUser.pass, // 测试密码
        },
    })

    const mailOptions  = {
        from: '"chengjiang个人主页" <web_design_01@163.com>', // 发送者昵称和地址
        to: email, // 接收者的邮箱地址
        subject: '登录验证码', // 邮件主题
        html: `<h1>验证码：${code}</h1>`
    }

    transporter.sendMail(mailOptions , (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('邮件发送成功 ID：', info.messageId);
    }); 
}