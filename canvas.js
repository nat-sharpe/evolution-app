// Connects to canvas in index.html
let canvas = document.querySelector('canvas');

// Sets canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Creates a context 'super object' class
let c = canvas.getContext('2d');

// Sets coordinates and dimensions of c: (x, y, width, height)
// Coordinates are measured from top-left corner of screen (0, 0)
c.fillStyle = 'rgba(255, 0, 0, 0.2)';
c.fillRect(100, 100, 100, 100);
c.fillRect(550, 100, 50, 50);

// Draws basic line
c.beginPath();
c.moveTo(100, 200);
c.lineTo(150, 400);
c.lineTo(500, 140);
c.strokeStyle = 'blue';
c.stroke();

// Draws arc or circle
// (x, y, radius, startAngle, endAngle [, anticlockwise]);

let allColors = ['blue', 'red', 'green', 'black', 'white'];

for (let i = 0; i < 1000; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let colorIndex = Math.floor(Math.random() * allColors.length);
    let color = allColors[colorIndex];
    c.beginPath();
    c.strokeStyle = color;
    c.arc(x, y, 5, 0, 2 * Math.PI), false;
    c.stroke();
}


