
// imports
const { OAuth2Client } = require( 'google-auth-library' );


// client
const client = new OAuth2Client( process.env.CLIENT_ID );


// googleVerify
async function googleVerify( token = '' ) {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const { name, picture, email } = ticket.getPayload();
    return { name, img: picture, email };

};


// exports
module.exports = googleVerify;
