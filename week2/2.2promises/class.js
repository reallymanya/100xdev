//this variable helps in accessing variable inside the function
class Shape {
    constructor(color) {
        this.color = color;
    }

    paint() {
			console.log(`Painting with color ${this.color}`);
    }

    area() {
        throw new Error('The area method must be implemented in the subclass');
    }

    getDescription() {
        return `A shape with color ${this.color}`;
    }
}

class Rectangle extends Shape {
    constructor(width, height, color) {
        super(color);  // Call the parent class constructor to set the color
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }

    getDescription() {
        return `A rectangle with width ${this.width}, height ${this.height}, and color ${this.color}`;
    }
}


const rect = new Rectangle(3, 4, "black"); //constructor gets automatically called whenever we use new keyword
console.log(rect.area());
rect.paint(); // Access color as a property, not a function

const date = new Date();
console.log(date);
console.log(date.getFullYear());
console.log(date.getMonth());

const map = new Map();
map.set('name','Alice');
map.set('age',30);
console.log(map.get('name'));
console.log(map.get('age'));