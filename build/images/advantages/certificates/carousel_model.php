<?php
	class CarouselModel extends Model {

		public $table;
		public function __construct(){
			parent::__construct();
			$this->table = MODULE_TABLE_PREFIX . 'carousel';
		}
		
		// Get slides list
		public function getSlides(){
			return $this->DB->fetch_list("SELECT * FROM ". $this->table ."");
		}

		// Get slide item
		public function getSlide($id){
			return $this->DB->fetch_item("SELECT * FROM ". $this->table . " WHERE id='" .$id. "'");
		}

		// Get slide item
		public function getImageItem($id){
			return $this->DB->fetch_item("SELECT image FROM ". $this->table . " WHERE id='" .$id. "'");
		}

		// INSERT NEW SLIDE
		public function AddSlide($arr=false) {
			if($arr){
				$this->DB->insert($this->table, $arr);
				$id = $this->DB->insert_id();
				return $id;
			}
			else{
				return "ERROR!!! ARR NOT FOUND!";
			}
		}

		// INSERT NEW SLIDE
		public function saveImage($array, $id = '', $src = '') {
			if($array == 'image'){
				return $this->DB->update($this->table, $id, array('image' => $src));
			}
			else if($array){
				return $this->DB->update($this->table, $array['id'], array('title' => $array['title'],
																			'description' => $array['description'],
																			'name' => $array['name'],
																			'status' => $array['status'],
																			'button' => $array['button'],
																			'sort' => $array['sort'],
																			'new_window' => $array['new_window'],
																			'alt' => $array['alt'],
																			'link'=> $array['link']));
			}
		}

		// REMOVE SLIDE
		public function remove($id = false) {
			if($id) {
				return $this->DB->delete($this->table, $id);
			}
		}

		// GET ITEM SLIDE
		public function getItem($id = false) {
			return $this->DB->fetch_item("SELECT * FROM ". $this->table ." WHERE id = '".$id."'");
		}

	}