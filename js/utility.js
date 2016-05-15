define(function(require, exports, module){
	exports.Utility = {
		str2node : function(str){
			var node = document.createElement('div');
			node.innerHTML = str;
			return node.firstChild;
		},
		extend : function(out){
			var out = out || {};
			for(var i = 1, len = arguments.length; i < len; i++){
				if (!arguments[i])
					continue;
				for(var key in arguments[i]){
					out[key] = arguments[i][key];
				}
			}
			return out;
		}
	}
});
