const express = require('express');
const passport= require('passport');
const upload = require('../middleware/upload');
const controller =require('../controllers/adminGame');
const router = express.Router();

// localhost:5000/api/admin/add_business
router.post('/add_business', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.addBusiness);

// localhost:5000/api/admin/add_question
router.post('/add_question', passport.authenticate('jwt', {session: false}), controller.addQuestion);

// localhost:5000/api/admin/output_business
router.post('/output_business' , controller.outputBusiness);

// localhost:5000/api/admin/output_question
router.post('/output_question', passport.authenticate('jwt', {session: false}), controller.outputQuestion);

// localhost:5000/api/admin/delete_vse
router.post('/delete_vse', passport.authenticate('jwt', {session: false}), controller.deleteVse);

// localhost:5000/api/admin/test_admin
router.post('/test_admin', passport.authenticate('jwt', {session: false}), controller.test_admin);

//addBusinessLvl
// localhost:5000/api/admin/add_business_lvl
router.post('/add_business_lvl', passport.authenticate('jwt', {session: false}), controller.addBusinessLvl);

module.exports = router;
