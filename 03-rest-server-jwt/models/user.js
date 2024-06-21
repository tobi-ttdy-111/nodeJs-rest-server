
// imports
const { Schema, model } = require( 'mongoose' );


// UserSchema
const UserSchema = new Schema({

    name: {
        type: String,
        required: [ true, 'invalid name' ]
    },

    email: {
        type: String,
        required: [ true, 'invalid email' ],
        unique: true
    },

    password: {
        type: String,
        required: [ true, 'invalid password' ]
    },


    role: {
        type: String,
        required: [ true, 'invalid rol' ]
    },

    status: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },

    img: {
        type: String
    }

});


// toJSON
UserSchema.methods.toJSON = function() {

    const { __v, _id, password, ...user } = this.toObject();
    user.uid = _id;
    return user;

};


// exports
module.exports = model( 'user', UserSchema );
