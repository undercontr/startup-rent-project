import bcrypt from "bcrypt"

export async function cryptPassword(password) {
    try {
        return await bcrypt.hash(password, await bcrypt.genSalt(10))
    } catch (error) {
        throw new Error(error)
    }
    
};

export async function comparePassword(plainPass, hash) {
    try {
        return await bcrypt.compare(plainPass, hash)
    } catch (error) {
        throw new Error(error)
    }
};