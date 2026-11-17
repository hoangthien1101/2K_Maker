const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${cleanBase}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExts = /\.(jpe?g|png|webp|svg|gif|stl|obj|3mf|step|stp|zip|rar|pdf)$/i;
  const extMatch = allowedExts.test(path.extname(file.originalname).toLowerCase());

  if (extMatch) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận tệp hình ảnh (jpg, png, webp, svg, gif) và mô hình/tệp đính kèm (stl, obj, 3mf, step, zip, rar, pdf)'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
    fieldSize: 100 * 1024 * 1024,
  },
  fileFilter,
});

module.exports = upload;

