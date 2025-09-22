

const isAdmin = (req, res, next) => {

    if(!req.user){
        return res.status(401).json({
            message : "Unauthorized user not authentificated"
        });
    }

    if(req.user.role !== "admin"){
        return res.status(403).json({
            message : "Forbidden -Admin access only"
        });

    }

    next();
}

export default isAdmin;