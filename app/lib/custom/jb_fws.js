function JBFWS() {
    
    var glob = {
        curSlide : 0,
        xStop    : null,
        xStart   : null
    }
    
    this.init = function(params){
        glob.params = params;
        
        if (glob.params.showBigButtons == 0) {
            $(".JB_Button_Left_BG,  .JB_Button_Left").remove();
            $(".JB_Button_Right_BG, .JB_Button_Right").remove();
        }
        
        
        $(".JB_FWS, .JB_Slide, .JB_Container").height(glob.params.height);
        $(".JB_Slide_Content").height($(".JB_FWS").height() - 30);
        $(".JB_FWS").width(glob.params.width);
        
        container.setWidth();
        container.setBackgrounds();
        control.pagination();
        control.bindControls();
        control.dragSlide();
        control.mobileSlide();
        control.autoSlide();
        display.bindControls();
    }
    
    var container = {
        setWidth : function(){
            $(".JB_Container").width($(".JB_Slide").length * display.width());
            $(".JB_Slide").width(display.width());
            $(".JB_Container").stop().css({left: -glob.curSlide * display.width()});
        },
        setBackgrounds : function(){
            /* Set slides background */
            $(".JB_Slide > img[name=background]").each(function(i){
                var source = $(this).attr("src");
                $(this).after($('<div></div>').css({
                    backgroundImage: "url('"+source+"')",
                    width: "100%",
                    height:"100%",
                    backgroundRepeat:"repeat",
                    position: "absolute"
                }));
                $(this).remove();
            });
        }
    }
    
    var display = {
        bindControls: function(){
            $(window).on("resize", function(){
                container.setWidth();
            });
        },
        width: function(){
            return $(".JB_FWS").width();
        }
    }
    
    var control = {
        bindControls: function(){
            
            $(".JB_ReadMore a").on("mouseover", function(){
                $(this).parent().find(".JB_ReadMore_BG").stop().animate({
                    opacity:1
                }, 200);
            });
            $(".JB_ReadMore a").on("mouseout", function(){
                $(this).parent().find(".JB_ReadMore_BG").stop().animate({
                    opacity:0.44
                }, 200); 
            });
            
            if (glob.params.showBigButtons == 1) {
                $(".JB_Button_Right").on("click", function(){
                    control.next();
                });
                $(".JB_Button_Left").on("click", function(){
                    control.prev();
                });
                $(".JB_Button_Right").on("mouseover", function(){
                    $(".JB_Button_Right_BG").stop().animate({
                        opacity: 1
                    }, 200);
                });
                $(".JB_Button_Right").on("mouseout", function(){
                    $(".JB_Button_Right_BG").stop().animate({
                        opacity: 0.44
                    }, 200);
                });
                $(".JB_Button_Left").on("mouseover", function(){
                    $(".JB_Button_Left_BG").stop().animate({
                        opacity: 1
                    }, 200);
                });
                $(".JB_Button_Left").on("mouseout", function(){
                    $(".JB_Button_Left_BG").stop().animate({
                        opacity: 0.44
                    }, 200);
                });
            }
          
            if (glob.params.showSmallButtons == 1) {
                $(".JB_Page").on("click", function(){
                    if ($(this).hasClass("active")) {
                        return;
                    }
                    var dir;
                    $(".JB_Page").removeClass("active");
                    $(this).addClass("active");

                    if ($(this).index() > glob.curSlide) {
                        dir = "prev";
                    } else {
                        dir = "next"
                    }
                    glob.curSlide = $(this).index();
                    control.slideTo(dir);
                });
            }
        },
        dragSlide: function(){
          
          if (glob.params.dragSlide == 0) return;
          
          /* Extends BindControls */
          $(".JB_Container").draggable({
                axis: "x",
                start: function(event, ui){
                    $(".JB_Container").stop();
                    glob.xStart = ui.offset.left
                },
                stop: function(event, ui){
                    glob.xStop = ui.offset.left
                    
                    if (glob.xStart > glob.xStop) {
                        
                        if (glob.curSlide + 1 >= $(".JB_Slide").length) {
                            $(".JB_Container").stop().animate({
                                left: -glob.curSlide * display.width()
                            }, 1000, "easeOutElastic");
                            return;
                        }
                        
                        glob.curSlide++;
                        $(".JB_Container").stop().animate({
                            left: -glob.curSlide * display.width()
                        }, 750, "easeOutExpo");
            
                        $(".JB_Page").removeClass("active");
                        $(".JB_Page:eq("+glob.curSlide+")").addClass("active");
                    } else {
                        
                        if (glob.curSlide <= 0) {
                            glob.curSlide = 0;
                            $(".JB_Container").stop().animate({
                                left: -glob.curSlide * display.width()
                            }, 1000, "easeOutElastic");
                            return;
                        }
                        
                        glob.curSlide--;
                        $(".JB_Container").stop().animate({
                            left: -glob.curSlide * display.width()
                        }, 750, "easeOutExpo");
            
                        $(".JB_Page").removeClass("active");
                        $(".JB_Page:eq("+glob.curSlide+")").addClass("active");
                    }
                }
            });
        },
        
        mobileSlide: function(){
            if (glob.params.dragSlide == 0) return;
            $(".JB_Container").on("touchstart", function(e){
                glob.xStart = e.originalEvent.touches[0].pageX;
            });
            $(".JB_Container").on("touchmove", function(e){
                glob.xStop = e.originalEvent.touches[0].pageX;
            });
            $(".JB_Container").on("touchend", function(e){
                if (glob.xStart > glob.xStop) {
                    if (glob.curSlide + 1 >= $(".JB_Slide").length) {return;}
                    glob.curSlide++;
                    $(".JB_Container").stop().animate({
                        left: -glob.curSlide * display.width()
                    }, 750, "easeOutExpo");
                    $(".JB_Page").removeClass("active");
                    $(".JB_Page:eq("+glob.curSlide+")").addClass("active");
                } else {
                    if (glob.curSlide <= 0) {
                        glob.curSlide = 0;
                        return;
                    }
                    glob.curSlide--;
                    $(".JB_Container").stop().animate({
                        left: -glob.curSlide * display.width()
                    }, 750, "easeOutExpo");
                    $(".JB_Page").removeClass("active");
                    $(".JB_Page:eq("+glob.curSlide+")").addClass("active");
                }
            });
        },
        
        pagination: function(){
            if (glob.params.showSmallButtons == 1) {
                var pages = $(".JB_Slide").length;
                var i = 0;
                while (i < pages) {
                    $('<div class="JB_Page"></div>').appendTo(".JB_Pages");
                    i++;
                }
                $(".JB_Page").removeClass("active");
                $(".JB_Page:eq("+glob.curSlide+")").addClass("active");
            }
        },
        next: function(){
            if (glob.curSlide + 1 >= $(".JB_Slide").length) {
                /* Rewind */
                glob.curSlide = 1;
                control.prev();
                return;
            }
           
            glob.curSlide++;
            $(".JB_Container").stop().animate({
                left: -glob.curSlide * display.width()
            }, glob.params.slideSpeed, glob.params.slideEffect);
            
            $(".JB_Page").removeClass("active");
            $(".JB_Page:eq("+glob.curSlide+")").addClass("active");
            
            if (glob.params.slideDelay == 0 || glob.params.slideSpeed2 == 0) {return;}
            
            $(".JB_Slide:eq("+glob.curSlide+")").find(".JB_Slide_Content").css({
                left: display.width()
            });
            
            $(".JB_Slide:eq("+glob.curSlide+")").find(".JB_Slide_Content").delay(glob.params.slideDelay).animate({
                left:0
            }, (glob.params.slideSpeed2), glob.params.slideEffect2);
        },
        prev: function(){
            if (glob.curSlide == 0){return;}
            
            glob.curSlide--;
            $(".JB_Container").stop().animate({
                left: -glob.curSlide * display.width()
            }, glob.params.slideSpeed, glob.params.slideEffect);
            
            $(".JB_Page").removeClass("active");
            $(".JB_Page:eq("+glob.curSlide+")").addClass("active");
            
            if (glob.params.slideDelay == 0 || glob.params.slideSpeed2 == 0) {return;}
            
            $(".JB_Slide:eq("+glob.curSlide+")").find(".JB_Slide_Content").css({
                left: -1 * display.width()
            });
            
            $(".JB_Slide:eq("+glob.curSlide+")").find(".JB_Slide_Content").delay(glob.params.slideDelay).animate({
                left:0
            }, (glob.params.slideSpeed2), glob.params.slideEffect2);
        },
        slideTo: function(dir){
            $(".JB_Container").stop().animate({
                left: -glob.curSlide * display.width()
            }, glob.params.slideSpeed, glob.params.slideEffect);
            
            $(".JB_Slide:eq("+glob.curSlide+")").find(".JB_Slide_Content").css({
                left: dir == "next" ? -1 * display.width() :  display.width()
            });
            
            $(".JB_Slide:eq("+glob.curSlide+")").find(".JB_Slide_Content").delay(glob.params.slideDelay).animate({
                left:0
            }, (glob.params.slideSpeed2), glob.params.slideEffect2);
        },
        autoSlide: function(){
            if (glob.params.autoSlide == 0 ) return;
            var interval = setInterval(function(){
                control.next();
            }, glob.params.autoSlideDelay + glob.params.slideSpeed);
            $(".JB_FWS").on("mouseover", function(){clearInterval(interval);});
            $(".JB_FWS").on("mouseout", function(){
                clearInterval(interval); 
                interval = setInterval(function(){
                    control.next();
                }, glob.params.autoSlideDelay + glob.params.slideSpeed);
            });
        }
    }
}