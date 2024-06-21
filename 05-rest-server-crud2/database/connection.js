
// imports
const mongoose = require( 'mongoose' );


// connection
const connection = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log( 'Database connected' );
    } catch ( err ) {
        console.log( `Connection error \n${ err }` );
    };

};


// exports
module.exports = connection;
