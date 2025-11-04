"use strict";

export default class Message {

    result = new Map().set("status", "normal");

    constructor (event) {
        let text = `${event.name || event.ip || ""}`;

        this.event = event;

        switch(event.origin.toUpperCase()) {
        case "CRITICAL":
            if (event.status !== 0) {
                this.result.set("status", "critical");
            }

            break;
        case "ICMP":
            if (event.status !== 0) {
                this.result.set("status", "shutdown");
            }

            break;
        case "MATCH":
        case "SNMP":
        case "REGISTER":
            if (event.status !== 0) {
                this.result.set("status", "major");
            }

            break;
        }
    }

    get status () {
        return this.result.get("status");
    }

    get date () {
        const
            date = new Date(this.event.timestamp),
            mm = date.getMonth() +1,
            dd = date.getDate();

        return `${date.getFullYear()}-${(mm > 9? "": "0") + mm}-${(dd > 9? "": "0") + dd}`;
    }

    get time () {
        const 
            date = new Date(this.event.timestamp),
            hh = date.getHours(),
            mm = date.getMinutes(),
            ss = date.getSeconds();
        
        return (hh > 9? "": "0") + hh +":"+ (mm > 9? "": "0") + mm +":"+ (ss > 9? "": "0") + ss;
    }
}