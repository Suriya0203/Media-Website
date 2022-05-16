var mongoose=require('mongoose')

mongoose
     .connect("mongodb+srv://Suriya:%24uriyA%402003@cluster0.g1bqx.mongodb.net/media?retryWrites=true&w=majority", 
     { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected',mongoose.connection.host,mongoose.connection.db ))
     .catch(err => console.log( err ));


module.exports=mongoose;