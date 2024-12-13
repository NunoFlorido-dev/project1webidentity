// Disable friendly errors
p5.disableFriendlyErrors = true;

// Canvas size
let container;
let containerWidth;
let containerHeight;
let canvas;

let headerHeight;

// Setup variables for the grid
let cols;
let rows;

let totalWidth;
let totalHeight;

let adjustedCellWidth;
let adjustedCellHeight;

// Cells of the grid
let cellWidth;
let cellHeight;
let gutter;

// Type coordinates setup
let typeCoordsX = [];
let typeCoordsY = [];

let standardCoordX = [];
let standardCoordY = [];

let startPosX;
let startPosY;

// Setup for the type objects
let c_type, o_type, n_type, v_type, e_type, r_type, s1_type, a_type, s2_type;

// Setup for the array of types
let typeArray = [];

// Finding random three types from the lettering
let randomLetterVar;

// Arrays of the random letters chosen and the connected ones
let randomLetters = [];
let connectedLetters = [];
let lastLetter = [];

let randomImagesVar;
let or1or2;
let randomImages = [];

// Locations for the element
let startX;
let startY;

let endX;
let endY;

let elementX;
let elementY;

let changeLayout;
let randomMove;

// Element color
let lastColor;
let elementColor;
let mainColor;

let trail = [];

// Time update
let updateTime;

// Illustration interaction
let illustrations;

let vpWidth;
let vpHeight;

function setup() {
  container = document.getElementById("canvas");
  canvas = document.querySelector(".p5Canvas");
  containerWidth = container.offsetWidth;
  containerHeight = container.offsetHeight;

  vpWidth = getComputedStyle(document.body).width;

  vpHeight = getComputedStyle(document.body).height;

  headerHeight = document.getElementById("header").offsetHeight;

  createCanvas(displayWidth, displayHeight);

  container.insertBefore(canvas, container.firstChild);

  illustrations = document.querySelector("#canvas main .speakers ul li img");

  background(255);
  frameRate(30);
  noStroke();

  defineGridVars(); // Setup for the grid
  initializeTypes(); // Initializing type objects
  changeWeirdTypes(); // Change weird types
  elementColor = color(255, 0, 0);
  lastColor = color(255, 0, 0);
  mainColor = elementColor;
  randomMove = 2;
  or1or2 = Math.floor(Math.random() * 2) + 1;
}

// Check for touch support
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}

function windowResized() {
  containerWidth = container.offsetWidth;
  containerHeight = container.offsetHeight;
  resizeCanvas(containerWidth, containerHeight);

  startPosX = (containerWidth / 2) - (totalWidth / 2);
}

// Defining the grid
function defineGridVars() {
  // Grid width & height
  totalWidth = 300;
  totalHeight = 300;

  cols = 3; // Columns
  rows = 3; // Rows

  gutter = 3; // Gutter

  // Calculate cell size & gutter size
  cellWidth = totalWidth / cols;
  cellHeight = totalHeight / rows;

  // Adjusted cell size w/ gutter
  adjustedCellWidth = cellWidth - gutter;
  adjustedCellHeight = cellHeight - gutter;

  startPosX = containerWidth / 2 - totalWidth / 2;
  startPosY = (windowHeight - totalHeight) / 2;
}

function initializeTypes() {
  // Initialization of each type objects
  c_type = new Type(
    ["../data/C.svg", "../data/C_elemento.svg"],
    adjustedCellWidth,
    adjustedCellHeight,
    "C",
    [18],
    [48.25],
  );

  o_type = new Type(
    ["../data/O.svg"],
    adjustedCellWidth,
    adjustedCellHeight,
    "O",
    [151.33],
    [48.5],
  );

  n_type = new Type(
    ["../data/N.svg", "../data/N_elemento.svg", "../data/N2_elemento.svg"],
    adjustedCellWidth,
    adjustedCellHeight,
    "N",
    [287, 220],
    [15.0696, 85],
  );

  v_type = new Type(
    ["../data/V.svg", "../data/V_elemento.svg", "../data/V2_elemento.svg"],
    adjustedCellWidth,
    adjustedCellHeight,
    "V",
    [68.3325, 26],
    [149.5, 149.5],
  );

  e_type = new Type(
    ["../data/E.svg", "../data/E_elemento.svg"],
    adjustedCellWidth,
    adjustedCellHeight,
    "E",
    [118],
    [151.5],
  );

  r_type = new Type(
    ["../data/R.svg", "../data/R_elemento.svg"],
    adjustedCellWidth,
    adjustedCellHeight,
    "R",
    [220],
    [185],
  );

  s1_type = new Type(
    ["../data/S_1.svg", "../data/S_elemento.svg"],
    adjustedCellWidth,
    adjustedCellHeight,
    "S1",
    [48.25],
    [256],
  );

  a_type = new Type(
    ["../data/A.svg", "../data/A_elemento.svg"],
    adjustedCellWidth,
    adjustedCellHeight,
    "A",
    [151.33],
    [260],
  );

  s2_type = new Type(
    ["../data/S_2.svg", "../data/S_elemento.svg"],
    adjustedCellWidth,
    adjustedCellHeight,
    "S2",
    [254.5],
    [256],
  );

  // Loading types into the typeArray (0 - 8) (9)
  typeArray = [
    c_type,
    o_type,
    n_type,
    v_type,
    e_type,
    r_type,
    s1_type,
    a_type,
    s2_type,
  ];
}

// Function to choose & change types
function changeWeirdTypes() {
  randomLetters = [];
  connectedLetters = [];
  randomImages = [];

  // Load into the randomLetters array 3 indexes from the array of type
  for (let i = 0; i < 3; i++) {
    // Add if the same value isn't there yet
    do {
      randomLetterVar = Math.floor(Math.random() * typeArray.length);
    } while (randomLetters.includes(randomLetterVar));

    randomLetters.push(randomLetterVar);
  }

  if (lastLetter[0] !== undefined) {
    do {
      randomLetterVar = Math.floor(Math.random() * typeArray.length);
      randomLetters[2] = randomLetterVar;
    } while (randomLetters[2] === lastLetter[0]);
  }

  // Create two connected letters
  connectedLetters = randomLetters.slice(1);

  if (lastLetter[0] !== undefined) {
    connectedLetters.splice(0, 1, lastLetter[0]);
  }

  /*
  console.log("random letters NOW= " + randomLetters); // Print 3 random letters
  console.log("connected letters NOW = " + connectedLetters); // Print 2 connected letters
  console.log("last letter NOW = " + lastLetter);
*/
  changeElementVars();
}

function transformLayout() {
  lastLetter[0] = randomLetters[2];

  if (changeLayout) {
    changeLayout = false; // Reset the layout
    or1or2 = Math.floor(Math.random() * 2) + 1;
    changeColor();
    changeWeirdTypes(); // Function to choose & change types
  }
}

// Setup for the element coordinates
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

// Function for the element to move
function elementMove() {
  if (randomMove === 0) {
    elementX = lerp(elementX, endX, 0.1);

    // Check if elementX is close enough to endX
    if (elementX >= endX - 1 && elementX <= endX + 1) {
      elementX = endX;
      elementY = lerp(elementY, endY, 0.1);
      if (elementY >= endY - 1 && elementY <= endY + 1) {
        changeLayout = true;
      }
    }
  } else if (randomMove === 1) {
    elementY = lerp(elementY, endY, 0.1);

    // Check if elementX is close enough to endX
    if (elementY >= endY - 1 && elementY <= endY + 1) {
      elementY = endY;
      elementX = lerp(elementX, endX, 0.1);
      if (elementX >= endX - 1 && elementX <= endX + 1) {
        changeLayout = true;
      }
    }
  } else if (randomMove === 2) {
    elementX = lerp(elementX, endX, 0.1);
    elementY = lerp(elementY, endY, 0.1);

    if (dist(elementX, elementY, endX, endY) < 1) {
      changeLayout = true;
    }
  }
}

// Interaction with the lettering
function hoverInteraction() {
  if (
    mouseX > typeCoordsX[0] &&
    mouseX < typeCoordsX[0] + totalWidth + gutter &&
    mouseY > typeCoordsY[0] &&
    mouseY < typeCoordsY[0] + totalHeight + gutter
  ) {
    elementX = mouseX;
    elementY = mouseY;
  }
}

function changeColor() {
  lastColor = elementColor;

  let r = 0;
  let g = 0;
  let b = 0;
  while (
    (r === 0 && g === 0 && b === 0) ||
    (r === 255 && g === 255 && b === 255)
  ) {
    r = Math.random() > 0.5 ? 255 : 0;
    g = Math.random() > 0.5 ? 255 : 0;
    b = Math.random() > 0.5 ? 255 : 0;
  }

  elementColor = color(r, g, b);
}

function colorGradient() {
  const about = document.querySelector("#canvas main .about");
  const aboutH2 = document.querySelector(
    "#canvas main .about .about-container h2",
  );
  const aboutP = Array.from(
    document.querySelectorAll("#canvas main .about .about-container p"),
  );

  const speakers = Array.from(
    document.querySelectorAll("#canvas main .speakers ul li button"),
  );

  const creditos = document.querySelector("#canvas main .creditos");
  const creditosH2 = Array.from(
    document.querySelectorAll("#canvas main .creditos div h2"),
  );
  const creditosP = Array.from(
    document.querySelectorAll("#canvas main .creditos div p"),
  );
  const creditosLink = document.querySelector('#canvas main .creditos a');

  if (lastColor === undefined) {
    mainColor = elementColor;
  } else {
    let mapColorX = map(elementX, startX, endX, 0, 0.5);
    let mapColorY = map(elementY, startY, endY, 0, 0.5);
    let div = mapColorX + mapColorY;

    if (mouseY > headerHeight - 80) {
      mainColor = elementColor;
    } else {
      mainColor = lerpColor(lastColor, elementColor, div);
    }

    creditos.addEventListener("mouseover", (e) => {
      const cyan = color(0, 255, 255);
      const magenta = color(255, 0, 255);
      const yellow = color(255, 255, 0);
      const green = color(0, 255, 0);
      creditos.style.backgroundColor = `rgb(${mainColor.levels[0]}, ${mainColor.levels[1]}, ${mainColor.levels[2]})`;

      if (
        (mainColor.levels[0] === cyan.levels[0] &&
          mainColor.levels[1] === cyan.levels[1] &&
          mainColor.levels[2] === cyan.levels[2]) ||
        (mainColor.levels[0] === magenta.levels[0] &&
          mainColor.levels[1] === magenta.levels[1] &&
          mainColor.levels[2] === magenta.levels[2]) ||
        (mainColor.levels[0] === yellow.levels[0] &&
          mainColor.levels[1] === yellow.levels[1] &&
          mainColor.levels[2] === yellow.levels[2]) ||
        (mainColor.levels[0] === green.levels[0] &&
          mainColor.levels[1] === green.levels[1] &&
          mainColor.levels[2] === green.levels[2])
      ) {
        for (let i = 0; i < creditosP.length; i++) {
          creditosP[i].style.color = "#1d1d1b";
        }
        for (let i = 0; i < creditosH2.length; i++) {
          creditosH2[i].style.color = "#1d1d1b";
        }
         creditosLink.style.color = "#1d1d1b";
        
      } else {
        // For red, green, or blue background color
        for (let i = 0; i < creditosP.length; i++) {
          creditosP[i].style.color = "white";
        }
        for (let i = 0; i < creditosH2.length; i++) {
          creditosH2[i].style.color = "white";
        }
         creditosLink.style.color = "white";

        
      }
    });

    creditos.addEventListener("mouseleave", (e) => {
      creditos.style.backgroundColor = "#1d1d1b";
      for (let i = 0; i < creditosP.length; i++) {
        creditosP[i].style.color = "white";
      }
      for (let i = 0; i < creditosH2.length; i++) {
        creditosH2[i].style.color = "white";
      }
      creditosLink.style.color = "white";
      mainColor = elementColor;
    });

    speakers.forEach((speaker) => {
      const cyan = color(0, 255, 255);
      const magenta = color(255, 0, 255);
      const yellow = color(255, 255, 0);
      const green = color(0, 255, 0);
      const speakersImg = speaker.querySelector("img");

      speaker.addEventListener("mouseover", () => {
        speaker.style.backgroundColor = `rgb(${mainColor.levels[0]}, ${mainColor.levels[1]}, ${mainColor.levels[2]})`;
        if (
          (mainColor.levels[0] === cyan.levels[0] &&
            mainColor.levels[1] === cyan.levels[1] &&
            mainColor.levels[2] === cyan.levels[2]) ||
          (mainColor.levels[0] === magenta.levels[0] &&
            mainColor.levels[1] === magenta.levels[1] &&
            mainColor.levels[2] === magenta.levels[2]) ||
          (mainColor.levels[0] === yellow.levels[0] &&
            mainColor.levels[1] === yellow.levels[1] &&
            mainColor.levels[2] === yellow.levels[2]) ||
          (mainColor.levels[0] === green.levels[0] &&
            mainColor.levels[1] === green.levels[1] &&
            mainColor.levels[2] === green.levels[2])
        ) {
          speakersImg.style.filter = "none";
        } else {
          speakersImg.style.filter = "invert(1)";
        }
      });

      speaker.addEventListener("mouseleave", () => {
        speaker.style.backgroundColor = "transparent";
        speakersImg.style.filter = "none";
      });
    });

    about.addEventListener("mouseover", (e) => {
      about.style.backgroundColor = `rgb(${mainColor.levels[0]}, ${mainColor.levels[1]}, ${mainColor.levels[2]})`;

      // Check if the background color is cyan, magenta, or yellow
      const cyan = color(0, 255, 255);
      const magenta = color(255, 0, 255);
      const yellow = color(255, 255, 0);

      const red = color(255, 0, 0);
      const blue = color(0, 0, 255);
      const green = color(0, 255, 0);
      if (
        (mainColor.levels[0] === cyan.levels[0] &&
          mainColor.levels[1] === cyan.levels[1] &&
          mainColor.levels[2] === cyan.levels[2]) ||
        (mainColor.levels[0] === magenta.levels[0] &&
          mainColor.levels[1] === magenta.levels[1] &&
          mainColor.levels[2] === magenta.levels[2]) ||
        (mainColor.levels[0] === yellow.levels[0] &&
          mainColor.levels[1] === yellow.levels[1] &&
          mainColor.levels[2] === yellow.levels[2]) ||
        (mainColor.levels[0] === green.levels[0] &&
          mainColor.levels[1] === green.levels[1] &&
          mainColor.levels[2] === green.levels[2])
      ) {
        for (let i = 0; i < aboutP.length; i++) {
          aboutP[i].style.color = "#1d1d1b";
        }
        aboutH2.style.color = "#1d1d1b";
      } else {
        // For red, green, or blue background color
        for (let i = 0; i < aboutP.length; i++) {
          aboutP[i].style.color = "white";
        }
        aboutH2.style.color = "white";
      }
    });

    about.addEventListener("mouseleave", (e) => {
      about.style.backgroundColor = "#1d1d1b";
      for (let i = 0; i < aboutP.length; i++) {
        aboutP[i].style.color = "white";
      }
      aboutH2.style.color = "white";
      mainColor = elementColor;
    });
  }
}

function setupLettering() {
  // Looping and creating the grid
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      // Setting up the types' coordinates
      typeCoordsX[x] = startPosX + x * (cellWidth + gutter);
      typeCoordsY[y] = startPosY + y * (cellHeight + gutter);

      // Index of all the cells (0 -> 8) (não 0 - 9 nem 1 - 9) (9)
      let index = y * cols + x;
      // Drawing the types
      if (randomLetters.includes(index) && index !== 1) {
        typeArray[index].display(1, typeCoordsX[x], typeCoordsY[y]);
      } else {
        typeArray[index].display(0, typeCoordsX[x], typeCoordsY[y]);
      }
    }
  }
}

function leaveHeader() {
  let oldX = elementX;
  let oldY = elementY;
  elementX = lerp(oldX, mouseX, 0.25);
  elementY = lerp(oldY, mouseY, 0.25);
}

function elementIsNowMouse() {
  elementX = mouseX;
  elementY = mouseY;
}

function mainLettering() {
  transformLayout();
  setupLettering();

  hoverInteraction();

  if (mouseY < headerHeight - 80) {
    elementMove();
  } else {
    if (!isTouchDevice()) {
      leaveHeader();
    }
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
    fill(
      mainColor.levels[0],
      mainColor.levels[1],
      mainColor.levels[2],
      alphaValue,
    );
    circle(trail[i].x, trail[i].y, 28);
  }

  // Limit the trail length to avoid memory issues
  if (trail.length > 50) {
    trail.splice(0, 1);
  }
}

//class for the types of the lettering
class Type {
  constructor(imagePaths, w, h, name, elX, elY) {
    this.images = [];
    this.w = w;
    this.h = h;
    this.name = name;
    this.elX = elX;
    this.elY = elY;

    //loading the images into the image array
    imagePaths.forEach((path) => {
      this.images.push(loadImage(path));
    });
  }

  //function for displaying the type
  display(index, x, y) {
    if (index >= 0 && index < this.images.length) {
      image(this.images[index], x, y, this.w, this.h);
    }
  }

  //returning the letters' name
  letterName() {
    return this.name;
  }

  elementX() {
    return elX;
  }

  elementY() {
    return elY;
  }
}
