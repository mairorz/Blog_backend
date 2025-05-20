import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const ALLOWED_MIMETYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 100 * 1024 * 1024;

const createImageUploader = (destinationFolder) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const fullPath = join(CURRENT_DIR, "..", "..", "public", destinationFolder);
        cb(null, fullPath);
      },
      filename: (req, file, cb) => {
        const fileExtension = extname(file.originalname);
        const fileName = file.originalname.split(fileExtension)[0];
        cb(null, `${fileName}-${Date.now()}${fileExtension}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`Solo se aceptan archivos de los siguientes tipos: ${ALLOWED_MIMETYPES.join(", ")}`));
      }
    },
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  });
};

export const uploadPostImage = createImageUploader("uploads/posts-pictures");