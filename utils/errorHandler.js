module.exports = (res, error) => {
    res.status(500).json({
        success: false,
        massage: error.message ? error.message : error
    });
}