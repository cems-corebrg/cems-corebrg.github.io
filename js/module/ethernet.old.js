"use strict";

class Background {
    canvas;
    config;

    constructor (config) {
        this.canvas = document.createElement("canvas");
        this.config = config;
        this.canvas.width =
        this.canvas.height = this.config.size;

        this.update();
    }

    update (status) {
        const
            {image, size} = this.config,
            context = this.canvas.getContext("2d");

        context.save();
        
        context.clearRect(0, 0, size, size);

        context.drawImage(image, 0, 0, size, size);
        
        switch(status) {
        case Ethernet.STATUS_SHUTDOWN:
            context.fillStyle = "#8e24aa";

            break;
        case Ethernet.STATUS_DISABLED:
            context.fillStyle = "#666666";

            break;
        default:
            context.fillStyle = "#00897b";
        }

        context.globalCompositeOperation = "source-in";
        context.fillRect(0, 0, size, size);

        context.restore();
    }
}

class Gauge {
    canvas;
    context;
    config;
    barHeight;
    offsetInGauge;
    offsetOutGauge;
    offsetInText;
    offsetOutText;

    constructor (config) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.config = config;

        this.canvas.width =
        this.canvas.height = this.config.size;
        this.barHeight = Math.round(this.config.size * 0.3);
        this.offsetInGauge = Math.round(this.config.size * 0.2);
        this.offsetOutGauge = Math.round(this.config.size * 0.5);
        this.offsetInText = Math.round(this.config.size * 0.35);
        this.offsetOutText = Math.round(this.config.size * 0.65);
        this.context.textBaseline = "middle";
        this.context.textAlign = "right";
        this.context.font = `${Math.round(this.config.size *0.15)}px "맑은 고딕", "Tahoma", "Arial`;
    }

    update () {
        const
            {input, output, bandwidth, size} = this.config;
        
        if (!bandwidth) {
            return this.canvas;
        }

        this.context.clearRect(0, 0, size, size);

        this.context.save();

        this.context.fillStyle = "rgba(200, 200, 200, 0.5)";
        this.context.fillRect(0, this.offsetInGauge, size, this.barHeight);
        this.context.fillRect(0, this.offsetOutGauge, size, this.barHeight);

        this.context.fillStyle = "rgba(0, 0, 255, 0.4)";
        this.context.fillRect(0, this.offsetInGauge, Math.round(Math.round(input / bandwidth * size)), this.barHeight);

        this.context.fillStyle = "rgba(255, 0, 0, 0.4)";
        this.context.fillRect(0, this.offsetOutGauge, Math.round(Math.round(output /bandwidth * size)), this.barHeight);

        this.context.fillStyle = Ethernet.fontColor;
        this.context.globalCompositeOperation='darker';
        this.context.fillText(toBPSString(Math.round(input)), size, this.offsetInText);
        this.context.fillText(toBPSString(Math.round(output)), size, this.offsetOutText);

        this.context.restore();

        return this.canvas;
    }
}

export default class Ethernet {
    static STATUS_DEFAULT = 0b00;
    static STATUS_SHUTDOWN = 0b01;
    static STATUS_DISABLED = 0b10;
    static fontColor = "#000000";

    container;
    canvas;
    context;
    config;
    input = 0;
    output = 0;
    type = 6;
    status = Ethernet.STATUS_DEFAULT;

    constructor (container, config) {
        this.container = container;
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.config = config;

        this.config.labelToNull = new Map();
        this.config.size = container.getBoundingClientRect().width;
        this.config.input = 0;
        this.config.output = 0;
        this.canvas.width =
        this.canvas.height = this.config.size;

        this.background = new Background(this.config);
        this.gauge = new Gauge(this.config);
        
        this.update();

        this.container.appendChild(this.canvas);
    }

    update () {
        const {size} = this.config;

        this.context.clearRect(0, 0, size, size);

        this.context.drawImage(this.background.canvas, 0, 0);

        if (this.status === Ethernet.STATUS_DEFAULT) {
            this.context.drawImage(this.gauge.update(), 0, 0);
        }
    }

    set (name, value, bandwidth) {
        if (bandwidth > 0) {
            this.config.bandwidth = bandwidth;

            switch (name) {
                case "input":
                    this.input = Number(value);

                    break;
                case "output":
                    this.output = Number(value);
                
                    break;
                default:
                    return;
            }

            //this.animate();
        } else {
            let status = this.status;

            switch (name) {
                case "astatus":
                    if (Number(value) == 1) { // disabled bit off
                        this.status &= Ethernet.STATUS_SHUTDOWN;
                    } else { // disabled bit on
                        this.status |= Ethernet.STATUS_DISABLED;
                    }

                    break;
                case "ostatus":
                    if (Number(value) == 1) { // shutdown bit off
                        this.status &= Ethernet.STATUS_DISABLED;
                    } else { // shutdown bit on
                        this.status |= Ethernet.STATUS_SHUTDOWN;
                    }

                    break;
                case "iftype":
                    this.type = Number(value);

                    break;
                case "ifname":
                case "ifalias":
                    if (value) {
                        this.config.labelToNull.set(value, null);
                    }

                    if (this.config.labelToNull.size > 0) {
                        this.label = Array.from(this.config.labelToNull.keys()).sort((l1, l2) => l1.length - l2.length)[0];
                    }

                    break;
            }

            if  (status != this.status) {
                this.updateStatus();
            }
        }
    }

    updateStatus () {
        let status = Ethernet.STATUS_DEFAULT;

        if (this.status & Ethernet.STATUS_DISABLED) {
            status = Ethernet.STATUS_DISABLED;
        } else if (this.status & Ethernet.STATUS_SHUTDOWN) {
            status = Ethernet.STATUS_SHUTDOWN;
        }
        
        this.background.update(status);

        this.update();
    }

    animate (t) {
        if (t) {
            if (!this.start) {
                this.start = t;
            }

            this.config.input = Math.min(this.input, this.input *(t - this.start) / 1000);
            this.config.output = Math.min(this.output, this.output *(t - this.start) / 1000);

            this.update();

            if (t > this.start +1000) {
                return;
            }
        } else {
            delete this.start;
        }

        window.requestAnimationFrame(this.animate.bind(this));
    }

    set progress (progress) {
        this.config.input = Math.min(this.input, this.input * progress);
        this.config.output = Math.min(this.output, this.output * progress);

        this.update();
    }

    set label (text) {
        const
            {size} = this.config,
            labelHeight = size *0.2;

        this.canvas.height = size + labelHeight;

        this.context.save();

        this.context.font = `12px "맑은 고딕", "Tahoma", "Arial"`;
        this.context.fillStyle = Ethernet.fontColor;
        this.context.textBaseline = "middle";

        if (this.context.measureText(text).width > size) {
            this.context.textAlign = "start";
            this.context.fillText(text, 0, this.canvas.height - labelHeight /2);
        } else {
            this.context.textAlign = "center";
            this.context.fillText(text, size /2, this.canvas.height - labelHeight /2);
        }

        this.context.restore();

        this.update();

        this.name = text;
    }

    get status () {
        return this.status;
    }
}

const UNIT = ["bps", "Kbps", "Mbps", "Gbps", "Tbps"];

function toBPSString(value) {    
    for(var i=0, _i=UNIT.length -1; i<_i; i++) {
        if (value > 999) {
            value /= 1000;
        }
        else {
            break;
        }
    }
    
    return `${value.toFixed(2)}${UNIT[i]}`;
}
    
    