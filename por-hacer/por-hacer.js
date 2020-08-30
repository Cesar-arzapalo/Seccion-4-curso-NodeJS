const fs = require('fs');

let listadoPorHacer = [];



const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    console.log(listadoPorHacer);

    return porHacer;
};

const getListado = () => {
    cargarDB();

    return listadoPorHacer;
};

const buscarTarea = (descripcion) => {
    return listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = buscarTarea(descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return listadoPorHacer[index];
    }
};

const borrar = (descripcion) => {
    cargarDB();

    let index = buscarTarea(descripcion);

    listadoPorHacer = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    guardarDB();

    return `${(index!==-1)?'Se elimino':'No se encontro'} la tarea con descripcion: ${descripcion}`;

};

const escribirArchivo = (data) => new Promise((resolve, reject) => {
    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) reject(err);
        resolve('data.json');
    });
});

const leerArchivo = () => new Promise((resolve, reject) => {
    fs.readFile(`./db/data.json`, (err, data) => {
        if (err) reject(err);
        resolve(data);
    });
});



const guardarDB = async() => {
    const dataJSON = JSON.stringify(listadoPorHacer);
    const data = new Uint8Array(Buffer.from(dataJSON));

    return await escribirArchivo(data);
};

const cargarDB = async() => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


    // console.log(listadoPorHacer);

};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};