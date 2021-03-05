const jwt =require('jsonwebtoken');


const checkAuth=(req,res,next)=>{
    //console.log(req.headers);
    //Bearer
    try{
        const token=req.headers.authorization.split(' ')[1];
        //בודק אם הוא מחובר
        jwt.verify(token,process.env.JWT_KEY);
        //ממשיך אם זה מצליח
        next();

    } catch(error){
        res.status(401).json({
            message:'לא התחברת'
        });
    }
}

module.exports=checkAuth;