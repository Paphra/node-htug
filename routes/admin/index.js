 var express = require('express');
 var router = express.Router()

 var context = require('../../ops/context');

router.get('/', (req, res)=>{
	let template = 'admin/index';
	let data = {
		title: 'Administrator Dashbord',

		navAdmin: true,
		navAdminDashboard: true,
	}

	context(data, req);
  res.render(template, data);
});


 module.exports = router;