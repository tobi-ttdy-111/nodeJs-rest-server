
// imports
const { Schema, model } = require( 'mongoose' );


// ProductSchema
const ProductSchema = new Schema({

    name: {
        type: String,
        required: [ true, 'invalid category' ],
        unique: true
    },

    status: {
        type: Boolean,
        default: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [ true, 'invalid user' ]
    },

    price: {
        type: Number,
        default: 0
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [ true, 'invalid category' ]
    },

    description: {
        type: String
    },

    available: {
        type: Boolean,
        default: true
    }

});


// toJSON
ProductSchema.methods.toJSON = function() {

    const { __v, _id, ...product } = this.toObject();
    product.uid = _id;
    return product;

};


// exports
module.exports = model( 'product', ProductSchema );
