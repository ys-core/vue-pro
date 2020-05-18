const models = require('./db');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');   //crypto the password
const email = require('./email/email');

/*
	save administrator in /React/admins collection
*/
router.post('/add_admin',(req,res)=>{
	let md5 = crypto.createHash("md5");
	let newCryptoedPassword = md5.update(req.body.password).digest("hex");
	let newAdmin = new models.Admin({
		username: req.body.username,
		password: newCryptoedPassword,
        gender: req.body.gender,
		email: req.body.email,
		tag: req.body.tag
	});
	newAdmin.save((err)=>{
		if(err){
			console.log(err);
			res.send({status:'false'});
		}
		// console.log('save admin in admins collection successfully')
		res.send({status:'true'});
	});
});
/*
	save common user in /React/users collection
*/
router.post('/add_user',(req,res)=>{
	let md5 = crypto.createHash("md5");
	let newCryptoedPassword = md5.update(req.body.password).digest("hex");
	let newUser = new models.User({
		username: req.body.username,
		password: newCryptoedPassword,
		gender: req.body.gender,
		email: req.body.email,
		tag: req.body.tag
	});
	newUser.save((err)=>{
		if(err){
			console.log(err);
			res.send({status:'false'});
			return;
		}
		// console.log('save user in users collection successfully')
		res.send({status:'true'});
	});
});
/*
	validate admin is in /React/admins collection or not, via username or email to verify
*/
router.post('/verify_admin',(req,res)=>{

	models.Admin.find((err,data)=>{
		if(err){
            console.log('query admin in database failed');
			res.send(err);
		}
		else{
	
			let md5 = crypto.createHash("md5");
			let newCryptoedPassword = md5.update(req.body.password).digest("hex");
			console.log(data.length);

			if(req.body.username != ''){                 // validate via username
				for(var i = 0; i < data.length; i ++){
					if((req.body.username == data[i].username) && (newCryptoedPassword == data[i].password)){
						console.log('admin exists in mongodb database via username query.');
						break;   // when i=data.length-1 and then break,i would not execute ++
					}
				}

				if(i < data.length){
					res.send({status:'true',tag:data[i].tag,username:data[i].username})        //administrator's username and password matched
				}else{
					console.log('can not find this admin in database !');
					res.send({status:'false',tag:0,username:''});
				}
			}else{                                        //validate via email
				for(var i = 0; i < data.length; i ++){
					if((req.body.email == data[i].email) && (newCryptoedPassword == data[i].password)){
						console.log('admin exists in mongodb database via email query.')
						break;   //when i=data.length-1 and then break,i would not execute ++
					}
				}
	
				if(i < data.length){
					res.send({status:'true',tag:data[i].tag,username:data[i].username});       //administrator's username and password matched
				}else{
					console.log('can not find this admin in database !');
					res.send({status:'false',tag:0,username:''});
				}
			}
		}
	})
});
/*
	validate user is in /React/users collection or not, via username or email to verify
*/
router.post('/verify_user',(req,res)=>{

	models.User.find((err,data)=>{
		if(err){
            console.log('query user in database failed');
			res.send(err);
		}
		else{
			let md5 = crypto.createHash("md5");
			let newCryptoedPassword = md5.update(req.body.password).digest("hex");
			console.log(data.length);

			if(req.body.username != ''){                 // validate via username
				for(var i = 0; i < data.length; i ++){
					if((req.body.username == data[i].username) && (newCryptoedPassword == data[i].password)){
						console.log('user exists in mongodb database via username query.');
						break;   // when i=data.length-1 and then break,i would not execute ++
					}
				}
				if(i < data.length){
					res.send({status:'true',tag:data[i].tag,username:data[i].username})        //common user's username and password matched
				}else{
					console.log('can not find this user in database !');
					res.send({status:'false',tag:0,username:''});
				}
			}else{                                        //validate via email
				for(var i = 0; i < data.length; i ++){
					if((req.body.email == data[i].email) && (newCryptoedPassword == data[i].password)){
						console.log('user exists in mongodb database via email query.')
						break;   //when i=data.length-1 and then break,i would not execute ++
					}
				}
	
				if(i < data.length){
					res.send({status:'true',tag:data[i].tag,username:data[i].username});     //common user's username and password matched
				}else{
					console.log('can not find this user in database !');
					res.send({status:'false',tag:0,username:''});
				}
			}
		}
	})
});

/*
	create an mood state and add it to /React/moods collection
*/
router.post('/add_mood',(req,res)=>{
	// console.log(req.body.username, req.body.avatar);
	let newMood = new models.Mood({
		username: req.body.username, 
		avatarPath: req.body.avatarPath,
		contentDate: req.body.contentDate,
		content: req.body.content,
		imagePath: req.body.imagePath,
		likes: req.body.likes,
		dislikes: req.body.dislikes
	})
	newMood.save((err)=>{
		if(err){
			console.log(err);
			res.send({status:'false'});
		}else{
			console.log('save mood in moods collection successfully')
			res.send({status:'true'});
		}

	})
})

/*
	create a note and add it to /React/notes collection
*/
router.post('/add_note',(req,res)=>{
   let { username, time, note } = req.body
	let newNote = new models.Note({	username, time, note })
	newNote.save((err)=>{
		if(err){
			console.log(err);
			res.send({status:'false'});
		}else{
			// console.log('save note in notes collection successfully')
			res.send({status:'true'});
		}

	})
})

/*
	delete a note from /React/notes collection
*/
router.post('/delete_note',(req,res)=>{
	 let { _id } = req.body
	 models.Note.deleteOne({ _id }, err => {
		if(err){
			console.log(err);
			res.send({status:'false'});
		}else{
			// console.log('remove a note from /React/notes collection successfully')
			res.send({status:'true'});
		}
	 })
 })

/*
	create an article and add it to /React/articles collection
*/
router.post('/add_article',(req,res)=>{
	// console.log(req.body.articleTitle, req.body.articleType);
	// console.log(req.body.starsNum,req.body.views)
	let newArticle = new models.Article({
		articleTitle: req.body.articleTitle, 
		articleType: req.body.articleType,
		content: req.body.content,
		author: req.body.author,
		createDate: req.body.createDate,
		starsNum: req.body.starsNum,
		views: req.body.views
	})
	newArticle.save((err)=>{
		if(err){
			console.log(err);
			res.send({status:'false'});
			return;
		}
		console.log('save article in articles collection successfully')
		res.send({status:'true'});
	})
})

/*
	add an article comment  to /React/articles collection
*/
router.post('/add_article_comment',(req,res)=>{
	// console.log('save comment in comments array of articles collection successfully')
	const { from ,time, _id, comment } = req.body
	let new_article_comment = {	time, from, comment }
	models.Article.updateOne({  _id }, {'$push' : { comments :  new_article_comment  }},(err,data)=>{
		if(err){
			console.log('add the article comment failed');
			res.send({ status:'false' });
		}else{
			res.send({ status:'true' });
		}
	})
})

/*
	add a board reply  to /React/comments collection
*/
router.post('/add_board_reply',(req,res)=>{
	const { from , to, time, _id, comment } = req.body
	let new_board_reply = {	time, from, to, comment }
	models.Comment.updateOne({  _id }, {'$push' : { commentReplys :  new_board_reply  }},(err,data)=>{
		if(err){
			console.log('add the board reply failed');
			res.send({ status:'false' });
		}else{
			res.send({ status:'true' });
		}
	})
})

/*
	add an article comment  reply to /React/articles collection
*/
router.post('/article/add_comment_reply',(req,res)=>{
	// console.log('save the reply on someone comment in comments array of articles collection successfully')
	const { from , to, time, _id, comment } = req.body
	let new_article_comment = {	time, from, to, comment }
	// models.Article.updateOne({  _id }, {'$push' : { comments :  new_article_comment  }},(err,data)=>{
	// 	if(err){
	// 		console.log('add the article comment failed');
	// 		res.send({ status:'false' });
	// 	}else{
	// 		res.send({ status:'true' });
	// 	}
	// })
})



/*
	update an article and update it to /React/articles collection
*/
router.post('/update_article',(req,res)=>{
	const { _id, articleTitle, articleType, content, author, createDate, starsNum, views } = req.body
	models.Article.findOneAndUpdate({ _id },{ $set : { articleTitle, articleType, content, author, createDate, starsNum, views }},{ new : true }, (err,doc) => {
		if(err){
			console.log("update article content failed ");
			res.send({ status:'false' });
		}else{
			res.send({ status: 'true' });
		}
	})

})

/*
	delete an article from /React/articles collection
*/
router.post('/delete_article',(req,res)=>{
	const { _id, createDate } = req.body
	models.Article.deleteOne({  _id  },(err)=>{
		if(err){
			console.log('delete article failed');
			res.send({ status:'false' });
		}else{
			// console.log("deleting ok");
			res.send({ status:'true' });
		}
	})

})

/*
	create an board comment and add it to /React/comments collection
*/
router.post('/add_board_comment',(req,res)=>{
	const { username, avatar, commentDate, comment, likes,dislikes } = req.body
	let newComment = new models.Comment({
		username, avatar, commentDate, comment, likes,dislikes
	})
	newComment.save((err)=>{
		if(err){
			console.log(err);
			res.send({status:'false'});
		}
		// console.log('save comment in comments collection successfully')
		res.send({status:'true'});
	})

})
/*
	add likes for one board comment to /React/comments collection
*/
router.post('/board/update_comment_likes',(req,res)=>{
	const { _id } = req.body
	const likes = parseInt(req.body.likes) + 1
	// console.log(_id,likes)
	// update the views and return the doc.likes
	models.Comment.findOneAndUpdate({_id:_id},{$set:{likes:likes}},{new: true}, (err,doc) => {
		if(err){
			console.log("add the likes num failed ");
			res.send({status:'false'});
		}else{
			// console.log(doc.likes)
			res.send({status: 'true', likes: doc.likes});
		}
	})
})
/*
	add dislikes for one board comment to /React/comments collection
*/
router.post('/board/update_comment_dislikes',(req,res)=>{
	const { _id } = req.body
	const dislikes = parseInt(req.body.dislikes) - 1
	// update the views and return the doc.dislikes 
	// console.log(_id,dislikes)
	models.Comment.findOneAndUpdate({_id:_id},{$set:{dislikes:dislikes}},{new: true}, (err,doc) => {
		if(err){
			console.log("add the dislikes num failed ");
			res.send({status:'false'});
		}else{
			// console.log(doc.dislikes)
			res.send({status: 'true', dislikes: doc.dislikes});
		}
	})

})
/*
	add likes for mood state, /React/moods collection
*/
router.post('/mood/update_mood_likes',(req,res)=>{
	const { _id } = req.body
	const likes = parseInt(req.body.likes) + 1
	models.Mood.findOneAndUpdate({_id:_id},{$set:{likes:likes}},{new: true}, (err,doc) => {
		if(err){
			console.log("add the likes num failed ");
			res.send({status:'false'});
		}else{
			// console.log(doc.likes)
			res.send({status: 'true', likes: doc.likes});
		}
	})
})
/*
	add dislikes for mood state, /React/moods collection
*/
router.post('/mood/update_mood_dislikes',(req,res)=>{
	const { _id } = req.body
	const dislikes = parseInt(req.body.dislikes) - 1
	models.Mood.findOneAndUpdate({_id:_id},{$set:{dislikes:dislikes}},{new: true}, (err,doc) => {
		if(err){
			console.log("add the dislikes num failed ");
			res.send({status:'false'});
		}else{
			// console.log(doc.dislikes)
			res.send({status: 'true', dislikes: doc.dislikes});
		}
	})

})

/*
	delete one board comment from /React/comments collection
*/
router.post('/board/delete_comment',(req,res)=>{
	const { _id } = req.body
	models.Comment.deleteOne({ _id }, (err) => {
		if(err){
			console.log(" delete the board comment failed ");
			res.send({ status : 'false' });
		}else{
			res.send({ status : 'true' });
		}
	})
})
/*
	delete one mood state from /React/moods collection
*/
router.post('/mood/delete_mood',(req,res)=>{
	const { _id } = req.body
	models.Mood.deleteOne({ _id }, (err) => {
		if(err){
			console.log(" delete the board comment failed ");
			res.send({ status : 'false' });
		}else{
			res.send({ status : 'true' });
		}
	})
})
/*
	add stars for one article/blog /React/articles collection
*/
router.post('/article/update_stars',(req,res)=>{
	const { _id } = req.body
	const starsNum= parseInt(req.body.starsNum) + 1
	// update the starsNum and return the doc, send doc.starsNum to front end
	models.Article.findOneAndUpdate({_id:_id},{$set:{starsNum:starsNum}},{new: true}, (err,doc) => {
		if(err){
			console.log("update stars failed ");
			res.send({status:'false'});
		}else{
			// console.log(doc.starsNum)
			res.send({status: 'true', starsNum: doc.starsNum});
		}
	})

})








/*
	get all moods  info from /React/moods collection
*/

//models.Mood.find({}).sort({commentDate: -1}).exec((err,data)=>{}
router.get('/getAllMoods',(req,res)=>{
	models.Mood.find({}).sort({'createDate':-1}).exec((err,data)=>{
		if(err){
			console.log("query articles error");
			res.send({status:'false'});
		}else{
			res.send({status: 'true', Moods: data});
		}
	})
})

/*
	get all notes info from /React/notes collection
*/

//models.Note.find({}).sort({ time: -1}).exec((err,data)=>{}
router.get('/getAllNotes',(req,res)=>{
	models.Note.find({}).sort({ 'time' : -1 }).exec((err,data)=>{
		if(err){
			console.log("query notes error");
			res.send({status:'false'});
		}else{
			res.send({status: 'true', Notes: data});
		}
	})
})
/*
	get all articles info from /React/articles collection
*/

//models.Comment.find({}).sort({commentDate: -1}).exec((err,data)=>{}
router.get('/getAllArticles',(req,res)=>{
	models.Article.find({}).sort({'createDate':-1}).exec((err,data)=>{
		if(err){
			console.log("query articles error");
			res.send({status:'false'});
		}else{
			res.send({status: 'true', allArticles: data});
		}
	})
})
/*
	get all articles brief info except article.content from /React/articles collection
*/

router.get('/getAllArticlesBriefInfo',(req,res)=>{
	models.Article.find({},{content:0,comments:0}).sort({'createDate':-1}).exec((err,data)=>{
		if(err){
			console.log("query articles error");
			res.send({status:'false'});
		}else{
			res.send({status: 'true', allArticles: data});
		}
	})
})

/*
	get one article by _id from /React/articles collection
*/
router.get('/getOneArticle/:_id',(req,res)=>{
	const { _id } = req.params
	// console.log(_id,parseInt(req.query.views)+1)
	const views = parseInt(req.query.views) + 1
	// update the views and return the doc 
	if(views > 0){
		models.Article.findOneAndUpdate({_id:_id},{$set:{ views }},{new: true}, (err,doc) => {
			if(err){
				console.log("update the views failed, can't return the correct doc.");
				res.send({status:'false'});
			}else{
				// console.log(doc)
				res.send({status: 'true', article: doc});
			}
		})
	}else{      
		models.Article.findById({_id: _id},(err,data)=>{
			if(err){
				console.log("query articles error");
				res.send({status:'false'});
			}else{
				// res.send({status: 'true', article: data});
				let views = data.views
				views += 1
				models.Article.findOneAndUpdate({_id:_id},{$set:{ views }},{new: true}, (err,doc) => {
					if(err){
						console.log("update the views failed, can't return the correct doc.");
						res.send({status:'false'});
					}else{
						// console.log(doc)
						res.send({status: 'true', article: doc});
					}
				})

			}
		})
	}


})

/*
	get one article info from /React/articles collection, just for using F5 refresh function, will not add the views
*/
router.get('/getOneArticleById',(req,res)=>{
	let _id  = req.query._id
	// console.log(_id)
	models.Article.findById({_id: _id},(err,data)=>{
		if(err){
			console.log("query articles error");
			res.send({status:'false'});
		}else{
			res.send({status: 'true', article: data});
		}
	})
})

/*
	get articles by category from /React/articles collection
*/
router.get('/getArticles/:_category',(req,res)=>{
	const { _category } = req.params
	// console.log(_category)
	models.Article.find({'articleType':_category}).sort({'createDate':-1}).exec((err,doc)=>{
		if(err){
			console.log("get articles by articleType error");
			res.send({status:'false'});
		}else{
			// console.log(data)
			res.send({status: 'true', articles: doc});
		}
	})



})

/*
	get all board comments from /React/comments collection
*/
router.get('/getAllBoardComments',(req,res)=>{
	// console.log('hello')
	models.Comment.find({}).sort({commentDate: -1}).exec((err,data)=>{
		if(err){
			console.log("get board comments error");
			res.send({status:'false'});
		}else{
			res.send({status: 'true', comments: data});
		}
	})
})
/*
	delete one article from /React/articles collection
*/
router.get('/deleteArticle',(req,res)=>{
	let articleID = req.query.articleID;
	models.Article.deleteOne({createDate:articleID},(err)=>{
		if(err){
			console.log('delete article action failed');
			res.send({status:'false'});
		}else{
			res.send({status:'true'});
		}
	})
})
/*
	delete one board comment from /React/comments collection
*/
router.get('/deleteBoardComment',(req,res)=>{
	let commentID = req.query.commentID;
	models.Comment.deleteOne({commentTime: commentID},(err)=>{
		if(err){
			console.log('delete one board comment failed');
			res.send({status:'false'});
		}else{
			res.send({status:'true'});
		}
	})
})

/*
	save all comments in comments collection
*/
router.get('/save_comments',(req,res)=>{
        /* console.log(req); */
	let newComments = new models.Comment({
		comment: req.query.newcomment,
		username: req.query.username,
		date: req.query.date
	});

	newComments.save((err,data)=>{
		if(err){
			res.send({status:'false'});
		}
		else{
			console.log('save comments in Mongodb Database successed!');
			res.send({status:'true'});
		}
	});
});
	/*
		update the comment in comments collection
	*/
router.get('/update_comments',(req,res)=>{

        let condition = {
			comment: req.query.oldcomment,
			username: req.query.username,
        };
        let update = {$set:{comment:req.query.newcomment,date:req.query.date}};

	models.Comment.update(condition,update,function(err){
		if(err){
                        console.log(err);
			res.send({status:'false'});
		}
		else{
			console.log('update successfully');
		//	res.send({staus:'true'});
                        res.send({status:'true'});
		}
	});
	
});
	/*
		query all comments from comments collection in Mongodb Database
	*/
router.post('/query_comments',(req,res)=>{

	models.Comment.find({}).sort({date:-1}).exec(function(err,data){
		if(err){
            console.log(err);
			res.send(err);
		}
		else{
		//	console.log(data);
		//	res.send({staus:'true'});
                        res.send(data);
		}
	});
});
	/*
		delete one comment by date when clicking the delete icon
	*/
router.get('/delete_comment',(req,res)=>{
        console.log(req.query.date);
	models.Comment.remove({date:req.query.date},(err,data)=>{
		if(err){
			res.send({status:'false'});
		}
		else{
			console.log('delete one comment in Mongodb Database successed!');
			res.send({status:'true'});
		}
	});
});


router.get('/send_emails',(req,res)=>{

	console.log('get the email request ~~~~');
	// email.send('yonnsongLee@163.com');
	let result = email.send('yonnsongLee@163.com','邮件主题');
	if(result){
		console.log("send true")
		res.send({ status: 'ture' })
	}else{
		console.log("send failed")
		res.send({ status: 'false' })
	}

});


module.exports = router;
