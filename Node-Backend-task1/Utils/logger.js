
module.exports = function (req, res, next) {

    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(`URL request from  - ${fullUrl} with ${req.method} request method`);
    next();
}