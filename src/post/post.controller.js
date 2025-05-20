import Post from './post.model.js';

export const getPosts = async (req, res) => {
  try {
    const { course } = req.query;
    const filter = course ? { course } : {};
    const posts = await Post.find(filter).sort('-createdAt');
    res.status(200).json({ 
        success: true, 
        posts 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        message: 'Error al obtener publicaciones', 
        error: err.message 
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ 
        success: false, 
        message: 'Publicación no encontrada' 
    });
    res.status(200).json({ 
        success: true, 
        post 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        message: 'Error al obtener la publicación', 
        error: err.message 
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    let imageUrl = req.file ? req.file.filename : null;
    post.imageUrl = imageUrl;

    await post.save();
    res.status(201).json({
      success: true,
      post
    });
  } catch (err) {
    console.error('Error al crear publicación:', err.message);
    res.status(400).json({
      success: false,
      message: 'Error al crear publicación',
      error: err.message
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Post.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ 
        success: false, 
        message: 'Publicación no encontrada' 
    });
    res.status(200).json({ 
        success: true, 
        post: updated 
    });
  } catch (err) {
    res.status(400).json({ 
        success: false, 
        message: 'Error al actualizar publicación', 
        error: err.message 
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ 
        success: true, 
        message: 'Publicación eliminada' 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        message: 'Error al eliminar publicación', 
        error: err.message 
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content } = req.body;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ 
        success: false, 
        message: 'Publicación no encontrada' 
    });

    const comment = { name, content };
    post.comments.unshift(comment);
    await post.save();
    res.status(201).json({ 
        success: true, 
        comment 
    });
  } catch (err) {
    res.status(400).json({ 
        success: false, 
        message: 'Error al agregar comentario', 
        error: err.message 
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ success: false, message: 'Publicación no encontrada' });
    res.status(200).json({ 
        success: true, 
        comments: post.comments 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        message: 'Error al obtener comentarios', 
        error: err.message 
    });
  }
};