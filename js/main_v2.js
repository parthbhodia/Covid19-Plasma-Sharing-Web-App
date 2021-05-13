//This file uses ajax to filter the data :D

function filter(pageTitle,year,exp_start,exp_end,selected_exp_loop){

 	$("#submit").addClass("loading");
	//Fill the Map


	



	//Clear the Map
	$('#map-container').html('');
	$('#map-container').html('<div id = "map"></div>');
	clear_datatables(); // function can be found in helper.js



	//Get the selected values
	var circuits_logical = [];
	var selected_country = [];
	var selected_circuit = [];
	var selected_city = [];
	var selected_bandwidth = [];
	var selected_status = [];
	var selected_po = [];
	var selected_segment = [];
	// var selected_exp_loop =[];



	$.each($("#country option:selected"), function(){
		selected_country.push($(this).val());
	});
	$.each($("#city option:selected"), function(){
		selected_city.push($(this).val());
	});

	$.each($("#bandwidth option:selected"), function(){
		selected_bandwidth.push($(this).val());
	});

	$.each($("#circuit option:selected"), function(){
		selected_circuit.push($(this).val());
	});

	$.each($("#status option:selected"), function(){
		selected_status.push($(this).val());
	});

	$.each($("#segment option:selected"), function(){
		selected_segment.push($(this).val());
	});

	$.each($("#po_number option:selected"), function(){
		selected_po.push($(this).val());
	});

	// $.each($("#expiry_manual_dropdown option:selected"), function(){
	// 	selected_exp_loop.push($(this).val());
	// });


	var selected_min_cost = $('#min_cost').text();
	var selected_max_cost = $('#max_cost').text();

	var selected_min_util = $('#min_util').text();
	var selected_max_util = $('#max_util').text();



//logs
var log = {}

if( selected_status.length > 0 && typeof selected_status != "undefined"){


			log['Selected Status'] = selected_status;

}
if( selected_country.length > 0 && typeof selected_country != "undefined"){
                console.log(selected_country)
        log['Selected Country'] = selected_country;

}
if( selected_city.length > 0 && typeof selected_city != "undefined"){
                console.log(selected_city)
        log['Selected_City'] = selected_city;

}
if( selected_bandwidth.length > 0 && typeof selected_bandwidth != "undefined"){
                console.log(selected_bandwidth)
        log['Selected Bandwidth'] = selected_bandwidth;

}
if( selected_po.length > 0 && typeof selected_po != "undefined"){
                console.log(selected_po)
        log['Selected PO'] = selected_po;

}
if( selected_min_cost.length > 0 && typeof selected_min_cost != "undefined"){
                console.log(selected_min_cost)
        log['Minimum Cost'] = selected_min_cost;

}
if( selected_max_cost.length > 0 && typeof selected_max_cost != "undefined"){
                console.log(selected_max_cost)
        log['Maximum Cost'] = selected_max_cost;

}
if( selected_min_util.length > 0 && typeof selected_min_util != "undefined"){
                console.log(selected_min_util)
        log['Minimum Utilization'] = selected_min_util;

}
if( selected_max_util.length > 0 && typeof selected_max_util != "undefined"){
                console.log(selected_max_util)
        log['Maximum Utlization'] = selected_max_util;

}
if( selected_exp_loop && typeof selected_exp_loop != "undefined"){
                console.log(selected_exp_loop)
        log['Expiry Loop'] = selected_exp_loop;

}
if( exp_start != '' && typeof exp_start != "undefined"){
                console.log(exp_start)
        log['Expiry From'] = exp_start;

}
if( exp_end != '' && typeof exp_end != "undefined"){
                console.log(exp_end)
        log['Expiry To'] = exp_end;
}



var activity = '';
$.each(log,function(key,value){
				activity +=   key + ': ' + value + ', ';
});

year_str = year.replace('_',' ');
dropdown_logs = 'Selected Year: ' + year_str + ',' + activity;

console.log(activity);
//var pageTitle = "<?php echo  $pageTitle; ?>";
//alert(pageTitle);
$.ajax({
url: '../../logger.php',
data:{pageTitle: pageTitle,activity:dropdown_logs},
type:'POST',
success:function(data){
console.log('dropdown logged');
}
});



//convert the date to standard format of miliseconds
if(exp_start)
{
	var dt_range_start = new Date(exp_start).getTime();
	var dt_range_end = new Date(exp_end).getTime();
}


if(selected_exp_loop && selected_exp_loop != 'ALL')
{
	var today = new Date();
	// console.log(today);
	var today_add_month = new Date();
	if(selected_exp_loop[0] == '1')
	{
		today_add_month.setMonth(today_add_month.getMonth() + 1 );
		// console.log(today_add_month);
	}
	else if (selected_exp_loop[0] == '3')
	{
		today_add_month.setMonth(today_add_month.getMonth() + 3 );
	}
	else if(selected_exp_loop[0] == '6')
	{
		today_add_month.setMonth(today_add_month.getMonth() + 6 );
	}
	today_add_month = today_add_month.getTime();
	today = today.getTime();
	// console.log(today);
	// console.log(today_add_month);
}



	//Init map

	//Define Map
	var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
	'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

	var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', attribution: mbAttr}),
	streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11',   attribution: mbAttr});

	var logical = L.layerGroup();
	var physical = L.layerGroup();

	if(selected_segment != '')
	{
	var map = L.map('map', {
		center: [39.73, -104.99],
		zoom: 6,
		layers: [grayscale, physical],
		collapsed:false,
		fullscreenControl: {
    		pseudoFullscreen: true},
		
	});
	}
	else {
		var map = L.map('map', {
			center: [39.73, -104.99],
			zoom: 2,
			layers: [grayscale, logical],
			collapsed:false,
			fullscreenControl: {
        pseudoFullscreen: false // if true, fullscreen to page width and height
    				}
			});
		}



	var baseLayers =
	{
		"Grayscale": grayscale,
		"Streets": streets
	};


	var overlays =
	{
		"Physcial Circuit" :physical,
		"Logical Circuit": logical,
	};


	var customOptions =
	{

		'width': '500px',
		'className' : 'custom'
	}

	L.control.layers(baseLayers, overlays,{collapsed:false}).addTo(map);




   

	$.ajax({
		type: "GET",
		url: "data/"+year+".json",
		datatype: "json",
		// beforeSend: function(){
		// 	$("#submit").addClass("loading"); 	 },
			success: function(data){

				// console.log(data);

//-------------Filtering the data-------------------------

var total_data = data.length;
				data_status = data.filter(el => (selected_country.indexOf(el.A_end_site_Country) >= 0 ||
				selected_country.indexOf(el.B_end_site_Country) >= 0 || selected_country == '')
				&& (selected_city.indexOf(el.A_end_site_City) >= 0 ||
				selected_city.indexOf(el.B_end_site_City) >= 0 || selected_city == '')
				&& (selected_circuit.indexOf(el.OL_FULLNAME) >=0 || selected_circuit == ''));

			  var data = data_status.filter(el =>( selected_status.indexOf(el.Status) >=0 || selected_status == 'All'  ));

//console.log(selected_status);


//------------------------Filter Segments--------------------------------------
if(selected_segment != '')
{
	var data3 = [];
	for(var p = 0; p<data.length; p++)
	{
		for(j in data[p].Segment_id)
		{
			for(let k in selected_segment)
			{
				if(data[p].Segment_id[j].Circuit_id == selected_segment[k] )
				{
					data3.push(data[p]);

				}
			}
		}
	}
	var data = [];
	for(i in data3)
	{
		data.push(data3[i]);
	}
}

//--------------------FIlter PO Number-----------------------------------------
if(selected_po != '')
{
	var data4 = [];
	for(var p = 0; p<data.length; p++)
	{
		for(let j in data[p].po_details)
		{
			for(let k in selected_po)
			{
				if(data[p].po_details[j].po_number == selected_po[k] )
				{
					data4.push(data[p]);
				}
			}
		}
	}
	var data = [];
	for(i in data4)
	{
		data.push(data4[i]);
	}
}
// console.log(data);
//---------------------Bandwidth Type Filter -------------------------------
if(selected_bandwidth != '')
{
	var data5 = [];
	for(var p = 0; p<data.length; p++)
	{
		for(let j in data[p].po_details)
		{
			for(let k in selected_bandwidth)
			{
				if(data[p].po_details[j].bandwidth_type == selected_bandwidth[k] )
				{
					data5.push(data[p]);
				}
			}
		}
	}
	var data = [];
	for(let i in data5)
	{
		data.push(data5[i]);
	}
}

//----------------------------Expiry Date Range Filter--------------------------

if(dt_range_start)
{
	try
	{
		var data6 = [];
		for(let i in data)
		{
			for(let j in data[i].po_details)
			{
				var expiry_date_of_circuit = new Date(data[i].po_details[j].expiry_info).getTime();
				if((expiry_date_of_circuit >= dt_range_start) && (expiry_date_of_circuit <= dt_range_end))
				{
						// console.log(data[i].OL_FULLNAME + '' + data[i].po_details[j].expiry_info);
						data6.push(data[i])
				}
			}
		}
		var data = [];
		for(let i in data6)
		{
			data.push(data6[i]);
		}
	}
	catch(err) {
		console.log(err.message);
	}
}




//------------------------------Expiry Loop filter------------------------------
if(selected_exp_loop && selected_exp_loop != 'ALL')
{

	try {
		var data7 = [];
		for(let i in data)
		{
			for(let j in data[i].po_details)
			{
				var expiry_date_of_circuit = new Date(data[i].po_details[j].expiry_info).getTime();
				if(selected_exp_loop == 0)
				{
					if(expiry_date_of_circuit < today)
					{
						data7.push(data[i])

					}
				}

				else if(expiry_date_of_circuit >= today && expiry_date_of_circuit <= today_add_month)
				{
					data7.push(data[i])
				}
			}
			}
		var data = [];
		for(let i in data7)
		{
			data.push(data7[i]);
		}

			} catch (e) {
				console.log(e.message);
			}
		}


//------------------------------Call the Main Functions-----------------------------

//console.log(selected_min_util);
//alert(data.length)

    if(data.length == total_data )
                                {
          var elmnt = document.getElementById("table-container");
 	  elmnt.scrollIntoView();                      
	  alert('Please wait, Data will be shown below shortly.')	
				for(let i in data){
			        var value = data[i].OL_FULLNAME;
                                var flag = circuits_logical.includes(value); //to remove duplicate circuits
                                show_tables(i,flag);
                                }     
    				}else{
                                       
                                       
for(let i in data)
{
if(data[i].Lat_A != '' && data[i].Lat_B != '')
{
	if(data[i].max_95pctl_gbps >= selected_min_util && data[i].max_95pctl_gbps <= selected_max_util)
	{
		for(let k in data[i].po_details)
		{
			if(data[i].po_details[k].monthly_amount_in_usd  >= selected_min_cost || data[i].po_details[k].monthly_amount_in_usd  <= selected_max_cost )
			{
			
				var value = data[i].OL_FULLNAME;
				var flag = circuits_logical.includes(value); //to remove duplicate circuits
					plot_lines(i);
					show_tables(i,flag);

					// console.log(flag);
				   }		
			}
			}
		}
	}
}








//---------------Fille the Table -------------------

//Functions to Trace back to the Circuit on Circuit click from table

$( "#table-container" ).on('click', 'td', function(e){
	var td = ($(this).text());
	// alert(td);
	for(i in data)
	{
		if(data[i].OL_FULLNAME == td)
		{

				map.removeLayer(physical);
				map.addLayer(logical);
				var panTo_lat = data[i].Lat_A;
				var panTo_lon =  data[i].Long_A;
				//map.flyTo([panTo_lat, panTo_lon],11);
				logical.clearLayers();
				physical.clearLayers();
				plot_lines(i);
             			map.flyTo([panTo_lat, panTo_lon],11);

				var circuits_logical = [];
				clear_datatables();
				show_tables(i,flag=false) //attach the rows
				init_datatables(year,pageTitle) 
		}
		else {
			for (j in data[i].Segment_id)
			{
				if(data[i].Segment_id[j].Circuit_id == td)
				{
					// var segment = data[i].Segment_id[j].Circuit_id;
					// alert('Segment selected')
					map.removeLayer(logical);
					map.addLayer(physical);
					var panTo_lat = data[i].Segment_id[j].Lat_A;
					var panTo_lon =  data[i].Segment_id[j].Long_A;
					map.flyTo([panTo_lat, panTo_lon],15);

					//remove the other circuits to only show the clicked segments
						// var panTo_lat = data[i].Lat_A;
						// var panTo_lon =  data[i].Long_A;
						// map.flyTo([panTo_lat, panTo_lon],10);
						logical.clearLayers();
						physical.clearLayers();
						plot_lines(i);
						map.flyTo([panTo_lat, panTo_lon],10);

						var circuits_logical = [];
						clear_datatables();
						show_tables(i,flag=false) //attach the rows
						init_datatables(year,pageTitle);
					}
				}
		}
	}
});

				function show_tables(i, flag)
				{
					//Circuit Data
					var circuit_data = '';
					if(flag == false)
					{

						var circuit_data = '<tr><td><a href="#map">' + data[i].OL_FULLNAME + '</a></td><td>'+ data[i].A_end_site + '</td><td>' + data[i].B_end_site + '</td><td>' + data[i].A_end_site_City + '</td><td>' + data[i].B_end_site_City + '</td><td>' + data[i].A_end_site_address + '</td><td>'+ data[i].B_end_site_address+ '</td><td>'+ data[i].speed_gbps + '</td><td>'+ data[i].IN_95_PCTL_Gbps + '</td><td>'+ data[i].OUT_95_PCTL_Gbps + '</td><td>'+ data[i].max_95pctl_gbps + '</td><td>' + data[i].Status + '</td><td>' + data[i].Hops + '</td><td>'+data[i].Monthly_Amount_In_USD_sum_6453 +'</td><td>'+ data[i].Monthly_Amount_In_USD_sum_all_lob + '</td></tr>';
						circuits_logical.push(data[i].OL_FULLNAME)
						$('#tbody_circuit').append(circuit_data);


					// Segments Data
					for (let j in data[i].Segment_id)
					{
						var segment_data = '<tr><td><a href="#map">' + data[i].OL_FULLNAME + '</a></td><td><a href="#map">' + data[i].Segment_id[j].Circuit_id + '</a></td><td>'+ data[i].Hops + '</td></tr>';
						$('#tbody_segment').append(segment_data);
					}

				 //Po Data
					for (let j in data[i].po_details)
					{
						if(data[i].po_details[j].po_number != '' && data[i].po_details[j].monthly_amount_in_usd  >= selected_min_cost &&  data[i].po_details[j].monthly_amount_in_usd  <= selected_max_cost )
						{



var po_data = '<tr><td>' + data[i].OL_FULLNAME  +  '</td><td>' + data[i].po_details[j].po_number +  '</td><td>'+ data[i].po_details[j].bandwidth_type + '</td><td>' + data[i].po_details[j].site_a_sap + '</td><td>' + data[i].po_details[j].site_b_sap +  '</td><td>' +data[i].po_details[j].NIMS_circuit_ID +'</td><td>'+data[i].po_details[j].TIGER_OO +'</td><td>'+data[i].po_details[j].bill_start_date+'</td><td>' +data[i].po_details[j].months+ '</td><td>' + data[i].po_details[j].monthly_amount_in_usd + '</td><td>' +  data[i].po_details[j].vendor_name + '</td><td>' + data[i].po_details[j].expiry_info + '</td></tr>';


							$('#tbody_po').append(po_data);
						}
					}


				}
			}

//-----------------Mapping Markers and Lines -------------------------------------


				function plot_lines(i)
				{
					var content_logical = L.DomUtil.create('div', 'infoWindow');

					var content_logical_A = L.DomUtil.create('div', 'infoWindow');

					var content_logical_B = L.DomUtil.create('div', 'infoWindow');
					var pointList = [[data[i].Lat_A, data[i].Long_A], [data[i].Lat_B, data[i].Long_B]];

					//Mapping logical circuits
					content_logical.innerHTML = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].OL_FULLNAME + '</td></tr><tr><td>Hop Status: </td><td>' + data[i].Status + "</td></tr></tbody></table>" + "<p id = 'click_more' ><a href='#table-container' >Click for more info</a></p>";

					content_logical_A.innerHTML = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].OL_FULLNAME + '</td></tr><tr><td>Hop Status: </td><td>' + data[i].Status +  '</td></tr><tr><td> Site Code: </td><td>' + data[i].A_end_site +  "</td></tr></tbody></table>" + "<p id = 'click_more' ><a href='#table-container' >Click for more info</a></p>";
					content_logical_B.innerHTML = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].OL_FULLNAME + '</td></tr><tr><td>Hop Status: </td><td>' + data[i].Status +  '</td></tr><tr><td> Site Code: </td><td>' + data[i].B_end_site +  "</td></tr></tbody></table>" + "<p id = 'click_more' ><a href='#table-container' >Click for more info</a></p>";

					//A click more function - which is on the pop up will reinit the data table and show only data of the circuit clicked.
					$('#click_more', content_logical).on('click', function() {
							clear_datatables();
							show_tables(i,flag=false) //attach the rows
							init_datatables(year,pageTitle)  
					 });
					 $('#click_more', content_logical_A).on('click', function() {
							 clear_datatables();
							 show_tables(i,flag=false) //attach the rows
							 init_datatables(year,pageTitle)
						});
						$('#click_more', content_logical_B).on('click', function() {
								clear_datatables();
								show_tables(i,flag=false) //attach the rows
								init_datatables(year,pageTitle)
						 });



					

					// Mapping Logical Lines
					



					//mapping with L.curve 
					//
					var polyline3 = new L.curve(['M', [data[i].Lat_A, data[i].Long_A],
             'S',[data[i].Latmedian,data[i].Longmedian],
             [data[i].Lat_B,data[i].Long_B]],{animate: 2500}
           ).setStyle({color:'blue',weight: 2,	opacity: 0.5,	smoothFactor: 1,}).addTo(logical).bindPopup(content_logical,customOptions).on('click', function (e) {
 						this.openPopup();;
          });

					// if(data[i].Network_Type == 'Onnet')
					// {
					// 	var color = 'blue';
					// }
					// else {
					// 	var color = 'red'
					// }
					var firstpolyline = new L.polyline(pointList,
						{
							color: 'blue',
							weight: 3,
							opacity: 0.5,
							smoothFactor: 1,
							animate: 1500,

						}).bindPopup(content_logical,customOptions).on('mouseover', function (e) {
					 	this.openPopup();
					});

					  //mapping markers to logical circuit
						L.marker([ data[i].Lat_A, data[i].Long_A]).bindPopup(content_logical_A,customOptions).addTo(logical);
						L.marker([ data[i].Lat_B, data[i].Long_B]).bindPopup(content_logical_B,customOptions).addTo(logical);


						//Mapping Physical Circuits

						for(let j in data[i].Segment_id)
						{
							if(data[i].Segment_id[j].Lat_A != '' && data[i].Segment_id[j].Lat_B != '' && data[i].Segment_id[j].Long_A != '' && data[i].Segment_id[j].Long_B != '')
							{
		 						var content_segment = L.DomUtil.create('div', 'infoWindow2');
								var content_segment_a = L.DomUtil.create('div', 'infoWindow2');
								var content_segment_b = L.DomUtil.create('div', 'infoWindow2');
								content_segment.innerHTML = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].OL_FULLNAME +  '</td></tr>'+"<tr><td>Segment Name :</td><td>" + data[i].Segment_id[j].Circuit_id +  '</td></tr><tr><td> Status: </td><td>' + data[i].Status + "</td></tr></tbody></table>" + "<p id = 'click_more'><a href='#table-container'>Click for more info </a></p>";
								content_segment_a.innerHTML = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].OL_FULLNAME + '</td></tr>'+"<tr><td>Segment Name :</td><td>" + data[i].Segment_id[j].Circuit_id + '</tr></td><tr><td> Status: </td><td>' + data[i].Status + "</td></tr>" + "<tr><td>Site Code :</td><td>" + data[i].Segment_id[j].A_end_site_seg + "</td></tr></tbody></table><p id = 'click_more'><a href='#table-container'>Click for more info </a></p>";
								content_segment_b.innerHTML = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].OL_FULLNAME + '</td></tr>'+"<tr><td>Segment Name :</td><td>" + data[i].Segment_id[j].Circuit_id + '</tr></td><tr><td> Status: </td><td>' + data[i].Status + "</td></tr>" + "<tr><td>Site Code :</td><td>" + data[i].Segment_id[j].B_end_site_seg + "</td></tr></tbody></table><p id = 'click_more'><a href='#table-container'>Click for more info </a></p>";


								//A click more function - which is on the pop up will reinit the data table and show only data of the segment circuit clicked.
								$('#click_more', content_segment).on('click', function() {
								   clear_datatables();
									 show_tables(i,flag=false); //attach the rows
									 init_datatables(year,pageTitle) //init tabs
								});
								$('#click_more', content_segment_a).on('click', function() {
									 clear_datatables();
									 show_tables(i,flag=false); //attach the rows
									 init_datatables(year,pageTitle) //init tabs
								});
								$('#click_more', content_segment_b).on('click', function() {
									 clear_datatables();
									 show_tables(i,flag=false); //attach the rows
									 init_datatables(year,pageTitle) //init tabs
								});

								var pointList = [[data[i].Segment_id[j].Lat_A, data[i].Segment_id[j].Long_A], [data[i].Segment_id[j].Lat_B, data[i].Segment_id[j].Long_B]];
								var firstpolyline = new L.polyline(pointList,{
									color: 'green',
									weight: 3,
									opacity: 0.5,
									smoothFactor: 1,

								}).bindPopup(content_segment).addTo(physical);

								// on('click',function(){
								// 	$('#table-container').html('');
								// 	$('#table-container')
								// 	.html('<div class="ui sixteen wide columns"><div class="ui segment"><div class="ui menu top"><a class="item" data-tab="circuit">Circuit</a><a class="active item" data-tab="segment">Segment</a><a class="item" data-tab="po">PO Details</a></div><div class="ui tab" data-tab="circuit" ><table class="ui celled table" id ="dataTable"><thead><tr><th>Circuit Id</th><th>A End City</th><th>B End City</th><th>Status</th></tr></thead><tbody id="table_circuit"></tbody></table></div><div class="ui active tab" data-tab="segment"><table class="ui celled table" id="dataTable1"><thead><tr><th>Circuit</th><th>Segment</th><th>Hops</th></tr></thead><tbody id="table_segment"></tbody></table></div><div class="ui tab" data-tab="po"><table class="ui celled table" id="dataTable2"><thead><tr><th>Circuit ID</th><th>PO Number</th><th>Amount in USD</th></tr></thead><tbody id="table_po"></tbody></table></div></div></div>');
								// 	show_tables(i) //attach the rows
								// 	tabs(); //init tabs
								// });;
								L.marker([ data[i].Segment_id[j].Lat_A, data[i].Segment_id[j].Long_A]).bindPopup(content_segment_a).addTo(physical);
								L.marker([ data[i].Segment_id[j].Lat_B, data[i].Segment_id[j].Long_B]).bindPopup(content_segment_b).addTo(physical);
							}
						}
						var panTo_lat = data[i].Lat_A;
						var panTo_lon =  data[i].Long_A;
						map.panTo(new L.LatLng(panTo_lat, panTo_lon));


					}

	init_datatables(year,pageTitle);

$("#submit").removeClass("loading");


}
});

}
