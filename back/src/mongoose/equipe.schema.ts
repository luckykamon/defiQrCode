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
    console.log("equipe.schema.ts getAll");
    let result = await equipeSchema.find();
    console.log(result);
    return result;
}

exports.create = async (equipe: object) => {
    await db.connect();
    console.log("equipe.schema.ts create");
    let result = await equipeSchema.create(equipe);
    console.log(result);
    return result;
}
