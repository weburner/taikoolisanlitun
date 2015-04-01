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
            "page-02.jpg"

        ]);
        preload.on("complete", handleComplete);
        preload.on("progress", handleOverallProgress);

    }

    function handleOverallProgress(event) {
        console.log(preload.progress);
        $('#loading-percent').html(preload.progress * 100);
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
                    prevButton: '.swiper-button-prev',
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

    function initSwiper(){

        //initialize swiper when document ready
        mySwiper = new Swiper ('#main-content', {
            // Optional parameters
            direction: 'vertical',
            parallax: true,
            resistanceRatio: 0,
            noSwiping : true,
            allowSwipeToPrev: false,

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
                }

                if(currentIndex == 1){
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

                console.log(">>"+currentIndex);

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