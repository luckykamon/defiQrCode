const equipeFunction = require('../../mongoose/equipe.schema');

exports.getAll = async () => {
    return await equipeFunction.getAll();
}

exports.create = async (equipe: object) => {
    return await equipeFunction.create(equipe);
}
