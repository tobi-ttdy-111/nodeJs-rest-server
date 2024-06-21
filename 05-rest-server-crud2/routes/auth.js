
// imports
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { postAuth,
        postAuthGoogle } = require( '../controllers/auth' );
const { validateReq } = require( '../middlewares' );


// router
const router = Router();


// post /auth
router.post( '/auth', [

    check( 'email', 'invalid email' ).isEmail(),
    check( 'password', 'invalid password - m' ).notEmpty(),
    validateReq

], postAuth );


// post /auth/google
router.post( '/auth/google', [

    check( 'id_token', 'invalid google token - m' ).notEmpty(),
    validateReq

], postAuthGoogle );


// exports
module.exports = router;
