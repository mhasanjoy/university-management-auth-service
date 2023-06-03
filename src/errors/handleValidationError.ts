// import mongoose from "mongoose";
// import { IGenericErrorMessage } from "../interfaces/error";

// const handleValidationError = (error: mongoose.Error.ValidationError) => {
//     const statusCode = 400;
//     const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
//         (element: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
//             return {
//                 path: element.path,
//                 message: element.message,
//             };
//         }
//     );

//     return {};
// };

// export default handleValidationError;
