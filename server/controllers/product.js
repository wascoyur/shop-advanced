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
    // console.log('update', req.params._id);
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
    // console.log('slug: req.params.slug', req.params.slug, 'deleted', deleted);

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
    // console.log('slug: req.params.slug', req.params.slug, 'one', oneProduct);
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

    // console.log(' existingRaitingObject', existingRaitingObject);

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

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate('category')
    .populate('subs')
    .populate('postedBy')
    .exec();

  res.json(related);
};

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();
  // console.log('products', products);

  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: { $gte: price[0], $lte: price[1] },
    })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();
    res.json(products);
  } catch {
    (err) => console.log('err:', err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();
    res.json(products);
  } catch {
    (err) => console.log('err:', err);
  }
};

const handleStars = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: '$$ROOT',
        // title: "$title",
        floorAverage: {
          $floor: { $avg: '$raitings.star' }, // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log('AGGREGATE ERROR', err);
      Product.find({ _id: aggregates })
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec((err, products) => {
          if (err) console.log('PRODUCT AGGREGATE ERROR', err);
          res.json(products);
        });
    });
};
const handleSub = async (req, res, sub) => {
  const products = await Product.find({ subs: sub })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();
  // console.log('products', products );

  res.json(products);
};

const handleShipping = async (req, res, shippingMethod) => {
  const products = await Product.find({ shipping: shippingMethod })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();
  res.json(products);
};

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color: color })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();
  res.json(products);
};

exports.getAttributes = async (req, res) => {
  const { attribute, product, id } = req.body;
  if (id) {
    const prod = await Product.findById(id);
    // console.log('prod', prod);
    return res.json(prod.quantity);
  }
  let title = {};
  if (product !== '') {
    title = { title: product };
  }
  // console.log('attr:', req.body);

  const allAttributes = await Product.distinct(attribute, title);
  // console.log('allAttributes', allAttributes);

  res.json(allAttributes);
};

const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand: brand })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();
  res.json(products);
};

exports.searchFilters = async (req, res) => {
  const { query, price, category, stars, sub, shipping, color, brand } =
    req.body;
  if (query) {
    // console.log('query', query);
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    // console.log('price', price);
    await handlePrice(req, res, price);
  }

  if (category) {
    // console.log('category', category);
    await handleCategory(req, res, category);
  }
  if (stars) {
    // console.log('stars', stars);
    await handleStars(req, res, stars);
  }
  if (sub) {
    await handleSub(req, res, sub);
  }
  if (shipping) {
    await handleShipping(req, res, shipping);
  }
  if (color) {
    await handleColor(req, res, color);
  }
  if (brand) {
    await handleBrand(req, res, brand);
  }
};
