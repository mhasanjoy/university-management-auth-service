// import { Request, Response } from "express";
// import config from "../../config";
// import handleValidationError from "../../errors/handleValidationError";
// import { IGenericErrorMessage } from "../../interfaces/error";

// const globalErrorHandler = (error, req: Request, res: Response) => {
//     const statusCode = 500;
//     const message = "Something went wrong!";
//     const errorMessages: IGenericErrorMessage[] = [];

//     if (error?.name === "ValidationError") {
//         const simplifiedError = handleValidationError(error);
//     }

//     res.status(statusCode).json({
//         success: false,
//         message,
//         errorMessages,
//         stack: config.env !== "production" ? error?.stack : undefined,
//     });
// };

// export default globalErrorHandler;
