
// imports
const { request, response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );
const { UserSchema } = require( '../models' );


// getUser
const getUser = async( req = request, res = response ) => {

    const { skip = 0, limit = 10 } = req.query;

    const [ total, users ] = await Promise.all([
        UserSchema.countDocuments({ status: true }),
        UserSchema.find({ status: true })
            .skip( skip )
            .limit( limit )
    ]);

    res.json({ total, users });

};


// postUser
const postUser = async( req = request, res = response ) => {

    const { name, email, password, role } = req.body;

    const user = new UserSchema({ name, email, password, role });
    const salt = bcryptjs.genSaltSync( 10 );
    user.password = bcryptjs.hashSync( password, salt );
    await user.save();

    res.json({ user });

};


// putUser
const putUser = async( req = request, res = response ) => {

    const { id } = req.params;
    const { email, password, google, _id, __v, ...update } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync( 10 );
        update.password = bcryptjs.hashSync( password, salt );
    };
    const user = await UserSchema.findByIdAndUpdate( id, update );

    res.json({ user });

};


// deleteUser
const deleteUser = async( req = request, res = response ) => {

    const { id } = req.params;
    const userAuth = req.userAuth;

    const user = await UserSchema.findByIdAndUpdate( id, { status: false } );

    res.json({ user, userAuth });

};


// exports
module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
};
