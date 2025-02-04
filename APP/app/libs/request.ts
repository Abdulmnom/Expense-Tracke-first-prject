import connectDB from "@/app/libs/connectDB";

export async function login(email: string, password: string): Promise<IAuth> {
    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }

        const data: IAuth = await response.json();
        return data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

// Promise based function to register user
export async function register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
): Promise<IAuth> {
    try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // تم تصحيح الخطأ الإملائي
            },
            body: JSON.stringify({ email, password, username, confirmPassword }),
        });

        if (!response.ok) {
            throw new Error(`Register failed: ${response.statusText}`);
        }

        const data: IAuth = await response.json();
        return data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
}

// Interfaces
interface IUser {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    _id: string; // auto-generated id
    createdAt: Date;
    updatedAt: Date;
}

interface IAuth {
    user: IUser; // عدلت من string إلى IUser ليكون هيكلياً
    token: string;
}
