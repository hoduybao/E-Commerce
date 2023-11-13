const router=require('express').Router()
const ctrls=require('../controllers/coupon')
const {verifyAccessToken,isAdmin}=require('../middlewares/verifyToken')

router.post('/create',[verifyAccessToken,isAdmin],ctrls.createNewCoupon)
router.get('/getAll',ctrls.getCoupons);
router.put('/update/:cid',[verifyAccessToken,isAdmin],ctrls.updateCoupon);
router.delete('/delete/:cid',[verifyAccessToken,isAdmin],ctrls.deleteCoupon);





module.exports=router;