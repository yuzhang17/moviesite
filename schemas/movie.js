var mongoose= requeire('mongoose')

var MovieSchema =new mongoose.Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:Number,
	meta:{
		createAT:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}

})

MovieSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.creatAT=this.meta.updateAt=Date.now()

	}else{
		thie.meta.updateAt=Date.now();
	}

	next();

})

MovieSchema.statics={
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById:function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}