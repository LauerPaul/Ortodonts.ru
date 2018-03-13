<?php

class Contacts extends Controller {
	
	public function run($args=array()){

		$tel_1 = str_replace(' ', '', Core::gi()->cfg->Get('phone_1'));
		$tel_2 = str_replace(' ', '',Core::gi()->cfg->Get('phone_2'));
		$tel_1 = str_replace(')', '', $tel_1);
		$tel_2 = str_replace(')', '', $tel_2);
		$tel_1 = str_replace('(', '', $tel_1);
		$tel_2 = str_replace('(', '', $tel_2);
		$tel_1 = str_replace('-', '', $tel_1);
		$tel_2 = str_replace('-', '', $tel_2);
		
		$breadcrumb = Core::gi()->cfg->Get('breadcrumb_contacts') ? true : false;
		
		$img_ = Core::gi()->cfg->Get('bg_top_section_conacts');
		$top_section = Core::gi()->Load("Topsection")
									->Set("src",  $img_)
									->Set("title", 'Контакты')
									->Set("breadcrumb", $breadcrumb)
									->Set("args", $args)
									->run();
		
		return $this->view->open("contacts.html")
					->set('top_section', $top_section)
					->set('tel_1', $tel_1)
					->set('tel_2', $tel_2)
					->parse();
	}

}