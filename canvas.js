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


// Class declarations
function Cell(index, speed, radius, x, y, dx, dy, age, stomach, color, lifeSpan, maxRadius) {
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
    this.hunting = false;
    this.running = false;
    this.meals = 0;
    this.stomach = stomach;
    this.alive = true;
    this.maxRadius = maxRadius;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
    };

    this.hunt = () => {

    };
    
    this.update = (allCells) => {

        let mutation = (Math.random() - 0.5) * this.speed;
        if (this.age === this.lifeSpan) {
            if (this.meals > 0) {
                this.alive = false;
            } else {
                this.age = 0;
            }
        }

        if (this.radius === this.maxRadius) {
            this.alive = false;
        }
        // Check age
        if (this.alive) {

            allCells.forEach(cell => {
                const distance = getDistance(this.x, this.y, cell.x, cell.y) - (this.radius + cell.radius);
                if (this !== cell) {
                    if (distance < 0 && this.radius < cell.radius) {
                        cell.radius+= this.radius / 4;
                        cell.meals++;
                        this.alive = false;
                    }
                } 
            });

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
const randomColors = ['rgb(70, 100, 70)', 'rgb(100, 120, 100)', 'rgb(120, 155, 120)' ]
const numCells = 200;
const smallestCell = 5;
const biggestCell = 7; 
let allCells = [];


const init = () => {
    for (let i = 0; i < numCells; i++) {
        let index = i;
        // Generates radius and position
        let radius = randomIntFromRange(smallestCell, biggestCell)
        let x = randomIntFromRange(radius, width - (radius));
        let y = randomIntFromRange(radius, height - (radius));
        // Generates age and lifespan
        let age = 0;
        let lifeSpan = randomIntFromRange(1500, 2000);
        let color = randomColors[randomIntFromRange(0, randomColors.length)];
        let stomach = randomIntFromRange(0, 2);
        // Generates velocity between -(speed / 2) and +(speed / 2)
        // i.e. if speed was 4, the velocity would be somewhere betwen -2 and 2
        let speed = randomIntFromRange(.1, 2);
        let dx = (Math.random() - 0.5) * speed;
        let dy = (Math.random() - 0.5) * speed;
        let maxRadius = radius + stomach;

        if (i !== 0) {
            for (let j = 0; j < allCells.length; j++) {
                let cell = allCells[j];
                if (getDistance(x, y, cell.x, cell.y) - (radius + cell.radius) < 0) {
                    x = randomIntFromRange(radius, width - (radius));
                    y = randomIntFromRange(radius, height - (radius));
                    j = -1;
                }
            }
        };

        let cell = new Cell(
            index, speed, radius, x, y, dx, dy, age, stomach, color, lifeSpan, maxRadius
        );
        allCells.push(cell);
    }    
};

// Clones a living cell 
const divideCell = parent => {
    let index = allCells.length-1;
    // Generates age and lifespan
    let age = 0;
    let lifeSpan = parent.lifeSpan + 100;
    let color = parent.color;
    // Generates radius and position
    let radius = parent.radius;
    let x = parent.x;
    let y = parent.y;
    let stomach = parent.stomach + 1;
    let maxRadius = parent.maxRadius + 1;
    // Generates velocity between -(speed / 2) and +(speed / 2)
    // i.e. if speed was 4, the velocity would be somewhere betwen -2 and 2
    let speed = parent.speed;
    let dx = -parent.dx;
    let dy = -parent.dx;

    let babyCell = new Cell(
        index, speed, radius, x, y, dx, dy, age, stomach, color, lifeSpan, maxRadius
    );
    allCells.push(babyCell);
} 

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);

    allCells.forEach(cell=> {
        if (cell.stomach === 0 && cell.age === (cell.lifeSpan / 3)) {
            divideCell(cell);
            cell.age = 0;
        }
        if (cell.stomach > 0 && cell.stomach === cell.meals) {
            cell.meals = 0;
            divideCell(cell);
        }
        
        cell.update(allCells);
    });
}

init();
animate();
