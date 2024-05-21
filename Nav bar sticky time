<script>
$(document).ready(function() {
  let lastScrollTop = 0;
  let scrollTimeout;
  let scrollStopTimeout;

  $(window).scroll(function() {
    let currentScrollTop = $(this).scrollTop();
    clearTimeout(scrollStopTimeout); 
    if (currentScrollTop > lastScrollTop) {
      clearTimeout(scrollTimeout); 
      scrollTimeout = setTimeout(function() {
        $(".nav-menu_block").slideUp(100);
      }, 100); 
    } else {
      $(".nav-menu_block").slideDown(300);
    }
    lastScrollTop = currentScrollTop;
    scrollStopTimeout = setTimeout(function() {
      $(".nav-menu_block").slideDown(300);
    }, 2000); // 5 minutes
  });
});
</script>
