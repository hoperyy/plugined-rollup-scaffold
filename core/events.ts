export class WaterfallEvents {
    constructor() {

    }

    eventList: Array< { name: string; callback: Function } > = [];

    tap(name: string, callback: Function) {
        this.eventList.push({
            name,
            callback
        });
    }

    async call() {
        for (let i = 0, len = this.eventList.length; i < len; i++) {
            await this.eventList[i].callback();
        }
    }
}