import { createCanvas, getStyles } from '../../lib/js/hypertext.js';
import { Grid } from './grid.js';

const CANVAS_ID = 'meridian-map';
const nWindowWidth = window.innerWidth;
const nCanvasWidth = nWindowWidth * 0.8;
const GRID_WIDTH = 16;
const GRID_CELL_SIZE = Math.floor(nCanvasWidth / 16);

let oGrid = new Grid(GRID_WIDTH);

const nCanvasHeight = nCanvasWidth;
let oMeridianCanvas = createCanvas(CANVAS_ID, 'grid', 0, document.body, nCanvasWidth, nCanvasHeight);
oGrid.redraw(oMeridianCanvas, GRID_WIDTH, GRID_CELL_SIZE);
let nMarginSide = Math.floor(( nWindowWidth - oMeridianCanvas.width ) / 2 ) ;
let sMarginSide = nMarginSide + "px";
oMeridianCanvas.style.marginLeft = sMarginSide;
oMeridianCanvas.style.marginRight = sMarginSide;
  
let oMeridianCanvasStyle = getStyles(oMeridianCanvas);
let oCanvasRectangle = oMeridianCanvas.getBoundingClientRect();
let oCanvasOffset = {
    horizontal: parseInt(oMeridianCanvasStyle.borderWidth, 10) + oCanvasRectangle.x,
    vertical: parseInt(oMeridianCanvasStyle.borderWidth, 10) + oCanvasRectangle.y
};

let getClosestCell = function (oOffset, GRID_CELL_SIZE, x, y) {

    let oClosestCell = {
        x: Math.floor((x - oOffset.horizontal) / GRID_CELL_SIZE),
        y: Math.floor((y - oOffset.vertical) / GRID_CELL_SIZE)
    };

    return oClosestCell;

};

let handleMeridianCanvasTapped = function (event) {

    let x = event.clientX;
    let y = event.clientY;

    let oClosestCell = getClosestCell(oCanvasOffset, GRID_CELL_SIZE, x, y);
    oGrid.toggleCell(oClosestCell);

    let nValue = oGrid.getValue(oClosestCell);

    if (nValue === 1) {
        oGrid.fillCell(oMeridianCanvas, oClosestCell, GRID_CELL_SIZE);
    } else {
        oGrid.clearCell(oMeridianCanvas, oClosestCell, GRID_CELL_SIZE);
    }

};
oMeridianCanvas.onclick = handleMeridianCanvasTapped;