import { Login } from './Login.js';
import { Url } from '../Url.js';

$(document).ready(async function(){
	const url = new Url();
	const config = await url.LoadResource('Config/Config.json');
	// const routes = await url.LoadResource('Config/Routes.json');
	const login = new Login(config);
	login.LoadPage();

	$('[data-toggle="tooltip"]').tooltip();
});
