'use strict';

$(function() {
  /*
   * News Code
   */
  $.ajax({
    dataType: 'json',
    url: '/news'
  }).done(function(result) {
    var newsJSON = JSON.parse(result);

    $.each(newsJSON.data, function(i, newsItem) {
      $('.content__news-container').append(
        '<li class="content__news-item">' +
        '  <p class="content__news-title">' + newsItem.title + '</p>' +
        '  <p class="content__news-date">' + newsItem.date_submitted + '</p>' +
        '  <p class="content__news-blurb">' + newsItem.blurb + '</p>' +
        '</li>'
      );
    });

    $('.content__news-item').css({
      'opacity': 0,
      'marginTop': '25px'
    });

    var funcs = {};
    for (var i = 0; i < newsJSON.count; i++) {
      funcs[i] = function(x) {
        setTimeout(function() {
          $('.content__news-item').eq(x).animate({
            'opacity': 1,
            'marginTop': 0
          }, 500);
        }, 1000 + (x * 500));
      }.bind(this, i);
    }
    for (var j = 0; j < newsJSON.count; j++) {
        funcs[j]();
    }
  });



  /*
   * Gallery Code
   */
  var currGalleryItem = 0;

  $.ajax({
    dataType: 'json',
    url: '/gallery'
  }).done(function(result) {
    var galleryJSON = JSON.parse(result);

    $.each(galleryJSON.data, function(i, galleryItem) {
      $('.content__photos-container').append(
        '<li class="content__photos-item">' +
        '  <a class="content__photos-link"' +
        '     data-toggle="modal"' +
        '     data-target="#galleryModal"' +
        '     data-item-src="' + galleryItem.src + '"' +
        '     data-item-caption="' + galleryItem.caption + '">' +
        '    <img src="' + galleryItem.src + '">' +
        '    <span class="content__photos-caption">' + galleryItem.caption + '</span>' +
        '  </a>' +
        '</li>'
      );
    });

    resizeGallery();
    updateControls();
  });

  var resizeGallery = function() {
    var containerWidth = $('.content__photos').width(),
        itemCount = $('.content__photos-item').length;

    $('.content__photos-container').width(containerWidth * itemCount);
    $('.content__photos-item').width(containerWidth);
  };

  var updateControls = function() {
    $('.content__photos-chevron--prev').show();
    $('.content__photos-chevron--next').show();

    if (currGalleryItem === 0) {
      $('.content__photos-chevron--prev').hide();
    }

    if (currGalleryItem >= $('.content__photos-item').length - 1) {
      $('.content__photos-chevron--next').hide();
    }
  };

  var animateTransition = function() {
    var containerWidth = $('.content__photos').width(),
        finalPos = containerWidth * currGalleryItem;

    $('.content__photos-container').animate({
      marginLeft: - (containerWidth * currGalleryItem) + 'px'
    }, 1500);
  };

  $('.content__photos-container').on('click', '.content__photos-link', function() {
    console.log('Gallery item clicked');
  });

  $('.content__photos-chevron').on('click', function() {
    if ($(this).hasClass('content__photos-chevron--prev')) {
      currGalleryItem --;
    } else if ($(this).hasClass('content__photos-chevron--next')) {
      currGalleryItem ++;
    }

    animateTransition();

    updateControls();
  });

  $('#galleryModal').on('show.bs.modal', function(event) {
    var triggerEl = $(event.relatedTarget),
        modal = $(this);

    modal.find('.modal-title').text(triggerEl.data('item-caption'));
    modal.find('.modal-body > .modal-body__image').attr('src', triggerEl.data('item-src'));
  });

  $(window).on('resize', function(e) {
    resizeGallery();
  });



  /*
   * Contact Information Code
   */
  var globeFramesCount = 12,
      currGlobeIndex = 1;

  setInterval(function() {
    $('.contact > h4 > .globe > img').attr({
      'src': './images/earth-frame-' + currGlobeIndex + '.png'
    });
    currGlobeIndex++;
    if (currGlobeIndex > globeFramesCount) {
      currGlobeIndex = 1;
    }
  }, 250);

  $('.address-popover[data-toggle="popover"]').popover({ html: true });
});
