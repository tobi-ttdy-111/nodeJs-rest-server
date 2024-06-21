
// impotrs
const { request, response } = require( 'express' );
const { searchUser,
        searchCategory,
        searchProduct } = require( '../helpers/db-searchs' );


// schemas
const schemas = [

    'users',
    'categorys',
    'products',

];


// getSearch
const getSearch = ( req = request, res = response ) => {

    const { schema, term } = req.params;

    if ( !schemas.includes( schema ) ) return res.status( 400 ).json({ msg: `invalid schema ${ schema }` });
    switch ( schema ) {
        case 'users':
            searchUser( term, res );
        break;
        case 'categorys':
            searchCategory( term, res );
        break;
        case 'products':
            searchProduct( term, res );
        break;
        default: res.status( 500 ).json({ msg: 'Internal Server Error' });
    };

};


// exports
module.exports = {
    getSearch
};
