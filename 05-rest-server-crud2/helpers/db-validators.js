
// imports
const { UserSchema,
        RoleSchema,
        CategorySchema,
        ProductSchema } = require( '../models' );


// existsUserEmail
const existsUserEmail = async( email = '' ) => {

    const exists = await UserSchema.findOne({ email });
    if ( exists ) {
        throw new Error( `invalid email ${ email }` );
    };

};


// existsRole
const existsRole = async( role = '' ) => {

    const exists = await RoleSchema.findOne({ role });
    if ( !exists ) {
        throw new Error( `invalid role ${ role }` );
    };

};


// existsUserId
const existsUserId = async( id = '' ) => {

    const exists = await UserSchema.findById( id );
    if ( !exists ) {
        throw new Error( `invalid id ${ id }` );
    };

};


// existsCategoryName
const existsCategoryName = async( categoryName = '' ) => {

    const name = categoryName.toUpperCase();
    const exists = await CategorySchema.findOne({ name });
    if ( exists ) {
        throw new Error( `invalid name ${ name }` );
    };

};


// existsCategoryId
const existsCategoryId = async( id = '' ) => {

    const exists = await CategorySchema.findById( id );
    if ( !exists ) {
        throw new Error( `invalid id ${ id }` );
    };

};


// existsProductName
const existsProductName = async( productName = '' ) => {

    const name = productName.toUpperCase();
    const exists = await ProductSchema.findOne({ name });
    if ( exists ) {
        throw new Error( `invalid name ${ name }` );
    };

};


// existsProductId
const existsProductId = async( id = '' ) => {

    const exists = await ProductSchema.findById( id );
    if ( !exists ) {
        throw new Error( `invalid id ${ id }` );
    };

};


// exports
module.exports = {
    existsUserEmail,
    existsRole,
    existsUserId,
    existsCategoryName,
    existsCategoryId,
    existsProductName,
    existsProductId
};
