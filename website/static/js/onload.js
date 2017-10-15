import jquery from 'jquery';

import './libs/scrollex';

(($) => {
  $(() => {
    const $main = $('#content');
    const $nav = $('nav');

    const $navA = $nav.find('a');

    const scrollexSettings = {
      mode: 'top',
      enter: () => { $nav.addClass('alt'); },
      leave: () => { $nav.removeClass('alt'); },
    };

    const clickHandler = () => {
      const $this = $(this);

      $navA
        .removeClass('active')
        .removeClass('active-locked');

      $this
        .removeClass('active')
        .removeClass('active-locked');
    };

    $main.scrollex(scrollexSettings);

    $navA
      .on('click', clickHandler)
      .each(() => {
        const $this = $(this);
        const $section = $($this.attr('href'));

        const enterHandler = () => {
          $section.removeClass('inactive');

          if ($navA.filter('.active-locked').length === 0) {
            $navA.removeClass('active');
            $this.addClass('active');
          } else if ($this.hasClass('active-locked')) {
            $this.removeClass('active-locked');
          }
        };

        const settings = {
          mode: 'middle',
          enter: enterHandler,
        };

        $section.scrollex(settings);
      });
  });
})(jquery);
