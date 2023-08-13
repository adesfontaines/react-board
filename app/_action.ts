"use server";

import { createBoard, deleteBoard, getBoards, updateBoard } from "./lib/board-db";
import { revalidatePath } from "next/cache";

export async function getUserBoards({
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
    await createBoard(title, ownerId);
    console.log("c'est fait")
    revalidatePath(path);
}


/**
 * Server Action: Update an existing board.
 */
export async function updateBoardAction(
    id: string,
    update: { title?: string; ownerId?: string },
    path: string
) {
    await updateBoard(id, update);
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
