var noop = function () {};

$(function () {

  // settings

  var navHoverEnabled = true;
  var timeout = 250;

  //// selectors

  var nonNavSelector = '.andrz-nonnav';
  var navToggleSelector = '.andrz-nav-toggle';

  var $navRoot =$('html');
  var $nonNav = $(nonNavSelector);
  var $navToggle = $(navToggleSelector);

  // methods

  //// close

  var navClose = function (e) {
    $navRoot.removeClass('andrz-nav-opened');

    if (navHoverEnabled) {
      $nonNav.off('mouseenter', navCloseTimeout);
      $nonNav.off('mouseleave', navCloseCancel);
    }

    return false;
  };

  var navCloseTimeout = function (e) {
    $(this).doTimeout('nav-close', timeout, function () {
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

    if (navHoverEnabled) {
      $nonNav.on('mouseenter', navCloseTimeout);
      $nonNav.on('mouseleave', navCloseCancel);
    }

    return false;
  };

  var navOpenTimeout = function (e) {
    $(this).doTimeout('nav-open', timeout, navOpen);

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

  var navToggleTimeout = function (e) {
    if (navIsOpen()) {
      navCloseTimeout();
    }
    else {
      navOpenTimeout();
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

  if (navHoverEnabled) {
    $navToggle.on('mouseenter', navToggleTimeout);
    $navToggle.on('mouseleave', navToggleCancel);
  }

  //// click

  $navToggle.on('click', function (e) {
    navToggle(e);

    return false;
  });

});
