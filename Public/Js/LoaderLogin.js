import { Login } from '../../Public/Js/Login.js';

$(document).ready(function(){
	let login = new Login();
	login.LoadPage();

	$('[data-toggle="tooltip"]').tooltip();
});
