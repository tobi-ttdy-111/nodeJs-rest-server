
// impotrs
const { Router } = require( 'express' );
const { getSearch } = require( '../controllers/search' );


// router
const router = Router();


// get /search
router.get( '/search/:schema/:term', getSearch );


// exports
module.exports = router;
