<?php

class CarouselView extends View {
	public function Decorator() {
		Core::gi()->Loader->appendCSS(TMPL_ADMIN_PATH . "default/styles/css/_lib/cropper.css");
		Core::gi()->Loader->appendJS(TMPL_ADMIN_PATH . "default/js/_lib/cropper.min.js");
		Core::gi()->Loader->appendJS(TMPL_ADMIN_PATH . "default/js/_lib/tinymce/tinymce.min.js");
		Core::gi()->Loader->appendJS($this->templateUrl . "slide.js");
	}
}