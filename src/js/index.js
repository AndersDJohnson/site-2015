var noop = function () {};

$(function () {

  // settings

  var isHoverOpenButtonEnabled = true;
  var isHoverCloseButtonEnabled = false;
  var isHoverOutsideCloseEnabled = true;
  var navOpenTimeout = 250;
  var navCloseTimeout = 600;
  var blockTime = 750;

  //// selectors

  var navSelector = '.andrz-nav';
  var nonNavSelector = '.andrz-nonnav';
  var navToggleSelector = '.andrz-nav-toggle';
  var navCloseSelector = '.andrz-nav-close';

  var $navRoot =$('html');
  var $nav = $(navSelector);
  var $nonNav = $(nonNavSelector);
  var $navToggle = $(navToggleSelector);
  var $navClose = $(navCloseSelector);

  var lastStartTime;

  // methods

  //// close

  var navClose = function (e) {
    var thisTime = (new Date()).getTime();
    if (lastStartTime && lastStartTime + blockTime > thisTime ) {
      return;
    }
    lastStartTime = thisTime;

    $navRoot.removeClass('andrz-nav-opened');

    if (isHoverOutsideCloseEnabled) {
      $nav.off('mouseenter', navCloseCancel);
      // $nav.off('mouseleave', navCloseAfterTimeout);
      $nonNav.off('mousemove', navCloseAfterTimeout);
    }

    return false;
  };

  var navCloseAfterTimeout = function (e) {
    $(this).doTimeout('nav-close', navCloseTimeout, function () {
      var $target = $(e.target);

      // if mousemove is on toggle or its children, which might be non-nav,
      //  bypass the close to prevent immediate close after open via toggle
      if ($target.closest(navToggleSelector).length) {
        return;
      }

      navClose(e);
    });

    return false;
  };

  var navCloseCancel = function (e) {
    $(this).doTimeout('nav-close');
  };

  //// open

  var navOpen = function (e) {
    var thisTime = (new Date()).getTime();
    if (lastStartTime && lastStartTime + blockTime > thisTime ) {
      return;
    }
    lastStartTime = thisTime;

    $navRoot.addClass('andrz-nav-opened');

    if (isHoverOutsideCloseEnabled) {
      $nav.on('mouseenter', navCloseCancel);
      // switching nav close to non-nav mousemove excluding toggle,
      //  otherwise mouseleave triggers e.g. on right click or leave window
      // $nav.on('mouseleave', navCloseAfterTimeout);
      $nonNav.on('mousemove', navCloseAfterTimeout);
    }

    return false;
  };

  var navOpenAfterTimeout = function (e) {
    $(this).doTimeout('nav-open', navOpenTimeout, navOpen);

    return false;
  };

  var navOpenCancel = function (e) {
    $(this).doTimeout('nav-open');

    return false;
  };

  //// toggle

  var navIsOpen = function () {
    return $navRoot.hasClass('andrz-nav-opened');
  };

  var navToggle = function (e) {
    if (navIsOpen()) {
      navClose(e);
    }
    else {
      navOpen(e);
    }
  };

  var navToggleAfterTimeout = function (e) {
    var type = e.type;
    var isHover = type == 'mouseenter';

    if (navIsOpen()) {
      if (isHover) {
        if (isHoverCloseButtonEnabled) {
          navCloseAfterTimeout(e);
        }
      }
      else {
        navCloseAfterTimeout(e);
      }
    }
    else {
      if (isHover) {
        if (isHoverOpenButtonEnabled) {
          navOpenAfterTimeout(e);
        }
      }
      else {
        navOpenAfterTimeout(e);
      }
    }

    return false;
  };

  var navToggleCancel = function (e) {
    if (navIsOpen()) {
      navCloseCancel();
    }
    else {
      navOpenCancel();
    }

    return false;
  };

  // bind events

  //// hover

  if (isHoverOpenButtonEnabled) {
    $navToggle.on('mouseenter', navToggleAfterTimeout);
    $navToggle.on('mouseleave', navToggleCancel);
  }

  //// click

  $navToggle.on('click', function (e) {
    navToggle(e);

    return false;
  });

  $navClose.on('click', function (e) {
    navClose(e);

    return false;
  });

});
