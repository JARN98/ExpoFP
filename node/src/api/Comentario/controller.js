import { success, notFound } from '../../services/response/'
import { Comentario } from '.'
import { Proyecto } from '../Proyecto'
import { User } from '../user'
import { ProyectoRes } from '../ProyectoRes'
import { token } from '../../services/passport';
import { model } from 'mongoose';

const store = require('store')
const jwtDecode = require('jwt-decode');
/**
 * FILTRO DE COMENTARIOS
 */
const filtro = ["barbaridad", "messi5delmundo"]

export const create = async({ bodymen: { body } }, res, next) => {
    await Comentario.create(body)
        .then((comentario) => {
            User.findById(comentario.view(true).autor)
                .then(user => {
                    comentario.nombreAutor = user.email;
                    store.set('idProyectoComentario', comentario.view(true).proyecto)
                    store.set('comentario', comentario)
                    store.set('valoracion', comentario.view(true).valoracion)
                        // for (let f of filtro) {
                        //     if (comentario.view(true).contenido.indexOf(f) >= 0) {
                        //         body.contenido = "El comentario ha sido ocultado por contener palabras obsenas";
                        //         $set: {
                        //           conte
                        //         }
                        //     }
                        // }

                    comentario.save();


                })
            return comentario.view(true)

        })
        .then(success(res, 201))
        .catch(next)

    await Proyecto.findById(store.get('idProyectoComentario'))
        .then(notFound(res))
        .then((proyecto) => {
            console.log('Estoy Tal');

            if (proyecto) {
                console.log('Estoy entradndo');

                if (proyecto.ultimosComentarios.length >= 5) {
                    delete proyecto.ultimosComentarios.shift()
                }

                proyecto.ultimosComentarios.push(store.get('comentario'))
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

export const destroy = ({ params }, res, next) =>
    Comentario.findById(params.id)
    .then(notFound(res))
    .then((comentario) => comentario ? comentario.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const destroyUser = ({ params }, res, next) =>
    Comentario.findById(params.id)
    .then(notFound(res))
    .then((comentario) => {


        comentario.remove();

    })
    .then(success(res, 204))
    .catch(next)