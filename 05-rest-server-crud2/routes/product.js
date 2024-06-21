
// imports
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validateReq,
        validateJwt,
        validateRole } = require( '../middlewares' );
const { existsProductName,
        existsProductId,
        existsCategoryId } = require( '../helpers/db-validators' );
const { getProduct,
        getProductId,
        postProduct,
        putProduct,
        deleteProduct } = require( '../controllers/product' );


// router
const router = Router();


// get /product
router.get( '/product', getProduct );


// get /product/:id
router.get( '/product/:id', [

    check( 'id', 'invalid id - m' ).isMongoId(),
    check( 'id' ).custom( existsProductId ),
    validateReq

], getProductId );


// post /product
router.post( '/product', [

    validateJwt,
    check( 'name', 'invalid name - m' ).notEmpty(),
    check( 'name' ).custom( existsProductName ),
    check( 'category', 'invalid category - m' ).isMongoId(),
    check( 'category' ).custom( existsCategoryId ),
    check( 'price', 'invalid price - m' ).isNumeric(),
    check( 'available', 'invalid available - m' ).isBoolean(),
    validateReq

], postProduct );


// put /product/:id
router.put( '/product/:id', [

    validateJwt,
    check( 'id', 'invalid id - m' ).isMongoId(),
    check( 'id' ).custom( existsProductId ),
    check( 'name', 'invalid name - m' ).notEmpty(),
    check( 'price', 'invalid price - m' ).isNumeric(),
    check( 'category', 'invalid category - m' ).isMongoId(),
    check( 'category' ).custom( existsCategoryId ),
    check( 'available', 'invalid available - m' ).isBoolean(),
    validateReq

], putProduct );


// delete /product/:id
router.delete( '/product/:id', [

    validateJwt,
    validateRole( 'ADMIN_ROLE' ),
    check( 'id', 'invalid id - m' ).isMongoId(),
    check( 'id' ).custom( existsProductId ),
    validateReq

], deleteProduct );


// exports
module.exports = router;
