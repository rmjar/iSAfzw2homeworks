let interval = null;


function TimeStation() {
    this.observers = [];
    interval = this.startTimer();
    console.log(this);
}

TimeStation.prototype = {
    startTimer: function () {
        if (!interval) {
            let that = this;
            return setInterval(function () {
                that.update();
            }, 10);
        }
        return this;
    },


    subscribe: function (observer) {
        this.observers.push(observer);
    },


    unsubscribe: function (observer) {
        this.observers = this.observers.filter(item => item !== observer);
    },


    update: function () {
        this.observers.forEach(observer => {
            observer.notify();
            observer.render();
        });
    }

}


function Timer() {
    this.startInterval = Date.now();
    this.currentInterval = null;
    this.started = false;
    this.timerString = "00h 00:00:00";
    this.id = "timer" + this.startInterval;
    this.prepareDOM();
    this.render();
}


Timer.prototype = {

    notify: function () {
        if (this.started) {
            this.currentInterval = Date.now() - this.startInterval;
        }
    },

    start: function () {
        this.startInterval = Date.now();
        this.started = true;
    },

    stop: function () {
        this.started = false;
    },

    reset: function () {
        this.started = false;
        this.startInterval = Date.now();
        this.currentInterval = 0;
    },

    remove: function() {
        this.stop();
        const timers = document.getElementById("timers");
        const element = document.getElementById(this.id);
        if(element) {
            const buttons = document.getElementById("buttons"+this.id);
            timers.removeChild(buttons);
            const element = document.getElementById(this.id);
            timers.removeChild(element);
            delete this;           
        }
    },

    formatTimeString: function () {
        let hours = Math.floor(this.currentInterval / (3600000));
        let minutes = Math.floor(this.currentInterval / 60000) % 60;
        let seconds = Math.floor(this.currentInterval / 1000) % 60;
        let milis = Math.floor(this.currentInterval / 10) % 100;

        hours = ("0" + hours).slice(-2) + "h ";
        minutes = ("0" + minutes).slice(-2);
        seconds = ("0" + seconds).slice(-2);
        milis = ("0" + milis).slice(-2);
        this.timerString = hours + minutes + ":" + seconds + ":" + milis;
    },

    render: function () {
        this.formatTimeString();
        const element = document.getElementById(this.id);
        element.innerText = this.timerString;
    },

    prepareDOM: function () {
        const timers = document.getElementById("timers");
        let element = document.getElementById(this.id);
        if (!element) {
            element = document.createElement("div");
            element.setAttribute("id", this.id);
            const buttons = document.createElement("span");
            buttons.setAttribute("id","buttons"+this.id);
            this.appendButton(this.start, buttons);
            this.appendButton(this.stop, buttons);
            this.appendButton(this.reset, buttons);
            this.appendButton(this.remove, buttons);
            timers.appendChild(element);
            timers.appendChild(buttons);
        } 
    },

    appendButton: function (fn, parent) {
        const btn = document.createElement("button");
        const txt = document.createTextNode(fn.name);
        const boundListener = fn.bind(this);
        btn.addEventListener("click", boundListener);
        btn.appendChild(txt);
        parent.appendChild(btn)
    }
}

const timeStation = new TimeStation();
const addTimerBtn = document.getElementById("addTimer");
addTimerBtn.addEventListener("click", function () {
    const timer = new Timer();
    timeStation.subscribe(timer);
});