
// const asyncHandler = (fn) => {
//     return () => { fn()}
// }


// const asyncHandler = (fn) => {
//   return async(req, res, next) => {
   
//      await fn(req,res,next);
    
//   };
// };

// const asyncHandler = (fn) => {
//   return async(req, res, next) => {
//     try {
//      await fn(req,res,next);
//     } catch (err) {
//       next();
//     }
//   };
// };

const asyncHandler = (fn) => {
  return async(req, res, next) => {
    try {
     await fn(req,res,next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {asyncHandler};
