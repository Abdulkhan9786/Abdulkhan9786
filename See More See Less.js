<div class="content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod enim a metus adipiscing aliquet.</p>
    <p class="more-content">Suspendisse potenti. Integer auctor augue in justo tincidunt, a dignissim odio tempus.</p>
    <a href="#" class="read-more">Read more</a>
</div>


CSS
.more-content {
    display: none;
}


JQuery
$(document).ready(function(){
    $("#read-more").click(function(event){
        event.preventDefault();
        $("#more-content").slideDown();
        $("#read-more").hide();
        $("#read-less").show();
    });

    $("#read-less").click(function(event){
        event.preventDefault();
        $("#more-content").slideUp().delay(500).queue(function(next){
            $("#read-less").hide();
            $("#read-more").show();
            next();
        });
    });
});
