const equipeFunction = require('../../mongoose/equipe.schema');

exports.getAll = async () => {
    return await equipeFunction.getAll();
}

exports.getById = async (id: string) => {
    return await equipeFunction.getById(id);
}

exports.create = async (equipe: object) => {
    return await equipeFunction.create(equipe);
}
