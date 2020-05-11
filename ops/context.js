module.exports = (context, req)=>{
	context.user = req.session.user;
}