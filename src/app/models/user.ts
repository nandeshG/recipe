export class User {
    constructor(public email:string,public id:string, private _token:string,private expiratiomDate:Date){}
    get token(){
        if(!this.expiratiomDate || new Date()>this.expiratiomDate){
            return null;
        }
        return this._token
    }
}
