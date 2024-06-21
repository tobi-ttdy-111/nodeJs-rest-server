
// imports
const { request, response } = require( 'express' );
const { CategorySchema } = require( '../models' );


// getCategory
const getCategory = async( req = request, res = response ) => {

    const { skip = 0, limit = 10 } = req.query;

    const [ total, categorys ] = await Promise.all([
        CategorySchema.countDocuments({ status: true }),
        CategorySchema.find({ status: true }).populate( 'user', 'name' )
            .skip( skip )
            .limit( limit )
    ]);

    res.json({ total, categorys });

};


// getCategoryId
const getCategoryId = async( req = request, res = response ) => {

    const { id } = req.params;

    const category = await CategorySchema.findById( id ).populate( 'user', 'name' );
    res.json({ category });

};


// postCategory
const postCategory = async( req = request, res = response ) => {

    const name = req.body.name.toUpperCase();
    const userAuth = req.userAuth;

    const category = new CategorySchema({ name, user: req.userAuth._id });
    await category.save();

    res.json({ category, userAuth });

};


// putCategory
const putCategory = async( req = request, res = response ) => {

    const name = req.body.name.toUpperCase();
    const { id } = req.params;
    const userAuth = req.userAuth;

    let category = await CategorySchema.findOne({ name: name.toUpperCase() });
    if ( category && category._id != id ) return res.status( 400 ).json({ msg: 'invalid name - name' });
    category = await CategorySchema.findByIdAndUpdate( id, { name: name.toUpperCase() } );

    res.json({ category, userAuth });

};


// deleteCategory
const deleteCategory = async( req = request, res = response ) => {

    const { id } = req.params;
    const userAuth = req.userAuth;

    const category = await CategorySchema.findByIdAndUpdate( id, { status: false } );

    res.json({ category, userAuth });

};


// exports
module.exports = {
    getCategory,
    getCategoryId,
    postCategory,
    putCategory,
    deleteCategory
};
