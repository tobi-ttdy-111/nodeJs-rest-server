
// imports
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { existsSchema } = require( '../helpers/db-validators' )
const { validateReq } = require( '../middlewares' );
const { putColeccionId } = require( '../controllers/upload' );


// router
const router = Router();


// put /:schema/:id
router.put( '/:schema/:id', [

    check( 'schema' ).custom( s => existsSchema( s, [ 'users', 'products' ] )),
    check( 'id', 'invalid id - m' ).isMongoId(),
    validateReq

], putColeccionId );


// exports
module.exports = router;
