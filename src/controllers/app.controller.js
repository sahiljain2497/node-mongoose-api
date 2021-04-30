const formidable = require('formidable');
const SectionModel = require('../models/Section');
const PaintdataModel = require('../models/Paintdata');
const s3Util = require('../utils/s3Util');
const logger = require('../utils/logger');

exports.listSections = async (req, res) => {
  const sections = await SectionModel.find().populate({ path: 'subsections' }).exec();
  res.send({ data: { sections } });
};

exports.savePaintData = async (req, res) => {
  // http://picsum.photos/600/300
  try {
    const { userId } = req;
    const form = formidable({ multiples: false });
    const reqData = await new Promise((resolve, reject) => {
      form.parse(req, (error, fields, files) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({ fields, files });
      });
    });
    const paintdata = new PaintdataModel(reqData.fields);
    if (reqData.files.image) {
      paintdata.image = await s3Util.resizeAndUpload(reqData.files.image, `users/${req.userId}`, 600);
    }
    paintdata.userId = userId;
    await paintdata.save();
    res.send({ data: { paintdata }, message: 'Data Saved' });
  } catch (error) {
    logger.error('error in saving paint data', error);
    res.status(500).send({ message: 'Unable to save data', error });
  }
};
