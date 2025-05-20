import { Router } from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  getComments
} from './post.controller.js';

import {
  addPostValidator,
  getPostsValidator,
  idParamValidator,
  updatePostValidator,
  deletePostValidator,
  addCommentValidator,
  getCommentsValidator
} from '../middlewares/post-validators.js';

import { uploadPostImage } from '../middlewares/multer-upload.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API para gestionar publicaciones y comentarios
 */

/**
 * @swagger
 * /getPosts:
 *   get:
 *     summary: Obtiene todas las publicaciones
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: course
 *         schema:
 *           type: string
 *           enum: [TALLER III, TECNOLOGÍA III, PRÁCTICA SUPERVISADA]
 *         description: Filtrar publicaciones por curso
 *     responses:
 *       200:
 *         description: Lista de publicaciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error al obtener publicaciones
 */
router.get('/getPosts', getPostsValidator, getPosts);

/**
 * @swagger
 * /getPost/{id}:
 *   get:
 *     summary: Obtiene una publicación por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error al obtener la publicación
 */
router.get('/getPost/:id', idParamValidator, getPostById);

/**
 * @swagger
 * /createPost:
 *   post:
 *     summary: Crea una nueva publicación
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la publicación
 *                 example: "Mi primera publicación"
 *               description:
 *                 type: string
 *                 description: Descripción de la publicación
 *                 example: "Este es el contenido de la publicación"
 *               course:
 *                 type: string
 *                 enum: [TALLER III, TECNOLOGÍA III, PRÁCTICA SUPERVISADA]
 *                 description: Curso relacionado con la publicación
 *                 example: "TALLER III"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen para la publicación
 *                 example: "image.jpg"
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la creación fue exitosa
 *                   example: true
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Error al crear la publicación
 *       500:
 *         description: Error interno del servidor al procesar la solicitud
 */
router.post('/createPost', uploadPostImage.single('imageUrl'), addPostValidator, createPost);

/**
 * @swagger
 * /updatePost/{id}:
 *   put:
 *     summary: Actualiza una publicación existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       200:
 *         description: Publicación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Publicación no encontrada
 *       400:
 *         description: Error al actualizar la publicación
 */
router.put('/updatePost/:id', updatePostValidator, updatePost);

/**
 * @swagger
 * /deletePost/{id}:
 *   delete:
 *     summary: Elimina una publicación por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al eliminar la publicación
 */
router.delete('/deletePost/:id', deletePostValidator, deletePost);

/**
 * @swagger
 * /{id}/addComment:
 *   post:
 *     summary: Agrega un comentario a una publicación
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       201:
 *         description: Comentario agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Publicación no encontrada
 *       400:
 *         description: Error al agregar el comentario
 */
router.post('/:id/addComment', addCommentValidator, addComment);

/**
 * @swagger
 * /{id}/getComments:
 *   get:
 *     summary: Obtiene los comentarios de una publicación
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error al obtener los comentarios
 */
router.get('/:id/getComments', getCommentsValidator, getComments);

export default router;
