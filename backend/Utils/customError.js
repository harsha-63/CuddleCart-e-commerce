class CustomError extends Error {
    //constructor for receive error message and statuscode
    constructor(message, statusCode) {
     // Call the parent class(error) constructor for set the error
      super(message); 
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default CustomError;
  