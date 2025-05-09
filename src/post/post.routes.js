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

const router = Router();

router.get('/getPosts', getPostsValidator, getPosts);
router.get('/getPost/:id', idParamValidator, getPostById);
router.post('/createPost', addPostValidator, createPost);
router.put('/updatePost/:id', updatePostValidator, updatePost);
router.delete('/deletePost/:id', deletePostValidator, deletePost);

router.post('/:id/addComment', addCommentValidator, addComment);
router.get('/:id/getComments', getCommentsValidator, getComments);

export default router;
