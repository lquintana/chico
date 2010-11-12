/**
 *	Modal window
 *	@author
 *	@Contructor
 *	@return An interface object
 */

ui.Modal = function(conf){
	var that = ui.Floats(); // Inheritance
	
	// Global configuration
	conf.$trigger = $(conf.element);
	conf.closeButton = true;
	conf.align = 'center';
	conf.classes = 'box';

	// Dimmer
	var dimmer = {
		on:function(){
			$('<div>').bind('click', function(event){dimmer.off(); that.hide(event, conf)}).addClass('dimmer').css({height:$(window).height(), display:'block'}).hide().appendTo('body').fadeIn();
		},
		off:function(){
			$('div.dimmer').fadeOut('normal', function(){ $(this).remove(); });
		}
	};

	// Content from href/action
	if(conf.content.type.toLowerCase() === 'ajax' && !conf.content.data) conf.content.data = conf.$trigger.attr('href') || conf.$trigger.parents('form').attr('action'); 

	
	// Events
	conf.$trigger
		.css('cursor', 'pointer')
		.bind('click', function(event){
			dimmer.on();
			that.show(event, conf);
			$('.close').bind('click', dimmer.off);
		});

	return { show: function(event){ that.show(event, conf) }, hide: function(event){ that.hide(event, conf) }};
};