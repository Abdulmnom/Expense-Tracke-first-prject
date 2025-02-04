import * as jose from 'jose';
import { NextRequest } from 'next/server';


export default async function isAuthenticated(request: NextRequest) {
    // Verify the JWT token
    const authorization = request.headers.get('authorization')
    if (!authorization || !authorization.startsWith('Bearer ') ) {
        return false;
    }
    const token = authorization.replace('Bearer ', '');
    const JWT_SECRET = process.env.JWT_SECRET as string; // as string to avoid type error

    try {
        const { payload } = await jose.jwtVerify(token, 
           new TextEncoder().encode(JWT_SECRET)
        );

        const userId = payload['userId'] as string; // Extract the user ID from the JWT payload
        return userId;

    } catch (error) {
        return false;
    }
}