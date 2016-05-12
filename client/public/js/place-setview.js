$(function(){
 setBodyBackground();
 refreshHandler();
 displayMenuItemDesc();
 findHashTags();
 findScreenNames();
});

function setBodyBackground(){
  var place;
  var hashes = window.location.href.slice(window.location.href.indexOf('place/') + 6).split('?');
  place = hashes[0];
  // console.log(place);
  $('body').css('background-image', 'url(/images/' + place +'.jpg)');
};

function refreshHandler(){
  var $tweetsRefreshed = $('#tweets-refreshed');
  var $save = $('#save');
  var $disabledSave = $('#disabled-save');
  var hashes = window.location.href.slice(window.location.href.indexOf('place/') + 6).split('?');
  if(hashes[1]){
    // $tweetsRefreshed.fadeIn(500, function(){
      $tweetsRefreshed.removeClass('hidden');
      $disabledSave.addClass('hidden');
      $save.removeClass('hidden');
    // });
  };
};


// Find all hashtags in place page and replace them with links
hashtag_regexp = /#([a-zA-Z0-9]+)/g;

function findHashTags(){
  $('.tweet-text').each(function() {
    $(this).html(addLinkToHashtags($(this).html()));
  });
};

function findScreenNames(){
  $('.screen-name').each(function() {
    $(this).html(addLinkToScreenNames($(this).html()));
  });
};

function addLinkToHashtags(text){
  hashtag_regexp = /#([a-zA-Z0-9]+)/g;
  return text.replace(
    hashtag_regexp,
      '<a class="dark-mint hashtag" target="_blank" href="http://twitter.com/search?q=%23$1">#$1</a>'
  );
};

function addLinkToScreenNames(text){
  screen_name_regexp = /@([a-zA-Z0-9_]+)/g;
  return text.replace(
    screen_name_regexp,
      '<a class="dark-mint screen-name" target="_blank" href="http://twitter.com/$1">@$1</a>'
  );
};

function displayMenuItemDesc(){
  var $refresh = $('#refresh');
  var $save = $('#save');
  var $logout = $('.logout');
  var $navDesc = $('#nav-desc');
  $refresh.hover(
    function(){$navDesc.text('Refresh Data');}, function(){$navDesc.text('');}
  );

  $save.hover(
    function(){$navDesc.text('Save Snapshot');}, function(){$navDesc.text('');}
  );

  $logout.hover(
    function(){$navDesc.text('Log Out');}, function(){$navDesc.text('');}
  );
};
