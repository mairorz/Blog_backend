import Post from '../post/post.model.js';

export const postExists = async (id = '') => {
  const existe = await Post.findById(id);
  if (!existe) {
    throw new Error('No existe la publicación con el ID proporcionado');
  }
};
