; "use strict";

class BC {

    constructor (channel) {
        this.bc = new BroadcastChannel(channel);
    }

    listen (callback) {
        this.bc.onmessage = e => callback(e.data);
    }

    send (message) {
        this.bc.postMessage(message);
    }

}

export default class Channel {

    static get event () {
        return new BC("event");
    }

    static get account () {
        return new BC("account");
    }

    static get config () {
        return new BC("config");
    }

    static create (uuid) {
        return new BC(uuid);
    }

    static getAccount (callback) {
        const uuid = this.uuid;

        this.create(uuid).listen(account => callback(account));

        this.account.send(uuid);
    }

    static getConfig (callback) {
        const uuid = this.uuid;

        this.create(uuid).listen(config => callback(config));

        this.config.send({
            uuid: uuid
        });
    }

    static listen (channel, callback) {
        new BroadcastChannel(channel).onmessage = e => new BroadcastChannel(e.data).postMessage(callback());
    }

    static receive (channel, callback) {
        new BroadcastChannel(channel).onmessage = e => callback(e.data);
    }

    static send (channel, data) {
        new BroadcastChannel(channel).postMessage(data);
    }

    static request (channel, callback) {
        const uuid = this.uuid;
    
        new BroadcastChannel(uuid).onmessage = function (e) {
            this.close();

            callback(e.data);
        };

        this.send(channel, uuid);
    }

    static get uuid () {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
}