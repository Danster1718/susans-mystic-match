class Match3Engine {
    constructor(size = 8, tileTypes = 6) {
        this.size = size;
        this.tileTypes = tileTypes;
        this.grid = [];
        this.selected = null;
        this.onMatch = () => {};
        this.onMove = () => {};
        this.generateGrid();
    }

    generateGrid() {
        this.grid = [];
        for (let r = 0; r < this.size; r++) {
            let row = [];
            for (let c = 0; c < this.size; c++) {
                row.push(this.randomTile());
            }
            this.grid.push(row);
        }
        this.removeInitialMatches();
    }

    randomTile() {
        return Math.floor(Math.random() * this.tileTypes);
    }

    removeInitialMatches() {
        let done = false;
        while (!done) {
            let matches = this.findMatches();
            if (matches.length === 0) {
                done = true;
            } else {
                this.clearMatches(matches);
                this.gravity();
                this.refill();
            }
        }
    }

    selectTile(r, c) {
        if (!this.selected) {
            this.selected = { r, c };
            return true;
        }
        let sr = this.selected.r;
        let sc = this.selected.c;

        if (Math.abs(sr - r) + Math.abs(sc - c) === 1) {
            this.swap(sr, sc, r, c);
            let matches = this.findMatches();
            if (matches.length > 0) {
                this.onMove();
                this.resolve(matches);
            } else {
                this.swap(sr, sc, r, c);
            }
        }

        this.selected = null;
        return true;
    }

    swap(r1, c1, r2, c2) {
        let temp = this.grid[r1][c1];
        this.grid[r1][c1] = this.grid[r2][c2];
        this.grid[r2][c2] = temp;
    }

    findMatches() {
        let matches = [];

        // horizontal
        for (let r = 0; r < this.size; r++) {
            let streak = 1;
            for (let c = 1; c < this.size; c++) {
                if (this.grid[r][c] === this.grid[r][c - 1]) {
                    streak++;
                } else {
                    if (streak >= 3) {
                        matches.push({ r, c: c - 1, len: streak, dir: "h" });
                    }
                    streak = 1;
                }
            }
            if (streak >= 3) {
                matches.push({ r, c: this.size - 1, len: streak, dir: "h" });
            }
        }

        // vertical
        for (let c = 0; c < this.size; c++) {
            let streak = 1;
            for (let r = 1; r < this.size; r++) {
                if (this.grid[r][c] === this.grid[r - 1][c]) {
                    streak++;
                } else {
                    if (streak >= 3) {
                        matches.push({ r: r - 1, c, len: streak, dir: "v" });
                    }
                    streak = 1;
                }
            }
            if (streak >= 3) {
                matches.push({ r: this.size - 1, c, len: streak, dir: "v" });
            }
        }

        return matches;
    }

    resolve(matches) {
        this.onMatch(matches.length * 10);

        this.clearMatches(matches);
        this.gravity();
        this.refill();

        let next = this.findMatches();
        if (next.length > 0) {
            this.resolve(next);
        }
    }

    clearMatches(matches) {
        for (let m of matches) {
            if (m.dir === "h") {
                for (let i = 0; i < m.len; i++) {
                    this.grid[m.r][m.c - i] = null;
                }
            } else {
                for (let i = 0; i < m.len; i++) {
                    this.grid[m.r - i][m.c] = null;
                }
            }
        }
    }

    gravity() {
        for (let c = 0; c < this.size; c++) {
            for (let r = this.size - 1; r >= 0; r--) {
                if (this.grid[r][c] === null) {
                    for (let k = r - 1; k >= 0; k--) {
                        if (this.grid[k][c] !== null) {
                            this.grid[r][c] = this.grid[k][c];
                            this.grid[k][c] = null;
                            break;
                        }
                    }
                }
            }
        }
    }

    refill() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.grid[r][c] === null) {
                    this.grid[r][c] = this.randomTile();
                }
            }
        }
    }
}
