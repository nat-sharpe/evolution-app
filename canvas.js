// Connects to canvas in index.html
let canvas = document.querySelector('canvas');

// Sets canvas dimensions
const width = window.innerWidth - 4;
const height = window.innerHeight - 4;
canvas.width = width;
canvas.height = height;

// Creates a context 'super object' class
let c = canvas.getContext('2d');

// Sets mouse 
let mouse = {
    x: width / 2,
    y: height / 2
};

// Event Listeners
addEventListener("mousemove", () => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

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

// Utility Functions 
const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const getDistance = (x1, y1, x2, y2) => {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;
    const directDistance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    return directDistance;
};

const randomColors = ['rgb(100, 140, 100)', 'rgb(140, 100, 100)', 'rgb(100, 100, 140)' ]

// Class declarations
function Cell(index, speed, radius, x, y, dx, dy, age, color, lifeSpan) {
    this.index = index;
    this.speed = speed;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.age = age;
    this.color = color;
    this.lifeSpan = lifeSpan;
    this.running = false;
    this.chasing = false;
    this.alive = true;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = () => {
        let mutation = (Math.random() - 0.5) * this.speed;
        if (this.age === this.lifeSpan) {
            this.alive = false;
        }
        // Check age
        if (this.alive) {
             // Bounce off walls
            if (this.x + this.radius > width || this.x - this.radius < 0) {
                this.dx = -this.dx;
                this.dy = mutation;
                this.running = false;
                this.chasing = false;
            }
        

            // Bounce off ceiling and floor
            if (this.y + this.radius > height || this.y - this.radius < 0) {
                this.dy = -this.dy;
                this.dx = mutation;
                this.running = false;
                this.chasing = false;
            }

            this.x+= this.dx;
            this.y+= this.dy;
            this.age++;
            this.draw();
        }
    }

};

// Implementation
let numCells = 200;
let allCells = [];
const init = () => {
    for (let i = 0; i < numCells; i++) {
        let index = i;
        // Generates age and lifespan
        let age = 0;
        let lifeSpan = randomIntFromRange(800, 8000);
        let color = randomColors[randomIntFromRange(0, randomColors.length)];
        // Generates radius and position
        let radius = randomIntFromRange(3, 5);
        let x = randomIntFromRange(radius * 2, width - (radius * 2));
        let y = randomIntFromRange(radius * 2, height - (radius * 2));
    
        // Generates velocity between -(speed / 2) and +(speed / 2)
        // i.e. if speed was 4, the velocity would be somewhere betwen -2 and 2
        let speed = randomIntFromRange(1, 2);
        let dx = (Math.random() - 0.5) * speed;
        let dy = (Math.random() - 0.5) * speed;
        let cell = new Cell(index, speed, radius, x, y, dx, dy, age, color, lifeSpan);
        allCells.push(cell);
    }    
};

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);


    allCells.forEach(cell=> {
        const otherCells = allCells.filter(otherCell => otherCell.index != cell.index);
        otherCells.forEach(otherCell => {
            let distance = getDistance(cell.x, cell.y, otherCell.x, otherCell.y);
            // Checks for collision
            if (distance < cell.radius + otherCell.radius) {
                if (cell.alive && cell.radius < otherCell.radius) {
                    cell.alive = false;
                    otherCell.radius+= (cell.radius / 2);
                    otherCell.lifeSpan+= 200
                }
            }
            // Checks for proximity
            if (distance < cell.radius + otherCell.radius + 10) {
                if (!cell.running && !cell.chasing) {
                    if (cell.radius < otherCell.radius) {
                        cell.running = true;
                        cell.dx = -cell.dx * cell.speed;
                        cell.dy = -cell.dy;
                    } else {
                        cell.chasing = true;
                        cell.dx = -otherCell.dx * cell.speed;
                        cell.dy = -otherCell.dy;
                    }
                }
            }
        });

        cell.update();
    });
}

init();
animate();
