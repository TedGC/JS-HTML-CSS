const {Engine, Render, Runner, World, Bodies } = Matter; 


const cells = 3;
const width = 600;
const height = 600;

const unitLength = width / cells; 

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
const grid = Array(cells)
    .fill(null)
    .map(()=> Array(cells).fill(false))

const verticals = Array(cells)
.fill(null)
.map(()=> Array(cells - 1).fill(false))

const horizontals = Array(cells - 1)
.fill(null)
.map(()=> Array(cells).fill(false))

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

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
    if(nextRow < 0 || nextRow >= || nextColumn <0 || nextColumn >= cells) {
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
            columnIndex * unitLength + unitLength / 2,
            rowIndex * unitLength + unitLength,
            unitLength,
            10, //height 
            {
                isStatic: true
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
            columnIndex * unitLength + unitLength,
            rowIndex * unitLength + unitLength / 2 ,
            10,
            unitLength,
            {
                isStatic: true
            }
        )
        World.add(world.wall)
        })
})

const goal = Bodies.rectangle(
    width - unitLength / 2,
    height - unitLength / 2, 
    unitLength * .7,
    unitLength * .7,
    {
        isStatic: true
    }
)
