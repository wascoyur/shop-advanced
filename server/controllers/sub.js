const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(await new Sub({ name, parent, slug: slugify(name) }).save());
  } catch (error) {
    console.log('err:', error);
    res.status(400).send('Ошибка создания подкатегории');
  }
};
exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};
exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  // console.log('slug: req.params.slug', req.params.slug, 'sub', sub);
  res.json(sub);
};
exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { name, parent, slug: slugify(name) },
      { new: true },
    );
    res.json(updated);
  } catch (error) {
    console.log('err:', error);
    res.status(400).send('Ошибка обновления подкатегории');
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    res.status(400).send('Ошибка удаления подкатегории');
  }
};
