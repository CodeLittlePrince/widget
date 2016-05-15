define(function(require, exports, module){
	var u = require('utility').Utility;
	var w = require('widget').Widget;

	function Modal() {
		this.cfg = {
			top: 100,
			width: 400,
			title: 'default title',
			content: 'default content',
			skin: 'm-modal',
			hasMask: false,
			confirmCalback: null,
			closeCalback: null
		}
	}
	Modal.prototype = u.extend({}, new w(), {
		renderUI: function(){
			var tpl = 
				'<div class="m-modal">' +
					'<header>' +
						'<h3>' + this.cfg.title + '</h3>' +
						'<i class="f-close">X</i>' +
					'</header>' +
					'<article>' +
						'<p>' + this.cfg.content + '</p>' +
					'</article>' +
					'<footer>' +
						'<input class="f-confirm" type="button" value="confirm"/>' +
					'</footer>' +
				'</div>'
				;
			this.boundingBox = u.str2node(tpl);
			if (this.cfg.hasMask) {
				this.mask = u.str2node('<div class="m-modal_mask"></div>');
				var body = document.getElementsByTagName('body')[0];
				body.appendChild(this.mask);
			}
		},
		bindUI: function(){
			var that = this;
			$(this.boundingBox).delegate('.f-confirm', 'click', function(){
				that.fire('confirm');
				that.destroy();
			}).delegate('.f-close', 'click', function(){
				that.fire('close');
				that.destroy();
			})	
				// node.parentNode.removeChild(node);
				// mask.parentNode.removeChild(mask);
			if (this.cfg.confirmCalback) {
				this.on('confirm', this.cfg.confirmCalback);
			}
			if (this.cfg.closeCalback) {
				this.on('close', this.cfg.closeCalback);
			}
		},
		initUI: function(){			
			this.boundingBox.style.cssText = 'width: ' + this.cfg.width + 'px;' + 'top: ' + this.cfg.top + 'px;' + 
				'margin-left: ' + (-this.cfg.width/2) + 'px;';
			this.boundingBox.className = this.cfg.skin;
		},
		destructor: function(){
			this.mask && this.mask.parentNode.removeChild(this.mask);
		},
		alert: function(cfg){
			u.extend(this.cfg, cfg);
			this.render();
			return this;
		},
		confirm: function(){},
		prompt: function(){}
	});

	exports.Modal = Modal;
});