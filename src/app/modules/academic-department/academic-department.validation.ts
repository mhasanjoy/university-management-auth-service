import { z } from "zod";

const createAcademicDepartmentZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
        }),
        academicFaculty: z.string({
            required_error: "Academic faculty is required",
        }),
    }),
});

const updateAcademicDepartmentZodSchema = z
    .object({
        body: z.object({
            title: z.string().optional(),
            academicFaculty: z.string().optional(),
        }),
    })
    .refine(data => data.body.title || data.body.academicFaculty, {
        message: "Either title or academicFaculty should be provided!",
    });

export const AcademicDepartmentValidation = {
    createAcademicDepartmentZodSchema,
    updateAcademicDepartmentZodSchema,
};
