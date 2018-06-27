function getAnilationList()
{
	return [
		[".home .step-list", "slideInUp"],
		[".home .img-plax", "slideInDown", 100],
		[".home .home-conciergerie .read-more", "slideInRight"],
		[".home .home-video .read-more", "slideInRight"],
		[".sprite-rappel", "slideInRight", 1000],
		[".home .realisation", "slideInRight", 150],
		[".home .main-vid", "fadeInUp"],
		[".home .sub-vid", "slideInLeft", 150],
		[".realisation .wrapper-images .images", "slideInRight", 150]
	];
}

function setAnimationList()
{
	var animation = getAnilationList();
	for ( var i = 0; i < animation.length; i++ )
	{
		animatedLoading( animation[i][0], animation[i][1], animation[i][2] );
	}
	return true;
}

function resetAnimationList()
{
	var animation = getAnilationList();
	for ( var i = 0; i < animation.length; i++ )
	{
		resetAnimation( animation[i][0], animation[i][1] );
	}
	return true;
}

function resetAnimation( elem, animation )
{
	$(elem).css('visibility', 'hidden');
	$(elem).removeClass('animated');
	$(elem).removeClass(animation);
}

function animatedLoading( elem, animation, tempo )
{
	tempo = tempo || 500;
	if ( $(elem).css('visibility') == 'hidden' && $(elem).checkVisible() && !$(elem).hasClass( 'animated' ) )
	{
		var it = 0;
		$(elem).each(function()
		{
			var $elemToLoad = $(this);
			setTimeout(function()
			{
				$elemToLoad.css({ "visibility" : "visible" });
				$elemToLoad.addClass( 'animated ' + animation );
				// PLAX OVERRIDE
				if ( elem === ".home .img-plax" )
				{
					setTimeout(function()
					{
						$elemToLoad.removeClass( 'animated ' + animation );
					}, tempo * 1.5 );
				}
				// PLAX OVERRIDE END
			}, tempo * it );
			it ++;
		});
	}
}