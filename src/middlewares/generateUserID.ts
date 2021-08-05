import crypto from "crypto"

export const generateUserId = () => {
    const currentDate = new Date()
    const timestamp = currentDate.getTime()
    const hex = crypto.randomBytes(8).toString("hex");
    return timestamp + "-" + hex
}