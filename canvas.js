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


function Cell(speed, radius, x, y, dx, dy, age, lifeSpan) {
    
    this.draw = () => {
        c.beginPath();
        c.arc(x, y, radius, 0, 2 * Math.PI);
        c.fillStyle = 'rgb(100, 140, 100)';
        c.fill();
    };

    this.update = () => {
        // Check age
        if (age < lifeSpan) {
             // Bounce off walls
            if (x + radius > width || x - radius < 0) {
                let mutation = (Math.random() - 0.5) * speed;
                dx = -dx;
                dy = mutation;
            }

            // Bounce off ceiling and floor
            if (y + radius > height || y - radius < 0) {
                let mutation = (Math.random() - 0.5) * speed;
                dy = -dy;
                dx = mutation;
            }

            x+= dx;
            y+= dy;
            age++;
            this.draw();
        }
        // console.log(`x: ${x}   y: ${y}`)
    }

};

let allCells = [];

for (let i = 0; i < 100; i++) {
    let age = 0;
    let lifeSpan = Math.floor(Math.random() * 1000) + 200;;
    let midSize = 10;
    let sizeRange = 5;
    // Generates number between midSize - sizeRange and midSize + sizeRange;
    let radius = Math.floor(Math.random() * midSize) + sizeRange;
    let x = Math.floor(Math.random() * (width - (radius * 2))) + radius;
    let y = Math.floor(Math.random() * (height - (radius * 2))) + radius;

    // Generates velocity between -(speed / 2) and +(speed / 2)
    // i.e. if speed was 4, the velocity would be somewhere betwen -2 and 2
    let speed = .5;
    let dx = (Math.random() - 0.5) * speed;
    let dy = (Math.random() - 0.5) * speed;
    let cell = new Cell(speed, radius, x, y, dx, dy, age, lifeSpan);
    allCells.push(cell);
}

const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);

    allCells.forEach(cell => {
        cell.update();
    });
}

animate();
