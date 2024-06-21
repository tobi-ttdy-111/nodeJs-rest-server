
// imports
const { request, response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );
const { UserSchema } = require( '../models' );
const { generateJwt } = require( '../helpers' );


// postAuth
const postAuth = async( req = request, res = response ) => {

    const { email, password } = req.body;

    try {
        const user = await UserSchema.findOne({ email });
        if ( !user ) return res.status( 400 ).json({ msg: 'invalid user - !user' });
        if ( !user.status ) return res.status( 400 ).json({ msg: 'invalid user - !status' });
        if ( !bcryptjs.compareSync( password, user.password ) ) return res.status( 400 ).json({ msg: 'invalid user - password' });
        const token = await generateJwt( user._id );
        res.json({ user, token });
    } catch ( err ) {
        res.status( 500 ).json({ msg: 'Internal Server Error' });
    };

};


// exports
module.exports = {
    postAuth
};
