var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    console.log('the time is - ', Date.now())
    next();
});

router.get('/', (req, res, next) => {
    res.send('Come from nominees home via router');
    next();

})

router.get('/about', (req, res, next) => {
    res.send('Come from nominees home but about page via router');
    next()
})

module.exports = router;