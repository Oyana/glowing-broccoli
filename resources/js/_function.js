'use strict';

$.fn.isBound = function(type, fn)
{
	if (
		(
			this.data('eventsisBound') === undefined
			|| this.data('eventsisBound')[type] === undefined
			|| this.data('eventsisBound')[type].length === 0
		)
		&& this.data('eventsisBound') !== type
	)
	{
		this.data("eventsisBound", type);
		return false;
	}
	return true;
};

$.fn.checkVisible = function( evalType )
{
	evalType = evalType || "visible";

	const vpH = $(window).height(), // Viewport Height
		st = $(window).scrollTop(), // Scroll Top
		y = $(this).offset().top,
		elementHeight = $(this).height();
	if ( evalType === "visible" )
	{
		return ((y < (vpH + st)) && (y > (st - elementHeight)));
	}
	else if ( evalType === "above" )
	{
		return ((y < (vpH + st)));
	}
	return false;
}

function getYTId( urlYT )
{
	const ytID = urlYT.match( /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/ );
	if ( ytID && ytID[2].length === 11 )
	{
		return ytID[2];
	}
	else
	{
		return 'error';
	}
}

$.fn.resize16_9 = function()
{
	return $(this).height( $(this).width() * 0.5628205128205128 );
}

function nl2br (str, is_xhtml) {
	var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
