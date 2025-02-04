import { json } from "stream/consumers";
const jose = require("node-jose");

export default async function cratateToken(userId: string) {
    const token = new jose.SignJWT({ userId })
    .setSubject("1d")
    .setProtectedHeader({ alg : "HS256" })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return token
}