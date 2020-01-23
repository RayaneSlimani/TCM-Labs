export function calculateNeighbors({board, x, y, cols, rows}) {
    let neighbors = 0;
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i]
        let y1 = y + dir[0], x1 = x + dir[1]
        if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]) {
            neighbors++
        }
    }
    return neighbors;
}

export function makeEmptyBoard({rows, cols}) {
    let board = [];
    for (let y = 0; y < rows; y++) {
        board[y] = [];
        for (let x = 0; x < cols; x++) {
            board[y][x] = false;
        }
    }
    return board;
}
