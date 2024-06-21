
// imports
const { request, response } = require( 'express' );


// getUser
const getUser = ( req = request, res = response ) => {

    res.json({ msg: 'get /user' });

};


// postUser
const postUser = ( req = request, res = response ) => {

    res.json({ msg: 'post /user' });

};


// putUser
const putUser = ( req = request, res = response ) => {

    res.json({ msg: 'put /user' });

};


// deleteUser
const deleteUser = ( req = request, res = response ) => {

    res.json({ msg: 'delete /user' });

};


// exports
module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
};
