Custom slider

Verify Here  -- https://swiperjs.com/demos/010-default/core

inside<head> tag
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />

<style>
.swiper-pagination-bullet{
                          margin-right:8px;
                          background:none;
                          border:2px solid #095D60;
                          width:12px;
                          height:12px
                          }
.swiper-pagination-bullet-active{
                          background:#095D60
                          }
.classexample .swiper-pagination-bullet{
                          margin-right:8px;
                          background:none;
                          border:2px solid #095D60;
                          width:12px;
                          height:12px
                          }
.classexample .swiper-pagination-bullet-active{
                          background:#095D60
                          }
</style>

before <body> tag
<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js">
</script>
<script>  var swiper = new Swiper(".class name", {    
slidesPerView: 1,    
spaceBetween: 16,    
mousewheel: false,    
keyboard: false,  
freeMode: false,  
pagination: {      
            el: ".swiper-pagination1",      
            clickable: true,   
            },    
breakpoints: {      
768: {        
slidesPerView: 2,        
spaceBetween: 16,      
},      
1024: {        
slidesPerView: 3,(number of sliders to show)        
spaceBetween: 16,        
freeMode: true,        
mousewheel: true,    
keyboard: true,      
},    },  });
</script>

<!--For Loop slider-->
loop:true,

<!--buttons for left and right scroll-->
navigation: {
           nextEl: '.swiper-button-next',
           prevEl: '.swiper-button-prev',
       },

<!--Slider dotes-->(For webflow slider)
<Style>
.w-slider-dot {    
background: transparent;    
border: 1.5px solid;    
border-color: #0097A1;    
width:10px;    
height:10px;
}    
.w-slider-dot.w-active {    
background: #0097A1;
}
</Style>











//when two slider Synchronise
<script>
  swiper1.on('slideChange', function() {
  var activeIndex = swiper1.realIndex; // Use realIndex instead of activeIndex
  swiper2.slideTo(activeIndex);
});
</script>



//when swiper want to use tab
<script>
$(document).ready(function () {
 $(".gallery-tab").click(function () {
        // Get the data-slide attribute to determine which slide to go to
        var slideIndex = $(this).data("slide");

        // Slide to the selected slide with a transition
        swiperfeatures.slideTo(slideIndex, 500, true);

        // Remove the "active" class from all gallery-tabs
        $(".gallery-tab").removeClass("active");

        // Add the "active" class to the clicked gallery-tab
        $(this).addClass("active");
    });

    // Initially, set the first gallery-tab as active
    $(".gallery-tab[data-slide='0']").addClass("active");

    // Optionally, you can add this code block to handle the initial slide
    swiperfeatures.on('slideChange', function () {
        var activeSlideIndex = swiperfeatures.activeIndex;
        $(".gallery-tab").removeClass("active");
        $(".gallery-tab[data-slide='" + activeSlideIndex + "']").addClass("active");
    });
});
</script>
