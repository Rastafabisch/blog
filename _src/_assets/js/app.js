
//=require ../../../node_modules/webcomponents.js/CustomElements.js
//=require ../../../node_modules/svg4everybody/svg4everybody.js
//=require ../../../node_modules/jquery/dist/jquery.js
//=require ../../../node_modules/masonry-layout/dist/masonry.pkgd.js
//=require ../../../node_modules/imagesloaded/imagesloaded.js
//=require ../../../bower_components/time-elements/time-elements.js
//=require ../../../bower_components/simple-jekyll-search/dest/jekyll-search.js

//
// include modules
//
//=include _menu.js
//=include _search.js

jQuery(function($) {

    //
    // init modules
    //
    Menu.init();
    Search.init();

});
