const { argv } = require('./config/yargs');
const colors = require('colors');
const { crear, getListado, actualizar, borrar } = require('./por-hacer/por-hacer');


console.log(argv);

const listarTareas = () => {
    let listado = getListado();

    for (let tarea of listado) {
        console.log('============Tarea por hacer==========='.green);
        console.log('Descripcion: ', tarea.descripcion);
        console.log('Estado: ', (tarea.completado) ? 'completado' : 'incompleto');
        console.log('======================================\n'.green);
    }
};

const actualizarTarea = () => {
    let actualizado = actualizar(argv.descripcion, argv.completado);
    console.log('============Tarea por hacer==========='.yellow);
    console.log('Descripcion: ', actualizado.descripcion);
    console.log('Estado: ', (actualizado.completado) ? 'completado' : 'incompleto');
    console.log('======================================\n'.yellow);
};

const borrarTarea = () => {
    let borrarElemento = borrar(argv.descripcion);
    console.log(borrarElemento);
};

const comandos = () => {
    let comando = argv._[0];
    console.log(comando);

    switch (comando) {
        case 'crear':
            {
                let tarea = crear(argv.descripcion);
                break;
            }
        case 'listar':
            {
                listarTareas();
                break;
            }
        case 'actualizar':
            {
                actualizarTarea();
                break;
            }
        case 'eliminar':
            {
                borrarTarea();
                break;
            }
        default:
            {
                console.log('El comando no es reconocido');
            }
    }
};

comandos();