
// imports
const { Schema, model } = require( 'mongoose' );


// CategorySchema
const CategorySchema = new Schema({

    name: {
        type: String,
        required: [ true, 'invalid name' ]
    },

    status: {
        type: Boolean,
        default: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [ true, 'invalid user' ]
    }

});


// toJSON
CategorySchema.methods.toJSON = function() {

    const { __v, _id, ...category } = this.toObject();
    category.uid = _id;
    return category;

};


// exports
module.exports = model( 'category', CategorySchema );
