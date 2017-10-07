/* jshint esversion : 6 */

import '../sass/style.scss';

(function($){
	$(function () {
		var $main = $("#content");
		var $nav = $("nav");

		var $nav_a = $nav.find('a');

		var scrollexSettings = {
			mode : 'top',
			enter : function() { $nav.addClass('alt'); },
			leave : function() { $nav.removeClass('alt'); }
		};

		var clickHandler = function() {
            var $this = $(this);

            $nav_a
                .removeClass('active')
                .removeClass('active-locked');

            $this
                .removeClass('active')
                .removeClass('active-locked');
		};

		$main.scrollex(scrollexSettings);

		$nav_a
			.on('click', clickHandler)
			.each(function() {
				var $this = $(this);
				var $section = $($this.attr('href'));

				var enterHandler = function() {
				$section.removeClass('inactive');

				if($nav_a.filter('.active-locked').length === 0){
					$nav_a.removeClass('active');
					$this.addClass('active');

				} else if ($this.hasClass('active-locked')) {
					$this.removeClass('active-locked');
				}
			};

			var scrollexSettings = {
				mode : 'middle',
				enter : enterHandler,
			};

			$section.scrollex(scrollexSettings);
		});
	});
})(jQuery);
