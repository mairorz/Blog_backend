import { body, param, query } from 'express-validator';
import { validarCampos } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';
import { postExists } from '../helpers/db-validators.js';

export const addPostValidator = [
  body('title')
    .notEmpty().withMessage('El título es requerido')
    .isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
  body('description')
    .notEmpty().withMessage('La descripción es requerida'),
  body('course')
    .isIn(['TALLER III', 'TECNOLOGÍA III', 'PRÁCTICA SUPERVISADA']).withMessage('Curso inválido'),
  validarCampos,
  handleErrors
]

export const getPostsValidator = [
  query('course')
    .optional()
    .isIn(['TALLER III', 'TECNOLOGÍA III', 'PRÁCTICA SUPERVISADA']).withMessage('Curso inválido'),
  validarCampos,
  handleErrors
]

export const idParamValidator = [
  param('id')
    .isMongoId().withMessage('ID inválido de MongoDB')
    .custom(postExists),
  validarCampos,
  handleErrors
]

export const updatePostValidator = [
  ...idParamValidator,
  body('title')
    .optional()
    .notEmpty().withMessage('El título no puede quedar vacío'),
  body('description')
    .optional()
    .notEmpty().withMessage('La descripción no puede quedar vacía'),
  body('course')
    .optional()
    .isIn(['TALLER III', 'TECNOLOGÍA III', 'PRÁCTICA SUPERVISADA']).withMessage('Curso inválido'),
  validarCampos,
  handleErrors
]

export const deletePostValidator = [
  ...idParamValidator
]

export const addCommentValidator = [
  ...idParamValidator,
  body('name')
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 50 }).withMessage('Máximo 50 caracteres'),
  body('content')
    .notEmpty().withMessage('El contenido es requerido')
    .isLength({ max: 300 }).withMessage('Máximo 300 caracteres'),
  validarCampos,
  handleErrors
]

export const getCommentsValidator = [
  ...idParamValidator
]

export const deleteCommentValidator = [
  param('id')
    .isMongoId().withMessage('ID publicación inválido')
    .custom(postExists),
  param('commentId')
    .isMongoId().withMessage('ID comentario inválido'),
  validarCampos,
  handleErrors
]
