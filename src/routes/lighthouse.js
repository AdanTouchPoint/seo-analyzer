const {Router} = require('express');
const router = Router();
const check = require('../controllers/lighthouse')

router.get('/', async (req, res) => {

    try {
        console.log(req.body.url)
        const url = req.body.url
        const result = await check.Check(url)
        console.log( result.lhr.categories)

        res.json({
            success: true,
            message: '',
            data: result.lhr.categories 
        })

    } catch (error) {
        res.status(400)
        res.json({
            success: false,
            message: error.message
        })
    }
})
module.exports = router;