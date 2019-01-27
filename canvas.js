// Connects to canvas in index.html
let canvas = document.querySelector('canvas');

// Sets canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Creates a context 'super object'
let c = canvas.getContext('2d');

// Sets coordinates and dimensions of c: (x, y, width, height)
// Coordinates are measured from top-left corner of screen (0, 0)
c.fillRect(100, 100, 100, 100);
