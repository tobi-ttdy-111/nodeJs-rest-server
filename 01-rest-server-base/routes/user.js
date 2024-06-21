
// imports
const { Router } = require( 'express' );
const { getUser,
        postUser,
        putUser,
        deleteUser } = require( '../controllers/user' );


// router
const router = Router();


// get /user
router.get( '/user', getUser );


// post /user
router.post( '/user', postUser );


// put /user
router.put( '/user', putUser );


// delete /user
router.delete( '/user', deleteUser );


// exports
module.exports = router;
