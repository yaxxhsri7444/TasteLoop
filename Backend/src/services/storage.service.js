require("dotenv").config();
const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL, // ✅ correct key
});

async function uploadFile(file, fileName) {

  try {
    let uploadValue;

    // multer file object
    if (file && file.buffer && Buffer.isBuffer(file.buffer)) {
      const mime = file.mimetype || 'application/octet-stream';
      const b64 = file.buffer.toString('base64');
      uploadValue = `data:${mime};base64,${b64}`;
    }
    // raw Buffer
    else if (Buffer.isBuffer(file)) {
      const b64 = file.toString('base64');
      uploadValue = `data:application/octet-stream;base64,${b64}`;
    }
    // already a string (URL or data URI or base64)
    else if (typeof file === 'string') {
      uploadValue = file;
    }
    else {
      throw new TypeError('Invalid `file` argument passed to uploadFile. Expected multer file object, Buffer, or base64/string.');
    }

    if (!imagekit.files || typeof imagekit.files.upload !== 'function') {
      throw new TypeError('imagekit.files.upload is not available on the ImageKit client. Check @imagekit/nodejs version and initialization.');
    }

    const result = await imagekit.files.upload({
      file: uploadValue,
      fileName,
    });
    return result;
  } catch (error) {
    console.error('ImageKit upload error:', error);
    throw error;
  }
}

module.exports = { uploadFile };
