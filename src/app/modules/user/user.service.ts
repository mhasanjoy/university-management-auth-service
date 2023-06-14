// import config from "../../../config";
// import ApiError from "../../../errors/ApiError";
// import AcademicSemester from "../academic-semester/academic-semester.model";
// import { IStudent } from "../student/student.interface";
// import { IUser } from "./user.interface";
// import User from "./user.model";
// import { generateStudentId } from "./user.utils";

// const createStudent = async (student: IStudent, user: IUser): Promise<> => {
//     // auto generated incremental id
//     const academicSemester = await AcademicSemester.findById(
//         student.academicSemester
//     );
//     const id = await generateStudentId(academicSemester);
//     student.id = id;

//     // default password
//     if (!user.password) {
//         user.password = config.default_student_password as string;
//     }

//     // set role
//     user.role = "student";

//     const createdUser = await User.create(user);
//     if (!createUser) {
//         throw new ApiError(400, "Failed to create user!");
//     }
//     return createdUser;
// };

// export const UserService = {
//     createStudent,
// };
