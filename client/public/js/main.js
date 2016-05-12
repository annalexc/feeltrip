// These are scripts specifically for the main.ejs page

$(function(){
  console.log("I've landed!");
  setPlaceBackground();
  setPlaceBackgroundFade();
  
  var fade = setInterval(function(){
    if (($('.hidden').length) === 0){
      clearInterval(fade);
    } else {
    fadeIn();
    }
  },100);

});

function setPlaceBackground(){
  var places = $('.menu-box ');
  //<div style="background-image: url(http://i54.tinypic.com/4zuxif.jpg)"></div>

  // $places.on('mouseenter', function(){
  //   var img = $(this).find('span').text();
  //   img = img.toLowerCase().replace(' ', '-');
  //   $(this).fadeIn().css({
  //   'background-image' : 'url(/images/' + img +'.jpg)',
  //   'background-size' : 'cover',
  //   'transition'  : 'all 0.5s ease'
  //   });
  // })

  for(var i = 0; i < places.length; i++){
    var img = $(places[i]).find('span').text();
    img = img.toLowerCase().replace(' ', '-');
    console.log(img);
    $(places[i]).find('.bg').attr('style', 'background:url(/images/' + img +'.jpg);background-size:cover');
  };

  // $('body').css('background-image', 'url(/images/' + place +'.jpg)');
};

function setPlaceBackgroundFade(){
  $(".menu-box").hover(function() {
    $(this).find('.bg').fadeIn();
  }, function() {
    $(this).find('.bg').fadeOut();
  });
}





function fadeIn(){
  var places = $('.place');
  i = Math.floor(Math.random()*(places.length));
  while( !($(places[i]).hasClass('hidden')) ){
    i = Math.floor(Math.random()*(places.length));
  };
  $(places[i]).fadeIn(700, function(){
    $(places[i]).removeClass('hidden')
  }).css({
    'display' : '-webkit-flex',
    'display' : 'flex' 
  });
};
