function filter(){
//Clear the Map
$('#map-container').html('');
$('#map-container').html('<div id = "map"></div>');

$('#table-container').html('');
$('#table-container')
.html('<div class="ui sixteen wide columns"><div class="ui segment"><div class="ui menu top"><a class="active item" data-tab="circuit">Circuit</a><a class="item" data-tab="segment">Segment</a><a class="item" data-tab="po">PO Details</a></div><div class="ui tab active" data-tab="circuit" ><table class="ui celled table" id ="dataTable"><thead><tr><th>Circuit Id</th><th>A End City</th><th>B End City</th><th>Status</th></tr></thead><tbody id="table_circuit"></tbody></table></div><div class="ui tab" data-tab="segment"><table class="ui celled table" id="dataTable1"><thead><tr><th>Circuit</th><th>Segment</th></tr></thead><tbody id="table_segment"></tbody></table></div><div class="ui tab" data-tab="po"><table class="ui celled table" id="dataTable2"><thead><tr><th>PO Number</th><th>Amount in USD</th></tr></thead><tbody id="table_po"></tbody></table></div></div></div>');

$('.top.menu .item').tab();

//clear the table
// $('#table_circuit').empty();
// $('#table_segment').empty();


	//Init map
	var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
	'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

	var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', attribution: mbAttr}),
	streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11',   attribution: mbAttr});

	var logical = L.layerGroup();
	var physical = L.layerGroup();

	var map = L.map('map', {
		center: [39.73, -104.99],
		zoom: 2,
		layers: [grayscale, logical],
    collapsed:false
	});


	var baseLayers =
	{
		"Grayscale": grayscale,
		"Streets": streets
	};

	var overlays =
	{
		"Logical Circuit_id": logical,
		"Physcial Circuit_id" :physical
	};

  var customOptions =
         {

         'width': '500px',
         'className' : 'custom'
         }

	L.control.layers(baseLayers, overlays).addTo(map);

//Fill the Map

//Get the selected values
var selected_country = [];
var selected_circuit = [];
var selected_city = [];
var selected_status = [];
var selected_po = [];
$.each($("#country option:selected"), function(){
	selected_country.push($(this).val());
});
$.each($("#city option:selected"), function(){
	selected_city.push($(this).val());
});
$.each($("#circuit option:selected"), function(){
	selected_circuit.push($(this).val());
});

$.each($("#status option:selected"), function(){
	selected_status.push($(this).val());
});

var selected_min_cost = $('#min_cost').text();
var selected_max_cost = $('#max_cost').text();

console.log(selected_max_cost);


$.ajax({
	type: "GET",
	url: 'data/final_list_po_details.json',
	datatype: "json",
	beforeSend: function(){
		$("#submit").addClass("loading"); 	 },
		success: function(data){





			data_status = data.filter(el => (selected_country.indexOf(el.A_end_site_Country) >= 0 ||
		 	selected_country.indexOf(el.B_end_site_Country) >= 0 || selected_country == '')
			&& (selected_city.indexOf(el.A_end_site_City) >= 0 ||
			selected_city.indexOf(el.B_end_site_City) >= 0 || selected_city == '')
		  && (selected_circuit.indexOf(el.OL_FULLNAME) >=0 || selected_circuit == ''));

			data = data_status.filter(el =>( selected_status.indexOf(el.Status) >=0 || selected_status == ' '  ));
			console.log(data);


			for(let i in data)
			{
        if(data[i].Lat_A != '' && data[i].Lat_B != '')
        {
          for(let j in data[i].po_details)
          {
            if((data[i].po_details[j].monthly_amount_in_usd >= selected_min_cost) && (data[i].po_details[j].monthly_amount_in_usd <= selected_max_cost))
            {
                plot_lines(i);
				        show_tables(i);
            }
          }
        }
      }
//
// for(let i in data)
// {
//   plot_lines(i);
//   show_tables(i);
// }

			function show_tables(i)
			{
				//Circuit Data
				var circuit_data = '<tr><td>' + data[i].OL_FULLNAME + '</td><td>' + data[i].A_end_site_City + '</td><td>' + data[i].B_end_site_City + '</td><td>' + data[i].Status + '</td></tr>';
				$('#table_circuit').append(circuit_data);


				//Segments Data
				for (let j in data[i].Segment_id)
				{
					var segment_data = '<tr><td>' + data[i].OL_FULLNAME + '</td><td>' + data[i].Segment_id[j].Circuit_id + '</td></tr>'
					$('#table_segment').append(segment_data);
				}
        for (let j in data[i].po_details)
				{
          if(data[i].po_details[j].po_number != '')
          {
					var po_data = '<tr><td>' + data[i].po_details[j].po_number + '</td><td>' + data[i].po_details[j].monthly_amount_in_usd + '</td></tr>'
					$('#table_po').append(po_data);
				}
       }
			}

			function plot_lines(i)
			{
				var pointList = [[data[i].Lat_A, data[i].Long_A], [data[i].Lat_B, data[i].Long_B]];

				//Mapping logical circuits

        var content_A = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].OL_FULLNAME + '</td></tr><tr><td> Status: </td><td>' + data[i].Status + "</td></tr></tbody></table>";
        var content_B = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].OL_FULLNAME + '</td></tr><tr><td> Status: </td><td>' + data[i].Status + "</td></tr></tbody></table>";
        // var accordian = '<div id="acc" class="ui accordion"><div class="title"><i class="dropdown icon"></i>What is a dog?</div><div class="content"><p class="transition hidden">A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p></div>';
        // var accordian = '<div class="acc"><h3>Section 2</h3><div><p>Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor velit, faucibus interdum tellus libero ac justo. Vivamus non quam. In suscipit faucibus urna. </p></div><h3>Section 1</h3><div><p>Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integerut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sitamet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo utodio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate.</p></div></div>';
        // var test_acc = '<div class="acc"><h3>Section 1</h3><div>Stuff<?/div></div>';

        var firstpolyline = new L.polyline(pointList,
      	{
					 color: 'red',
					 weight: 3,
					 opacity: 0.5,
					 smoothFactor: 1,

				}).addTo(logical);
				L.marker([ data[i].Lat_A, data[i].Long_A]).bindPopup(content_A,customOptions).addTo(logical);
				L.marker([ data[i].Lat_B, data[i].Long_B]).bindPopup(content_B,customOptions).addTo(logical);


				//Mapping Physical Circuits
				for(let j in data[i].Segment_id)
				{
					if(data[i].Segment_id[j].Lat_A != '' && data[i].Segment_id[j].Lat_B != '' && data[i].Segment_id[j].Long_A != '' && data[i].Segment_id[j].Long_B != '')
					{
					// var pointA = new L.LatLng(data[i].Segment_id[j].Lat_A, data[i].Segment_id[j].Long_A);
					// var pointB = new L.LatLng(data[i].Segment_id[j].Lat_B, data[i].Segment_id[j].Long_B);
						var pointList = [[data[i].Segment_id[j].Lat_A, data[i].Segment_id[j].Long_A], [data[i].Segment_id[j].Lat_B, data[i].Segment_id[j].Long_B]];
						var firstpolyline = new L.polyline(pointList,{
							color: 'green',
							weight: 3,
							opacity: 0.5,
							smoothFactor: 1,

						}).addTo(physical);

					// console.log('Physical Circuit_id '+ data[i].Segment_id[j].Circuit_id);
						L.marker([ data[i].Segment_id[j].Lat_A, data[i].Segment_id[j].Long_A]).bindPopup(data[i].Status).addTo(physical);
						L.marker([ data[i].Segment_id[j].Lat_B, data[i].Segment_id[j].Long_B]).bindPopup(data[i].Status).addTo(physical);
					}
				}
				var panTo_lat = data[i].Lat_A;
				var panTo_lon =  data[i].Long_A;
				map.panTo(new L.LatLng(panTo_lat, panTo_lon));


			}
			// $('#dataTable').DataTable({
		  //                     "destroy": true, //use for reinitialize datatable
		  //                  });



        $('#dataTable').DataTable({
          dom: 'Bfrtip',
          buttons: [
           'copy', 'csv', 'excel', 'pdf', 'print'
       ],
       title: 'BB COST Report'


        });
        $('#dataTable1').DataTable();
        $('#dataTable2').DataTable();


			  $("#submit").removeClass("loading");


		}
	});
  $( ".acc" ).accordion({
    collapsible:true,

  });

}
