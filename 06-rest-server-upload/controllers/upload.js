
// imports
const cloudinary = require( 'cloudinary' ).v2;
const { request, response } = require( 'express' );
const { UserSchema,
        ProductSchema } = require( '../models' );


// config
cloudinary.config( process.env.CLOUDINARY_URL );


// putColeccionId
const putColeccionId = async( req = request, res = response ) => {

    const { schema, id } = req.params;

    if ( !req.files || !req.files.file ) return res.status( 400 ).json({ msg: 'invalid file - !file' });
    let model;
    switch ( schema ) {
        case 'users':
            model = await UserSchema.findById( id );
            if ( !model ) return res.status( 400 ).json({ msg: 'invalid id' });
        break;
        case 'products':
            model = await ProductSchema.findById( id );
            if ( !model ) return res.status( 400 ).json({ msg: 'invalid id' });
        break;
        default:
            return res.status( 500 ).json({ msg: 'Internal Server Error' });
    };
    if ( model.img ) {
        const nameSplit = model.img.split('/');
        const nombre = nameSplit[ nameSplit.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    model.img = secure_url;
    await model.save();

    res.json({ model });

};


// exports
module.exports = {
    putColeccionId
};
