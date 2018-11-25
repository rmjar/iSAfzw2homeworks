class Game {
    constructor() {
        this.gameContainer = document.getElementById('game');
        this.enemiesContainer = document.getElementById('enemies');
        this.cross = new Cross();
        this.enemies = new EnemiesList();
    }
    init() {
        this.gameContainer.addEventListener('mousemove',
            (event) => {
                this.cross.update(event.offsetX, event.offsetY);
            });
        this.gameContainer.addEventListener('click',
            (event) => {
                this.cross.update(event.offsetX, event.offsetY);
                const hit = this.enemies.checkCollissions(this.cross.x, this.cross.y);
                if (!hit) {
                    this.enemies.append();
                } else if (!this.enemies.exist()) {
                    alert("Game over!")
                }
                this.render();
            });
        this.enemies.append(0);
        this.enemies.append(0);
        this.render();

    }
    clear() {
        while (this.enemiesContainer.hasChildNodes()) {
            this.enemiesContainer.removeChild(this.enemiesContainer.firstChild);
        }
    }
    render() {
        this.clear();
        this.enemies.enemies.forEach(enemy => this.enemiesContainer.appendChild(enemy.enemyElement));
    }

}

class Cross {
    constructor(x = 100, y = 100) {
        this.x = x;
        this.y = y;
        this.crossElement = document.getElementById('cross');
    }
    update(x, y) {
        this.x = x;
        this.y = y;
        this.crossElement.style.top = y + 'px';
        this.crossElement.style.left = x + 'px';
    }
}

class Enemy {
    constructor() {
        this.x = Math.floor(Math.random() * 379);
        this.y = Math.floor(Math.random() * 379);
        this.width = 20;
        this.height = 20;

        const element = document.createElement("div");
        element.classList.add('enemy');
        element.style.top = this.y + 'px';
        element.style.left = this.x + 'px';
        this.enemyElement = element;
    }
}

class BigEnemy extends Enemy {
    constructor() {
        super();
        this.width = 30;
        this.height = 30;
        this.enemyElement.classList.add('big-enemy');
    }
}

class SmallEnemy extends Enemy {
    constructor() {
        super();
        this.width = 15;
        this.height = 15;
        this.enemyElement.classList.add('small-enemy');
    }
}

class RoundEnemy extends Enemy {
    constructor() {
        super();
        this.width = 20;
        this.height = 20;
        this.enemyElement.classList.add('round-enemy');
    }
}

class EnemiesList {
    constructor() {
        this.enemies = [];
    }
    addNewEnemy(type) {
        let enemy;
        switch (type) {
            case 0:
                enemy = new Enemy();
                break;
            case 1:
                enemy = new BigEnemy();
                break;
            case 2:
                enemy = new SmallEnemy();
                break;
            case 3:
                enemy = new RoundEnemy();
        }
        return enemy;
    }
    append(randomNumber = -1) {
        const enemyTypesNumber = 4;
        if (randomNumber === -1) {
            randomNumber = Math.floor(Math.random() * enemyTypesNumber);
        }
        const enemy = this.addNewEnemy(randomNumber)
        this.enemies.push(enemy);
    }
    checkCollissions(x, y) {
        const foundEnemy = this.enemies.find(enemy =>
            Math.abs(enemy.x - x) < enemy.width / 2 &&
            Math.abs(enemy.y - y) < enemy.height / 2);
        console.log(foundEnemy);
        if (foundEnemy) {
            this.enemies.splice(this.enemies.indexOf(foundEnemy), 1);
            return true;
        }
        return false;
    }
    exist() {
        return !!this.enemies.length;
    }
}

const game = new Game();
game.init();