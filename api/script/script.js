function trackingLoadScript(script, onload)
{
  var scriptService = document.createElement('script');
  scriptService.src = script;
  scriptService.type = "text/javascript";
  scriptService.charset = "UTF-8";
  scriptService.onload = onload;
  document.body.appendChild(scriptService);
}
function trackingBindReady(handler)
{
    // console.log('bind');
    var called = false;

    function ready()
    {
        if (called)
            return called = true;

        handler();
    }

    if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
        setTimeout(ready, 1);
    }
    else if (document.addEventListener)
    {
        // console.log('add event listener');
        // native event
        document.addEventListener("DOMContentLoaded", ready, false)
    }
    else if (document.attachEvent)
    {
        // IE
        try
        {
            var isFrame = window.frameElement != null;
        }
        catch(e)
        {
        }

        if (document.documentElement.doScroll && !isFrame)
        {
            // IE, the document is not inside a frame
            function tryScroll()
            {
                if (called)
                    return false;
                try
                {
                    document.documentElement.doScroll("left");
                    ready();
                }
                catch(e)
                {
                    setTimeout(tryScroll, 10);
                }
            }

            tryScroll();
        }

        document.attachEvent("onreadystatechange", function()
        {
            // IE, the document is inside a frame
            if (document.readyState === "complete")
            {
                ready();
            }
        })
    }
    else if (window.addEventListener) {
        window.addEventListener('load', ready, false)
    }
    else if (window.attachEvent) {
        window.attachEvent('onload', ready)
    }
    else
    {
        var fn = window.onload// very old browser, copy old onload
        window.onload = function()
        {
            // replace by new onload and call the old one
            fn && fn();
            ready();
        }
    }
}
if (typeof window._tracking_defer === 'undefined') {
    window._tracking_defer = {};
}
function trackingDeferPush(oid, defer)
{
    if ( typeof _tracking_defer[oid] !== 'object' ) {
        _tracking_defer[oid] = [];
    }
    _tracking_defer[oid].push(defer);
}
function trackingDefer(oid, defer)
{
    if ( _tracking_config.objects[oid].success ) {
        // Run immidiately
        defer();
        // Save for more RetrieveNumber runs (see use_geo)
        trackingDeferPush(oid, defer);
    } else {
        // Save for later run
        trackingDeferPush(oid, defer);
    }
}
function trackingSendCustomDataDefer(oid, custom_data)
{
    trackingDefer(oid, function(){
        trackingSendCustomDataOrig(oid, custom_data);
    });
}

var trackingSendCustomData = trackingSendCustomDataDefer;
var _tracking_config = {
	server_host: 'calltracking.alytics.ru',
	objects: {
		'c357ccdb4842fc72': {
			block_class: 'phone_class',
                        url_params: {'utm_source': ['yandex'], 'utm_medium': 'cpc'},
		},
                '02cb43c982494dc5': {
			block_class: 'phone_class',
                        url_params: {'utm_source': ['google'], 'utm_medium': 'cpc'},
		},
	},
	trackable_source_types:  ['type_in', 'referrer', 'utm'],         
	last_source: false,						
};
trackingBindReady(function(){
		trackingLoadScript('https://calltracking.alytics.ru/api/v6/tracking_config.js', function(){ 
		trackingInit();
   })
})
