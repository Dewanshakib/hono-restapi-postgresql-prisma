import crypto from "crypto";
export const verifyPwd = (password, salt, hash) => {
    const hashPwd = crypto.scryptSync(password, salt, 64).toString("hex");
    return hashPwd === hash;
};
