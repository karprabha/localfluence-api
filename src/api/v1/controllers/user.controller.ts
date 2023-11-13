import expressAsyncHandler from "express-async-handler";

import { User } from "../models";

const getAllUsers = expressAsyncHandler(async (req, res, next) => {
    const allUsers = await User.find(
        {},
        "first_name family_name username avatar_url",
    ).exec();
    res.json(allUsers);
});

export default {
    getAllUsers,
};
