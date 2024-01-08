"use server";

import { createBoard, deleteBoard, getBoard, getBoards, updateBoard } from "./lib/board-db";
import { revalidatePath } from "next/cache";

export async function getBoardByIdAction({
    ownerId,
    id,
    path
}: {
    ownerId: string,
    id: string,
    path: string
}) {
    const board = await getBoard(id);
    revalidatePath(path);
    return board;
}

export async function getUserBoardsAction({
    ownerId,
    path
}: {
    ownerId: string,
    path: string
}) {
    const boards = await getBoards({ ownerId });
    revalidatePath(path);

    return boards;
}
/**
 * Server Action: Create a new board.
 */
export async function createBoardAction({
    title,
    ownerId,
    path,
}: {
    title: string;
    ownerId: string;
    path: string;
}) {
    const createdBoard = await createBoard(title, ownerId);
    revalidatePath(path);

    return createdBoard;
}


/**
 * Server Action: Update an existing board.
 */
export async function updateBoardAction(
    id: string,
    update: { title?: string; drawings?: any[], lastModifiedTime?: Date, ownerId?: string },
    dataUri: string,
    path: string
) {

    const split = dataUri.split(",");
    const base64string = split[1];
    const buffer = Buffer.from(base64string, "base64");

    await updateBoard(id, update, buffer);
    revalidatePath(path);
}

/**
 * Server Action: Delete a board.
 */
export async function deleteBoardAction({
    id,
    path,
}: {
    id: string;
    path: string;
}) {
    await deleteBoard(id);
    revalidatePath(path);
}
