<?php

class Notfound extends Controller {
	
	public function run($Args=array()){
		$this->setSeoData(array("title" => "ORTODONTS — Ошибка 404. Страница не найдена"));
		$this->setSeoData(array("keywords" => "Ошибка 404. Страница не найдена"));
		$this->setSeoData(array("description" => "Ошибка 404. Страница не найдена. Врач-ортодонт в Москве Николаева Надежда"));
		
		$this->view->open("404.html");
		return $this->view->parse();
	}

}