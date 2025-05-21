<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
jQuery(document).ready(function ($) {
    $('.cost-clalulater-form').on('submit', function (event) {
        event.preventDefault(); 
        
        var buildArea = parseFloat($("#form-field-buildarea").val()) || 0;
        var carParkingArea = parseFloat($("#form-field-carparkingarea").val()) || 0;
        var balconyArea = parseFloat($("#form-field-balconyarea").val()) || 0;

        ["royal", "basic", "classic"].forEach(function (type) {
            $("#" + type + "-built-cost").text(buildArea);
            $("#" + type + "-car-cost").text(carParkingArea);
            $("#" + type + "-balcony-cost").text(balconyArea);
        });

        var packages = {
            royal: { build: 2510, car: 130 * 1631, balcony: 1631 },
            basic: { build: 1840, car: 130 * 1196, balcony: 1196 },
            classic: { build: 1970, car: 130 * 1280, balcony: 1280 }
        };

        $.each(packages, function (key, rates) {
            var totalBuildCost = buildArea * rates.build;
            var totalCarCost = carParkingArea * rates.car;
            var totalBalconyCost = balconyArea * rates.balcony;
            var totalCost = totalBuildCost + totalCarCost + totalBalconyCost;

            $("#"+key+"-build-total-cost").text("₹" + totalBuildCost.toLocaleString());
            $("#"+key+"-car-total-cost").text("₹" + totalCarCost.toLocaleString());
            $("#"+key+"-balcony-total-cost").text("₹" + totalBalconyCost.toLocaleString());
            $("#"+key+"-total-cost").text("₹" + totalCost.toLocaleString());
        });

        setTimeout(function () {
            $('#cost-estimation-section').fadeIn();
        }, 1000);
    });
});
</script>
