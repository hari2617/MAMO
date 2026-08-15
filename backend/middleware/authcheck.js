export const  authcheck = ((req,res,next)=>{
    if(!req.session.login){
        console.log("not found in middleware")
        return res.status(401).send("Need to login")
    }

    next()
})