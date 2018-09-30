define([], function() {
    class GamepadHandler {
        constructor() {
            this.listen();
            this.listeners = [];
            this.xboxMap = {};
            this.axisSafeZone = .2;
            this.lo = true;
        }
        listen() {
            window.addEventListener("gamepadconnected", this.update.bind(this));
        }

        onInput(cb) {
            this.listeners.push(cb);
        }

        getAxeLength(length) {
            return Math.abs(length) > this.axisSafeZone ? length : 0;
        }

        getAxes(g) {
            if(this.lo) {
                this.lo = false;
                console.log(g)
            }
            let toReturn = {
                l: [this.getAxeLength(g.axes[0]), this.getAxeLength(g.axes[1])]
            };
            return toReturn;
        }

        triggerEvents(config) {
            for(let i = 0; i < this.listeners.length; i++) {
                this.listeners[i](config)
            }
        }

        update() {
            requestAnimationFrame(this.update.bind(this));
            let gamepads = navigator.getGamepads()
            if (!gamepads || !gamepads[0])
                return;
            let g = gamepads[0];
            let config = {};
            let trigger = false;
            if(config.axes = this.getAxes(g)) {
                trigger = true;
            }

            if(trigger) {
                this.triggerEvents(config);
            }
        }
    }
    return GamepadHandler;
});