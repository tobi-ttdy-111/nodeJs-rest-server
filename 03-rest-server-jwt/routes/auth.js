
// imports
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { postAuth } = require( '../controllers/auth' );
const { validateReq } = require( '../middlewares' );


// router
const router = Router();


// post /auth
router.post( '/auth', [

    check( 'email', 'invalid email' ).isEmail(),
    check( 'password', 'invalid password - m' ).notEmpty(),
    validateReq

], postAuth );


// exports
module.exports = router;
