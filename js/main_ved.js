//This file uses ajax to filter the data :D

function filter(data){

	//Fill the Map


	//Clear the Map
	$('#map-container').html('');
	$('#map-container').html('<div id = "map"></div>');

	$('#table-container').html('');

	// if(selected_segment != '')
	$('#table-container')
	// .html('<div class="ui sixteen wide columns"><div class="ui segment"><div class="ui menu top"><a class="active item" data-tab="circuit">Circuit</a><a class="item" data-tab="segment">Segment</a><a class="item" data-tab="po">PO Details</a></div><class="ui tab active" data-tab="circuit"><div style="overflow-y:auto; overflow-x:auto;"><table class="ui celled table" id ="dataTable"><thead><tr><th>Circuit Id</th><th>A end Site</th><th>B end Site</th><th>A End City</th><th>B End City</th><th>A End Address</th><th>B End Address</th><th>Speed (Gbps)</th><th>IN 95 PCTL(Gbps)</th><th>OUT 95 PCTL(Gbps)</th><th>MAX 95 PCTL(Gbps)</th><th>Status</th><th>Hops</th><th>Monthly Amount In USD(6453)</th><th>Monthly Amount In USD(All LOB)</th><th>Network Type</th><th>No of offnet</th></tr></thead><tbody id="table_circuit"></tbody></table></div><div class="ui tab" data-tab="segment"><table class="ui celled table" id="dataTable1"><thead><tr><th>Circuit</th><th>Segment</th><th>Hops</th></tr></thead><tbody id="table_segment"></tbody></table></div>       </div></div>');

	.html('<div class="ui sixteen wide columns"><div class="ui segment"><div class="ui menu top"><a class="active item" data-tab="circuit">Circuit</a><a class="item" data-tab="segment">Segment</a><a class="item" data-tab="po">PO Details</a></div><div class="ui tab active" data-tab="circuit" style="overflow-x:auto;" ><table class="ui celled table" id ="dataTable"><thead><tr><th>Circuit Id</th><th>A end Site</th><th>B end Site</th><th>A End City</th><th>B End City</th><th>A End Address</th><th>B End Address</th><th>Speed (Gbps)</th><th>IN 95 PCTL(Gbps)</th><th>OUT 95 PCTL(Gbps)</th><th>MAX 95 PCTL(Gbps)</th><th>Status</th><th>Hops</th><th>Monthly Amount In USD(6453)</th><th>Monthly Amount In USD(All LOB)</th><th>Network Type</th><th>No of offnet</th></tr></thead><tbody id="table_circuit"></tbody></table></div><div class="ui tab" data-tab="segment"><table class="ui celled table" id="dataTable1"><thead><tr><th>Circuit</th><th>Segment</th><th>Hops</th></tr></thead><tbody id="table_segment"></tbody></table></div><div class="ui tab" data-tab="po"><table class="ui celled table" id="dataTable2"><thead><tr><th>Circuit ID</th><th>PO Number</th><th>NIMS Circuit ID</th><th>TIGER OO</th><th>Bill Start Date(NEW MRC)</th><th>Contract term in Month</th><th>Amount in USD</th><th>Vendor Name</th><th>Expiry Date</th></tr></thead><tbody id="table_po"></tbody></table></div></div></div>');




	$('.top.menu .item').tab();

	//Get the selected values
	var circuits_logical = [];

	var selected_country = [];
	var selected_circuit = [];
	var selected_city = [];
	var selected_bandwidth = [];
	var selected_status = [];
	var selected_po = [];
	var selected_segment = [];
	var selected_network = [];
	var selected_exp_loop =[];

	$.each($("#network option:selected"), function(){
		selected_network.push($(this).val());
	});

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

	$.each($("#expiry_manual_dropdown option:selected"), function(){
		selected_exp_loop.push($(this).val());
	});


	var selected_min_cost = $('#min_cost').text();
	var selected_max_cost = $('#max_cost').text();


//convert the date to standard format of miliseconds
if(exp_start)
{
	var dt_range_start = new Date(exp_start).getTime();
	var dt_range_end = new Date(exp_end).getTime();
}


if(selected_exp_loop && selected_exp_loop != 'ALL')
{
	var today = new Date();
	console.log(today);
	var today_add_month = today.setMonth(today.getMonth() + selected_exp_loop );
	today = today.getTime();
	console.log(today_add_month);
	console.log(today);
}



	//
	// if(selected_exp_start < '2020-07-04')
	// {
	// 	alert('date is smaller')
	// }



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
		zoom: 2,
		layers: [grayscale, physical],
		collapsed:false
	});
	}
	else {
		var map = L.map('map', {
			center: [39.73, -104.99],
			zoom: 2,
			layers: [grayscale, logical],
			collapsed:false
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





	console.log(selected_max_cost);


	$.ajax({
		type: "GET",
		url: data,
		datatype: "json",
		beforeSend: function(){
			$("#submit").addClass("loading"); 	 },
			success: function(data){



//-------------Filtering the data-------------------------


				data_status = data.filter(el => (selected_country.indexOf(el.A_end_site_Country) >= 0 ||
				selected_country.indexOf(el.B_end_site_Country) >= 0 || selected_country == '')
				&& (selected_city.indexOf(el.A_end_site_City) >= 0 ||
				selected_city.indexOf(el.B_end_site_City) >= 0 || selected_city == '')
				&& (selected_circuit.indexOf(el.OL_FULLNAME) >=0 || selected_circuit == ''));

			  var data = data_status.filter(el =>( selected_status.indexOf(el.Status) >=0 || selected_status == ' '  ) && ( selected_network.indexOf(el.Network_Type) >=0 || selected_network == ' '  ) );
				// data = data_status.filter(el =>( selected_network.indexOf(el.Network_Type) >=0 || selected_network == ' '  ));



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
console.log(data);
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
						console.log(data[i].OL_FULLNAME + '' + data[i].po_details[j].expiry_info);
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



console.log(data);

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
				if(today == today_add_month)
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


//------------------------------Call the Functions-----------------------------

console.log(data);

for(let i in data)
{
if(data[i].Lat_A != '' && data[i].Lat_B != '' && data[i].Long_A != '' && data[i].Long_B )
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
				map.flyTo([panTo_lat, panTo_lon],10);
				// logical.clearLayers();
				// physical.clearLayers();
				// plot_lines(i);


		}
		else {
			for (j in data[i].Segment_id)
			{
				if(data[i].Segment_id[j].Circuit_id == td)
				{
					// alert('Segment selected')
					map.removeLayer(logical);
					map.addLayer(physical);
					var panTo_lat = data[i].Segment_id[j].Lat_A;
					var panTo_lon =  data[i].Segment_id[j].Long_A;
					map.flyTo([panTo_lat, panTo_lon],10);

						};
						// var panTo_lat = data[i].Lat_A;
						// var panTo_lon =  data[i].Long_A;
						// map.flyTo([panTo_lat, panTo_lon],10);
						// logical.clearLayers();
						// physical.clearLayers();
						// plot_lines(i);


				}
		}
	}
});

// $( "#dataTable1" ).on('click', 'td', function(e){
// 	var td = ($(this).text());
// 	alert(td)
// 	for(i in data)
// {
// 	if(data[i].OL_FULLNAME == td)
// 		{
// 			map.removeLayer(physical);
// 			map.addLayer(logical);
// 			var panTo_lat = data[i].Lat_A;
// 			var panTo_lon =  data[i].Long_A;
// 			map.flyTo([panTo_lat, panTo_lon],10);
// 			// logical.clearLayers();
// 			// physical.clearLayers();
// 			// plot_lines(i);
//
// 		}
//
// 	else{
//
// 	}
// 	}
// });


				function show_tables(i, flag)
				{
					//Circuit Data

					if(flag == false)
					{
						var circuit_data = '<tr><td><a href="#map">' + data[i].OL_FULLNAME + '</a></td><td>'+ data[i].A_end_site + '</td><td>' + data[i].B_end_site + '</td><td>' + data[i].A_end_site_City + '</td><td>' + data[i].B_end_site_City + '</td><td>' + data[i].A_end_site_address + '</td><td>'+ data[i].B_end_site_address+ '</td><td>'+ data[i].speed_gbps + '</td><td>'+ data[i].IN_95_PCTL_Gbps + '</td><td>'+ data[i].OUT_95_PCTL_Gbps + '</td><td>'+ data[i].max_95pctl_gbps + '</td><td>' + data[i].Status + '</td><td>' + data[i].Hops + '</td><td>'+data[i].Monthly_Amount_In_USD_sum_6453 +'</td><td>'+ data[i].Monthly_Amount_In_USD_sum_all_lob+'</td><td>'+data[i].Network_Type +'</td><td>'+data[i].No_of_offnet + '</td></tr>';
						circuits_logical.push(data[i].OL_FULLNAME)
						$('#table_circuit').append(circuit_data);


					// Segments Data
					for (let j in data[i].Segment_id)
					{
						var segment_data = '<tr><td><a href="#map">' + data[i].OL_FULLNAME + '</a></td><td><a href="#map">' + data[i].Segment_id[j].Circuit_id + '</a></td><td>'+ data[i].Hops + '</td></tr>';
						$('#table_segment').append(segment_data);
					}


					for (let j in data[i].po_details)
					{
						if(data[i].po_details[j].po_number != '' && data[i].po_details[j].monthly_amount_in_usd  >= selected_min_cost &&  data[i].po_details[j].monthly_amount_in_usd  <= selected_max_cost )
						{
							var po_data = '<tr><td>' + data[i].OL_FULLNAME  +  '</td><td>' + data[i].po_details[j].po_number +'<td></td>'+data[i].po_details[j].NIMS_circuit_ID +'</td><td>'data[i].po_details[j].TIGER_OO +'<td></td>'data[i].po_details[j].bill_start_date+'</td><td>'data[i].po_details.[j].months+ '</td><td>' + data[i].po_details[j].monthly_amount_in_usd + '</td><td>' + data[i].po_details[j].expiry_info + '</td></tr>'
							// var po_data = '<tr><td>' + data[i].OL_FULLNAME  +  '</td><td>' + data[i].po_details[j].po_number + '</td><td>' + data[i].po_details[j].monthly_amount_in_usd + '</td><td>' + data[i].po_details[j].vendor_name + '</td><td>' + data[i].po_details[j].expiry_info+ '</td></tr>'

							$('#table_po').append(po_data);
						}
					}
				}

			}
//-----------------Mapping Markers and Lines -------------------------------------


				function plot_lines(i)
				{


					var content_A = L.DomUtil.create('div', 'infoWindow');
			 		// myPopup.innerHTML = "<div id='info'><p id='title'>" + users[i].title + "</p><p>" + users[i].addr + "</p></div>";

					var pointList = [[data[i].Lat_A, data[i].Long_A], [data[i].Lat_B, data[i].Long_B]];
					//Mapping logical circuits
					content_A.innerHTML = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].OL_FULLNAME + '</td></tr><tr><td> Status: </td><td>' + data[i].Status + "</td></tr></tbody></table>" + "<p id = 'click_more' ><a href='#table-container' >Click for more info</a></p>";
					// var content_B = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].OL_FULLNAME + '</td></tr><tr><td> Status: </td><td>' + data[i].Status + "</td></tr></tbody></table>" + "<p id = 'click_more'><a href='#table_circuit' >Click for more info </a></p>";



					$('#click_more', content_A).on('click', function() {
						// alert('please work');
							// console.log(i);
							$('#table-container').html('');
							$('#table-container')
							.html('<div class="ui sixteen wide columns"><div class="ui segment"><div class="ui menu top"><a class="active item" data-tab="circuit">Circuit</a><a class="item" data-tab="segment">Segment</a><a class="item" data-tab="po">PO Details</a></div><div class="ui tab active" data-tab="circuit" ><table class="ui celled table" id ="dataTable"><thead><tr><th>Circuit Id</th><th>A end Site</th><th>A End City</th><th>B End City</th><th>Status</th><th>Hops</th></tr></thead><tbody id="table_circuit"></tbody></table></div><div class="ui tab" data-tab="segment"><table class="ui celled table" id="dataTable1"><thead><tr><th>Circuit</th><th>Segment</th><th>Hops</th></tr></thead><tbody id="table_segment"></tbody></table></div><div class="ui tab" data-tab="po"><table class="ui celled table" id="dataTable2"><thead><tr><th>Circuit ID</th><th>PO Number</th><th>Amount in USD</th></tr></thead><tbody id="table_po"></tbody></table></div></div></div>');
							show_tables(i,flag=false) //attach the rows
							tabs(); //init tabs
					 });



					if(data[i].Network_Type == 'Onnet')
					{
						var color = 'blue';
					}
					else {
						var color = 'red'
					}
					var firstpolyline = new L.polyline(pointList,
						{
							color: 'red',
							weight: 3,
							opacity: 0.5,
							smoothFactor: 1,
							animate: 1500,

						}).addTo(logical).bindPopup(content_A,customOptions).on('click',function(){
							$('#table-container').html('');
							$('#table-container')
							.html('<div class="ui sixteen wide columns"><div class="ui segment"><div class="ui menu top"><a class="active item" data-tab="circuit">Circuit</a><a class="item" data-tab="segment">Segment</a><a class="item" data-tab="po">PO Details</a></div><div class="ui tab active" data-tab="circuit" ><table class="ui celled table" id ="dataTable"><thead><tr><th>Circuit Id</th><th>A End City</th><th>B End City</th><th>Status</th><th>Hops</th></tr></thead><tbody id="table_circuit"></tbody></table></div><div class="ui tab" data-tab="segment"><table class="ui celled table" id="dataTable1"><thead><tr><th>Circuit</th><th>Segment</th><th>Hops</th></tr></thead><tbody id="table_segment"></tbody></table></div><div class="ui tab" data-tab="po"><table class="ui celled table" id="dataTable2"><thead><tr><th>Circuit ID</th><th>PO Number</th><th>Amount in USD</th></tr></thead><tbody id="table_po"></tbody></table></div></div></div>');
							show_tables(i) //attach the rows
							tabs(); //init tabs
						}).setStyle({color: color}).on('mouseover', function (e) {
					 	this.openPopup();
					});
						L.marker([ data[i].Lat_A, data[i].Long_A]).bindPopup(content_A,customOptions).addTo(logical);
						L.marker([ data[i].Lat_B, data[i].Long_B]).bindPopup(content_A,customOptions).addTo(logical);


						//Mapping Physical Circuits
						for(let j in data[i].Segment_id)
						{

							if(data[i].Segment_id[j].Lat_A != '' && data[i].Segment_id[j].Lat_B != '' && data[i].Segment_id[j].Long_A != '' && data[i].Segment_id[j].Long_B != '')
							{


		 						var content_seg_A = L.DomUtil.create('div', 'infoWindow2');



							  content_seg_A.innerHTML = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].Segment_id[j].Circuit_id + '</td></tr><tr><td> Status: </td><td>' + data[i].Status + "</td></tr></tbody></table>" + "<p id = 'click_more'><a href='#table-container'>Click for more info </a></p>";
								// var pointA = new L.LatLng(data[i].Segment_id[j].Lat_A, data[i].Segment_id[j].Long_A);
								// var pointB = new L.LatLng(data[i].Segment_id[j].Lat_B, data[i].Segment_id[j].Long_B);


								$('#click_more', content_seg_A).on('click', function() {
									// alert('segm clikcekd');
									 console.log('segment circuit clicked ' + i);
									 $('#table-container').html('');
									 $('#table-container')
									 .html('<div class="ui sixteen wide columns"><div class="ui segment"><div class="ui menu top"><a class=" item" data-tab="circuit">Circuit</a><a class="active item" data-tab="segment">Segment</a><a class="item" data-tab="po">PO Details</a></div><div class="ui tab" data-tab="circuit" ><table class="ui celled table" id ="dataTable"><thead><tr><th>Circuit Id</th><th>A end Site</th><th>A End City</th><th>B End City</th><th>Status</th><th>Hops</th></tr></thead><tbody id="table_circuit"></tbody></table></div><div class="ui tab active" data-tab="segment"><table class="ui celled table" id="dataTable1"><thead><tr><th>Circuit</th><th>Segment</th><th>Hops</th></tr></thead><tbody id="table_segment"></tbody></table></div><div class="ui tab" data-tab="po"><table class="ui celled table" id="dataTable2"><thead><tr><th>Circuit ID</th><th>PO Number</th><th>Amount in USD</th></tr></thead><tbody id="table_po"></tbody></table></div></div></div>');
									 show_tables(i); //attach the rows
									 tabs(); //init tabs
								});

								var pointList = [[data[i].Segment_id[j].Lat_A, data[i].Segment_id[j].Long_A], [data[i].Segment_id[j].Lat_B, data[i].Segment_id[j].Long_B]];
								var firstpolyline = new L.polyline(pointList,{
									color: 'green',
									weight: 3,
									opacity: 0.5,
									smoothFactor: 1,

								}).bindPopup(content_seg_A).addTo(physical);

								// on('click',function(){
								// 	$('#table-container').html('');
								// 	$('#table-container')
								// 	.html('<div class="ui sixteen wide columns"><div class="ui segment"><div class="ui menu top"><a class="item" data-tab="circuit">Circuit</a><a class="active item" data-tab="segment">Segment</a><a class="item" data-tab="po">PO Details</a></div><div class="ui tab" data-tab="circuit" ><table class="ui celled table" id ="dataTable"><thead><tr><th>Circuit Id</th><th>A End City</th><th>B End City</th><th>Status</th></tr></thead><tbody id="table_circuit"></tbody></table></div><div class="ui active tab" data-tab="segment"><table class="ui celled table" id="dataTable1"><thead><tr><th>Circuit</th><th>Segment</th><th>Hops</th></tr></thead><tbody id="table_segment"></tbody></table></div><div class="ui tab" data-tab="po"><table class="ui celled table" id="dataTable2"><thead><tr><th>Circuit ID</th><th>PO Number</th><th>Amount in USD</th></tr></thead><tbody id="table_po"></tbody></table></div></div></div>');
								// 	show_tables(i) //attach the rows
								// 	tabs(); //init tabs
								// });;

								// var content_seg_B = "<table class='ui table celled'><tbody><tr><td>Circuit Name :</td><td>" + data[i].Segment_id[j].Circuit_id + '</td></tr><tr><td> Status: </td><td>' + data[i].Status + "</td></tr></tbody></table>";
								// console.log('Physical Circuit_id '+ data[i].Segment_id[j].Circuit_id);
								L.marker([ data[i].Segment_id[j].Lat_A, data[i].Segment_id[j].Long_A]).bindPopup(content_seg_A).addTo(physical);
								L.marker([ data[i].Segment_id[j].Lat_B, data[i].Segment_id[j].Long_B]).bindPopup(content_seg_A).addTo(physical);
							}
						}
						var panTo_lat = data[i].Lat_A;
						var panTo_lon =  data[i].Long_A;
						map.panTo(new L.LatLng(panTo_lat, panTo_lon));


					}


tabs();




function tabs(){

	$('.top.menu .item').tab();

					$('#dataTable').DataTable(
						{
							dom: 'Bfrtip',
							buttons: [

								{extend:   'copy',

								title : 'BB COST Report - Circuit Details'
							},
							{extend:   'print',

							title : 'BB COST Report - Circuit Details'
						},


						{extend:   'csv',

						title : 'BB COST Report - Circuit Details'
					},
					{extend:   'pdf',
					title : 'BB COST Report - Circuit Details'
				},
				{extend:   'excel',
				title : 'BB COST Report - Circuit Details'
			}



		],

	});
}



	$('#dataTable1').DataTable(
		{
			dom: 'Bfrtip',
			buttons: [

				{
					extend : 'copy',
					title :  'BB COST Report - Segment Info'
				},
				{
					extend: 'print',
					title : 'BB COST Report - Segment Info'
				},
				{extend:   'csv',

				title : 'BB COST Report - Segment Info'
			},
			{extend:   'pdf',
			title : 'BB COST Report - Segment Info'
		},
		{extend:   'excel',
		title : 'BB COST Report - Segment Info'
	}



],

title: 'BB COST Report - Segment Info'


}
);



$('#dataTable2').DataTable(
	{
		dom: 'Bfrtip',
		buttons: [

			{
				extend : 'copy',
				title :  'BB COST Report - PO Details'
			},
			{
				extend: 'print',
				title : 'BB COST Report - PO Details'
			},


			{extend:   'csv',

			title : 'BB COST Report - PO Details'
		},
		{extend:   'pdf',
		title : 'BB COST Report - PO Details'
	},
	{extend:   'excel',
	title : 'BB COST Report - PO Details'
}



],

});













$("#submit").removeClass("loading");


}
});
$( ".acc" ).accordion({
	collapsible:true,

});

}
