
// imports
const express = require( 'express' );
const cors = require( 'cors' );
const fileUpload = require( 'express-fileupload' );
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
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    };


    // routes
    routes() {

        this.app.use( require( '../routes/user' ) );
        this.app.use( require( '../routes/auth' ) );
        this.app.use( require( '../routes/category' ) );
        this.app.use( require( '../routes/product' ) );
        this.app.use( require( '../routes/search' ) );
        this.app.use( require( '../routes/upload' ) );

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
