<?php

class Carousel extends Controller {
	public $sub_action;
	public $action;
	public $id;

	public function __construct(){
		parent::__construct();

		if(!Core::gi()->User->is_admin()){
			Session::destroy();
			Core::gi()->Request->redirect("/admin/");
			exit();
		}else{
			$this->sub_action = Core::gi()->Request->getpath(1, false);
			$this->action = Core::gi()->Request->getpath(3, false);
			$this->id = Core::gi()->Request->getpath(4, false);
		}
	}

	public function run_admin(){
		$slides = $this->model->getSlides();

		if(!$this->action){
			if($this->sub_action == "slide"){
				return $this->slide();
			}
			else if($this->sub_action == "save"){
				return $this->save();
			}
			else if($this->sub_action == "load"){
				return $this->load();
			}
			else if($this->sub_action == "remove"){
				return $this->remove();
			}
			else{
				return $this->view->open("index.html")
								->set('slides', $slides)
								->parse();
			}
		}
		else if($this->action == "slide"){
			if($this->id){
				$slide = $this->model->getSlide($this->id);

				return $this->view->open("slide.html")
								->set('slide', $slide)
								->parse();
			}
			else{
				return Core::gi()->Request->redirect("/admin/modules/item/carousel/");
			}
		}
		else if($this->action == "add"){
			$Set = array(
				'name' => 'new slide',
				'title' => '',
				'description' => '',
				'image' => '/app/admin/themes/default/images/slider/slide.jpg',
				'status' => '0',
			);

			$id = $this->model->AddSlide($Set);
			return Core::gi()->Request->redirect("/admin/modules/item/carousel/slide/".$id."/");
		}
		else{

		}

	}

	// GET SLIDE
	public function load(){
		$id = Core::gi()->Request->getpath(2, false);

		if($id){
				$item = $this->model->getItem($id);

				return $this->view->open("slide_preview.html")
							->set("status",'OK')
							->set("item", $item)
							->parse();
		}
		else{
			return Core::gi()->Request->redirect("/admin/modules/item/carousel/");
		}
	}

	// REMOVE SLIDE
	public function remove(){
		$id = Core::gi()->Request->getpath(2, false);

		if($id){
			$image = $this->model->getImageItem($id);
			unlink(ROOT_PATH . $image['image']);

			$item = $this->model->remove($id);

			if($item) {
				$Success_message = 'Слайд удален.';
				$Status = 'OK';

				return $this->view
							->set("message", $Success_message)
							->set("status", $Status)
							->parse();
			}
		}
		else{
			return Core::gi()->Request->redirect("/admin/modules/item/carousel/");
		}
	}

	// UPDATE SLIDE
	public function save(){
		$id = Core::gi()->Request->getpath(2, false);

		if($id){
			$post_array = array();

			$post_array['id'] = $id;
			$post_array['status'] = Core::gi()->Request->post('var', 'status', 0);
			$post_array['button'] = Core::gi()->Request->post('var', 'button', 0);
			$post_array['title'] = Core::gi()->Request->post('none', 'title', '');
			$post_array['description'] = Core::gi()->Request->post('none', 'description', '');
			$post_array['name'] = Core::gi()->Request->post('none', 'name', '');
			$post_array['link'] = Core::gi()->Request->post('none', 'link', '');
			$post_array['alt'] = Core::gi()->Request->post('none', 'alt', '');
			$post_array['new_window'] = Core::gi()->Request->post('none', 'new_window', '');
			$post_array['sort'] = Core::gi()->Request->post('none', 'sort', '');

			$db = $this->model->saveImage($post_array);

			return $this->view
						->set("id", $id)
						->set("message", 'Cлайд сохранен!')
						->set("status", 'OK')
						->set("db", $db)
						->set("link", '/admin/modules/item/carousel/')
						->parse();
		}
		else{
			return Core::gi()->Request->redirect("/admin/modules/item/carousel/");
		}
	}

	// SAVE IMAGE
	public function slide(){
		$id_ = Core::gi()->Request->getpath(2, false);

		$Status = 'Ok';
		$Error = '';
		$Src = '';

		$var_name = 'cover';
		$src = ROOT_PATH . '/images/slider/';
		$newName = 'ortodonts_ru_' . $id_;

		$saveImage = Core::gi()->Request->upload_image($var_name, $src, $newName);

		if($saveImage){
			$Src = "/images/slider/" . $saveImage;

			$db = $this->model->saveImage('image', $id_, $Src);

			if($db){
				$message = 'Изображение сохранено!';
			}
			else{
				$Status = 'Error';
				$Error = 'Image save error!';
				$message = 'Произошла ошибка!';
			}
		}
		else{
			$Status = 'Error';
			$Error = 'Image save error!';
			$message = 'Произошла ошибка!';
		}

		return $this->view
					->set('status', $Status)
					->set('error', $Error)
					->set('src', $Src)
					->set('message', $message)
					->parse();
	}
}