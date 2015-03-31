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
        preload.loadManifest(["logo.svg","logo.svg"

        ]);
        preload.on("complete", handleComplete);

    }

    function handleComplete(event) {
        overLoading();

    }

    function overLoading(){
        $('#main-content').show();
        $('#loading').addClass("animated bounceOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $("#loading").removeClass("animated bounceOut");
            hideOpacity($("#loading"));
            $("#logo").css('opacity', '1');
            $("#wave").css('opacity', '1');
            initSwiper();
            initModal();
        });
    }

    hideSlide();
    $("#logo").css('opacity', '0');
    $("#wave").css('opacity', '0');

    init();

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
            onInit: function(swiper){
                hideSlide();
                showOnebyOne();
            },
            onTransitionEnd: function(swiper){
                if(currentIndex != swiper.activeIndex){
                    showOnebyOne();
                }
                currentIndex = swiper.activeIndex;
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

    console.log('js');
});