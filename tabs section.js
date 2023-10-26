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
  
//onload, make first button active
navButtons.first().addClass('active');
  
</script>
