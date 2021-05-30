module.exports = (res, error) => {
    console.log({
        success: false,
        massage: error.message ? error.message : error
    });
}