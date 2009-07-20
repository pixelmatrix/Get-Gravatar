/*

Get Gravatar v1.0
Copyright © 2009 Josh Pyles / Pixelmatrix Design LLC
http://pixelmatrixdesign.com

Requires jQuery 1.3 or newer

Thanks to Tim Van Damme for the inspiration and the pretty demo page

License:
MIT License - http://www.opensource.org/licenses/mit-license.php

Usage:

$("input#email-addresss").getGravatar();

Or you can specify some custom options:

$("input#email-address").getGravatar({
	url: '/includes/get-gravatar.php',
	fallback: 'http://mysite.com/images/default.png',
	avatarSize: 128,
	avatarContainer: "#gravatar-preview",
	start: function(){
		alert("starting!");
	},
	stop: function(){
		alert("stopping!");
	}
});

Enjoy!

*/

(function($) {
  $.fn.getGravatar = function(options) {
    //debug(this);
    // build main options before element iteration
    var opts = $.extend({}, $.fn.getGravatar.defaults, options);
    // iterate and reformat each matched element
    return this.each(function() {
      $this = $(this);
      // build element specific options
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			var t = "";
			//check to see if we're working with an text input first
      if($this.is("input[type='text']")){
				//do an initial check of the value
				$.fn.getGravatar.getUrl(o, $this.val());
				
				//do our ajax call for the MD5 hash every time a key is released
				$this.keyup(function(){
					clearTimeout(t);
					var email = $this.val();
					t = setTimeout(function(){$.fn.getGravatar.getUrl(o, email);}, 500);
				});
			}
    });
  };
  //
  // define and expose our functions
  //
	$.fn.getGravatar.getUrl = function(o, email){
		//call the start function if in use
		if(o.start) o.start($this);
		
		$.get(o.url, "email="+email, function(data){
			//when we have our MD5 hash, generate the gravatar URL
			var id = data.gravatar_id;
			var gravatar_url = "http://gravatar.com/avatar.php?gravatar_id="+id+"&default="+o.fallback+"&size="+o.avatarSize;
			//call our function to output the avatar to the container
     	$.fn.getGravatar.output(o.avatarContainer, gravatar_url, o.stop);
		}, "json");
	}
  $.fn.getGravatar.output = function(avatarContainer, gravatar_url, stop) {
		//replace the src of our avatar container with the gravatar url
		img = new Image();
		$(img)
		.load(function(){
			$(avatarContainer).attr("src", gravatar_url);
			if(stop) stop();
		})
		.attr("src", gravatar_url);
  };
  //
  // plugin defaults
  //
  $.fn.getGravatar.defaults = {
   	url: 'get-gravatar.php',
    fallback: '',
		avatarSize: 50,
		avatarContainer: '#gravatar',
		start: null,
		stop: null
  };
})(jQuery);