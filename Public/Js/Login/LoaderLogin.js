import { Login } from './Login.js';
import { Url } from '../Url.js';
import { Files } from '../Files.js';

$(document).ready(async function(){
	const url = new Url();
	let config;

	try{
		config = await url.LoadResource('Config/Config.json');
	}catch (error) {
		config = await url.LoadResource('../../Config/Config.json');
	}

	const routes = Files.ConvertJsonToObject(config.project + 'Config/Routes.json');
	const dictionary = Files.ConvertJsonToObject(config.project + 'Config/LoginDictionary.json');
	const icons = Files.ConvertJsonToObject(config.project+'Config/Icons.json');
	
	// const routes = await url.LoadResource('Config/Routes.json');
	const login = new Login(config, dictionary, icons);
	login.LoadPage();

	$('[data-toggle="tooltip"]').tooltip();
});
