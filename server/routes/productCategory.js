const router=require('express').Router()
const ctrls=require('../controllers/productCategory')
const {verifyAccessToken,isAdmin}=require('../middlewares/verifyToken')

router.post('/create',[verifyAccessToken,isAdmin],ctrls.createCategory)
router.get('/',ctrls.getCategories)
router.put('/update/:pcid',[verifyAccessToken,isAdmin],ctrls.updateCategory)
router.delete('/delete/:pcid',[verifyAccessToken,isAdmin],ctrls.deleteCategory)




module.exports=router;