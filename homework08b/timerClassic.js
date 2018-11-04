function Timer() {
    this.startInterval = Date.now();
    this.currentInterval = null;
    this.timerString = "00h 00:00:00";
    this.id = "timer" + this.startInterval;
    this.render();
    this.interval = null;
}


Timer.prototype = {

    calcCurtime: function() {
        this.currentInterval = Date.now() - this.startInterval;
    },

    start: function () {
        this.startInterval = Date.now();
        const that = this;
        if (!that.interval) {
            that.interval = setInterval(function () {
                that.calcCurtime();
                that.render();
            }, 10);
        }

    },

    stop: function () {
        if (this.interval) {
            this.interval = clearInterval(this.interval);
        }
        this.render()
    },

    reset: function () {
        this.interval = clearInterval(this.interval);
        this.startInterval = Date.now();
        this.currentInterval = 0;
        this.render();
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
        this.prepareDOM();
    },

    prepareDOM: function () {
        const timers = document.getElementById("timers");

        let element = document.getElementById(this.id);
        if (!element) {
            element = document.createElement("div");
            element.setAttribute("id", this.id);
            const buttons = document.createElement("span");
            buttons.setAttribute("id", "buttons" + this.id);
            this.appendButton(this.start, buttons);
            this.appendButton(this.stop, buttons);
            this.appendButton(this.reset, buttons);
            timers.appendChild(element);
            timers.appendChild(buttons);
        } else {
            element.innerText = "";
        }
        element.innerText = this.timerString;
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


const addTimerBtn = document.getElementById("addTimer");
addTimerBtn.addEventListener("click", function () {
    const timer = new Timer();
});