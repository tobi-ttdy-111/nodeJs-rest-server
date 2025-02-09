
// imports
const express = require( 'express' );
const cors = require( 'cors' );
const connection = require( '../database/connection' );


// Server
class Server {


    // constructor
    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();

    };


    // dbConnection
    async dbConnection() {

        await connection()

    };


    // middlewares
    middlewares() {

        this.app.use( express.json() );
        this.app.use( express.static( 'public' ) );
        this.app.use( cors() );

    };


    // routes
    routes() {

        this.app.use( require( '../routes/user' ) );
        this.app.use( require( '../routes/auth' ) );

    };


    // listen
    listen() {

        this.app.listen( this.port, () => {
            console.log( `Listening on port ${ this.port }` );
        });

    };


};


// exports
module.exports = Server;
