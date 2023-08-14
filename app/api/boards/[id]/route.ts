import connectDB from "@/app/lib/mongoose";
import { deleteBoard, getBoard, updateBoard } from "@/app/lib/board-db";
import { createErrorResponse } from "@/app/lib/utils";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const token = await getToken({ req: _request });

        const session = await getServerSession(_request);

        if (token) {
            // Signed in
            console.log("JSON Web Token", JSON.stringify(token, null, 2))
        } else {
            console.log(token);
            // Not Signed in
            return createErrorResponse("Invalid Authorization", 401);
        }


        const id = params.id;
        const { board, error } = await getBoard(id);

        if (error) {
            throw error;
        }

        let json_response = {
            status: "success",
            data: {
                board,
            },
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        if (typeof error === "string" && error.includes("Board not found")) {
            return createErrorResponse("Board not found", 404);
        }

        return createErrorResponse(error.message, 500);
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const id = params.id;
        let body = await request.json();

        const { board, error } = await updateBoard(id, body);

        if (error) {
            throw error;
        }

        let json_response = {
            status: "success",
            data: {
                board,
            },
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        if (typeof error === "string" && error.includes("Board not found")) {
            return createErrorResponse("Board not found", 404);
        }

        return createErrorResponse(error.message, 500);
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const id = params.id;
        const { error } = await deleteBoard(id);

        if (error) {
            throw error;
        }

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        if (typeof error === "string" && error.includes("Board not found")) {
            return createErrorResponse("Board not found", 404);
        }

        return createErrorResponse(error.message, 500);
    }
}
