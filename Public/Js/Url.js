import { Files } from '../../Public/Js/Files.js';

export class Url{

    constructor() {
        this.url = Files.ConvertJsonToObject('http://localhost/DEV/php_client_prototype/Config/Routes.json')
    }

    GetUrlProject(){
        return this.url.project
    }

    GetUrlApiCore(){
        return this.url.apiCore
    }

    GetUrlApiLogin(){
        return this.url.apiLogin
    }
}