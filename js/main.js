define(function(require, exports, module){
	var Modal = require('modal').Modal;

	var show = document.getElementById('show');
	var modal = new Modal();
	var isShowed = false;
	show.onclick = function(){
		if (!isShowed) {
			isShowed = true;
			modal.alert({
				top: 50,
				width: 350,
				content: 'alert success',
				title: 'title success',
				hasMask: true
			});
			modal.on('confirm',function(){console.log('confirm'); isShowed = false;});
			modal.on('close',function(){console.log('close'); isShowed = false;});
		}
	}

});