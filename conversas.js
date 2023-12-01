//canvas size
let container;
let containerWidth;
let containerHeight;

let headerHeight;

//setup variables for the grid
let cols;
let rows;

let totalWidth;
let totalHeight;

let adjustedCellWidth;
let adjustedCellHeight;


//cells of the grid
let cellWidth;
let cellHeight;
let gutter;

//type coordinates setup
let typeCoordsX = [];
let typeCoordsY = [];

let standardCoordX = [];
let standardCoordY = [];

let startPosX;
let startPosY;

//setup for the type objects
let c_type, o_type, n_type,
  v_type, e_type, r_type,
  s1_type, a_type, s2_type;

//setup for the array of types
let typeArray = [];

//finding random three types from the lettering
let randomLetterVar;

//arrays of the random letters chosen and the connected ones
let randomLetters = [];
let connectedLetters = [];
let lastLetter = [];

let randomImagesVar;
let or1or2;
let randomImages = [];

//locations for the element

let startX;
let startY;

let endX;
let endY;

let elementX;
let elementY;

let changeLayout;
let randomMove;

//element color
let lastColor;
let elementColor;
let mainColor;

let trail = [];

// time update
let updateTime;

function setup() {

  container = document.getElementById('canvas');
  containerWidth = container.offsetWidth;
  containerHeight = container.offsetHeight;

  headerHeight = document.querySelector('header').offsetHeight;

  createCanvas(containerWidth, containerHeight);
  
  // Get the canvas element
  let canvas = 
  document.getElementById('defaultCanvas0');



  //container.appendChild(canvas);
  
  container.insertBefore(canvas, container.firstChild);

  
  background(255);
  frameRate(30);
  noStroke();


  defineGridVars(); //setup for the grid
  initializeTypes(); //initializing type objects
  changeWeirdTypes(); //change weird types 
  elementColor = color(0, 0, 255);
  lastColor = color(255, 0, 0);
  mainColor = elementColor;
  randomMove = floor(random(0,2));
  or1or2 = floor(random(1,3));
}

function windowResized() {
  containerWidth = container.offsetWidth;
  containerHeight = container.offsetHeight;
  resizeCanvas(containerWidth, containerHeight);
  startPosX = (containerWidth / 2) - (totalWidth / 2);
}

//defining the grid

function defineGridVars() {
 //grid width & height
  totalWidth = 300;
  totalHeight = 300;
  

  cols = 3; //columns
  rows = 3; //rows

  gutter = 3; //gutter

  //calculate cell size & gutter size
  cellWidth = totalWidth / cols;
  cellHeight = totalHeight / rows;

  //adjusted cell size w/ gutter
  adjustedCellWidth = cellWidth - gutter;
  adjustedCellHeight = cellHeight - gutter;
  

  startPosX = (containerWidth / 2) - (totalWidth / 2);
  startPosY = ((windowHeight) - totalHeight) / 2;
}


function initializeTypes() {
  //initialization of each type objects
  c_type = new Type(['../data/C.svg', '../data/C_elemento.svg'], adjustedCellWidth, adjustedCellHeight, 'C', [18], [48.5]);

  o_type = new Type(['../data/O.svg'], adjustedCellWidth, adjustedCellHeight, 'O', [151.33], [48.5]);

  n_type = new Type(['../data/N.svg', '../data/N_elemento.svg',
    '../data/N2_elemento.svg'], adjustedCellWidth, adjustedCellHeight, 'N', [287, 220], [15.0696, 85]);

  v_type = new Type(['../data/V.svg', '../data/V_elemento.svg',
    '../data/V2_elemento.svg'], adjustedCellWidth, adjustedCellHeight, 'V', [68.3325, 26], [149.5, 149.5]);

  e_type = new Type(['../data/E.svg', '../data/E_elemento.svg'], adjustedCellWidth, adjustedCellHeight, 'E',
    [118], [151.5]);

  r_type = new Type(['../data/R.svg', '../data/R_elemento.svg'], adjustedCellWidth, adjustedCellHeight, 'R',
    [220], [185]);

  s1_type = new Type(['../data/S_1.svg', '../data/S_elemento.svg'], adjustedCellWidth, adjustedCellHeight, 'S1', [48.25], [256]);

  a_type = new Type(['../data/A.svg', '../data/A_elemento.svg'], adjustedCellWidth, adjustedCellHeight, 'A', [151.33], [260]);

  s2_type = new Type(['../data/S_2.svg', '../data/S_elemento.svg'], adjustedCellWidth, adjustedCellHeight, 'S2', [254.5], [256]);

  //loading types into the typeArray (0 - 8) (9)
  typeArray = [c_type, o_type, n_type, v_type, e_type, r_type, s1_type, a_type, s2_type];


}


//function to choose & change types
function changeWeirdTypes() {
  randomLetters = [];
  connectedLetters = [];
  randomImages = [];

  //load into the randomLetters array 3 indexes from the array of type
  for (let i = 0; i < 3; i++) {

    //add if the same value isn't there yet
    do {
      randomLetterVar = floor(random(0, typeArray.length));
    } while (randomLetters.includes(randomLetterVar));


    randomLetters.push(randomLetterVar);

  }

  if(lastLetter[0] !== undefined){
    do {
      randomLetterVar = floor(random(0, typeArray.length));
      randomLetters[2] = randomLetterVar;
    }while(randomLetters[2] === lastLetter[0]);
  }


  //create two connected letters
  connectedLetters = randomLetters.slice(1);


  
  if(lastLetter[0] !== undefined){
  connectedLetters.splice(0, 1, lastLetter[0]);
 }

  print('random letters NOW= ' + randomLetters); //print 3 random letters
  print('connected letters NOW = ' + connectedLetters);  // print 2 connected letters
  print('last letter NOW = ' + lastLetter); 
 

  /*

  //looping through the randomLetters length (3)
  for (let i = 0; i < randomLetters.length; i++) {

    //get a random image from a type which is included in randomLetters[]
    randomImagesVar = floor(random(1, 
    typeArray[randomLetters[i]].images.length));

    //push to randomImages
    randomImages.push(randomImagesVar);
  }

  */

  changeElementVars();
}

function transformLayout(){
  lastLetter[0] = randomLetters[2];    

  if (changeLayout) {
    changeLayout = false; //reset the layout
    or1or2 = floor(random(1,3));
    randomMove = 2;
    changeColor();
    changeWeirdTypes(); // function to choose & change types
  }
}


// setup for the element coordinates
function changeElementVars() {
  let xs = startPosX + typeArray[connectedLetters[0]].elX[0];
  let xe = startPosX + typeArray[connectedLetters[1]].elX[0];
  let ys = startPosY + typeArray[connectedLetters[0]].elY[0];
  let ye = startPosY + typeArray[connectedLetters[1]].elY[0];

  startX = xs;
  endX = xe;
  startY = ys;
  endY = ye;

  

  elementX = startX;
  elementY = startY;
}

//function for the element to move
function elementMove() {
  if(randomMove === 0){
  
    elementX = lerp(elementX, endX, 0.1);

  // Check if elementX is close enough to endX
  if (elementX >= endX - 1 && elementX <= endX + 1) {
    elementX = endX;
    elementY = lerp(elementY, endY, 0.1);
    if (elementY >= endY - 1 && elementY <= endY + 1) {
      changeLayout = true;
    }
  }
    
 }else if(randomMove === 1){
    
    elementY= lerp(elementY, endY, 0.1);

    // Check if elementX is close enough to endX
    if (elementY >= endY - 1 && elementY <= endY + 1) {
      elementY = endY;
      elementX = lerp(elementX, endX, 0.1);
      if (elementX >= endX - 1 && elementX <= endX + 1) {
        changeLayout = true;
      }
    }
    
 }else if(randomMove === 2){
    
    elementX = lerp(elementX, endX, 0.1);
    elementY = lerp(elementY, endY, 0.1);
    
    if(dist(elementX, elementY, endX, endY) < 1){
      changeLayout = true;
    }
    
 }
}


//interaction with the lettering
function hoverInteraction() {
  if (mouseX > typeCoordsX[0] && mouseX < typeCoordsX[0] + (totalWidth + gutter) &&
    mouseY > typeCoordsY[0] && mouseY < typeCoordsY[0]  + (totalHeight + gutter) ) {
    elementX = mouseX;
    elementY = mouseY;
    let d = dist(elementX, elementY, endX, endY);
    let mapDist = map(d, sqrt(600), 0, 0, 1);
    mainColor = lerpColor(lastColor, elementColor, mapDist);
  }
}


function changeColor(){
  lastColor = elementColor;
  
    let r = 0;
    let g = 0;
    let b = 0;
    while (r === 0 && g === 0 && b === 0 || r === 255 && g === 255 && b === 255) {
      r = random() > 0.5 ? 255 : 0;
      g = random() > 0.5 ? 255 : 0;
      b = random() > 0.5 ? 255 : 0;
    }

  elementColor = color(r, g, b);
  
}


function colorGradient(){
  if(lastColor === undefined){
    mainColor = elementColor;
   }else{
    let mapColorX = map(elementX, startX, endX, 0, 0.5);
    let mapColorY = map(elementY, startY, endY, 0, 0.5);
    let div = (mapColorX + mapColorY)
    mainColor = lerpColor(lastColor, elementColor, div);
   }

}
  

function setupLettering(){
  //looping and creating the grid
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      //setting up the types' coordinates
      typeCoordsX[x] = startPosX + x * (cellWidth + gutter);
      typeCoordsY[y] = startPosY + y * (cellHeight + gutter);

      //index of all the cells (0 -> 8) (não 0 - 9 nem 1 - 9) (9)
      let index = y * cols + x;
      //print(index); //print index to the console

      //placeholder for types (before the types)
      /*
      fill(255);
      stroke(0);
      rect(typeCoordsX[x], typeCoordsY[y], adjustedCellWidth, adjustedCellHeight);
      */

      //drawing the types
      if (randomLetters.includes(index) && index !== 1) {
        typeArray[index].display(1, typeCoordsX[x], typeCoordsY[y]);
      } else {
        typeArray[index].display(0, typeCoordsX[x], typeCoordsY[y]);
      }

      //inserting the element and its animations
      if (randomLetters.includes(index)) {
        if (connectedLetters.includes(index)) {
        } else {
        }
      }
    }
  }
}


function leaveHeader(){
    let oldX = elementX;
    let oldY = elementY;
    elementX = lerp(oldX, mouseX, 0.1);
    elementY = lerp(oldY, mouseY, 0.1);

    if(dist(elementX, elementY, mouseX, mouseY) <= 5){
      elementX = mouseX;
      elementY = mouseY;
    }

}


function mainLettering(){
  transformLayout();
  setupLettering();


  hoverInteraction();
  if(mouseY < headerHeight){
  elementMove();}
  else{
  leaveHeader();
  }
}


function draw() {
  background(255);
  windowResized();
  mainLettering();
  colorGradient();

  // Add the current position to the trail array
  trail.push(createVector(elementX, elementY));

  // Draw the trail
  noStroke();
  for (let i = 0; i < trail.length; i++) {
    let alphaValue = map(i, 0, trail.length, 0, 255); // Decreasing alpha
    fill(mainColor.levels[0], mainColor.levels[1], mainColor.levels[2], alphaValue);
    circle(trail[i].x, trail[i].y, 28);
  }

  // Limit the trail length to avoid memory issues
  if (trail.length > 50) {
    trail.splice(0, 1);
  }

}
