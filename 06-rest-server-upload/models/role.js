
// imports
const { Schema, model } = require( 'mongoose' );


// RoleSchema
const RoleSchema = new Schema({


    role: {
        type: String,
        required: [ true, 'invalid role' ],
        unique: true
    }


});


// exports
module.exports = model( 'role', RoleSchema );
