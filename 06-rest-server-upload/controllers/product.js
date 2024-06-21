
// imports
const { request, response } = require( 'express' );
const ProductSchema = require( '../models/product' );


// getProduct
const getProduct = async( req = request, res = response ) => {

    const { skip = 0, limit = 10 } = req.query;

    const [ total, products ] = await Promise.all([
        ProductSchema.countDocuments({ status: true }),
        ProductSchema.find({ status: true }).populate( 'category', 'name' )
            .skip( skip )
            .limit( limit )
    ]);

    res.json({ total, products });

};


// getProductId
const getProductId = async( req = request, res = response ) => {

    const { id } = req.params;

    const product = await ProductSchema.findById( id ).populate( 'category', 'name' );
    res.json({ product });

};


// postProduct
const postProduct = async( req = request, res = response ) => {

    const { name, price, category, description, available } = req.body
    const userAuth = req.userAuth;

    const product = new ProductSchema({ name: name.toUpperCase(), price, category, description, available, user: userAuth._id });
    await product.save();

    res.json({ product, userAuth });

};


// putProduct
const putProduct = async( req = request, res = response ) => {

    const { id } = req.params;
    const { _id, __v, user, name, ...update } = req.body;
    const userAuth = req.userAuth;

    let product = await ProductSchema.findOne({ name: name.toUpperCase() });
    if ( product && product._id != id ) return res.status( 400 ).json({ msg: 'invalid name'});
    update.name = name.toUpperCase();
    update.user = userAuth._id;
    product = await ProductSchema.findByIdAndUpdate( id, update );

    res.json({ product, userAuth });

};


// deleteProduct
const deleteProduct = async( req = request, res = response ) => {

    const { id } = req.params;
    const userAuth = req.userAuth;

    const product = await ProductSchema.findByIdAndUpdate( id, { status: false } );

    res.json({ product, userAuth });

};


// exports
module.exports = {
    getProduct,
    getProductId,
    postProduct,
    putProduct,
    deleteProduct
};
