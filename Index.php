<?php

class Index
{
	private string $_controller;
	private string $_method;
	private string $_params;

	private string $_text;


	public function __construct()
	{

		
	}

	public function ShowPage()
	{
		$this->StartApp();
		$itemsPage = $this->LoadPageResources();
	
		if(in_array($itemsPage['page'], ['Login.html','NotFound.html']))
			die(require_once './Templates/'.$itemsPage['page']);
		else
			die(require_once './Templates/Main.html');
	}

    private function StartApp()
	{
		$url = isset($_GET['url']) ? $_GET['url'] : 'Login/Login/';
        
		$arrUrl = explode('/', $url);

		$this->_controller = $arrUrl[0];
		$this->_method = $arrUrl[0];
		$this->_params = '';
        
		// Se obienen los métodos
		if(!empty($arrUrl[1])){
			if($arrUrl[1] != ''){
				$this->_method = $arrUrl[1];
			}
		}
        
		// Se obtienen los parámetros
		if(!empty($arrUrl[2])){
			$arrGet = [];
			for($i=2; $i < count($arrUrl); $i++){
				$arrayUrl = explode('=', $arrUrl[$i]);
				if(isset($arrayUrl[0]) && isset($arrayUrl[1])){
					$arrGet[$arrayUrl[0]] = $arrayUrl[1];
				}
			}
			$_GET = $arrGet;
		}
	}

    private function LoadPageResources()
	{
		$routes = json_decode(file_get_contents('./Config/Routes.json'), true);

		if($this->_controller == 'Login')
		{
			$params = '';
			foreach(array_keys($_GET) as $key)
			{
				$params = $key."=".$_GET[$key];
			}
			
			if(isset($routes[$this->_controller][$this->_method]['view'])){
				return [
					'url' => $routes['apiLogin'] . $routes[$this->_controller][$this->_method]['url'].$params ?? '',
					'urlResources' => $routes['project'].'Public',
					'page' => $routes[$this->_controller][$this->_method]['view'],
					'controller' => $this->_controller
				];
			}
			else
			{
				return ['page' => 'NotFound.html'];
			}			
		}
		elseif(isset($routes[$this->_controller]['view']))
		{
			return [
				'urlTable' => $routes['apiCore'] . $routes[$this->_controller]['urlTable'] ?? '',
				'loadInfo' => $routes['apiCore'] . $routes[$this->_controller]['loadInfo'] ?? '',
				'urlContext' => $routes['apiCore'] . $routes['Context'] ?? '',
				'controller' => $this->_controller,
				'page' => $routes[$this->_controller]['view'] ?? '',
				'urlApiCore' => $routes['apiCore'],
				'urlProject' => $routes['project']
			];
		}
		else
		{
			return [
				'page' => 'NotFoundSession.html',
				'title' => 'Página no encontrada.',
				'text' => 'La página que intenta buscar no existe.',
				'urlProject' => $routes['project'],
				'controller' => 'Página no encontrada'
			];
		}
	}
}

$index = new Index();

$index->ShowPage();