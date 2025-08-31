function ErrorHanddler (error,req,res,next) {
     
     const message = error.message || "Something wents wrong";
     const statusCode = error.statusCode ||500;
     const status = error.status || "error"
     
     console.log(error)
     res.status(statusCode).json({message : message,status:status});
}
module.exports = ErrorHanddler;