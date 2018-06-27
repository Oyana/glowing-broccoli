( function() {
	Turbolinks.start();
	let ready = function()
	{
		console.log( "🦄 TurboLinks Ready -> " + window.location.href + " width: " + $(window).width());
		let pageWidth = $(window).width();

		// We reset the scroll to 0 at every page load
		$('html, body').scrollTop(0);

		if ( pageWidth >= 481 )
		{
			setTimeout( function()
			{
				// setAnimationList();
			}, 100);
		}
	}
	let cache = function()
	{
		console.log( "🦄 TurboLinks CacheLoad" );
		// resetAnimationList();
	}
	document.addEventListener("turbolinks:before-cache", cache);
	document.addEventListener("turbolinks:load", ready);

	$(window).on('scroll', function()
	{
		let fromTop = $(window).scrollTop();
		if ( $(window).width() >= 481 )
		{
			// setAnimationList();
		}
		$('body').toggleClass("down", (fromTop > 150));
	});
} )( jQuery );
