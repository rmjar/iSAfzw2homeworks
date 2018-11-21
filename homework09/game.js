class Game {
    constructor() {
        this.gameContainer = document.getElementById('game');
        this.cross = new Cross();
        this.gameContainer.addEventListener('mousemove',
            (event) => {
                this.cross.update(event.offsetX, event.offsetY);
            });
        this.gameContainer.addEventListener('click',
            (event) => {
                this.cross.update(event.offsetX, event.offsetY);
                const hit = this.enemies.checkCollissions(this.cross.x, this.cross.y);
                if (!hit) {
                    this.enemies.appendEnemy();
                } else {
                    if (!this.enemies.exist()) {
                        alert("Game over!")
                    }
                }
            });
        this.enemies = new EnemiesList(this);
        this.enemies.appendEnemy(0);
        this.enemies.appendEnemy(0);
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
    constructor(game) {
        this.enemies = []
        this.game = game;
    }
    appendEnemy(randomNumber = -1) {
        const enemyTypesNumber = 4;
        if (randomNumber === -1) {
            randomNumber = Math.floor(Math.random() * enemyTypesNumber);
        }
        let enemy;
        switch (randomNumber) {
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
                break;
        }
        this.enemies.push(enemy);
        this.game.gameContainer.appendChild(enemy.enemyElement);
    }
    checkCollissions(x, y) {
        const foundEnemy = this.enemies.find(enemy =>
            Math.abs(enemy.x - x) < enemy.width && Math.abs(enemy.y - y) < enemy.height);
        if (foundEnemy) {
            this.enemies.splice(this.enemies.indexOf(foundEnemy), 1);
            this.game.gameContainer.removeChild(foundEnemy.enemyElement);
            return true;
        }
        return false;
    }
    
    exist() {
        return !!this.enemies.length;
    }
}

const game = new Game();