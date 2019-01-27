// Connects to canvas in index.html
let canvas = document.querySelector('canvas');

// Sets canvas dimensions
const width = window.innerWidth - 4;
const height = window.innerHeight - 4;
canvas.width = width;
canvas.height = height;

// Creates a context 'super object' class
let c = canvas.getContext('2d');

// // Sets coordinates and dimensions of c: (x, y, width, height)
// // Coordinates are measured from top-left corner of screen (0, 0)
// c.fillStyle = 'rgba(255, 0, 0, 0.2)';
// c.fillRect(100, 100, 100, 100);
// c.fillRect(550, 100, 50, 50);

// // Draws basic line
// c.beginPath();
// c.moveTo(100, 200);
// c.lineTo(150, 400);
// c.lineTo(500, 140);
// c.strokeStyle = 'blue';
// c.stroke();

// // Draws arc or circle
// // (x, y, radius, startAngle, endAngle [, anticlockwise]);

// let allColors = ['blue', 'red', 'green', 'black', 'white'];

// for (let i = 0; i < 1000; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     let colorIndex = Math.floor(Math.random() * allColors.length);
//     let color = allColors[colorIndex];
//     c.beginPath();
//     c.strokeStyle = color;
//     c.arc(x, y, 5, 0, 2 * Math.PI);
//     c.stroke();
// }

let speed = 3;
let radius = 20;
let x = Math.floor(Math.random() * (width - (radius * 2))) + radius;
let y = Math.floor(Math.random() * (height - (radius * 2))) + radius;
let dx = (Math.random() - 0.5) * speed;
let dy = (Math.random() - 0.5) * speed;
let hit = 0;

const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);

    c.beginPath();
    c.arc(x, y, radius, 0, 2 * Math.PI);
    c.stroke();

    // Bounce off walls
    if (x + radius > width || x - radius < 0) {
        let mutation = Math.floor(Math.random() * speed);
        dx = -dx;
        dy = mutation;
    }

    // Bounce off ceiling and floor
    if (y + radius > height || y - radius < 0) {
        let mutation = Math.floor(Math.random() * speed);
        dy = -dy;
        dx = mutation;
    }

    x+= dx;
    y+= dy;
    console.log(`x: ${x}   y: ${y}`)
    console.log((dy))
    console.log(dx)



}

animate();
