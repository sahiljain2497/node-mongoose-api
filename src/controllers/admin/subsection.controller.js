const formidable = require('formidable');
const logger = require('../../utils/logger');
const s3Util = require('../../utils/s3Util');
const SubsectionModel = require('../../models/Subsection');

exports.list = async (req, res) => {
  const subsections = await SubsectionModel.find().populate('section').exec();
  res.render('admin/subsections/list', { subsections });
};

exports.store = async (req, res) => {
  try {
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
    const subsection = new SubsectionModel(reqData.fields);
    if (reqData.files.image) {
      subsection.image = await s3Util.resizeAndUpload(reqData.files.image, 'subsections', 400);
    }
    await subsection.save();
    res.send({ data: { subsection }, message: 'Data Saved' });
  } catch (error) {
    logger.error('error in saving subsection data', error);
    res.status(500).send({ message: 'Unable to save subsection data', error });
  }
};

exports.update = async (req, res) => {
  const subsection = await SubsectionModel.findOne({ _id: req.params.subsectionId });
  if (!subsection) {
    return res.status(404).send({ message: 'subsection not found.' });
  }
  try {
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
    subsection.name = reqData.fields.name;
    if (reqData.files.image) {
      subsection.image = await s3Util.resizeAndUpload(reqData.files.image, 'subsections', 400);
    }
    await subsection.save();
    res.send({ data: { subsection }, message: 'Data Updated' });
  } catch (error) {
    logger.error('error in saving subsection data', error);
    res.status(500).send({ message: 'Unable to update subsection data', error });
  }
};

exports.delete = async (req, res) => {
  try {
    await SubsectionModel.deleteOne({ _id: req.params.subsectionId });
    res.send({ message: 'Deleted' });
  } catch (error) {
    logger.error('error in delete subsection', error);
    res.status(500).send({ message: 'Unable to delete subsection', error });
  }
};
