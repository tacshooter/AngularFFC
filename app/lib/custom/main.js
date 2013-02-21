 $(document).ready(function(){

    // Home page Slider ==================================================

    JBFWS = new JBFWS();
    JBFWS.init({
        /* Slider Width & Height */
        width            : "100%",
        height           : "360px",
        
        /* Buttons settings */
        showBigButtons   : 1,  /* 0 - Hide, 1 - Show */
        showSmallButtons : 1,  /* 0 - Hide, 1 - Show */
            
        /* Main Slide */
        slideSpeed       : 1000, /* miliseconds */
        slideEffect      : "easeInOutExpo",
            
        /* Secondary Slide */
        slideDelay       : 600,  /* miliseconds. 0 - Off */
        slideSpeed2      : 1000, /* miliseconds. 0 - Off */
        slideEffect2     : "easeOutExpo",
        
        /* Drag Slide */
        dragSlide        : 1, /* 0 - Off, 1 - On */
        
        /* Auto Slide */
        autoSlide        : 1,   /* 0 - Off, 1 - On */
        autoSlideDelay   : 6000 /* miliseconds */
    });



    // Login / Create account Overlay ===================================

   
    jQuery(".jackbox[data-group]").jackBox("init", {
        deepLinking: false
    });




    // Event Navigation Custom Drop Down =============================================

    $('select#event_navigation').customSelect();


    $('select#event_navigation').change(function(){
        if($(this).val() != 'na') {
            window.location = $(this).val();
        }
    });

     // Sidebar Showing and hiding ======================================================
// 750 225
     $('#show_hide_sidebar').toggle(function(){
        if (!$(':animated').length){
           $('#auction_sidebar').fadeOut('fast', function(){
                $('#auction_left').animate({width: 975});
           });
        }
     }, function(){
        if (!$(':animated').length){
           $('#auction_left').animate({width: 750}, function(){
            $('#auction_sidebar').fadeIn('fast');
           });
        }
     });



     // Side bar help section =========================================================

     $('#help_hide').toggle(function(){
        if (!$(':animated').length){
           $('#sidebar_help').fadeIn('fast');
        }
     }, function(){
        if (!$(':animated').length){
           
            $('#sidebar_help').fadeOut('fast');
           
        }
     });

     

    // Event overview progress goal indicator =========================================

    $(".knob").knob();


    // Adjusting width for divs with a num wrap

    $('.num_wrap').each(function(){
        var newwidth = $(this).width();
        $(this).width(newwidth-8);

    });


    // Lowers Opacity of all disabled states 

    $("input:disabled").css('opacity', .3);

    // Adds another email input to the share form
    var input_count = 1;
    $('#add_another_email').click(function(){

        if(input_count < 4){
            input_count ++;
            $('#share_emails').append('<input type="text"/>');
            
        }else {
            $(this).hide();
        }

        return false;
    });

    // Simple Tabs for Sponsors
    $('#sponsor_tabs div.sponsor_section').hide();
    $('#sponsor_tabs div.sponsor_section:first').show();
    $('#sponsor_tabs ul li:first').addClass('active');
     
    $('#sponsor_tabs ul li a').click(function(){
        $('#sponsor_tabs ul li').removeClass('active');
        $(this).parent().addClass('active');
        var currentTab = $(this).attr('href');
        $('#sponsor_tabs div.sponsor_section').hide();
        $(currentTab).show();
        return false;
    });


    // Navigation DropDown 

    var maxHeight = 400;

    $(".dropdown > li").hover(function() {
    
         var $container = $(this),
             $list = $container.find("ul"),
             $anchor = $container.find("a"),
             height = $list.height() * 1.1,       // make sure there is enough room at the bottom
             multiplier = height / maxHeight;     // needs to move faster if list is taller
        
        // need to save height here so it can revert on mouseout            
        $container.data("origHeight", $container.height());
        
        // so it can retain it's rollover color all the while the dropdown is open
        $anchor.addClass("hover");
        
        // make sure dropdown appears directly below parent list item    
        $list
            .show()
            .css({
                paddingTop: $container.data("origHeight")
            });
        
        // don't do any animation if list shorter than max
        if (multiplier > 1) {
            $container
                .css({
                    height: maxHeight,
                    overflow: "hidden"
                })
                .mousemove(function(e) {
                    var offset = $container.offset();
                    var relativeY = ((e.pageY - offset.top) * multiplier) - ($container.data("origHeight") * multiplier);
                    if (relativeY > $container.data("origHeight")) {
                        $list.css("top", -relativeY + $container.data("origHeight"));
                    };
                });
        }
        
    }, function() {
    
        var $el = $(this);
        
        // put things back to normal
        $el
            .height($(this).data("origHeight"))
            .find("ul")
            .css({ top: 0 })
            .hide()
            .end()
            .find("a")
            .removeClass("hover");
    
    });
    
    // Add down arrow only to menu items with submenus
    $(".dropdown > li:has('ul')").each(function() {
        $(this).find("a:first").append("<img src='./img/nav_down.png' class='nav_down' />");
    });



    // datepicker initialization

    $('.datepicker').datetimepicker({
        minDate: 0,
        timeFormat: "hh:mm tt"
    });

    // WYSIWYG Editors

    $('textarea.wysiwyg').htmlarea({
        toolbar: [
                    ["bold", "italic", "underline", "|", "forecolor"],
                    ["p", "h1", "h2", "h3"]                    
                    
                ]

    });

    // Silent Auction Custom Ammount

    // Getting the Selects value and show/hiding extra fields based on selection DEMO

    $('.silent_bid_value').change(function(){

        if($('option:selected', this).val() == 'custom_value') {
            $(this).width(100);
            $(this).parent().children('.custom_silent_value').show();
        }else {
            $(this).parent().children('.custom_silent_value').hide();
            $(this).width(200);
        }
        
        return false; 
        
    });

    // Placeholder on input fields
    $('[placeholder]').focus(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
          }
        }).blur(function() {
          var input = $(this);
          if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
          }
    }).blur();
                
            







});