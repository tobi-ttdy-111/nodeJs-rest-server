
// imports
const { request, response } = require( 'express' );


// validateRole
const validateRole = ( ...roles ) => {
    return ( req = request, res = response, next ) => {

        if ( !req.userAuth ) return res.status( 500 ).json({ msg: 'invalid role - !userAuth' });
        if ( !roles.includes( req.userAuth.role ) ) return res.status( 401 ).json({ msg: 'invalid role - role' });
        next();

    };
};


// exports
module.exports = validateRole;
