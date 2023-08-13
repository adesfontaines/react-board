"use server";

import { createBoard, deleteBoard, updateBoard } from "./lib/board-db";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Create a new board.
 */
export async function createBoardAction({
    title,
    path,
}: {
    title: string;
    path: string;
}) {
    await createBoard(title);
    revalidatePath(path);
}

/**
 * Server Action: Update an existing board.
 */
export async function updateBoardAction(
    id: string,
    update: { tilte?: string; completed?: boolean },
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
