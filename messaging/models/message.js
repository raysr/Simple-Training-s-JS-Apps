let connection = require('./db');
let moment = require('moment');
moment.locale('fr');
class Message{
	constructor(row){
		this.row=row;
	}
	get content(){
		return this.row.content;
	}
	get created_at(){
		return moment(this.row.created_at);
	}
	get id(){
		return this.row.id;
	}

	static create(content, callback)
	{
		connection.query('INSERT INTO messages SET content=?, created_at=?',[content,new Date()], (err, result)=>{
			if(err) throw err;
			callback(result);
		});
	}
	static find(id, callback){
		connection.query('SELECT * from messages WHERE id = ? LIMIT 1',[id],(err, rows)=>{
			if(err) throw err;

			callback(new Message(rows[0]));
		})
	}




	static all(callback)
	{
		connection.query('SELECT * from messages',(err, rows)=>{
			if(err) throw err;
			callback(rows.map((row)=> new Message(row)));
		})
	}
}

module.exports = Message;