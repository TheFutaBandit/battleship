export const ship = (shipLength, shipHit = 0, shipStatus = true) => {
    let length = shipLength;
    let hit = shipHit;
    let status = shipStatus;

    const checkStatus = () => {
        return status;
    }

    let isSunk = () => {
        if(length <= hit) {
            status = false;
        } 
        return !status;
    }

    let hit_ship = () => {
        hit += 1;
        isSunk();
    }

    let getLength = () => {
        return length;
    }

    

    return {
        checkStatus,
        hit_ship,
        isSunk,
        getLength
    }
}

export const Gameboard = () => {
    let totalShips = 0;

    let tileMaker = () => {
        return {
            status : "water",
            ship : null,
            isHit : function () { this.status = "hit" },
            isMiss : function () { this.status = "miss" },
            placeShip : function (ship) { this.status = "ship", this.ship = ship },
            getShip : function () { return this.ship },
            getStatus : function () { return this.status },
        }
    }

    let board = Array.from({length : 10}, () => Array.from({length: 10}, () => tileMaker()));

    function boundaryCheck(x,y) {
        if(x <= 10 && x >= 0 && y <= 10 && y >= 0) {
            return true;
        } else {
            return false;
        }
    }

    let placeShip = (x,y,ship) => {
        if(boundaryCheck(x,y) && boundaryCheck(x+ship.getLength(), y+ship.getLength())) {
            for(let i = 0; i<ship.getLength(); i++) {
                board[x][y+i].placeShip(ship);
            }
            totalShips++;
        }
    }

    let receiveAttack = (x,y) => {
        let cell = board[x][y];
        if(cell.status === "ship") {
            let ship = cell.getShip();
            ship.hit_ship();
            cell.isHit();
            if(ship.isSunk() === true) {
                totalShips--;
            }
            return "hit";
        } else {
            cell.isMiss();
            return "miss";
        }
    }

    let printBoard = () => {
        console.table(board);
    }

    let checkTotal = () => {
        return totalShips;
    }

    let allSunk = () => {
        return (totalShips === 0);
    }

    return {
        placeShip,
        printBoard,
        receiveAttack,
        checkTotal,
        allSunk
    }
}

export function sum(a,b) {
    return a + b;
}
