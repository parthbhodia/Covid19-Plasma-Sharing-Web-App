// 숫자 3자리마다 콤마 찍기

function numberWithCommas(x) {
    if (x !== null) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}


function slider_cost(min_cost, max_cost) {
    //slider range init set
    $( "#slider-range" ).slider({
        range: true,
        min: min_cost,
        max: max_cost,
        values: [ min_cost, max_cost ],
        slide: function( event, ui ) {
            $( "#min_cost" ).html(ui.values[ 0 ]);
            $( "#max_cost" ).html(ui.values[ 1 ]);

            selected_min_cost = ui.values[0];
            selected_max_cost = ui.values[1];
            // $('#txtMin').val(ui.values[0]);
            // $('#txtMax').val(ui.values[1]);
          }



    });
    $("#min_cost").html(min_cost);
    $("#max_cost").html(max_cost);

    // $('#slider-range').html($('#Cost-slider').slider('values', 0) + '-' + $('#Cost-slider').slider('values', 1));


}


//Utilization slider

function slider_util(min_util, max_util) {
    //slider range init set
    $( "#slider_range_util" ).slider({
        range: true,
        min: min_util,
        max: max_util,
        values: [ min_util, max_util ],
        slide: function( event, ui ) {
            $( "#min_util" ).html(ui.values[ 0 ]);
            $( "#max_util" ).html(ui.values[ 1 ]);

            selected_min_util = ui.values[0];
            selected_max_util = ui.values[1];
            // $('#txtMin').val(ui.values[0]);
            // $('#txtMax').val(ui.values[1]);
          }



    });
    $("#min_util").html(min_util);
    $("#max_util").html(max_util);


}
