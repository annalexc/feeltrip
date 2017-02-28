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
  },150);

});

function setPlaceBackground(){
  var places = $('.menu-box ');
  for(var i = 0; i < places.length; i++){
    var img = $(places[i]).find('span').text();
    img = img.toLowerCase().replace(' ', '-');
    console.log(img);
    $(places[i]).find('.bg').attr('style', 'background:url(/images/' + img +'-small.jpg);background-size:cover');
  };
};


function setPlaceBackgroundFade(){
  $(".menu-box").hover(function() {
    $(this).find('.bg').fadeIn();
  }, function() {
    $(this).find('.bg').fadeOut();
  });
};


function fadeIn(){
  var places = $('.place');
  i = Math.floor(Math.random()*(places.length));
  while( !($(places[i]).hasClass('hidden')) ){
    i = Math.floor(Math.random()*(places.length));
  };
  $(places[i]).fadeIn(800, function(){
    $(places[i]).removeClass('hidden')
  }).css({
    'display' : '-webkit-flex',
    'display' : 'flex' 
  });
};
