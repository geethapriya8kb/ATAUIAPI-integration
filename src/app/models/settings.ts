export class Settings {
    production: string = '';
    apiEndPoint: string = '';

    constructor(data: any) {
        Object.assign(this, data);
    }
}
