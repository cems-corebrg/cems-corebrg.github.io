"use strict";

import Ethernet from "./ethernet.js";

Ethernet.fontColor = "#ffffff";

class Template {
    #container;
    indexToContainer = new Map();
    click = e => {};

    constructor (selector) {
        this.#container = document.body.querySelector(selector);
    }

    add (args) {
        const
            {index} = args,
            container = this.#container.cloneNode(true);

        this.indexToContainer.set(index, container);

        args.template = this;

        container.onclick = e => this.click(args, e);

        this.#container.parentNode.appendChild(container)

        return container;
    }

    status({index, match, critical}) {
        const container = this.indexToContainer.get(index);

        if (match !== undefined) {
            container.dataset.match = "";
        } else {
            delete container.dataset.match;
        }

        if (critical !== undefined) {
            container.dataset.critical = "";
        } else {
            delete container.dataset.critical;
        }

        return container;
    }

    set onclick (callback) {
        this.click = callback;
    }
}

export class Response extends Template {

    add (args) {
        super.add(args);
        this.update(args);
    }

    update (args) {
        const {value} = args;

        super.status(args).dataset.value = `${value}ms`;
    }
}

export class Load extends Template {
    indexToChart = new Map();

    constructor (selector) {
        super(selector);

        this.summary = new Summary(selector);
    }

    static createChart (container) {
        return new Chart(container.appendChild(document.createElement("canvas")), {
            type: "doughnut",
            data: {
                datasets: [{
                    data: [70, 20, 10],
                    backgroundColor: ["#00897b", "#f6bf26", "#8e24aa"],
					weight: 0.2
                },{
					data: [0],
					weight: 0.1
				}]
            },
            options: {
                cutoutPercentage: 60,
                circumference: Math.PI *4/3,
                rotation: Math.PI *-7/6,
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                }
            },
            plugins: [{
                afterDraw: c => {
                    const {config} = c;

                    if (config.label) {
                        const
                            {ctx, chart} = c,
                            width = chart.width,
                            text = config.label;
                        
                        ctx.save();
                        
                        ctx.fillStyle = "#ffffff";
                        ctx.textBaseline = "top";

                        ctx.font = `bold 24px "맑은 고딕", Tahoma`;

                        ctx.fillText(text, Math.round((width - ctx.measureText(text).width) / 2), chart.height /2);

                        ctx.restore();
                    }
                }
            }]
        });
    }

    add (args) {
        const chart = Load.createChart(super.add(args));
        
        this.indexToChart.set(args.index, chart);

        this.update(args);
    }

    update (args) {
        const
            {index, value, unit = 1, max = 100} = args,
            chart = this.indexToChart.get(index),
            load = value * unit *100 / max;

        super.status(args);

        chart.config.label = `${load.toFixed(2)}%`;
        chart.config.data.datasets[2] = {
            data: [load, 100 - load],
            backgroundColor: [load > 90? "#8e24aa": load > 70? "#f6bf26": "#00897b", "#666666"]
        };

        chart.update();
        this.summary.update(args);
    }

    set onclick (callback) {
        super.onclick = callback;

        this.summary.onclick = callback;
    }
}

export class Summary extends Template {
    indexToChart = new Map();
    indexToLoad = new Map();
    indexToCritical = new Map();
    isInitialized = false;

    constructor(selector) {
        super(`.summary>${selector}`);
    }

    initialize () {
        ["max", "avg", "min"].forEach(summary => {
            this.indexToChart.set(summary, Load.createChart(super.add({
                index: summary
            })));
        });

        this.isInitialized = true;
    }

    update ({oid, index, value, unit = 1, max = 100, critical}) {
        if (!this.isInitialized) {
            this.initialize();
        }

        this.indexToLoad.set(index, value * unit *100 / max);
        this.indexToCritical.set(index, critical !== undefined);

        this.oid = oid;

        const loadArray = Array.from(this.indexToLoad.values());

        [
            ["max", Math.max.apply(undefined, loadArray)],
            ["min", Math.min.apply(undefined, loadArray)],
            ["avg", loadArray.reduce((acc, load) => acc += load) / loadArray.length]
        ].forEach(([name, load]) => {
            const chart = this.indexToChart.get(name);

            chart.config.label = `${load.toFixed(2)}%`;
            chart.config.data.datasets[2] = {
                data: [load, 100 - load],
                backgroundColor: [load > 90? "#8e24aa": load > 70? "#f6bf26": "#00897b", "#666666"]
            };
    
            chart.update();
        });

        if (Array.from(this.indexToCritical.values()).some(critical => critical)) {
            this.indexToContainer.get("max").dataset.critical = "";
        } else {
            delete this.indexToContainer.get("max").dataset.critical;
        }
    }

    captureCallback (args) {
        args.index = "";
        args.oid = this.oid;
         
        this.callback(args);
    }

    set onclick (callback) {
        this.callback = callback;

        super.onclick = this.captureCallback;
    }
}

export class Storage extends Template {
    indexToChart = new Map();

    createChart (container, name) {
        return new Chart(container.appendChild(document.createElement("canvas")), {
            type: 'bar',
            data: {
                labels: [name]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            fontColor: "#ffffff",
                            callback: value => value.substr(0, 30)
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false,
                            max: 100,
                            min: 0
                        }
                    }]
                },
                layout: {
                    padding: {
                        right: 20,
                        left: 20
                    }
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                }
            },
            plugins: [{
                afterDraw: c => {
                    const {config} = c;

                    if (config.label) {
                        const
                            {ctx, chart} = c,
                            width = chart.width,
                            text = config.label;
                        
                        ctx.save();
                        
                        ctx.fillStyle = "#ffffff";
                        ctx.textBaseline = "middle";

                        ctx.font = `bold 24px "맑은 고딕", Tahoma`;

                        ctx.fillText(text, Math.round((width - ctx.measureText(text).width) / 2), chart.height /2);

                        ctx.restore();
                    }
                }
            }]
        });
    }

    add (args) {
        const
            {index, name} = args,
            chart = this.createChart(super.add(args), name);
            
        this.indexToChart.set(index, chart);
        
        this.update(args);
    }

    update (args) {
        const
            {index, value, unit = 1, max} = args,
            chart = this.indexToChart.get(index),
            used = value * unit *100 / max;

        super.status(args);

        chart.config.label = `${used.toFixed(2)}%`;
        chart.config.data.datasets = [{
            data: [Math.min(used, 70)],
            backgroundColor: "#00897b"
        }, {
            data: [used > 70? Math.max(used -70, 20): 0],
            backgroundColor: "#f6bf26"
        }, {
            data: [used > 90? used - 90: 0],
            backgroundColor: "#8e24aa"
        }];

        chart.update();
    }
}

export class Memory extends Storage {
}

export class Temperature extends Template {

    add (args) {
        super.add(args);

        this.update(args);
    }

    update (args) {
        const
            {value, name, unit = 1} = args,
            dataset = super.status(args).dataset;

            dataset.value = `${(value * unit).toFixed(2)} ${String.fromCodePoint("0x2103")}`;
            dataset.label = name;
    }
}

export class Power extends Template {
    add (args) {
        super.add(args);

        this.update(args);
    }

    update (args) {
        const {name} = args;

        super.status(args).dataset.label = name || "";
    }
}

export class Fan extends Template {
    add (args) {
        super.add(args);

        this.update(args);
    }

    update (args) {
        const {name} = args;

        super.status(args).dataset.label = name || "";
    }
}

export class Interface extends Template {
    indexToChart = new Map();
    indexToInput = new Map();
    indexToOutput = new Map();
    indexToInerror = new Map();
    indexToOuterror = new Map();

    add (args) {
        const {template, index, name, value} = args;
        
        if (template === "interface") {
            let container = this.indexToContainer.get(index);
            
            if (!container) {
                container = super.add(args);

                let chart = new Ethernet(container, {
                    image: Interface.image
                });

                this.indexToChart.set(index, chart);

                chart.label = name;

                container.dataset.type = value;
            }
        } else {
            switch (template) {
            case "input":
            case "inputhc":
                if (args.max && Number(args.max) > 0) {
                    this.indexToInput.set(index, args);
                }

                break;
            case "output":
            case "outputhc":
                if (args.max && Number(args.max) > 0) {
                    this.indexToOutput.set(index, args);
                }

                break;
            case "inerror":
                this.indexToInerror.set(index, args);

                break;
            case "outerror":
                this.indexToOuterror.set(index, args);

                break;
            }
        }
    }

    update (args) {
        const
            {template, index} = args,
            chart = this.indexToChart.get(index);
        
        chart.set(args);
        
        switch (template) {
            case "ostatus":
                super.status(args);
            case "astatus":
                if (chart.status === Ethernet.STATUS_DEFAULT) {
                    this.indexToContainer.get(index).classList.add("running");
                } else {
                    this.indexToContainer.get(index).classList.remove("running");
                }
        }
    }

    captureCallback (args, e) {
        const
            {index} = args,
            callback = {
                template: this,
                index: index,
                alias: this.indexToChart.get(index).name,
            };

        if (e.target === this.indexToContainer.get(index).querySelector(".container__label")) {
            callback.inerror = this.indexToInerror.get(index);
            callback.outerror = this.indexToOuterror.get(index);
        } else {
            callback.input = this.indexToInput.get(index);
            callback.output = this.indexToOutput.get(index);
        }

        this.callback(callback);
    }

    set onclick (callback) {
        this.callback = callback;

        super.onclick = this.captureCallback;
    }
}

export default class Display {
    nameToTemplate = new Map();

    constructor (nameToSelector, onselect) {
        let template;
        for (let [name, selector] of nameToSelector) {
            switch (name) {
                case "response":
                    template = new Response(selector);
                    
                    break;
                case "load":
                    template = new Load(selector);
                    
                    break;
                case "memory":
                    template = new Memory(selector);
                    
                    break;
                case "storage":
                    template = new Storage(selector);
                    
                    break;
                case "temperature":
                    template = new Temperature(selector)
                    
                    break;
                case "power":
                    template = new Power(selector);
                    
                    break;
                case "fan":
                    template = new Fan(selector);

                    break;
                case "interface":
                    template = new Interface(selector);

                    break;
                default:
                    continue;
            }

            this.nameToTemplate.set(name, template);

            template.onclick = onselect;
        }
    }
    
    add (args) {
        let {template} = args;

        switch (template) {
        case "input":
        case "output":
        case "inputhc":
        case "outputhc":
        case "inerror":
        case "outerror":
            template = "interface";

            break;
        }

        this.nameToTemplate.get(template)?.add(args);
    }

    update (args) {
        let {template} = args;

        switch (template) {
        case "input":
        case "output":
        case "inputhc":
        case "outputhc":
        case "astatus":
        case "ostatus":
            template = "interface";

            break;
        }

        this.nameToTemplate.get(template)?.update(args);
    }

    animate (t) {
        if (t) {
            if (this.start) {
                const progress = (t - this.start) /1000;
                
                for (let [index, chart] of this.nameToTemplate.get("interface").indexToChart) {
                    chart.progress = progress;
                }

                if (progress > 1) {
                    return;
                }
            } else {
                this.start = t;
            }
        } else {
            delete this.start;
        }

        window.requestAnimationFrame(this.animate.bind(this));
    }
}