const mongoose =  require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/React', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('error',()=>console.log('mongo connection error'));
db.once('open',()=>console.log('mongo connection successed'));


/*
   the schema for all admins, the tag always be 1  , in /React/admins collection
*/
const adminSchema = mongoose.Schema({
	username: String,
	password: String,
	gender: String,
	email: String,
	tag: Number       // 1--->administrator.
},{
   collection:'admins'
});
/*
   the schema for all common users, the tag always be 0 ,   in /React/users collection
*/
const userSchema = mongoose.Schema({
	username: String,
	password: String,
	gender: String,
	email: String,
	tag: Number       // 0--->ordinary usre
},{
    collection:'users'
});
/*
   the schema for all comments on article or comment board,  in /React/comments collection
*/
const commentSchema = mongoose.Schema({
	username: String,
	avatar: String,
	commentDate: Date,
	comment: String,
	likes: Number,
	dislikes: Number
},{
	collection:'comments'
});

/*
   the schema for all notes,  in /React/notes collection
*/
const noteSchema = mongoose.Schema({
	username: String,
	time: Date,
	note: String,
},{
	collection: 'notes'
});

/*
   the schema for all articles , replys and comments, array nested array, in /React/articles collection
*/
const replySchema = mongoose.Schema({     // the reply to the article comments
	time: Date,
	from: String,
	to: String,
	comment: String
})
const articleCommentSchema = mongoose.Schema({
	time: Date,
	from: String,
	comment: String,
	commentItem: [replySchema]         //  single user's behavior
})
const articleSchema = mongoose.Schema({    
	articleTitle: String,    
	articleType: String,          
	content: String,
	author: String,
	createDate: Date,
	starsNum: Number,
	views: Number,
	comments: [articleCommentSchema]         // multiple users' behavior
},{
    collection:'articles'
});

/*
   the schema for all daily moods, share the uper's mood and funny things,  in /React/moods collection
*/
const moodSchema = mongoose.Schema({
	username: String,
	avatarPath: String,
	contentDate: Date,
	content: String,
	imagePath: String,
	likes: Number,
	dislikes: Number
},{
	collection:'moods'
});


const Models = {
	Admin: mongoose.model('admins',adminSchema),   //NAME,SCHEMA,[COLLECTION_NAME]
	User: mongoose.model('users',userSchema),   //NAME,SCHEMA,[COLLECTION_NAME]
	Comment: mongoose.model('board_comments',commentSchema),     
	Article: mongoose.model('articles',articleSchema),
	Mood: mongoose.model('moods',moodSchema),
	Note: mongoose.model('notes', noteSchema)
}

module.exports = Models;
