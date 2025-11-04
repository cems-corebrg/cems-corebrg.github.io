;"use strict";

const
    mibData = {
        "1.3.6.1.2.1.2.2.1.10": { // ifInOctets
            template: "",
            value: "8"
        },
        "1.3.6.1.2.1.2.2.1.16": { // ifOutOctets
            template: "",
            value: "8"
        },
        "1.3.6.1.2.1.2.2.1.5": { // ifSpeed
            template: "",
            value: "1"
        },
        "1.3.6.1.2.1.31.1.1.1.6": { // ifHCInOctets
            template: "",
            value: "8"
        },
        "1.3.6.1.2.1.31.1.1.1.10": { // ifHCOutOctets
            template: "",
            value: "8"
        },
        "1.3.6.1.2.1.31.1.1.1.15": { // ifHighSpeed
            template: "",
            value: "1000000"
        },
        /** **/
        "1.3.6.1.4.1.10188.5.6.1.3.1.3": {
            template: "fan",
            type: "match",
            value: "2"
        },
        "1.3.6.1.4.1.10188.5.6.1.2.1.3": {
            template: "power",
            type: "match",
            value: "2"
        },
        "1.3.6.1.4.1.10188.5.6.1.1.1.2": {
            template: "temperature",
            type: "trace",
            value: "1"
        },
        "1.3.6.1.4.1.10188.5.6.3.1": {
            template: "load",
            type: "trace",
            value: "1"
        },
        "1.3.6.1.4.1.2636.3.1.13.1.6.4": {
            template: "fan",
            type: "match",
            value: "2"
        },
        "1.3.6.1.4.1.2636.3.1.13.1.6.2": {
            template: "power",
            type: "match",
            value: "2"
        },
        "1.3.6.1.4.1.2636.3.1.13.1.7": {
            template: "temperature",
            type: "trace",
            value: "1"
        },
        "1.3.6.1.4.1.2636.3.1.13.1.8.9": {
            template: "load",
            type: "trace",
            value: "1"
        },
        /** CISCO **/
        "1.3.6.1.4.1.9.9.13.1.4.1.3": {
            template: "fan",
            type: "match",
            value: "1"
        },
        "1.3.6.1.4.1.9.9.13.1.5.1.3": {
            template: "power",
            type: "match",
            value: "1"
        },
        "1.3.6.1.4.1.9.9.13.1.3.1.2": {
            template: "temperature"
        },
        "1.3.6.1.4.1.9.9.13.1.3.1.3": {
            template: "temperature",
            type: "trace",
            value: "1"
        },
        "1.3.6.1.4.1.9.9.109.1.1.1.1.6": {
            template: "load",
            type: "trace",
            value: "1"
        },
        "1.3.6.1.4.1.9.9.48.1.1.1.5": {
            template: "memory",
            type: "trace",
            value: "1"
        },
        "1.3.6.1.4.1.9.9.48.1.1.1.6": {
            template: "memory"
        },
        "1.3.6.1.4.1.9.9.48.1.1.1.2": {
            template: "memory"
        },
        /** **/
        "1.3.6.1.4.1.6296.9.1.1.1.8": {
            template: "load",
            type: "trace",
            value: "1"
        },
        /** AXGATE **/
        "1.3.6.1.4.1.37288.1.1.5.3.1": {
            template: "fan"
        },
        "1.3.6.1.4.1.37288.1.1.5.3.2": {
            template: "fan",
            type: "match",
            value: "1"
        },
        "1.3.6.1.4.1.37288.1.1.5.1.1": {
            template: "power"
        },
        "1.3.6.1.4.1.37288.1.1.5.1.2": {
            template: "power",
            type: "match",
            value: "1"
        },
        "1.3.6.1.4.1.37288.1.1.5.2.1": {
            template: "temperature"
        },
        "1.3.6.1.4.1.37288.1.1.5.2.2": {
            template: "temperature",
            type: "trace",
            value: "0.1"
        },
        "1.3.6.1.4.1.37288.1.1.3.1.1": {
            template: "load",
            type: "trace",
            value: "1"
        },
        /** **/
        "1.3.6.1.4.1.12356.101.4.4.2.1.3": {
            template: "load",
            type: "trace",
            value: "1"
        }/*,
        "1.3.6.1.4.1.12356.101.4.1.4": {
            template: "memory",
            type: "trace",
            value: "1"
        }*/
    };

export {mibData};