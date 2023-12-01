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
    imagePaths.forEach(path => {
      this.images.push(loadImage(path));
    }
    );
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
  
  elementX(){
    return elX;
  }
  
  elementY(){
    return elY;
  }
}
