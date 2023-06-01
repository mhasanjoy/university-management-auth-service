import User from "./user.model";

const findLastUserId = async (): Promise<string | undefined> => {
    const lastUser = await User.findOne(
        {},
        {
            _id: 0,
            id: 1,
        }
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastUser?.id;
};

export const generateUserId = async (): Promise<string> => {
    const lastUserId = (await findLastUserId()) || "0";
    const currentUserId = (parseInt(lastUserId) + 1)
        .toString()
        .padStart(5, "0");

    return currentUserId;
};
