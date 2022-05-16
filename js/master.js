// JavaScript Document
// Author Name: Saptarang
// Themeforest: http://themeforest.net/user/saptarang?ref=saptarang
// Creation Date: 18 June, 2016

"use strict";

/******************************** MOBILE READY ********************************/
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/******************************** FUNCTIONS  ********************************/
// equal heights
function equalheight(container){
	var currentTallest = 0,
	currentRowStart = 0,
	rowDivs = new Array(),
	$el,
	topPosition = 0,
	topPostion = 0,
	currentDiv = 0;
	$(container).each(function() {
		$el = $(this);
		$($el).height('auto')
		topPostion = $el.position().top;
		
		if (currentRowStart != topPostion) {
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
			rowDivs.length = 0; // empty the array
			currentRowStart = topPostion;
			currentTallest = $el.height();
			rowDivs.push($el);
		} else {
			rowDivs.push($el);
			currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		}
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}
	});
}
//Function to animate slider captions 
function doAnimations( elems ) {
  var animEndEv = 'webkitAnimationEnd animationend'; //Cache the animationend event in a variable
  elems.each(function () {
	  var $this = $(this),
		  $animationType = $this.data('animation');
	  $this.addClass($animationType).one(animEndEv, function () {
		  $this.removeClass($animationType);
	  });
  });
}
// Expert info
function expertinfo() {
	var mem_hgt = $('.member').height();
	$('.member .info').stop(true, true).css({"height": mem_hgt, "top" : mem_hgt});
}
// vertical center align
function vCenterAlign(elm) {
	var parentHeight = $(elm).parent().height();
	var topVal = parentHeight/2;
	var elmWid = $(elm).width();
	var elmWidHalf = elmWid/2;
	$(elm).css({
		"margin-top": "-"+elmWidHalf+"px",
		"margin-left": "-"+elmWidHalf+"px",
		"top": topVal+"px"
	});
} 
// offer section parallax reset
function resetStellar() {
	var section = $('.offer');
	var secPosition = section.position();
	var curSecPos = section.position.top;
	setTimeout(function() {
		if( secPosition != curSecPos ){
			$(window).data('plugin_stellar').destroy();
			$(window).data('plugin_stellar').init();
			$(window).data('plugin_stellar').refresh();
			$.stellar('refresh');
		}	
	}, 0);
	
}
// menu edge filter when menu goes out of viewport
function menuEdgeFilter(elem) {
		var elm = $(elem).parent().find('ul.dropdown-menu');
		var off = elm.offset();
		var l = off.left;
		var w = elm.width();
		var docH = $("header").height();
		var docW = $("header").width();
		
		var isEntirelyVisible = (l + w <= docW);
		
		if( elm.length > 0 ) {
						
			if (!isEntirelyVisible) {
				$(elem).parent().addClass('edge');
				$(elem).parent().parent().addClass('edge');
			} else {
				$(elem).parent().removeClass('edge');
			}
			
		}
}



/******************************** DOM LOAD ********************************/
( function ( $ ) {
	
	//Preloader
	var preLodr = $('#preloader');
	if( preLodr.length > 0 ) {
		$('#preloader').fadeOut();
		$('.loading').delay(350).fadeOut('slow');  
		$('body').delay(350).css({'overflow':'visible'});
	}	
	  
	/* *************  window.scroll function ************* */
	$(window).on("scroll", function() {
		
		// Top Arrow
		if ($(window).scrollTop() > 1000) { 
			$('a.top').fadeIn('slow'); 
		} else { 
			$('a.top').fadeOut('slow');
		}
		
		// Megamenu top margin
		if( $('.header5').length > 0 ) {
			
			if( $(window).scrollTop() > 150 ) {
				var Headertop = $('.header-top').height();
				$('header.header5.affix').css('top', '-'+Headertop+'px');
			} else if( $(window).scrollTop() < 150 )  {
				var navbarHeader = $('.navbar-header').height();
				$('header.header5.affix').css('top', '0');
			}
		}
		
	});
		
	/* *************  window.load function ************* */
	$(window).on("load", function() {
	
		// VARIABLES
		var winW = $('body').width();
		var drpDown = $('.dropdown');
		var searchF = $('#search');
		var member = $('.member');
		var navTabs = $('.nav-tabs');
		var accordion = $('.panel');
		var formField = $('input, textarea, email, tel');
		var prettyPhoto = $("a[data-rel^='prettyPhoto']");
		var dtpicker = $('#datetimepicker');
		var svgAlign = $('.svg');
		var singleSlide = $('#slides').hasClass('singleSlide');
		var cfSlide = $('#cfSlide');
		var siteMap = $('.sitemap');
			
		// equal heights
		setTimeout(function() {
			equalheight('.listBox, .equal, .quote');
		}, 100);
		
		
		//counter
		setTimeout(function() {
			$('.stat').waypoint(function() {
				$('.timer').countTo({
					refreshInterval: 10
				});
			},  { offset:'90%'});
		}, 10);
		
		// sub menu for smaller width
		if( drpDown.length > 0 ) {
			$('.navbar-nav').on("mouseover", function(e) {
				if( $(e.target).is('a') && $(e.target).parent().hasClass('dropdown') ) {
					var ths = $(e.target);
					menuEdgeFilter(ths);
				}
			});
		}
	
		// Search form POP up
		if( searchF.length > 0 ) {
			$('a[href="#search"]').on('click', function(event) {                    
				$('#search').addClass('open');
				$('#search > form > input[type="search"]').focus();
			});       
			$('#search').on('click keyup', function(event) {
				if (event.target == this || event.keyCode === 27) {
					$('#search').removeClass('open');
				}
			});
			$('#search .close').on('click', function(event) { 
				$('#search').removeClass('open'); 
			});
		} // check if form exists
		
		// Collapse menu for small devices
		if (winW <= 767) {
			// smooth page Scroll
			$("a.top[href^=\\#], a.smooth[href^=\\#]").on("click", function(event) {
				event.preventDefault();
				$('html,body').animate({
					scrollTop: $(this.hash).offset().top - 470},
				1000);	
			});
		} else {
			// smooth page Scroll
			$("a.top[href^=\\#], a.smooth[href^=\\#]").on("click", function(event) {
				event.preventDefault();
				$('html,body').animate({
					scrollTop: $(this.hash).offset().top - 0},
				1000);	
			});
		}
		
		// init Isotope
		if( $('.grid') ) { 
			
			var $grid = $('.grid').isotope({
			  itemSelector: '.grid-item',
			  percentPosition: true,
			});
			
			// layout Isotope after each image loads
			$grid.imagesLoaded().progress( function() {
			  $grid.isotope('layout');
			});  
			
			// filter items on button click
			$('.button-group').on( 'click', 'button', function() {
			  var filterValue = $(this).attr('data-filter');
			  $grid.isotope({ filter: filterValue });
			});
			
			// change is-checked class on buttons
			$('.button-group').each( function( i, buttonGroup ) {
				var $buttonGroup = $( buttonGroup );
				$buttonGroup.on( 'click', 'button', function() {
					$buttonGroup.find('.active').removeClass('active');
					$( this ).addClass('active');
				});
			});
			
		}
		
		// Breadcrumbs margin top
		var Hom = $('#home');
		if( Hom ) {
			var hHeight = $('#home').outerHeight();
			//var headOpt5 = $('.header5').next();
			$('.breadcrumbs, #image-slider').not("#home.header4 + .breadcrumbs").css('margin-top', hHeight);	
		}

		// experts
		if( member ) {
			setTimeout(function() {
				expertinfo();
			}, 2000);
		}
		
		// Nav tab
		if( navTabs ) {
			$('.nav-tabs a').on("click", function (e) {
		  		e.preventDefault();
		  		$(this).tab('show');
				var cTab = $(this).attr('href');
				equalheight( $(cTab).find('.listBox') );
			});
			
			$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				equalheight('.listBox');
			});
		}
		
		// Accordion Symbols
		if( accordion ) {
			$('.panel-title a').on("click", (function() {
				var thisParent = $(this).parent().parent().next();
				if(thisParent.hasClass('in')) {
					$(this).parent().removeClass('active');
				} else {
					$('.panel-title').removeClass('active');
					$(this).parent().addClass('active');
				}
			}));
		}
		  
		if( formField ) {
			// Input placeholder in IE
			$('input, textarea').placeholder();
		}
		
		if( prettyPhoto ) {
			// Image Lightbox
			$("a[data-rel^='prettyPhoto']").prettyPhoto({overlay_gallery: true});
		}
		
		// Datepicker - Prefered contact
		if( dtpicker ) {
			$('#datetimepicker').datetimepicker({
				format:'m.d.Y H:i', //date format
				inline:false,
				lang:'en' // language
			});
		}
		
		// for parallax effect div position
		$('.button-group button').on( 'click', function(e) {
			e.preventDefault();
			resetStellar();
		});
		
		$('.servicesList .nav-tabs li a').on( 'click', function(e) {
			e.preventDefault();
			resetStellar();
		});
		
		// Slider Validation
		if( cfSlide.length > 0 ) {
			$( "#cfSlide" ).slider({
				value:1,
				min: 1,
				max: 30,
				step: 1,
				slide: function( event, ui ) {
					$( "#cfsVal" ).val( ui.value );
					var sval = $( "#cfsVal" ).val();
					if( sval == 30 ) {
						$('#cfSubmit').removeAttr("disabled");
					} else {
						$('#cfSubmit').attr('disabled', 'disabled');
					}
				}
			});
		}
		
		// SLIDER
		if ( singleSlide ) {
			// This is for single slide so dont change
			$('#slides').superslides({
				play: false,
			});
		} else {
			
			// multiple slide slideshow
			$('#slides').superslides({
				animation: 'fade',
				play: 9000, // change value if you want to increase or decrese speed
				animation_speed: 600 // change time interval during slide change
			});
		}
		
		// OWL CAROUSEL: Package
		$("#packageSlider").owlCarousel({
			autoPlay: false, //Set AutoPlay like 5000 
			items : 1,
			itemsDesktop : [1400,1],
			itemsDesktopSmall : [979,1],
			itemsTablet : [768,1],
			itemsMobile : [600,1],
			navigation : true, // Show next and prev buttons
			navigationText : ["<img class='svg' src='images/svg/arrow-left-w.svg' onerror='this.src='arrow-left-w.png' alt='Prev' />","<img class='svg' src='images/svg/arrow-right-w.svg' onerror='this.src='arrow-right-w.png'' alt='Next' />"],
			pagination: false
		});
		// OWL CAROUSEL: Single Services
		$("#serviceSlider").owlCarousel({
			autoPlay: false, //Set AutoPlay like 5000
			items : 3,
			itemsDesktop : [1400,3],
			itemsDesktopSmall : [979,2],
			itemsTablet : [768,2],
			itemsMobile : [600,1],
			navigation : true, // Show next and prev buttons
			navigationText : ["<img class='svg' src='images/svg/arrow-left-w.svg' onerror='this.src='arrow-left-w.png' alt='Prev' />","<img class='svg' src='images/svg/arrow-right-w.svg' onerror='this.src='arrow-right-w.png'' alt='Next' />"],
			pagination: false
		});
		// OWL CAROUSEL: testimonial
		$("#testimonial2").owlCarousel({
			autoPlay: false, //Set AutoPlay like 5000
			items : 2,
			itemsDesktop : [1400,2],
			itemsDesktopSmall : [979,2],
			itemsTablet : [768,1],
			itemsMobile : [600,1],
			navigation : true, // Show next and prev buttons
			navigationText : ["<img class='svg' src='images/svg/arrow-left-w.svg' onerror='this.src='arrow-left-w.png' alt='Prev' />","<img class='svg' src='images/svg/arrow-right-w.svg' onerror='this.src='arrow-right-w.png'' alt='Next' />"],
			pagination: false
		});
		// OWL CAROUSEL: Single Services
		$("#serviceSliderLanding").owlCarousel({
			autoPlay: false, //Set AutoPlay like 5000
			items : 5,
			itemsDesktop : [1400,5],
			itemsDesktopSmall : [979,2],
			itemsTablet : [768,2],
			itemsMobile : [600,1],
			navigation : true, // Show next and prev buttons
			navigationText : ["<img class='svg' src='images/svg/arrow-left-w.svg' onerror='this.src='arrow-left-w.png' alt='Prev' />","<img class='svg' src='images/svg/arrow-right-w.svg' onerror='this.src='arrow-right-w.png'' alt='Next' />"],
			pagination: false
		});
		// OWL CAROUSEL: Gallery slider
		$("#galSlider").owlCarousel({
			autoPlay: false, //Set AutoPlay like 5000
			items : 5,
			itemsDesktop : [1400,5],
			itemsDesktopSmall : [979,2],
			itemsTablet : [768,2],
			itemsMobile : [600,1],
			navigation : true, // Show next and prev buttons
			navigationText : ["<img class='svg' src='images/svg/arrow-left-w.svg' onerror='this.src='arrow-left-w.png' alt='Prev' />","<img class='svg' src='images/svg/arrow-right-w.svg' onerror='this.src='arrow-right-w.png'' alt='Next' />"],
			pagination: false
		});

		// center align hovered SVG icons
		if( svgAlign.length > 0 ) {
			// vertically align center
			setTimeout(function() {
				$('figure.grid-item figcaption > a.zoom .svg, .grid-item a.zoom .svg').each(function() {
					var ths = $(this);
					vCenterAlign(ths);	
				});
			}, 600);
			
			// Replace all SVG images with inline SVG
			$('img.svg').each(function(){
				var $img = $(this);
				var imgID = $img.attr('id');
				var imgClass = $img.attr('class');
				var imgURL = $img.attr('src');
				
				$.get(imgURL, function(data) {
					// Get the SVG tag, ignore the rest
					var $svg = $(data).find('svg');
					
					// Add replaced image's ID to the new SVG
					if(typeof imgID !== 'undefined') {
						$svg = $svg.attr('id', imgID);
					}
					// Add replaced image's classes to the new SVG
					if(typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass+' replaced-svg');
					}
					
					// Remove any invalid XML tags as per http://validator.w3.org
					$svg = $svg.removeAttr('xmlns:a');
					
					// Replace image with new SVG
					$img.replaceWith($svg);
					
				}, 'xml');
			});
		}
		
		// sitemap menu
		if( siteMap.length > 0 ) {
			$('ul.sitemap li.dropdown').each(function() {
				$(this).find('a').on("click", function(e) {
					e.preventDefault(); $(this).toggleClass('opened'); var opened = $(this).hasClass('opened');
					if( opened ) {
						$('ul.sitemap li').find('.dropdown-menu').slideUp(200); 
						$(this).parent().find('.dropdown-menu').slideDown(200);
					} else { $('ul.sitemap li').find('.dropdown-menu').slideUp(200); }
				});
			});
		}
	});
	
	// Slider option 3
	var carousel = $('.carousel');
	if( carousel ) {
		
		// initialize #image-slider carousel
		$('#image-slider.carousel').carousel({
			interval: 5000 // slideshow speed
		});
		
		// Testimonials
		$('#testimonial.carousel').carousel({
			interval: 5000 // slideshow speed
		});
		
		// Slider option 3
		$('#post-slider.carousel').carousel({
			interval: 5500 // slideshow speed
		});
		
		
		//Variables on page load 
		var $myCarousel = $('#image-slider'),
			$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
					
		//Initialize carousel 
		$myCarousel.carousel();
		
		//Animate captions in first slide on page load 
		doAnimations($firstAnimatingElems);
		
		//Pause carousel  
		$myCarousel.carousel('pause');
		
		//Other slides to be animated on carousel slide event 
		$myCarousel.on('slide.bs.carousel', function (e) {
			var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
			doAnimations($animatingElems);
		});
		
	}
	
	
	/* *************  window.resize function ************* */
	$(window).on("resize", function() {
		
		// VARIABLES
		var winW = $('body').width();
		var drpDown = $('.dropdown');
		var searchF = $('#search');
		var member = $('.member');
		var carousel = $('.carousel');
		var navTabs = $('.nav-tabs');
		var accordion = $('.panel');
		var formField = $('input, textarea, email, tel');
		var prettyPhoto = $("a[data-rel^='prettyPhoto']");
		var dtpicker = $('#datetimepicker');
		var svgAlign = $('.svg');
		var singleSlide = $('#slides').hasClass('singleSlide');
		var cfSlide = $('#cfSlide');
		var siteMap = $('.sitemap');

		// equal heights
		equalheight('.listBox, .equal, .quote');
		
		// sub menu for smaller width
		if( drpDown.length > 0 ) {
			$('.navbar-nav').find('ul, li').removeClass('edge'); // removing edge class on resize altogether
			$('.navbar-nav').on("mouseover", function(e) {
				if( $(e.target).is('a') && $(e.target).parent().hasClass('dropdown') ) {
					var ths = $(e.target);
					menuEdgeFilter(ths);
				}
			});
		}
		
		// center align hovered SVG icons
		if( svgAlign.length > 0 ) {
			// vertically align center
			setTimeout(function() {
				$('figure.grid-item figcaption > a.zoom .svg, .grid-item a.zoom .svg').each(function() {
					var ths = $(this);
					vCenterAlign(ths);	
				});
			}, 600);
		}
	
	});	
	
	// stellar js for parallax
	if( !isMobile.any() ){
        $(window).stellar({
			horizontalScrolling: false,
			responsive: true
		});
    }

	// Subscription Form
	var scForm = $('#subscribeForm');
	if( scForm.length > 0 ) {
		$("#sub-submit").on("click", function() { 
			var proceed = true;
			var output = '';
			$("#subscribeForm input[required]").each(function(){
				var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
				if( $(this).attr("type")=="email" && !email_reg.test( $.trim( $(this).val() ) ) ){
					$(this).css('border-color','red'); 
					proceed = false;              
				}   
			});
			if( proceed ){
				var post_data = {
				'emailSubscribe' : $('input[name=emailSubscribe]').val(),
				'sub-security'   : $('input[name=sub-security]').val(),
				'domain'		 : $(location).attr('href')
			}
			
			//Ajax post data to server
			$.post('form/subscribe.php', post_data, function(response){  
				if(response.type == 'error'){ 
					//load json data from server and output message     
					output = '<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+response.text+'</div>';
				}else{
					output = '<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+response.text+'</div>';
					//reset values in all input fields
					$("#subscribeForm  input[required=true]").val(''); 
					$("#subscribeForm").slideUp(); //hide form after success
				}
					$(".scfs_response").hide().html(output).slideDown();
				}, 'json');
			}
		});
		
		//reset previously set border colors and hide all message on .keyup()
		$("#subscribeForm  input[required=true]").keyup(function() { 
			$(this).css('border-color',''); 
			$(".scfs_response").slideUp();
		});
	}
		
	// Contact form
	var cForm = $('#cForm');
	if( cForm.length > 0 ) {
		$("#cfSubmit").on("click", function() { 
			var proceed = true;
			var output = '';
			$("#cForm input[required], #cForm textarea[required]").each(function(){
				$(this).css('border-color',''); 
				if( !$.trim( $(this).val() ) ){ 
					$(this).css('border-color','red');  
					proceed = false;
				}
				var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
				if( $(this).attr("type")=="email" && !email_reg.test( $.trim( $(this).val() ) ) ){
					$(this).css('border-color','red'); 
					proceed = false;              
				}   
			});
			if( proceed ){
				var post_data = {
				'name'     		: $('input[name=name]').val(), 
				'email'    		: $('input[name=email]').val(), 
				'phone'  		: $('input[name=phone]').val(),
				'datetimepicker': $('input[name=datetimepicker]').val(),
				'message'       : $('textarea[name=message]').val(),
				'domain'		: $(location).attr('href')
			}
			
			//Ajax post data to server
			$.post('form/contact.php', post_data, function(response){  
				if(response.type == 'error'){ 
					//load json data from server and output message     
					output = '<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+response.text+'</div>';
				}else{
					output = '<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+response.text+'</div>';
					//reset values in all input fields
					$("#cForm  input[required=true], #cForm textarea[required=true]").val(''); 
					$("#cForm").slideUp(); //hide form after success
				}
					$(".cfs_response").hide().html(output).slideDown();
				}, 'json');
			}
		});
		
		//reset previously set border colors and hide all message on .keyup()
		$("#cForm  input[required=true], #cForm textarea[required=true]").keyup(function() { 
			$(this).css('border-color',''); 
			$(".cfs_response").slideUp();
		});
	}

		
} ( jQuery ) );