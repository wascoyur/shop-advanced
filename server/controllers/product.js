const Product = require('../models/product');
const slugify = require('slugify');
const { populate } = require('../models/product');

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.listAll = async (req, res) => {
  try {
    let products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate('category')
      .populate('subs')
      .sort([['createdAt', 'desc']])
      .exec();
    res.json(products);
  } catch (error) {}
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      _id: req.params.slug,
    }).exec();
    console.log('slug: req.params.slug', req.params.slug, 'deleted', deleted);

    res.json(deleted);
  } catch (error) {
    console.log('error', error);
    return res.status(400).send('Ошибка удаления продукта');
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const oneProduct = await Product.findOne({ _id: req.params.slug }).exec();
    console.log('slug: req.params.slug', req.params.slug, 'one', oneProduct);

    res.json(oneProduct);
  } catch (error) {
    console.log('error', error);
    // return res.status(400).send('Ошибка удаления продукта');
  }
};
