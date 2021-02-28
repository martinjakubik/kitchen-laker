class Grid {

    /**
     * initilazes a grid containing all zeros
     * 
     * @param {Number} gridWidth the width of the grid in cells
     */
    constructor (gridWidth) {

        this.gridModel = [];
        for (let y = 0; y < gridWidth; y++) {
            this.gridModel.push([]);
            for (let x = 0; x < gridWidth; x++) {
                this.gridModel[y].push(0);
            }
        }

    }

    /**
     * toggles the value of a cell
     * @param {*} cell a cell with x and y fields
     */
    toggleCell (cell) {
        let x = cell.x;
        let y = cell.y;
        return this.toggleCellXY(x, y);
    }

    /**
     * toggles the value of a cell
     * @param {Number} x the x index of the cell
     * @param {Number} y the y index of the cell
     */
    toggleCellXY (x, y) {
        this.gridModel[y][x] = this.gridModel[y][x] === 0 ? 1 : 0;
    }

    /**
     * gets the value of a cell
     * @param {*} cell a cell with x and y fields
     */
    getValue (cell) {
        let x = cell.x;
        let y = cell.y;
        return this.getValueXY(x, y);
    }

    /**
     * gets the value of a cell
     * @param {Number} x the x index of the cell
     * @param {Number} y the y index of the cell
     */
    getValueXY (x, y) {
        return this.gridModel[y][x];
    }

    /**
     * draws a cell on the grid at the given position
     * @param {*} canvas a canvas object to draw on
     * @param {Number} x x position in pixels, zero is top
     * @param {Number} y y position in pixels, zero is left
     * @param {Number} gridCellSize size of the cell in pixels
     * @param {DOMString} fillStyle the style to draw in, usually a color string
     */
    drawCell (canvas, x, y, gridCellSize, fillStyle) {
        let oDrawingTool = canvas.getContext('2d');
        if (fillStyle) {
            oDrawingTool.fillStyle = fillStyle;
            oDrawingTool.fillRect(x, y, gridCellSize, gridCellSize);
        }
        oDrawingTool.strokeRect(x, y, gridCellSize, gridCellSize);
    };

    /**
     * fills a cell on the grid
     * @param {*} canvas a canvas object to draw on
     * @param {*} a cell with x and y positions in grid cells; (0, 0) is top left
     * @param {Number} gridCellSize width of a grid cell in pixels
     */
    fillCell (canvas, cell, gridCellSize) {
        let x = cell.x;
        let y = cell.y;
        this.fillCellXY(canvas, x, y, gridCellSize);
    };

    /**
     * fills a cell on the grid
     * @param {*} canvas a canvas object to draw on
     * @param {Number} x x position in grid cells, zero is top
     * @param {Number} y y position in grid cells, zero is left
     * @param {Number} gridCellSize width of a grid cell in pixels
     */
    fillCellXY (canvas, x, y, gridCellSize) {
        let nPositionX = x * gridCellSize;
        let nPositionY = y * gridCellSize;
        let sFillStyle = '#000000';
        this.drawCell(canvas, nPositionX, nPositionY, gridCellSize, sFillStyle);
    };

    /**
     * clears a cell on the grid
     * @param {*} canvas a canvas object to draw on
     * @param {*} a cell with x and y positions in grid cells; (0, 0) is top left
     * @param {Number} gridCellSize width of a grid cell in pixels
     */
    clearCell (canvas, cell, gridCellSize) {
        let x = cell.x;
        let y = cell.y;
        this.clearCellXY(canvas, x, y, gridCellSize);
    };

    /**
     * clears a cell on the grid
     * @param {*} canvas a canvas object to draw on
     * @param {Number} x x position in grid cells, zero is top
     * @param {Number} y y position in grid cells, zero is left
     * @param {Number} gridCellSize width of a grid cell in pixels
     */
    clearCellXY (canvas, x, y, gridCellSize) {
        let nPositionX = x * gridCellSize;
        let nPositionY = y * gridCellSize;
        let sFillStyle = '#ffffff';
        this.drawCell(canvas, nPositionX, nPositionY, gridCellSize, sFillStyle);
    };

    /**
     * 
     * @param {*} canvas 
     * @param {Number} gridWidth width of the grid in cells
     * @param {Number} gridCellSize width of a cell in pixels
     */
    redraw (canvas, gridWidth, gridCellSize) {

        let x = 0, y = 0;
        let nPositionX = 0, nPositionY = 0;
        while (y < gridWidth) {
            x = 0;
            while (x < gridWidth) {
                nPositionX = x * gridCellSize;
                nPositionY = y * gridCellSize;
                this.drawCell(canvas, nPositionX, nPositionY, gridCellSize);
                x = x + 1;
            };
            y = y + 1;
        };

    };

}

export { Grid };