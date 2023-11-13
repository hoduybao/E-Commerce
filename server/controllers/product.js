const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");

  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.create(req.body);
  return res.status(200).json({
    success: product ? true : false,
    product: product ? product : "Cannot create new product",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  const product = await Product.findById(pid);

  return res.status(200).json({
    success: product ? true : false,
    product: product ? product : "Cannot get product",
  });
});

//Filtering, sorting , & pagination
const getAllProduct = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  //Tách các trường đặc biêt
  const excludeFields = ["limit", "sort", "page", "fields"];

  excludeFields.forEach((element) => delete queries[element]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (matchEl) => `$${matchEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  //Filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queryCommand = Product.find(formatedQueries);

  //Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  //Fields
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  //Pagination
  //limit: số object 1 lần lấy về api
  //skip: 2
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  //Execute query
  queryCommand
    .then(async (response) => {
      //so luong sp thoa dieu kien
      const counts = response?.length;
      return res.status(200).json({
        success: response ? true : false,
        products: response ? response : "Cannot find products",
        counts,
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const product = await Product.findByIdAndUpdate(pid, req.body, { new: true });

  return res.status(200).json({
    success: product ? true : false,
    product: product ? product : "Cannot update product",
  });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) throw new Error("Missing inputs");
  const product = await Product.findByIdAndDelete(pid);

  return res.status(200).json({
    success: product ? true : false,
    product: product ? product : "Cannot delete product",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star || !pid) throw new Error("Missing inputs");
  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings.find(
    (el) => el.postedBy.toString() === _id
  );
  if (alreadyRating) {
    await Product.updateOne({
        ratings: {$elemMatch:alreadyRating}
    },{
        $set: {"ratings.$.star": star, "ratings.$.comment": comment}
    },{new:true})

  } else {
    const response = await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id } },
      },
      { new: true }
    );
  }
  const updatedProduct=await Product.findById(pid)
  const ratingCount=updatedProduct.ratings.length;
  const sumRatings=updatedProduct.ratings.reduce((sum,element)=>{
    return sum+ +element.star;
  },0)
  updatedProduct.totalRatings=Math.round(sumRatings*10/ratingCount)/10;
  await updatedProduct.save()

  return res.status(200).json({
    success: true,
    updatedProduct
  });
});

const uploadImagesProduct =  asyncHandler (async(req,res)=>{
  const {pid}=req.params;
  if(!req.files) throw new Error('Missing inputs');
  const response= await Product.findByIdAndUpdate(pid, {
    $push: {images:{$each: req.files.map(el=>el.path)}}
  },{new:true})
  return res.status(200).json({
    status: response?true: false,
    updatedProduct: response ? response : 'Cannot upload images product',
  })
})



module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
};
