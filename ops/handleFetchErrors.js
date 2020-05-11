module.exports  = function(res, reason, backUrl){
	let data = {
		reason: reason,
		backUrl: backUrl,
	}
	res.render('fetch/errors', data);
}