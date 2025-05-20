import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxLength: [50, 'Máximo 50 caracteres']
  },
  content: {
    type: String,
    required: [true, 'El comentario no puede estar vacío'],
    trim: true,
    maxLength: [300, 'Máximo 300 caracteres']
  }
}, 
{
  timestamps: true,
  versionKey: false
});

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    maxLength: [100, 'Máximo 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true
  },
  course: {
    type: String,
    enum: ['TALLER III', 'TECNOLOGÍA III', 'PRÁCTICA SUPERVISADA'],
    required: [true, 'El curso es requerido']
  },
  imageUrl: {
    type: String,
    required: [true, 'La imagen es requerida']
  },
  comments: [commentSchema],
}, 
{
  timestamps: true,
  versionKey: false
});

export default model('Post', postSchema);