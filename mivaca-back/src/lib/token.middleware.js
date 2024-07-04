const checkAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    const token = (authHeader+"").replaceAll('Bearer','').trim();
    if (token.length === 0) {
        res.status(401).end();
        next(new Error('Unauthorized'));
        return;
    } 
    req.user = {id: token};
    next();
}

export {
    checkAuth
};