 var express = require('express');
 var router = express.Router()


router.get('/', (req, res)=>{

	var template = 'admin/index';
	var data = {
		title: 'Administrator Dashbord',
	} 

	res.render(template, data);
});


 module.exports = router;