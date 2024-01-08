/* eslint-disable react-hooks/rules-of-hooks */
import { Board } from "../models/board";
import connectDB from "./mongoose";
import { stringToObjectId } from "./utils";

interface BoardFilter {
    ownerId: string;
    page?: number;
    limit?: number;
}

export async function getBoards(filter: BoardFilter) {
    try {
        await connectDB();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        const boards = await Board.find({ ownerId: filter.ownerId }).skip(skip).limit(limit).sort({ lastModifiedTime: - 1 }).lean().exec();

        const results = boards.length;

        return {
            boards: boards,
            page,
            limit,
            results,
        };
    } catch (error) {
        return { error };
    }
}

export async function createBoard(title: string, ownerId: string) {
    try {
        await connectDB();

        const blankThumbnail = Buffer.from("R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", 'base64');
        const board = await Board.create({ title, ownerId, createdTime: Date.now(), lastModifiedTime: Date.now(), thumbnail: blankThumbnail });
        return {
            board,
        };
    } catch (error) {
        return { error };
    }
}

export async function getBoard(id: string) {
    try {
        // const { data: session } = useSession()
        await connectDB();

        const parsedId = stringToObjectId(id);

        if (!parsedId) {
            return { error: "Board not found" };
        }
        const board = await Board.findById(parsedId).lean().exec();
        if (board) {
            return {
                board,
            };
        } else {
            return { error: "Board not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateBoard(
    id: string,
    { title, drawings, thumbnail }: { title?: string; drawings?: any[], thumbnail: Buffer }
) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        if (!parsedId) {
            return { error: "Board not found" };
        }
        const board = await Board.findByIdAndUpdate(
            parsedId,
            { title, drawings, thumbnail, lastModifiedTime: Date.now() },
            { new: true }
        )
            .lean()
            .exec();

        if (board) {
            return {
                board,
            };
        } else {
            return { error: "Board not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function deleteBoard(id: string) {
    try {
        await connectDB();

        const parsedId = stringToObjectId(id);

        if (!parsedId) {
            return { error: "Board not found" };
        }

        const board = await Board.findByIdAndDelete(parsedId).exec();

        if (board) {
            return {};
        } else {
            return { error: "Board not found" };
        }
    } catch (error) {
        return { error };
    }
}
