class Clock {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }


    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining)
        }
        this.tick()
        this.interval = setInterval(this.tick, 50);
    }

    pause = () => {
        clearInterval(this.interval)
    }

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete()
            }
        } else {
            this.timeRemaining = this.timeRemaining - .05;
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value)
    }
    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);


let duration;
const clock = new Clock(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        duration = totalDuration
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset',
            perimeter * timeRemaining / duration - perimeter
        );
    },
    onComplete() {
        console.log('Timer is completed')
    }
})


    // SVG portin of the application 
    < svg height = "200" width = "200" >
        <circle
            r="190"
            cx="200"
            cy="200"
            fill="transparent"
            stroke="blue"
            // stroke-width="565"
            // stroke-dasharray="-10"
            transform="rotate(-90 200 200)" />
</svg >
