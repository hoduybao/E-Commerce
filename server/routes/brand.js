const router=require('express').Router()
const ctrls=require('../controllers/brand')
const {verifyAccessToken,isAdmin}=require('../middlewares/verifyToken')

router.post('/create',[verifyAccessToken,isAdmin],ctrls.createBrand)
router.get('/',ctrls.getBrand)
router.put('/update/:bid',[verifyAccessToken,isAdmin],ctrls.updateBrand)
router.delete('/delete/:bid',[verifyAccessToken,isAdmin],ctrls.deleteBrand)




module.exports=router;