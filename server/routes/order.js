const router=require('express').Router()
const {verifyAccessToken,isAdmin}=require('../middlewares/verifyToken')
const ctrls=require('../controllers/order')


router.post('/create', verifyAccessToken,ctrls.createOrder);
router.put('/status/:oid', [verifyAccessToken,isAdmin],ctrls.updateStatus);
router.get('/', [verifyAccessToken],ctrls.getOrderUser);
router.get('/admin', [verifyAccessToken,isAdmin],ctrls.getOrders);


module.exports =router