const {Engine, Render, Runner, World, Bodies, Body, Events} = Matter; 


const cellsHorizontal = 4;
const cellsVertical = 3;
const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = window.innerHeight;

engine.world.gravity.y = 0; 
const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine, 
    options: {
        wireframes: false, 
        width, 
        height
    }
}); 

Render.run(render);
Runner.run(Runner.create(), engine); 


// walls 
// have to rewatch the video to understand the logic here 
const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true}),
    Bodies.rectangle(width / 2 , height, width, 2, { isStatic: true}),
    Bodies.rectangle(0, height / 2 , height, { isStatic: true}),
    Bodies.rectangle(width, height / 2 , 2, height, { isStatic: true})
]
World.add(world, walls);


//Maze generation 
//need to understand why we use map method here to create arrays within the array
const grid = Array(cellsVertical)
    .fill(null)
    .map(()=> Array(cellsHorizontal).fill(false))

const verticals = Array(cellsVertical)
.fill(null)
.map(()=> Array(cellsHorizontal - 1).fill(false))

const horizontals = Array(cellsVertical - 1)
.fill(null)
.map(()=> Array(cellsHorizontal).fill(false))

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCell = (row, column) => {
    if (grid[row][column]) {
        return; 
    }
}

const shuffle = (arr) =>{
    let counter = arr.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        
        counter-- ;

        const temp = arr[counter];
 
        arr[counter] = arr[index];
        arr[index] = temp;

    }
    return arr;
}

grid[row][column] = true; 


// assemble randomly-ordered lsit of neighbors 
const neighbors = shuffle( [
    [row - 1, column, 'up'],
    [row, coulmn +1, 'right'],
    [row + 1, column, 'down'],
    [row, column -1, 'left']
]);

for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;

    //see if that neighbor is out of bounds
    if(nextRow < 0 || nextRow >= cellsVertical|| nextColumn <0 || nextColumn >= cellsHorizontal) {
        continue;
    }

    //if we have visited that neighbor, continue to next neighbor
    if (grif[nextRow][nextColumn]) {
        continue; 
    }

    //Remove a wall from either horizontals or verticals 
    if (direction === 'left') {
        verticals[row][column -1] = true;

    }else if (direction === 'right') {
        verticals[row][column] = true;
    } else if (direction ==='up') {
        horizontals[row  -1 ][column] = true;
    } else if (direction === 'down') {
        horizontals[row][column] = true; 
    }
    stepThroughCell(nextRow, nextColumn);
}

stepThroughCell(startRow, startColumn)

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) =>{
        if (open) {
            return; 
        }
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX / 2,
            rowIndex * unitLengthY + unitLengthY,
            unitLengthX,
            10, //height 
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            }
        );
        World.add(world.wall)
    })
});

verticals.forEach((row, rowIndex) =>{
    row.forEach((open, columnIndex) =>{
        if(open) {
            return;
        }
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX,
            rowIndex * unitLengthY + unitLengthY / 2 ,
            10,
            unitLengthY,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            }
        )
        World.add(world.wall)
        })
})

//goal setting 
const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2, 
    unitLengthX * .7,
    unitLengthY * .7,
    {
        label: 'goal',
        isStatic: true,
        render: {
            fillStyle: 'green'
        }
    }
)


World.add(world, goal);


//ball 
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4; 
const ball = Bodies.circle(
    unitLengthX / 2, 
    unitLengthY / 2,
    ballRadius, 
    {
        label: 'ball',
        render: {
            fillStyle: 'blue'
        }
    }

)

World.add(world.ball); 

document.addEventListener('keydown', event => {
    const { x, y } = ball.velocity;

    if (event.keyCode === 87) {
        Body.setVelocity(ball, {x, y: y - 5})
    }
    if (event.keyCode === 68) {
        Body.setVelocity(ball, {x: x + 5, y })
    }
    if (event.keyCode === 83) {
        Body.setVelocity(ball, {x, y: y + 5})
    }
    if (event.keyCode === 65) {
        Body.setVelocity(ball, {x: x + 5, y})
    }
})

// winning the game condition

Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach((collision) =>) {
        const labels = ['ball', 'goal'];

        if(
            labels.includes(collision,bodyA.label) && 
            labels.incldues(collision.bodyB.label)
    ) {
                document.querySelector('.winner').classList.remove('hidden')
                world.gravity.y = 1; 
                world.bodies.forEach(body =>{
                    if(body.label === 'ball') {
                        Body.setStatic(body, false);  
                    }
                })
    }
    }
})
