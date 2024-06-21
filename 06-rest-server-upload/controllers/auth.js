
// imports
const { request, response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );
const { UserSchema } = require( '../models' );
const { generateJwt,
        googleVerify } = require( '../helpers' );


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


// postAuthGoogle
const postAuthGoogle = async( req = request, res = response ) => {

    const { id_token } = req.body;

    try {
        const { name, email, img } = await googleVerify( id_token );
        let user = await UserSchema.findOne({ email });
        if ( !user ) {
            const userData = { name, email, img, password: ':P', google: true, role: 'USER_ROLE' };
            user = new UserSchema( userData );
            await user.save();
        };
        if ( !user.status ) return res.status( 401 ).json({ msg:'invalid google token - !status' });
        const token = await generateJwt( user.id );
        res.json({ user, token });
    } catch ( error ) {
        res.status( 500 ).json({ msg: 'Internal Server Error' });
    };

};


// exports
module.exports = {
    postAuth,
    postAuthGoogle
};
