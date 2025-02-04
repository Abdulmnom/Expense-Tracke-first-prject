
import { NextRequest , NextResponse } from "next/server";
import isAuthenticated from "./app/libs/IsAuthenticated";

export const config = {
    matcher : ["/api/transaction/"],
}

export async function middleware(request:NextRequest ) {
    const pathname = request.nextUrl.pathname;
    if(pathname.startsWith("/api/transaction/")) {
        // Verfy authentication token here

        const userId = await isAuthenticated(request);
        
        if(userId) {
            request.cookies.set("userId", userId )
            return NextResponse.next({request});
        }


    } else{
        return NextResponse.json({ message: " you are not authorized" }, { status: 401 });
    }
}