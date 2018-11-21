const vehicle = {
    getWheelNumber: function () {
        console.log("Number of wheels:", this.wheelsNumber);
    },
    move: function () {
        console.log("Moving", this.sound);
    },
}


const car1 = Object.create(vehicle);
car1.wheelsNumber = 4;
car1.sound = 'vroom';

const bicycle1 = Object.create(vehicle);
bicycle1.wheelNumber = 2;
bicycle1.sound = 'ding-ding';

car1.move();
car1.getWheelNumber();

bicycle1.move();
bicycle1.getWheelNumber();

function vehicleFactory(wheelsNumber) {
    const ob = Object.create(vehicle);
    ob.wheelsNumber = wheelsNumber;
    if (wheelsNumber < 4) {
        ob.sound = 'ding-ding';
    } else {
        ob.sound = 'vroom';
    }
    return ob;
}


const bicycle2 = vehicleFactory(3);
bicycle2.move();