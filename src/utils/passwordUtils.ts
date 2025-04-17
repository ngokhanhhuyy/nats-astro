import bcrypt from "bcrypt";

export async function hashPasswordAsync(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function verifyPasswordAsync(
        password: string,
        hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}