import { IUser } from "./user.interface";
import User from "./user.model";

const createUser = async (user: IUser): Promise<IUser | null> => {
    const createdUser = await User.create(user);

    // auto generated incremental id
    // default password

    if (!createUser) {
        throw new Error("Failed to create user!");
    }
    return createdUser;
};

export default {
    createUser,
};
