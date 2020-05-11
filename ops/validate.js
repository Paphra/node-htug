module.exports = (req, res, next)=>{
  //next();
  if (req.session.user){
    next();
  }else{
    req.session.user = {
      id: '0001',
      username: 'user',
      isAdmin: true,
    };
    //req.session.return_to = req.originalUrl;
    //res.redirect('/login');
    next();
  }
}