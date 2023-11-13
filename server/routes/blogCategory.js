const router=require('express').Router()
const ctrls=require('../controllers/blogCategory')
const {verifyAccessToken,isAdmin}=require('../middlewares/verifyToken')

router.post('/create',[verifyAccessToken,isAdmin],ctrls.createCategory)
router.get('/',ctrls.getCategories)
router.put('/update/:bcid',[verifyAccessToken,isAdmin],ctrls.updateCategory)
router.delete('/delete/:bcid',[verifyAccessToken,isAdmin],ctrls.deleteCategory)




module.exports=router;