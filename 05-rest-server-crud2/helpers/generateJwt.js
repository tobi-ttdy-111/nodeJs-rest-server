
// imports
const jwt = require( 'jsonwebtoken' );


// generateJwt
const generateJwt = ( uid = '' ) => {
    return new Promise( ( resolve, reject ) => {

        const payload = { uid };
        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '1h',
        }, ( err, token ) => {
            if ( err ) {
                console.log( err );
                reject( 'token generation error' );
            } else {
                resolve( token );
            };
        });

    });
};


// exports
module.exports = generateJwt;
