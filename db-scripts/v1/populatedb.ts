#!/usr/bin/env node

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { User } from "../../src/api/v1/models";

const users = [];

const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0];

mongoose.set("strictQuery", false);

async function userCreate(
    first_name: string,
    family_name: string,
    username: string,
    original_password: string,
    role: string,
) {
    const password = await bcrypt.hash(original_password, 10);
    const user = new User({
        first_name,
        family_name,
        username,
        password,
        role,
    });

    await user.save();
    users.push(user);
    console.log(`Added user: ${username}`);
}

async function createData() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoDB);

        await userCreate("John", "Doe", "johndoe", "password123", "admin");
        await userCreate("Jane", "Smith", "janesmith", "securepwd", "user");
    } catch (error) {
        console.error("Error populating the database:", error);
    } finally {
        console.log("Closing MongoDB connection...");
        mongoose.connection.close();
    }
}

createData();
