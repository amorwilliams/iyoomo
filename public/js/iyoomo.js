// Allow for console.log to not break IE
if (typeof window.console == "undefined" || typeof window.console.log == "undefined") {
  window.console = {
    log  : function(){},
    info : function(){},
    warn : function(){}
  };
}
if(typeof window.console.group == 'undefined' || typeof window.console.groupEnd == 'undefined' || typeof window.console.groupCollapsed == 'undefined') {
  window.console.group = function(){};
  window.console.groupEnd = function(){};
  window.console.groupCollapsed = function(){};
}
if(typeof window.console.markTimeline == 'undefined') {
  window.console.markTimeline = function(){};
}
window.console.clear = function(){};

window.iyoomo = {
	version: '@VERSION',
	
	// namespaces
	
	handler: {}
};

// ready event
iyoomo.ready = function(){
	// selector cache
	var	
		handler
	;
	
	// event handlers
	handler = {
		
		mo: function(){
			console.log('hahahaha');	
		}
		
	};
	
	// initialize
	/*
$('#product_item_container').masonry({
		itemSelector: 'article.item'
	});
*/
	
};

// attach ready event
$(document)
	.ready(iyoomo.ready)
;