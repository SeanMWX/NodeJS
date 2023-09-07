function authetnicator (req, res, next) {
    console.log('Authenticating...');
    next();
};

module.exports = authetnicator;