function gaInit( yourUA )
{
	window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
	ga('create', yourUA, 'auto');
	ga('send', 'pageview');
}

function trackPChange()
{
	ga("set", "location", window.location.href);
	ga("send", "pageview");
}
