const router=require('express').Router()
const ctrls=require('../controllers/product')
const {verifyAccessToken,isAdmin}=require('../middlewares/verifyToken')
const uploader=require('../config/cloudinary.config')
router.post('/create',[verifyAccessToken,isAdmin] ,ctrls.createProduct)

router.get('/getAll',ctrls.getAllProduct)
router.put('/ratings',[verifyAccessToken] ,ctrls.ratings)
router.put('/uploadimage/:pid',[verifyAccessToken,isAdmin], uploader.array('images',10) ,ctrls.uploadImagesProduct)

router.put('/update/:pid',[verifyAccessToken,isAdmin] ,ctrls.updateProduct)
router.delete('/delete/:pid',[verifyAccessToken,isAdmin] ,ctrls.deleteProduct)
router.get('/getOne/:pid',ctrls.getProduct)



module.exports=router;