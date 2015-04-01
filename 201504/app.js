// Initialize Swiper
$(document).ready(function () {

    var isOK = false;
    var preload;
    var currentIndex = 0;
    var mySwiper;

    function init() {
        // Create a new queue.
        preload = new createjs.LoadQueue(true, "imgs/");

        var plugin = {
            getPreloadHandlers: function () {
                return {
                    extensions: ["svg","mp3","png"],
                    callback: function (item) {
                        var id = item.src.toLowerCase().split("/").pop().split(".")[0];
                        $("#"+id).attr("src", item.src);
                    }
                };
            }
        };

        preload.installPlugin(plugin);
        preload.loadManifest(["bg.jpg",
            "page-01.png",
            "page-01-button.svg",
            "page-02.jpg",
            "brands.svg",
            "brands-bg.png"

        ]);
        preload.on("complete", handleComplete);
        preload.on("progress", handleOverallProgress);

    }

    function handleOverallProgress(event) {
        console.log(preload.progress);
        $('#loading-percent').html(Math.round(preload.progress * 100));
    }

    function handleComplete(event) {
        overLoading();

    }

    function overLoading(){

        $('#main-content').show();

        $('#loading').addClass("animated bounceOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $("#loading").removeClass("animated bounceOut");
            hideOpacity($("#loading"));
            $('#main-content').css('opacity', '1');
            initSwiper();
            initLink();
            initModal();
            showHideBlock();
            $('body').css('background-image', 'url(imgs/page-02.jpg)');

        });
    }


    hideSlide();
    $('#main-content').css('opacity', '0');
    $('#page-02-header').css('opacity', '0');

    init();

    function showHideBlock(){

        $('.show-hide .show').on('click', function(e){
            $('.show-hide .show').show();
            $('.show-hide .hide').hide();
            $(this).hide();
            $(this).next().show();
        });
    }

    function initModal(){
        $('.modal-button').on('click', function(e){
            $.get($(this).attr('modal-content'), function(response){
                $('#modal-content .modal-inner').html(response);
                $('#modal-content').show();
                $('#modal-content .modal-container').addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $('#modal-content .modal-container').removeClass('animated bounceIn');

                    $('#modal-close-button').show();
                    $('#modal-close-button').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $('#modal-close-button').removeClass('animated fadeIn');
                    });
                });
                var swiperV = new Swiper('#modal-content .modal-container', {
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev'
                });
            });
        });

        $('#modal-close-button').on('click', function(e){
            $('#modal-close-button').hide();
            $('#modal-content .modal-container').addClass('animated bounceOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#modal-content .modal-container').removeClass('animated bounceOut');
                $('#modal-content').hide();
                $('#modal-content .modal-inner').html('');
            });
        });
    }
    function initLink(){
        $('.backtocata').on('click', function(e){
            mySwiper.slideTo(3);
        });
        $('#cata1').on('click', function(e){
            mySwiper.slideTo(4);
        });
        $('#cata2').on('click', function(e){
            mySwiper.slideTo(8);
        });
        $('#cata3').on('click', function(e){
            mySwiper.slideTo(13);
        });
        $('#cata4').on('click', function(e){
            mySwiper.slideTo(18);
        });
    }


    function initSwiper(){

        //initialize swiper when document ready
        mySwiper = new Swiper ('#main-content', {
            // Optional parameters
            direction: 'vertical',
            resistanceRatio: 0,
            noSwiping : true,

            onInit: function(swiper){
                hideSlide();
                showOnebyOne();
            },
            onTransitionEnd: function(swiper){
                if(currentIndex != swiper.activeIndex){
                    showOnebyOne();
                }
                currentIndex = swiper.activeIndex;
                if(currentIndex == 0){
                    $('body').css('background-image', 'url(imgs/page-02.jpg)');
                    $('#page-02-header').hide();
                    $('#bounce-arrow').hide();
                }
                else if(currentIndex == 1 || currentIndex ==2){
                    $('#bounce-arrow').show();
                    $('#page-02-header').show();
                    mySwiper.allowSwipeToNext = false;
                    $('body').css('background-image', 'url(imgs/page-02.jpg)');
                    $('#page-02-header').css('opacity', '1');
                    $('#page-02-header').children().each(function(element){
                        if($(this).attr('animated-css')){
                            showOpacity($(this));
                            $(this).addClass('animated ' + $(this).attr('animated-css'));
                        }
                    });
                    $('#page-02-header').children().children().each(function(element){
                        if($(this).attr('animated-css')){
                            showOpacity($(this));
                            $(this).addClass('animated ' + $(this).attr('animated-css'));
                        }
                    });
                }

                else if(currentIndex == 8){
                    $("#parallax-bg").hide();
                }
                else if(currentIndex == 9){
                    $('body').css('background-image', 'url(imgs/brands-bg.png)');
                    $("#parallax-bg").show();
                    $("#parallax-bg").animate({
                        translate3d: '0,0,0'
                    }, 500, 'ease-out')
                }
                 else if(currentIndex == 10){
                    $("#parallax-bg").animate({
                        translate3d: '0,-20%,0'
                    }, 500, 'ease-out')

                }
                else if(currentIndex == 11){
                    $("#parallax-bg").animate({
                        translate3d: '0,-40%,0'
                    }, 500, 'ease-out')
                }
                else if(currentIndex == 12){
                    $('body').css('background-image', 'url(imgs/brands-bg.png)');
                    $("#parallax-bg").show();
                    $("#parallax-bg").animate({
                        translate3d: '0,-60%,0'
                    }, 500, 'ease-out')
                }
                else if(currentIndex == 13){
                    $('body').css('background-image', 'url(imgs/bg.jpg)');
                    $("#parallax-bg").hide();
                }
                else if(currentIndex == 14){
                    $('#page-hudong-header').hide();
                    $('body').css('background-image', 'url(imgs/bg.jpg)');
                }
                else if(currentIndex == 15 || currentIndex == 16 ){
                    $('#page-hudong-header').show();
                    $('body').css('background-image', 'url(imgs/page-huodong-2-bg.jpg)');
                }

                else if(currentIndex == 17){
                    $('#page-hudong-header').hide();
                    $('body').css('background-image', 'url(imgs/bg.jpg)');
                }

                console.log(">>"+currentIndex);



            },
            onTransitionStart: function(swiper){
                if(currentIndex != swiper.activeIndex){
                    hideSlide();
                }
                if(currentIndex != 0 && currentIndex != 1 && currentIndex != 2 ){
                    $('#page-02-header').css('opacity', '0');
                }
                if(currentIndex == 3 ){
                    $('body').css('background-image', 'url(imgs/bg.jpg)');
                }




            }
        });
    }


    function hideOpacity(obj){
        obj.css('opacity', '0');
    }
    function showOpacity(obj){
        obj.css('opacity', '1');
    }


    function hideSlide(){
        $('.swiper-slide').children().each(function(element){
            if($(this).attr('animated-css')){
                hideOpacity($(this));
                $(this).removeClass('animated ' + $(this).attr('animated-css'));
            }
        });
    }
    function showOnebyOne(){
        $('.swiper-slide-active').children().each(function(element){
            if($(this).attr('animated-css')){
                showOpacity($(this));
                $(this).addClass('animated ' + $(this).attr('animated-css')).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('animated ' + $(this).attr('animated-css'));
                });
            }

        });
    }

    console.log('js');
});