const Product = require('../models/product');
const slugify = require('slugify');
const { populate, findOneAndUpdate } = require('../models/product');
const User = require('../models/user');

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

exports.update = async (req, res) => {
  try {
    console.log('update', req.params._id);
    // if (req.body.slug) {
    //   req.body.slug = slugify(req.body.title);
    // }
    const update = await Product.findOneAndUpdate(
      { _id: req.params.slug },
      req.body,
      {
        new: true,
      },
    ).exec();
    res.json(update);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
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

exports.productsCount = async (req, res) => {
  try {
    let total = await Product.estimatedDocumentCount().exec();
    res.json(total);
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

exports.read = async (req, res) => {
  try {
    const oneProduct = await Product.findOne({ _id: req.params.slug })
      .populate('category')
      .populate('subs')
      .exec();
    console.log('slug: req.params.slug', req.params.slug, 'one', oneProduct);
    res.json(oneProduct);
  } catch (error) {
    console.log('error', error);
    // return res.status(400).send('Ошибка удаления продукта');
  }
};

exports.list = async (req, res) => {
  // console.table(req.body);

  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (error) {
    console.log('error', error);
    // return res.status(400).send('Ошибка удаления продукта');
  }
};

exports.productStar = async (req, res) => {
  // console.log('req.body', req.body);
  // console.log('req.params', req.params.id);  

  try {
    const product = await Product.findOne({ _id: req.params.id }).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;

    let existingRaitingObject = product.raitings.find(
      (el) => el.postedBy.toString() === user._id.toString(),
    );

    console.log(' existingRaitingObject', existingRaitingObject);

    if (existingRaitingObject === undefined) {

      // console.log('-------product', product);

      let raitingAdded = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: { raitings: { star: star, postedBy: user._id } },
        },
        { new: true },
      ).exec();

      console.log('raitingAdded', raitingAdded);

      res.json(raitingAdded);
    } else {

      const raitingUpdated = await Product.updateOne(
        {
          raitings: { $elemMatch: existingRaitingObject },
        },
        { $set: { 'raitings.$.star': star } },
        { new: true },
      ).exec();

      console.log('raitingUpdated', raitingUpdated);
      res.json(raitingUpdated);
    }
  } catch (error) {
    console.log('error', error);
    // return res.status(400).send('Ошибка удаления продукта');
  }
};
