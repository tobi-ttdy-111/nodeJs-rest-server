
// imports
const { UserSchema,
        RoleSchema } = require( '../models' );


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


// exports
module.exports = {
    existsUserEmail,
    existsRole,
    existsUserId
};
