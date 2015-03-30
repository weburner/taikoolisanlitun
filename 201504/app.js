// Initialize Swiper
$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'vertical',
        onInit: function(swiper){
            hideSlide();
            showOnebyOne();
        },
        onTransitionEnd: function(swiper){
            hideSlide();
            showOnebyOne();
        },
        onTransitionStart: function(swiper){
            console.log(swiper)
        }
    });

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
});