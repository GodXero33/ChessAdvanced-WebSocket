import {
	classesMap,
	defaultBoard,
	getAllValidMoves
} from './rules.js';

class ChessBoard {
	constructor (boardContainer, firstSlotContainer, secondSlotContainer) {
		this.boardContainer = boardContainer;
		this.firstSlotContainer = firstSlotContainer;
		this.secondSlotContainer = secondSlotContainer;

		this.tiles = Array.from({ length: 8 }, () => new Array(8));
		this.firstSlots = new Array(16);
		this.secondSlots = new Array(16);
		this.curFilledFirstSlotIndex = 0;
		this.curFilledSecondSlotIndex = 0;
		this.board = null;
		this.selectedTile = null;
		this.highlightedTiles = [];
		this.highlightedCoords = [];
		this.player = 1; // 0 black, 1 white
		this.playerChance = true;
		this.kingCheckedFirstPlayer = false;
		this.kingCheckedSecondPlayer = false;
		this.action = null;
		this.hasRoom = false;
	}

	addCaptureItemToSlot (value) {
		if (this.player == 0) {
			this.firstSlots[this.curFilledFirstSlotIndex].classList.add(classesMap.get(value));

			this.curFilledFirstSlotIndex++;
		} else {
			this.secondSlots[this.curFilledSecondSlotIndex].classList.add(classesMap.get(value));

			this.curFilledSecondSlotIndex++;
		}
	}

	updateTiles () {
		if (this.board == null) return;

		this.tiles.forEach((row, y) => row.forEach((tile, x) => {
			for (let a = 1; a < 13; a++) {
				tile.classList.remove(classesMap.get(a));
			}

			const tileValue = this.board[y][x];

			if (tileValue) tile.classList.add(classesMap.get(tileValue));
		}));
	}

	copyDefaultBoard () {
		this.board = defaultBoard.map(row => row.map(tile => tile));
	}

	createBoard () {
		const letters = 'abcdefgh';

		for (let y = 0; y < 8; y++) {
			for (let x = 0; x < 8; x++) {
				const tile = document.createElement('div');

				this.tiles[y][x] = tile;

				tile.classList.add('tile');
				tile.classList.add((x + y) % 2 == 0 ? 'black' : 'white');
				tile.dataset.label = `${letters[x]}${y + 1}`;
				
				this.boardContainer.appendChild(tile);
			}
		}
	}

	createSlots () {
		for (let a = 0; a < 16; a++) {
			const slot1 = document.createElement('div');
			const slot2 = document.createElement('div');
			
			this.firstSlots[a] = slot1;
			this.secondSlots[a] = slot2;
	
			slot1.classList.add('slot');
			slot2.classList.add('slot');
	
			this.firstSlotContainer.appendChild(slot1);
			this.secondSlotContainer.appendChild(slot2);
		}
	}

	getTileCoords (tile) {
		for (let y = 0; y < 8; y++)
			for (let x = 0; x < 8; x++)
				if (this.tiles[y][x] === tile) return [x, y];

		return null;
	}

	getKingCoords (player) {
		for (let y = 0; y < 8; y++)
			for (let x = 0; x < 8; x++)
				if (this.board[y][x] == (player == 0 ? 6 : 12)) return [x, y];

		return null;
	}

	kingCheckAlert (player, state) {
		const opponentKingCoords = this.getKingCoords(player == 0 ? 1 : 0);

		if (opponentKingCoords == null) return;

		if (!state) {
			this.tiles[opponentKingCoords[1]][opponentKingCoords[0]].classList.remove('king-capture');
			return;
		}

		// this.tiles[opponentKingCoords[1]][opponentKingCoords[0]].classList.add('king-capture');
	}

	checkForCapture (cx, cy, tx, ty, player) {
		let validCaptureIndex = this.highlightedCoords.findIndex(coord => coord[0] == tx && coord[1] == ty && coord[2] != 0);

		if (validCaptureIndex != -1) {
			const attackValue = this.board[cy][cx];
			const captureValue = this.board[ty][tx];
			this.board[cy][cx] = 0;
			this.board[ty][tx] = attackValue;

			this.addCaptureItemToSlot(captureValue);
			this.updateTiles();

			if (this.highlightedCoords[validCaptureIndex][2] == 2) {
				this.kingCheckAlert(player, true);
			} else {
				this.kingCheckAlert(player, false);
			}

			this.playerChance = player != this.player;
		}
	}

	checkForMove (cx, cy, tx, ty, player) {
		let validMoveIndex = this.highlightedCoords.findIndex(coord => coord[0] == tx && coord[1] == ty && coord[2] != 1);

		if (validMoveIndex != -1) {
			const moveValue = this.board[cy][cx];
			this.board[cy][cx] = 0;
			this.board[ty][tx] = moveValue;

			this.updateTiles();

			if (this.highlightedCoords[validMoveIndex][2] == 2) {
				this.kingCheckAlert(player, true);
			} else {
				this.kingCheckAlert(player, false);
			}

			this.playerChance = player != this.player;
		}
	}

	showAllValidMoves (x, y, value) {
		this.highlightedTiles.forEach(tile => {
			tile.classList.remove('highlight');
			tile.classList.remove('capture');
			tile.classList.remove('check');
		});

		this.highlightedCoords = getAllValidMoves(x, y, value, this.board);
		this.highlightedTiles = this.highlightedCoords.map(coord => this.tiles[coord[1]][coord[0]]);

		this.highlightedTiles.forEach((tile, index) => {
			const state = this.highlightedCoords[index][2];

			tile.classList.add(state == 0 ? 'highlight' : state == 1 ? 'capture' : 'check');
		});
	}

	select (tile, coords) {
		if (this.selectedTile) this.selectedTile.classList.remove('select');

		this.selectedTile = tile;
		const x = coords[0];
		const y = coords[1];

		tile.classList.add('select');
		this.showAllValidMoves(x, y, this.board[y][x]);
	}

	deselect () {
		if (this.selectedTile) {
			this.selectedTile.classList.remove('select');
			this.selectedTile = null;
		}

		this.highlightedTiles.forEach(tile => {
			tile.classList.remove('highlight');
			tile.classList.remove('capture');
			tile.classList.remove('check');
		});

		this.highlightedCoords = [];
	}

	clickOnTile (clickedTile, player) {
		const coords = this.getTileCoords(clickedTile);
		const tileValue = this.board[coords[1]][coords[0]];

		if ((player == 0 && tileValue > 6) || (player == 1 && tileValue < 7 && tileValue != 0)) { // When click on opponent tile. (capture)
			if (this.selectedTile) {
				const curCoords = this.getTileCoords(this.selectedTile);

				this.checkForCapture(curCoords[0], curCoords[1], coords[0], coords[1], player);
			}

			if (player == this.player) this.action.click(coords);

			this.deselect();
			return;
		}

		if (tileValue == 0) { // When click on empty tile. (move)
			if (this.selectedTile) {
				const curCoords = this.getTileCoords(this.selectedTile);

				this.checkForMove(curCoords[0], curCoords[1], coords[0], coords[1], player);
			}

			if (player == this.player) this.action.click(coords);

			this.deselect();
			return;
		}

		if (player == this.player) this.action.click(coords);

		this.select(clickedTile, coords); // If not move or capture, it's just select.
	}

	initEventListeners () {
		this.boardContainer.addEventListener('click', (event) => {
			if (this.playerChance && this.hasRoom && this.action && event.target !== this.boardContainer) this.clickOnTile(event.target, this.player);
		});
	}

	flip () {
		this.boardContainer.classList.toggle('flip');
	}

	init () {
		this.createBoard();
		this.createSlots();
		this.copyDefaultBoard();
		this.updateTiles();
		this.initEventListeners();
	}
}

export default ChessBoard;
