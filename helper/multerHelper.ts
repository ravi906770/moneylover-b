import multer from "multer";
import { Request } from "express";
import path from "path";
 
const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, 'uploads'); // Destination folder
  },
  filename:  (req: Request, file, cb) =>{;
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
 
// Multer upload instance
const upload = multer({
     storage: storage,
     limits:{fileSize : 1000000},
     fileFilter:(req , file,cb)=>{
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeTypes = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
 
        if(mimeTypes && extname){
            return cb(null , true)
        }
       
     }
     })
 
export {upload}