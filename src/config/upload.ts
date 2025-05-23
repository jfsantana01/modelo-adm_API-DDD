import path from "path";
import multer, { StorageEngine } from "multer";
import crypto from "crypto";

interface IUploadConfig {
  driver: "s3" | "disk";
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(process.cwd(), "uploads");
const tmpFolder = path.resolve(process.cwd(), "temp");

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        //console.log("__dirname", __dirname);
        //  console.log("process.cwd():", process.cwd());

        const fileHash = crypto.randomBytes(10).toString("hex");

        const filename = `${fileHash}-${file.originalname}`;

        callback(null, filename);
      },
    }),
  },
  config: {
    aws: {
      bucket: "api-adm",
    },
  },
} as IUploadConfig;
