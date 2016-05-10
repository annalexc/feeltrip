$(function(){
  console.log("I've landed!");
  
  var fade = setInterval(function(){
    if (($('.hidden').length) === 0){
      clearInterval(fade);
    }
    else{
    fadeIn();
  }
  }
  ,200);
});







function fadeIn(){
  

  var places = $('.place');
  i = Math.floor(Math.random()*(places.length));
  console.log(i);

  while( !($(places[i]).hasClass('hidden')) ){
    i = Math.floor(Math.random()*(places.length));
  }
  $(places[i]).fadeIn(500, function(){
    $(places[i]).removeClass('hidden')
  }).css({
    'display' : '-webkit-flex',
    'display' : 'flex' 
  });

  
}
