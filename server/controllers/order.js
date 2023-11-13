const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");

const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title price");

  const products = userCart?.cart.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    color: el.color,
  }));

  const total = userCart?.cart.reduce(
    (sum, el) => el.product.price * el.quantity + sum,
    0
  );
  const createData={products,total,orderBy:_id}
  if (coupon)
  {
    const selectedCoupon=await Coupon.findById(coupon);
    total = Math.round((total * (1 - selectedCoupon?.discount / 100)) / 1000) * 1000||total;
    createData.total=total
    createData.coupon=coupon
  } 
  const rs = await Order.create(createData);
  return res.status(200).json({
    success: rs ? true : false,
    newOrder: rs ? rs : "Cannot create new order ",
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;

  const { status } = req.body;
  if (!status) throw new Error("Missing input");

  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );

  return res.status(200).json({
    success: response ? true : false,
    updatedOrder: response ? response : "Cannot update order ",
  });
});

const getOrderUser = asyncHandler(async (req, res) => {
  const {_id}=req.user;

  const response = await Order.find(
    {orderBy: _id}
  );

  return res.status(200).json({
    success: response ? true : false,
    orders: response ? response : "Cannot get order ",
  });
});

const getOrders = asyncHandler(async (req, res) => {

  const response = await Order.find( );

  return res.status(200).json({
    success: response ? true : false,
    orders: response ? response : "Cannot get orders ",
  });
});
module.exports = {
  createOrder,
  updateStatus,
  getOrderUser,
  getOrders
};
