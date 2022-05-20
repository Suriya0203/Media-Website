var mongoose=require('mongoose');
require('dotenv').config();
mongoose
     .connect(process.env.DB, 
     { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected',mongoose.connection.host,mongoose.connection.db ))
     .catch(err => console.log( err ));


module.exports=mongoose;