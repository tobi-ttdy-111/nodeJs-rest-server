
// imports
const { request, response } = require( 'express' );
const jwt = require( 'jsonwebtoken' );
const { UserSchema } = require( '../models' );


// validateJwt
const validateJwt = async( req = request, res = response, next ) => {

    const token = req.header( 'x-token' );

    if ( !token ) return res.status( 400 ).json({ msg: 'invalid token - !token' });
    try {
        const { uid } = jwt.verify( token, process.env.SECRET_KEY );
        if ( !uid ) return res.status( 401 ).json({ msg: 'invalid token - !uid' });
        const user = await UserSchema.findById( uid );
        if ( !user ) return res.status( 401 ).json({ msg: 'invalid token - !user' });
        if ( !user.status ) return res.status( 401 ).json({ msg: 'invalid token - status' });
        req.userAuth = user;
        next();
    } catch ( err ) {
        console.log( err );
        res.status( 500 ).json({ msg: 'Internal Server Error' });
    };

};


// exports
module.exports = validateJwt;
