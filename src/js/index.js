var noop = function () {};

$(function () {

  // settings

  var isHoverOpenButtonEnabled = true;
  var isHoverCloseButtonEnabled = false;
  var isHoverOutsideCloseEnabled = true;
  var navOpenTimeout = 250;
  var navCloseTimeout = 600;

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

  // methods

  //// close

  var navClose = function (e) {
    $navRoot.removeClass('andrz-nav-opened');

    if (isHoverOutsideCloseEnabled) {
      $nav.off('mouseenter', navCloseCancel);
      $nav.off('mouseleave', navCloseAfterTimeout);
      // $nonNav.off('mousemove', navCloseAfterTimeout);
    }

    return false;
  };

  var navCloseAfterTimeout = function (e) {
    $(this).doTimeout('nav-close', navCloseTimeout, function () {
      navClose(e);
    });

    return false;
  };

  var navCloseCancel = function (e) {
    $(this).doTimeout('nav-close');
  };

  //// open

  var navOpen = function (e) {
    $navRoot.addClass('andrz-nav-opened');

    if (isHoverOutsideCloseEnabled) {
      $nav.on('mouseenter', navCloseCancel);
      $nav.on('mouseleave', navCloseAfterTimeout);
      // $nonNav.on('mousemove', navCloseAfterTimeout);
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
