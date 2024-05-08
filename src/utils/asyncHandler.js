//second way of the 2 to write the wrapper so that we don't have to write it again and again
const asyncHandler = (requestHandler) => {
   return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

//first way to write the wrapper so that we don't have to write the same code again and again
// const asyncHandler = (fn)=> {async (req, res, next)=>{
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             message: err.message,
//             success: false
//         })
//     }
// }}
