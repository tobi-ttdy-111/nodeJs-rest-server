
// imports
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validateReq,
        validateJwt,
        validateRole } = require( '../middlewares' );
const { getCategory,
        getCategoryId,
        postCategory,
        putCategory,
        deleteCategory } = require( '../controllers/category' );
const { existsCategoryName,
        existsCategoryId } = require( '../helpers/db-validators' );


// router
const router = Router();


// get /category
router.get( '/category', getCategory );


// get /category/:id
router.get( '/category/:id', [

    check( 'id', 'invalid id - m' ).isMongoId(),
    check( 'id' ).custom( existsCategoryId ),
    validateReq

], getCategoryId );


// post /category
router.post( '/category', [

    validateJwt,
    check( 'name', 'invalid name - m' ).notEmpty(),
    check( 'name' ).custom( existsCategoryName ),
    validateReq

], postCategory );


// put /category/:id
router.put( '/category/:id', [

    validateJwt,
    check( 'id', 'invalid id - m' ).isMongoId(),
    check( 'id' ).custom( existsCategoryId ),
    check( 'name', 'invalid name - m' ).notEmpty(),
    validateReq

], putCategory );


// delete /category/:id
router.delete( '/category/:id', [

    validateJwt,
    validateRole( 'ADMIN_ROLE' ),
    check( 'id', 'invalid id - m' ).isMongoId(),
    check( 'id' ).custom( existsCategoryId ),
    validateReq

], deleteCategory );


// exports
module.exports = router;
