define(function(require, exports, module){
	function Widget(){
		this.boundingBox = null;
	}
	Widget.prototype = {
		renderUI: function(){},
		bindUI: function(){},
		initUI: function(){},
		render: function(container){
			this.handlers = {};
			this.renderUI();
			this.bindUI();
			this.initUI();
			document.getElementsByClassName(container)[0]||document.getElementsByTagName('body')[0].appendChild(this.boundingBox)
		},
		destructor: function(){},
		destroy: function(){
			this.destructor();
			$(this.boundingBox).off();//后期需要改成原生
			this.boundingBox.parentNode.removeChild(this.boundingBox);
		},
		on: function(type, handler){
			if (typeof this.handlers[type] == 'undefined') {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire: function(type, data){
			if (this.handlers[type] instanceof Array) {
				for(var i = 0, len = this.handlers[type].length; i < len; i++){
					this.handlers[type][i](data);
				}
			}
		}
	}
	exports.Widget = Widget;
});