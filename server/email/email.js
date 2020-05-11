
const nodemailer = require('nodemailer');

// let config = require('./email/email_config.js');

let mailTransport = nodemailer.createTransport({
	service: 'smtp.163.com',
	host: 'smtp.163.com',
	port: 465,
	secureConnection: true,
	auth:{
		user: 'one_leaf_one_world@163.com',
 		pass: 'yunsongLee520025'	
	},
});




function send(To,Subject){

	let mailOptions = {
		from: '"前端小智" <one_leaf_one_world@163.com>', //邮件来源
		to: To, //邮件发送到哪里，多个邮箱使用逗号隔开
		subject: Subject, // 邮件主题
		text: 'Hello world ', // 存文本类型的邮件正文
		// html:        // html类型的邮件正文
        //                '<div style="width:600px;height:border:2px solid green;margin:0 auto;text-align:center;font-size:22px;font-color:yellow;">One_Leaf_One_World</div><br>'+  
		//        '<span style="font-size:18px;">'+To+':</span>'+'<br>'+  
        //                '<h1 style="text-indent:40px;">This email was sent from 前端小智</h1><br>',
	   html:  `
				<div style="margin-left:4%">
						<span style="font-size:18px;">Dear, ${To}: </span><br>  
						<h1 style="text-indent:2em;">This email was sent from <a href="http://yongsonglee.top" style="text-decoration: none;">前端小智</a></h1><br> 
						<p>你的验证码为 :</p>  
						<h2 style="color: blue; text-indent:1em">JTAHD235</h2>
						<p>请复制你的验证码返回完成验证</p>
						<p>Best Regards !!</p>
				</div>  
	   `


	        // 下面是发送附件，不需要就注释掉
		// attachments: [{
		// 		filename: 'index.js',
		// 		path: './index.js'
		// 		},
		// 		{
		// 			filename: 'content',
		// 			content: '发送内容'
		// 		}
		// ]

	};

	let status = mailTransport.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			return false;
		}else{
			console.log('sent email successfully');
			return true;
		}
	});
	
	return status;
}


exports.send = send; 
