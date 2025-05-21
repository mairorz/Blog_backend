import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const ALLOWED_MIMETYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 100 * 1024 * 1024;

const createImageUploader = (destinationFolder) => {
  return multer({
    storage: multer.diskStorage({
      destination: async (req, file, cb) => {
        const fullPath = join(CURRENT_DIR, "..", "..", "public", destinationFolder);
        try {
          await fs.access(fullPath);
          cb(null, fullPath);
        } catch (error) {
          if (error.code === 'ENOENT') {
            try {
              await fs.mkdir(fullPath, { recursive: true });
              cb(null, fullPath);
            } catch (mkdirError) {
              console.error("Error al crear la carpeta:", mkdirError);
              cb(mkdirError, null);
            }
          } else {
            console.error("Error al acceder a la carpeta:", error);
            cb(error, null);
          }
        }
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