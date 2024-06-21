
// imports
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { getUser,
        postUser,
        putUser,
        deleteUser } = require( '../controllers/user' );
const { validateReq,
        validateJwt,
        validateRole } = require( '../middlewares' );
const { existsUserEmail,
        existsRole,
        existsUserId } = require( '../helpers/db-validators' );


// router
const router = Router();


// get /user
router.get( '/user', getUser );


// post /user
router.post( '/user', [

    check( 'name', 'invalid name - m' ).notEmpty(),
    check( 'email', 'invalid email - m' ).isEmail(),
    check( 'email' ).custom( existsUserEmail ),
    check( 'password', 'invalid password - m ' ).isLength({ min: 6 }),
    check( 'role' ).custom( existsRole ),
    validateReq

], postUser );


// put /user/:id
router.put( '/user/:id', [

    check( 'id', 'invalid id - m' ).isMongoId(),
    check( 'id' ).custom( existsUserId ),
    check( 'role' ).custom( existsRole ),
    validateReq

], putUser );


// delete /user/:id
router.delete( '/user/:id', [

    validateJwt,
    validateRole( 'ADMIN_ROLE' ),
    check( 'id', 'invalid id - m' ).isMongoId(),
    check( 'id' ).custom( existsUserId ),
    validateReq

], deleteUser );


// exports
module.exports = router;
