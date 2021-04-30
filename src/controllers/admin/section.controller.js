const formidable = require('formidable');
const logger = require('../../utils/logger');
const s3Util = require('../../utils/s3Util');
const SectionModel = require('../../models/Section');

exports.list = async (req, res) => {
  const sections = await SectionModel.find();
  res.render('admin/sections/list', { sections });
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
    const section = new SectionModel(reqData.fields);
    if (reqData.files.image) {
      section.image = await s3Util.resizeAndUpload(reqData.files.image, 'sections', 400);
    }
    await section.save();
    res.send({ data: { section }, message: 'Data Saved' });
  } catch (error) {
    logger.error('error in saving section data', error);
    res.status(500).send({ message: 'Unable to save section data', error });
  }
};

exports.update = async (req, res) => {
  const section = await SectionModel.findOne({ _id: req.params.sectionId });
  if (!section) {
    return res.status(404).send({ message: 'section not found.' });
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
    section.name = reqData.fields.name;
    if (reqData.files.image) {
      section.image = await s3Util.resizeAndUpload(reqData.files.image, 'sections', 400);
    }
    await section.save();
    res.send({ data: { section }, message: 'Data Updated' });
  } catch (error) {
    logger.error('error in saving section data', error);
    res.status(500).send({ message: 'Unable to update section data', error });
  }
};

exports.delete = async (req, res) => {
  try {
    await SectionModel.deleteOne({ _id: req.params.manufacturerId });
    res.send({ message: 'Deleted' });
  } catch (error) {
    logger.error('error in delete section', error);
    res.status(500).send({ message: 'Unable to delete section', error });
  }
};
