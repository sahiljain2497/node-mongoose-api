const formidable = require('formidable');
const logger = require('../../utils/logger');
const s3Util = require('../../utils/s3Util');
const ManufacturerModel = require('../../models/Manufacturer');

exports.list = async (req, res) => {
  const manufacturers = await ManufacturerModel.find();
  res.render('admin/manufacturers/list', { manufacturers });
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
    const manufacturer = new ManufacturerModel(reqData.fields);
    if (reqData.files.image) {
      manufacturer.image = await s3Util.resizeAndUpload(reqData.files.image, 'manufacturers', 400);
    }
    await manufacturer.save();
    res.send({ data: { manufacturer }, message: 'Data Saved' });
  } catch (error) {
    logger.error('error in saving manufacturer data', error);
    res.status(500).send({ message: 'Unable to save manufacturer data', error });
  }
};

exports.update = async (req, res) => {
  const manufacturer = await ManufacturerModel.findOne({ _id: req.params.manufacturerId });
  if (!manufacturer) {
    return res.status(404).send({ message: 'manufacturer not found.' });
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
    manufacturer.name = reqData.fields.name;
    if (reqData.files.image) {
      manufacturer.image = await s3Util.resizeAndUpload(reqData.files.image, 'manufacturers', 400);
    }
    await manufacturer.save();
    res.send({ data: { manufacturer }, message: 'Data Updated' });
  } catch (error) {
    logger.error('error in saving manufacturer data', error);
    res.status(500).send({ message: 'Unable to update manufacturer data', error });
  }
};

exports.delete = async (req, res) => {
  try {
    await ManufacturerModel.deleteOne({ _id: req.params.manufacturerId });
    res.send({ message: 'Deleted' });
  } catch (error) {
    logger.error('error in delete manufacturer', error);
    res.status(500).send({ message: 'Unable to delete manufacturer', error });
  }
};
