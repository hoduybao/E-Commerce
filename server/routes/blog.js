const router=require('express').Router()
const {verifyAccessToken,isAdmin}=require('../middlewares/verifyToken')
const ctrls=require('../controllers/blog')
const uploader=require('../config/cloudinary.config')
router.post('/create', [verifyAccessToken,isAdmin],ctrls.createNewBlog)

router.get('/getAll', ctrls.getBlogs)
router.put('/update/:bid', [verifyAccessToken,isAdmin],ctrls.updateBlog)
router.get('/getOne/:bid', ctrls.getBlog)
router.put('/like/:bid',[verifyAccessToken], ctrls.likeBlog)
router.put('/uploadimage/:bid',[verifyAccessToken,isAdmin], uploader.single('image') ,ctrls.uploadImagesBlog)

router.put('/dislike/:bid',[verifyAccessToken], ctrls.dislikeBlog)
router.delete('/delete/:bid',[verifyAccessToken,isAdmin], ctrls.deleteBlog)

module.exports =router