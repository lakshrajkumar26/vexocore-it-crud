 class ApiError extends Error{
    constructor(message,statusCode,status){
        super(message)
        //  this.message = message; do the same means super is dong the same with older clas 
         this.statusCode = statusCode;
         this.status = `${statusCode}`.startsWith("4")? "failed" : "error";
    }
}
module.exports = ApiError;


