const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer',
    type: 'string'
};

const completado = {
    alias: 'c',
    default: true,
    type: 'boolean',
    desc: 'Marca como completado la tarea'
};

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        alias: 'c',
        descripcion,

    })
    .command('actualizar', 'Actualizar el estado completado de una tarea', {
        descripcion,
        completado,
        alias: 'a'

    })
    .command('eliminar', 'Elimina un elemtento por hacer a partir de la descripcion', {
        descripcion,
        alias: 'e'
    }).help()
    .argv;


module.exports = {
    argv
};