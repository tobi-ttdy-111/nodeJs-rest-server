
// imports
const { isValidObjectId } = require( 'mongoose' );
const { response } = require( 'express' );
const { UserSchema,
        CategorySchema,
        ProductSchema } = require( '../models' );


// searchUser
const searchUser = async( term = '', res = response ) => {

    const searchById = isValidObjectId( term );
    if ( searchById ) {
        const user = await UserSchema.findById( term );
        return res.json({ results: ( user ) ? [ user ] : [] });
    };
    const regex = new RegExp( term, 'i' );
    const users = await UserSchema.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });
    res.json({ results: users });

};


// searchCategory
const searchCategory = async( term = '', res = response ) => {

    const searchById = isValidObjectId( term );
    if ( searchById ) {
        const category = await CategorySchema.findById( term ).populate( 'user', 'name' );
        return res.json({ results: ( category ) ? [ category ] : [] });
    };
    const regex = new RegExp( term, 'i' );
    const categorys = await CategorySchema.find({
        $or: [{ name: regex }],
        $and: [{ status: true }]
    }).populate( 'user', 'name' );
    res.json({ results: categorys });

};


// searchProduct
const searchProduct = async( term = '', res = response ) => {

    const searchById = isValidObjectId( term );
    if ( searchById ) {
        const product = await ProductSchema.findById( term ).populate( 'category', 'name' );
        return res.json({ results: ( product ) ? [ product ] : [] });
    };
    const regex = new RegExp( term, 'i' );
    const products = await ProductSchema.find({
        $or: [{ name: regex }, { description: regex }],
        $and: [{ status: true }]
    }).populate( 'category', 'name' );
    res.json({ results: products });

};


// exports
module.exports = {
    searchUser,
    searchCategory,
    searchProduct
};