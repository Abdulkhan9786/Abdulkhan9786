<script>
  
//Replace #lp-pom-box-330 with the ID of your nav box
var navButtons = $('#lp-pom-box-330 a');
//Replace #lp-pom-box-331 with the ID of your content box
var contentBoxes = $('#lp-pom-box-331 .lp-pom-box');
  
var nav = [];
//GA integration conflict workaround
navButtons.each(function(index){
  var url = this.href;
  var hash = url.substring(url.indexOf("#")+1);
  var data = { elem : this.id, href: hash };
  nav.push(data);
});
navButtons.removeAttr("href");

//When button is clicked
$(navButtons).click(function(e){
  //find nav object
  var navTarget;
  for(var i=0;i<nav.length;i++){
  	if (nav[i].elem == this.id){
    	navTarget = nav[i];
    }
  }

  //make other buttons inactive
  $(navButtons).removeClass('active');
  //make this button active
  $(this).addClass('active');
  //hide all sections
  contentBoxes.hide();
  contentBoxes.find('*').hide();
  //show href section
  var boxToShow = $('#'+navTarget.href);
  console.log("box:"+boxToShow);
  boxToShow.show('300');
  boxToShow.find('*').show();
});






Link to current tab change (Webflow)
Link URL /page name#Tab-1(tab setting name)
<script>
  $( function() {
    function changeTab() {
        var tabName = window.location.hash.substr(1);
        var tabTarget = $('[data-w-tab="' + tabName + '"]');
        if (tabTarget.length) {
            tabTarget.click();
        }
    }
    jQuery('[data-w-tab]').each(function(){
      var $this = $(this);
      var dataWTabValu = jQuery($this).attr('data-w-tab');
      var pargedDataTab = dataWTabValu.replace(/\s+/g,"-");
      jQuery($this).attr('data-w-tab', pargedDataTab);
    });

    //when page is first loaded
    if(window.location.hash){
        changeTab();
    }

    //internal page linking
    $(window).on('hashchange', changeTab);

    $('[data-w-tab]').on('click', function(){
        history.pushState({}, '', '#'+$(this).data("w-tab"));
    });
    
});
  </script>
  
//onload, make first button active
navButtons.first().addClass('active');
  
</script>





Wordpress tab created
class name should be same 
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
     $(document).ready(function(){
        // Hide all sections initially
        $(".section-change").hide();
        
        $(".card").click(function(){
            // Hide all sections
            $(".section-change").hide();
            
            // Find the index of the clicked card by its position relative to its siblings
            var index = $(this).index(".card");
            
            // Show the corresponding section with the same index
            $(".section-change").eq(index).show();
        });
    });
</script>
