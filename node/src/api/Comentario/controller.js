import { success, notFound } from '../../services/response/'
import { Comentario } from '.'
import { Proyecto } from '../Proyecto'
import { User } from '../user'
import { ProyectoRes } from '../ProyectoRes'
import { token } from '../../services/passport';
import { model } from 'mongoose';

const store = require('store')
const jwtDecode = require('jwt-decode');
var coment;
/**
 * FILTRO DE COMENTARIOS
 */
const filtro = ["tus muertos", "follar", "inútil", "marihuana", "weed", "tablaDeCiclistas"]

export const create = async ({ bodymen: { body } }, res, next) => {
    await Comentario.create(body)
        .then((comentario) => {
            coment = comentario;
            User.findById(comentario.view(true).autor)
                .then(user => {
                    comentario.nombreAutor = user.email;
                    comentario.imagenAutor = user.picture;
                    store.set('idProyectoComentario', comentario.view(true).proyecto)
                    store.set('comentario', comentario)
                    store.set('valoracion', comentario.view(true).valoracion)
                    for (let f of filtro) {
                        if (comentario.view(true).contenido.indexOf(f) >= 0) {
                            console.log("Que chaval mas mal hablado")
                            comentario.contenido = "El comentario ha sido ocultado por contener palabras obsenas";

                        }
                    }

                    comentario.save();


                })
            console.log('aqui');
            console.log(coment);


            return comentario.view(true)

        })
        .then(success(res, 201))
        .catch(next)

    await Proyecto.findById(coment.proyecto)
        .then(notFound(res))
        .then((proyecto) => {
            console.log(proyecto);

            if (proyecto) {
                console.log('Estoy entradndo');

                if (proyecto.ultimosComentarios.length >= 5) {
                    console.log('tengo mas de 5');

                    delete proyecto.ultimosComentarios.shift()
                    proyecto.ultimosComentarios.push(store.get('comentario'))
                } else if (proyecto.ultimosComentarios === undefined) {
                    console.log('nulo');

                    proyecto.ultimosComentarios = [store.get('comentario')];
                } else {
                    console.log('tengo pero menos de 5');

                    proyecto.ultimosComentarios.push(store.get('comentario'))
                }


                proyecto.comentarios.push(store.get('comentario').id);



            } else {
                return null
            }

            var result = 0;

            if (proyecto.view(true).valoracionMedia == 0) {
                proyecto.valoracionMedia = store.get('valoracion');
                proyecto.save();
            } else {
                Comentario.find({ "proyecto": proyecto.id })
                    .then(comentariote => {
                        comentariote.forEach(element => {
                            if (element.valoracion != undefined) {
                                result = result + element.valoracion;
                            }
                        });

                        result = result / comentariote.length;

                        proyecto.valoracionMedia = result;

                        ProyectoRes.find({ "proyecto": store.get('idProyectoComentario') })
                            .then(proyectoRes => {
                                console.log(proyectoRes);

                                proyectoRes.valoracionMedia = proyecto.valoracionMedia
                                // proyectoRes.save();

                            })
                            .then(success(res))
                            .catch(next)
                        proyecto.save();
                    })
                    .catch(next);

            }
        })
        .then(success(res))
        .catch(next)

}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Comentario.count(query)
        .then(count => Comentario.find(query, select, cursor)
            .then((comentarios) => ({
                count,
                rows: comentarios.map((comentario) => comentario.view())
            }))
        )
        .then(success(res))
        .catch(next)

export const show = ({ params }, res, next) =>
    Comentario.find({ "proyecto": params.idProyecto })
        .then(notFound(res))
        .then((comentario) => {
            return comentario
        })
        .then(success(res))
        .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    Comentario.findById(params.id)
        .then(notFound(res))
        .then((comentario) => comentario ? Object.assign(comentario, body).save() : null)
        .then((comentario) => comentario ? comentario.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = async ({ params }, res, next) => {
    var comentarioG;
    await Comentario.findById(params.id)
        .then(notFound(res))
        .then((comentario) => {
            comentarioG = comentario;
            return comentario ? comentario.remove() : null
        })
        .then(success(res, 204))
        .catch(next)


    await Proyecto.findOne({ "ultimosComentarios.contenido": comentarioG.contenido })
        .then(proyecto => {

            for (let index = 0; index < proyecto.ultimosComentarios.length; index++) {
                const element = proyecto.ultimosComentarios[index];

                if (element.contenido === comentarioG.contenido) {

                    proyecto.ultimosComentarios.splice(index, 1);
                }

            }


            for (let index = 0; index < proyecto.comentarios.length; index++) {
                const element = proyecto.comentarios[index];
                console.log(comentarioG.id + '&&&' + element);

                if (element.equals(comentarioG.id)) {

                    console.log('Entro:D');

                    proyecto.comentarios.splice(index, 1);
                }

            }
            Proyecto.updateOne({ "ultimosComentarios.contenido": comentarioG.contenido }, {
                $set: {
                    comentarios: proyecto.comentarios,
                    ultimosComentarios: proyecto.ultimosComentarios
                }
            }, (res, next) => {
                if (next) {
                    return next
                }

                res.send(res);
            });

            if (proyecto.comentarios.length === 1) {
                Proyecto.updateOne({ "ultimosComentarios.contenido": comentarioG.contenido }, {
                    $set: {
                        valoracionMedia: undefined
                    }
                }, (res, next) => {
                    if (next) {
                        return next
                    }

                    res.send(res);
                });
            }



        })
        .catch(next)

}

export const destroyUser = async ({ params }, res, next) => {
    var comentarioG;
    await Comentario.findById(params.id)
        .then(notFound(res))
        .then((comentario) => {
            comentarioG = comentario;
            return comentario ? comentario.remove() : null
        })
        .then(success(res, 204))
        .catch(next)


    await Proyecto.findOne({ "ultimosComentarios.contenido": comentarioG.contenido })
        .then(proyecto => {

            for (let index = 0; index < proyecto.ultimosComentarios.length; index++) {
                const element = proyecto.ultimosComentarios[index];

                if (element.contenido === comentarioG.contenido) {

                    proyecto.ultimosComentarios.splice(index, 1);
                }

            }


            for (let index = 0; index < proyecto.comentarios.length; index++) {
                const element = proyecto.comentarios[index];
                console.log(comentarioG.id + '&&&' + element);

                if (element.equals(comentarioG.id)) {

                    console.log('Entro:D');

                    proyecto.comentarios.splice(index, 1);
                }

            }
            Proyecto.updateOne({ "ultimosComentarios.contenido": comentarioG.contenido }, {
                $set: {
                    comentarios: proyecto.comentarios,
                    ultimosComentarios: proyecto.ultimosComentarios
                }
            }, (res, next) => {
                if (next) {
                    return next
                }

                res.send(res);
            });

            if (proyecto.comentarios.length === 1) {
                Proyecto.updateOne({ "ultimosComentarios.contenido": comentarioG.contenido }, {
                    $set: {
                        valoracionMedia: undefined
                    }
                }, (res, next) => {
                    if (next) {
                        return next
                    }

                    res.send(res);
                });
            }
        })
        .catch(next)
};

