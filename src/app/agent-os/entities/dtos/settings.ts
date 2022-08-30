export class Settings {
  apiEndPoint: string = '';

  constructor(data: any) {
    Object.assign(this, data);
  }
}
