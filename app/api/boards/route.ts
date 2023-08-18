import connectDB from "@/app/lib/mongoose";
import { createBoard, getBoards } from "@/app/lib/board-db";
import { createErrorResponse } from "@/app/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const page_str = request.nextUrl.searchParams.get("page");
        const limit_str = request.nextUrl.searchParams.get("limit");
        const ownerId = request.nextUrl.searchParams.get("ownerId");

        if (!ownerId) {
            return createErrorResponse("OwnerId is required", 400);
        }

        const page = page_str ? parseInt(page_str, 10) : 1;
        const limit = limit_str ? parseInt(limit_str, 10) : 10;

        const { boards, results, error } = await getBoards({ page, limit, ownerId });

        if (error) {
            throw error;
        }

        let json_response = {
            status: "success",
            results,
            boards,
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        if (!body.title) {
            return createErrorResponse("Board must have a title", 400);
        }

        if (!body.ownerId) {
            return createErrorResponse("Board must have an owner", 400);

        }
        const { board, error } = await createBoard(body.title, body.ownerId);
        if (error) {
            throw error;
        }

        let json_response = {
            status: "success",
            data: {
                board,
            },
        };
        return new NextResponse(JSON.stringify(json_response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        if (error.code === 11000) {
            return createErrorResponse("Board with this title already exists", 409);
        }

        return createErrorResponse(error.message, 500);
    }
}
