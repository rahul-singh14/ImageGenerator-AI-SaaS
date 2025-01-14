import jwt from "jsonwebtoken";

const userAuth = async(req, res, next) => {
    const {token} = req.headers;

    if(!token) {
        res.json({
            success: false,
            message: 'User not authorized'
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id
            next();
        } else {
            return res.json({
                success: false,
                message: 'User not authorized'
            })
        }

    } catch (error) {
        console.log('error----', error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default userAuth;