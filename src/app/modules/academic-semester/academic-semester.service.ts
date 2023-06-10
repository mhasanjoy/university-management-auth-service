import { IAcademicSemester } from "./academic-semester.interface";
import AcademicSemester from "./academic-semester.model";

const createSemester = async (
    payload: IAcademicSemester
): Promise<IAcademicSemester> => {
    const result = await AcademicSemester.create(payload);
    return result;
};

export const AcademicSemesterService = {
    createSemester,
};
