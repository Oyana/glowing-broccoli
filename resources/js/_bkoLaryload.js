function lazywatcher()
{
	$(window).on('scroll', function()
	{
		loadwithlazyiness();
	});
	$(window).on('hashchange', function (e) {
		loadwithlazyiness();
	});
	loadwithlazyiness();
}

function loadwithlazyiness()
{
	$('.lazyload').each(function()
	{
		let elem = this;
		if ( checkVisible( elem ) )
		{
			lazyload( $(elem) );
		}
	});
};

function lazyload ( $elem )
{
	if(
		$elem.prop("tagName") === "img"
		|| $elem.prop("tagName") === "IMG"
		|| $elem.prop("tagName") === "iframe"
		|| $elem.prop("tagName") === "IFRAME"
	)
	{
		$elem.attr('src', $elem.attr("data-lazy"));
	}
	else
	{
		$elem.css( "background-image", "url(" + $elem.attr("data-lazy") + ")" );
	}
	$elem.removeClass('lazyload');
}

function checkVisible( elem, evalType )
{
	evalType = evalType || "visible";

	let vpH = $(window).height(), // Viewport Height
		st = $(window).scrollTop(), // Scroll Top
		y = $(elem).offset().top,
		elementHeight = $(elem).height();
	if ( evalType === "visible" )
	{
		return ( ( y < ( vpH + st ) ) && ( y > ( st - elementHeight ) ) );
	}
	else if ( evalType === "above" )
	{
		return ( ( y < ( vpH + st ) ) );
	}
	return false;
}
