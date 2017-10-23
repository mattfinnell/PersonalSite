import $ from 'jquery';
import _ from 'lodash';

import './libs/scrollex';


$(() => {
  const main = $('#content');

  const navigationBar = $('nav');
  const navigationAnchors = navigationBar.find('a');


  const anchorClickHandler = (anchor) => {
    $(anchor).on('click', () => {
      // Strip away active classes on all anchors
      navigationAnchors.removeClass('active');

      // Except for the clicked anchor
      $(anchor).addClass('active');
    });
  };

  // Attach click handlers to each anchor
  _.map(navigationAnchors, anchorClickHandler);

  // Toggles the location of the navbar between relative and static
  const scrollexSettings = {
    mode: 'top',
    enter: () => { navigationBar.addClass('alt'); },
    leave: () => { navigationBar.removeClass('alt'); },
  };

  main.scrollex(scrollexSettings);
});
