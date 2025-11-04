; "use strict";

export default class Modal {
    
    dialog = document.createElement("dialog");
	iframe = document.createElement("iframe");

    constructor () {
        document.body.appendChild(this.dialog).appendChild(this.iframe);

        this.dialog.onclick = e => {
            this.dialog.close();
        };
    }

    show ({src, width, height}) {
        if (width) {
            this.iframe.width = width;
        }

        if (height) {
            this.iframe.height = height;
        }

        this.iframe.onload = e => {
            this.dialog.showModal();
        };

        this.iframe.src = src;
    }

    close() {
	    this.dialog.close();
    }

}