const db = require('./db');
const MongooseRequire = require('mongoose');

const collectionName = "equipe";

const CollectionSchema = new MongooseRequire.Schema({
    name: {
        type: String,
        required: true
    }
});

let equipeSchema = MongooseRequire.model(collectionName, CollectionSchema);

exports.getAll = async () => {
    await db.connect();
    return await equipeSchema.find();
}

exports.getById = async (id: string) => {
    await db.connect();
    return await equipeSchema.findById(id);
}


exports.create = async (equipe: object) => {
    await db.connect();
    return await equipeSchema.create(equipe);
}
