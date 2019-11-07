$.fn.bkoScroll = function()
{
	let $self = $(this);
	if( $self.isBound("click") === false )
	{
		$self.on('click', function (event)
		{
			let target = $.attr(this, 'href').split("#");
				if ( target[1] && document.getElementById( target[1] ) )
				{
					event.preventDefault();
					$('html, body').animate(
						{
							scrollTop: $( "#" + target[1] ).offset().top
						},
						500,
						'swing',
						function()
						{
							window.location.hash = target[1];
						}
					);
				}
		});
	}
}
