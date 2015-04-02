// Initialize Swiper
document.ontouchmove = function(e) {e.preventDefault()};
$(document).ready(function () {

    var isOK = false;
    var preload;
    var currentIndex = 0;
    var mySwiper;
    var modalSlide;

    function init() {
        // Create a new queue.
        preload = new createjs.LoadQueue(true, "imgs/");

        var plugin = {
            getPreloadHandlers: function () {
                return {
                    extensions: ["svg","mp3","png","gif"],
                    callback: function (item) {
                        var id = item.src.toLowerCase().split("/").pop().split(".")[0];
                        $("#"+id).attr("src", item.src);
                    }
                };
            }
        };

        preload.installPlugin(plugin);
        preload.loadManifest(["bg.jpg",
            "animation.gif",
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
//        console.log(preload.progress);
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
            var index = $(this).attr('modal-index');
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

                modalSlide = new Swiper('#modal-content .modal-container', {
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    loop: true
                });

                modalSlide.slideTo(index,0);

            });
        });

        $('#modal-close-button').on('click', function(e){
            $('#modal-close-button').hide();
            $('#modal-content .modal-container').addClass('animated bounceOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#modal-content .modal-container').removeClass('animated bounceOut');
                $('#modal-content').hide();
                $('#modal-content .modal-inner').html('');

                modalSlide.destroy();

            });
        });
    }
    function initLink(){
        $('.backtocata').on('click', function(e){
            mySwiper.slideTo(4);
        });
        $('#cata1').on('click', function(e){
            mySwiper.slideTo(5);
        });
        $('#cata2').on('click', function(e){
            mySwiper.slideTo(9);
        });
        $('#cata3').on('click', function(e){
            mySwiper.slideTo(14);
        });
        $('#cata4').on('click', function(e){
            mySwiper.slideTo(19);
        });
    }


    function initSwiper(){

        //initialize swiper when document ready
        mySwiper = new Swiper ('#main-content', {
            // Optional parameters
            direction: 'vertical',
            loop: true,
            hashnav: true,

            onInit: function(swiper){
                hideSlide();
                showOnebyOne();
            },
            onTransitionEnd: function(swiper){
                if(currentIndex != swiper.activeIndex){
                    showOnebyOne();
                }
                currentIndex = swiper.activeIndex;
                if(currentIndex == 1 || currentIndex == 21){
                    $('#animation-color').css('opacity', '1');
                    setTimeout(function() {
                        $('#animation-color').css('opacity', '0');
                    }, 3000);

                    $('body').css('background-image', 'url(imgs/page-02.jpg)');
                    $('#page-02-header').hide();
                    $('#bounce-arrow').hide();
                }
                else if(currentIndex == 2 || currentIndex ==3){
                    $('#bounce-arrow').show();
                    $('#page-02-header').show();

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
                else if(currentIndex == 4){
                    $('#page-02-header').hide();
                    $('body').css('background-image', 'url(imgs/bg.jpg)');

                }

                else if(currentIndex == 9){
                    $("#parallax-bg").hide();
                    setTimeout(function() {
                        $('body').css('background-image', 'url(imgs/brands-bg.png)');
                    }, 100);

                }
                else if(currentIndex == 10){
                    $('body').css('background-image', 'url(imgs/brands-bg.png)');
                    $("#parallax-bg").show();
                    $("#parallax-bg").animate({
                        translate3d: '0,0,0'
                    }, 500, 'ease-out')
                }
                 else if(currentIndex == 11){
                    $("#parallax-bg").animate({
                        translate3d: '0,-22%,0'
                    }, 500, 'ease-out')

                }
                else if(currentIndex == 12){
                    $("#parallax-bg").animate({
                        translate3d: '0,-44%,0'
                    }, 500, 'ease-out')
                }
                else if(currentIndex == 13){
                    $('body').css('background-image', 'url(imgs/brands-bg.png)');
                    $("#parallax-bg").show();
                    $("#parallax-bg").animate({
                        translate3d: '0,-66%,0'
                    }, 500, 'ease-out')
                }

                else if(currentIndex == 14){
                    $('body').css('background-image', 'url(imgs/bg.jpg)');
                    $("#parallax-bg").hide();
                }
                else if(currentIndex == 15){
                    $('#page-hudong-header').hide();
                    $('body').css('background-image', 'url(imgs/bg.jpg)');
                }
                else if(currentIndex == 16 || currentIndex == 17 ){
                    $('#page-hudong-header').show();
                    $('body').css('background-image', 'url(imgs/page-huodong-2-bg.jpg)');
                }

                else if(currentIndex == 18){
                    $('#page-hudong-header').hide();
                    $('body').css('background-image', 'url(imgs/bg.jpg)');
                }
                else if(currentIndex == 20 || currentIndex == 0){
                    $('#bounce-arrow').show();
                }

                console.log(">>"+currentIndex);



            },
            onTransitionStart: function(swiper){
                if(currentIndex != swiper.activeIndex){
                    hideSlide();
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

//    console.log('js');
});