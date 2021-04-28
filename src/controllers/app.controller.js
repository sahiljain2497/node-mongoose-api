const SectionModel = require('../models/Section');

exports.listSections = async (req, res) => {
  const sections = await SectionModel.find().populate({ path: 'subsections' }).exec();
  res.send({ data: { sections } });
};
