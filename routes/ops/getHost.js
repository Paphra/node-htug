
module.exports = function (req){
	let host = req.protocol + '://' + req.hostname;
  let port = ':3000'; // for dev
  if(req.hostname === 'localhost' || '127.0.0.1'){
    host += port;
	}
	
	return host;
}