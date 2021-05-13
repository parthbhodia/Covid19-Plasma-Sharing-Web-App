

<?php


include('../../includes/fixed_header.php');
/*
//get the all files from the directory
$files = glob("data/*.json");

$latest_ctime = 0;
$latest_filename = '';

//get the latest modified file
foreach($files as $file)
{
if (is_file($file) && filectime($file) > $latest_ctime)
{
$latest_ctime = filectime($file);
$latest_filename = basename($file,'.json');
}
}
//print_r($latest_filename);
*/
?>
<html>
<head>
	
	<title>IPT BB COST</title>
	
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<!-- LINK -->
	<script>
	
	
	function linknotfound(){
		alert('Site is under maintainece. Some function may not work. Sorry for the inconvenience.');
	}
</script>
<link rele"shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />
<!-- Links for Semantic UI -->

<link rel="stylesheet" href="../../Leaflet-master/dist/leaflet.css" />
<link rel="stylesheet" href="http://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.20/css/dataTables.semanticui.min.css">
<link rel="stylesheet" href="css/slider.css">
<link rel="stylesheet" href="css/jquery-ui.css">


<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.6.1/css/buttons.dataTables.min.css">
<!--	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"> -->
<link rel="stylesheet" href="../../Leaflet-master/Leaflet.fullscreen/dist/leaflet.fullscreen.css">

<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/accordion.min.css"> -->
<!--	<script defer src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" charset="utf-8"></script>
-->

<!--	<script defer src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js" charset="utf-8"></script>
-->

<script defer src="../../Leaflet-master/src/leaflet.js" onerror="linknotfound()"></script>
<script defer type="text/javascript" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
<script defer type="text/javascript" src="https://cdn.datatables.net/1.10.20/js/dataTables.semanticui.min.js"></script>

<script defer  src="js/main_atob.js" charset="utf-8"></script>
<script defer src="js/slider.js" charset="utf-8"></script>
<script defer src="js/jquery-ui.min.js" charset="utf-8"></script>


<script defer src="https://cdn.datatables.net/buttons/1.6.1/js/dataTables.buttons.min.js" charset="utf-8"></script>
<script defer src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.flash.min.js" charset="utf-8"></script>



<script defer src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.html5.min.js" charset="utf-8"></script>
<script defer src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.print.min.js" charset="utf-8"></script>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>

<!--	<script defer src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> -->
<script defer src="js/helper.js" charset="utf-8"></script>

<script defer src="js/lob.js" charset="utf-8"></script>
<script defer src="js/unmapped.js" charset="utf-8"></script>
<script defer src="js/leaflet.curve.js" charset="utf-8"></script>
<script defer src = "../../Leaflet-master/Leaflet.fullscreen/dist/Leaflet.fullscreen.js"> </script>




<style>
html {
	scroll-behavior: smooth;
}

#map {
	width: 100%;
	height: 800px;
}



/* css to customize Leaflet default styles  */
/* .custom .leaflet-popup-tip,
.custom .leaflet-popup-content-wrapper {
background: #e93434;
color: #ffffff
font-size: 8px;
width: 120%;
} */

</style>


</head>

<body>
	
<div class='ui main container'>
	
		<div class="row">
			<div class="six wide column">
				
				<div class="ui breadcrumb">
					<a class="section" href="../index.php"> Home</a>
					<div class="divider"> / </div>
					<a class="section" href="../index.php"> IPT </a>
					<div class="divider"> / </div>
					<div class="active section">AS6453 Network Backbone Map</div>
				</div>
			</div>
		</div>
		
		
	
		<div class = 'ui segment '>
			
			
			<div class="ui four column centered grid">
				<div class="row">
					<h1 class="ui header">AS6453 BACKBONE MAP </h1>
				</div>
				<div class = 'row'>
					<div class="ui calendar calendar_drop center aligned" id="example7">
						<div class="ui input left icon">
							<i class="calendar icon"></i>
							<input type="text"  id='date' name='date' placeholder="From" class="datepickeryear wrapper-dropdown-3" data-toggle="popover" data-trigger="hover" data-placement="top"  autocomplete ='' value='March 2020' />
						</div>
					</div>
				</div>
			</div>

			<div class="ui relaxed grid ">
				
				<div class="four wide column">
	 	    		<div class="row">
					<br>
						<div class="ui sub header">Select Country</div>
							<select 
 							 id = 'country' class="ui search fluid dropdown multiple" autocomplete ='off' multiple = ''></select>
						</div>
					<br>	
					<div class="ui two column centered grid">
						<div class="row">
							<div class="eight wide column">
								<div class="ui sub header" >Select City</div>
									<select   id = 'city' class="ui search fluid dropdown multiple" multiple = '' autocomplete ='off' ></select>
								</div>

							<div class="eight wide  column">
								<div class="ui sub header" >Select City</div>
									<select   id = 'city' class="ui search fluid dropdown multiple" multiple = '' autocomplete ='off' ></select>
								</div>
						</div>
					</div>
					</div>

					

					<div class="twelve wide column">
						<div class="row">
							<div id = 'map-container'>
								<div id='map'></div>
							</div>
						</div>
									
					</div>
					<!-- <div class=" twelve wide unstackable column">
						<div class = 'ui segment '>

							<div class="row">
								 <div id = 'map-container'>
									<div id='map'></div>
								</div> 
							</div>
					
						</div>
					</div> -->
				
				</div>
			</div>
    
      
   
	
	<!-- Table Container - Data Tables -->
	<?php
	if(hasPerm([2,5,9,10],$user->data()->id)){
		?>
		
		<div class = "row" id ='table-container'>
			<div class='ui sixteen wide columns'>
				<div class="ui segment">
					
					
					<div class="ui menu top" id='tabs'>
						<a class="item" data-tab="po">PO Details</a>
						
						<a class="active item" data-tab="circuit">Circuit</a>
						
						<a class="item" data-tab="segment">Segment</a>
						
						<a class="item" data-tab="lob">LOB Total Cost</a>
						
						<a class="item" data-tab="po_unmapped">PO Unmapped</a>
						
					</div>
					
					
					
					<div class="ui tab active" data-text='BB Cost 6453 - Circuit Report' data-tab="circuit" style="overflow-x:auto;" >
						<table class="ui celled table" id ="table_circuit">
							<thead>
								<tr>
									<th>Circuit Id</th>
									<th>A end Site</th>
									<th>B end Site</th>
									<th>A End City</th>
									<th>B End City</th>
									<th>A End Address</th>
									<th>B End Address</th>
									<th>Speed (Gbps)</th>
									<th>IN 95 PCTL(Gbps)</th>
									<th>OUT 95 PCTL(Gbps)</th>
									<th>MAX 95 PCTL(Gbps)</th>
									<th>Status</th>
									<th>Hops</th>
									<th>Monthly Amount In USD(6453)</th>
									<th>Monthly Amount In USD(All LOB)</th>
								</tr>
							</thead>
							<tbody id = 'tbody_circuit'>
							</tbody>
						</table>
					</div>
					
					<div class="ui tab" data-text='BB Cost 6453 - Segment Report' data-tab="segment">
						<table class="ui celled table" id="table_segment">
							<thead>
								<tr>
									<th>Circuit</th>
									<th>Segment</th>
									<th>Hops</th>
								</tr>
							</thead>
							<tbody id="tbody_segment"></tbody>
						</table>
					</div>
					
					<div class="ui tab" data-text='BB Cost 6453 - PO Report' data-tab="po">
						<table class="ui celled table" id="table_po">
							<thead>
								<tr>
									<th>Circuit ID</th>
									<th>PO Number</th>
									<th>NIMS Circuit ID</th>
									<th>TIGER OO</th>
									<th>Bill Start Date(NEW MRC)</th>
									<th>Contract term in Month</th>
									<th>Amount in USD</th>
									<th>Vendor Name</th>
									<th>Expiry Date</th>
								</tr>
							</thead>
							<tbody id="tbody_po">
							</tbody>
						</table>
					</div>
					
					
					
					<div class="ui tab" data-text='BB Cost 6453 - LOB Report' data-tab="lob" >
						<table id="table_lob" class="ui celled table striped">
							<thead>
								<tr>
									<th rowspan="2" style="width:10%"></th>
									<th colspan="2" style="width:10%" >Mapped with IPT BB Circuit</th>
									<th colspan="2" style="width:10%" >Not mapped with IPT BB Circuit</th>
									<th colspan="2" style="width:10%" >Total BACKBONE - IP 6453 Cost</th>
								</tr>
								<tr>
									<th>No of POs</th>
									<th>Monthly cost in USD</th>
									<th>No of POs</th>
									<th>Monthly cost in USD</th>
									<th>No of POs</th>
									<th>Monthly cost in USD</th>
									
								</tr>
							</thead>
							<tbody id = 'tbody_lob'>
							</tbody>
							
						</table>
					</div>
					
					<div class="ui tab" data-tab="po_unmapped"  data-text='BB Cost 6453 - Unmapped PO Report' style="overflow-y:hidden;overflow-x: auto;">
						<table id="table_po_unmapped" class="ui celled table nowrap stripped" style="width:100%">
							<thead>
								<tr>
									
									<th> PO Number</th>
									<th>TIGER OO</th>
									<th>NIMS Circuit ID</th>
									<th>Total Qauntity</th>
									<th>Speed/Bandwidth</th>
									<th>Bandwidth Type</th>
									<th>Expiry Date</th>
									<th>Site A Name</th>
									<th>Site B Name</th>
									<th>Monthly Amount in USD</th>
									<th>Line of Business</th>
									
								</tr>
							</thead>
							
							<tbody id="tbody_po_unmapped">
							</tbody>
							
							
						</table>
					</div>
					
					
				</div>
			</div>
		</div> <!-- Table End -->
		
		<?php
	}
	?>
	
	
</div> <!-- Container End -->
</div>

<br>
<br>

<script>

//init the code
//bb_cost()

$( document ).ready(function() {
	
	function linknotfound(){
		alert('Site is under maintainece. Some function may not work. Sorry for the inconvenience.');
	}
	
	// File Filter
	
	
	var max_date = '<?php echo $latest_filename ?>';
	
	$('#date').attr('value',max_date);
	
	//converting string to timestamp format
	var max  = Date.parse(max_date);
	
	//converting timestamp to Date Format
	date_format = new Date(max);
	m = date_format.getMonth();
	y = date_format.getFullYear();
	
	
	//alert(y);
	$('.calendar_drop').calendar({
		type: 'month',
		onChange: function (date, text) {
			var year = text.replace(" ","_");
			clear_datatables();
			bb_cost(year)
		},
		minDate: new Date(2020, 02),
		maxDate:  new Date(y,m),
		
		//initialDate: new Date(2020,12),
		
	});
	
	bb_cost();
	//Main Function
	function bb_cost(year=''){
		
		if(!year){
			var str =$('#date').val();
			year = str.replace(" ","_");
		}
		// $('#map-container').html('');
		// $('#map-container').html('<div id = "map"></div>');
		//
		$('#tabs').tab();
		$('.top.menu .item').tab();
		
		
		var pageTitle = "<?php echo  $pageTitle; ?>";
		
		var list_of_tabs_tbody = ['po',]
		//Init dropdowns
		var list_of_dropdowns = ['city','country','network', 'status','segment','bandwidth','po_number', 'circuit'];
		
		for(let i in list_of_dropdowns)
		{
			$('#' + list_of_dropdowns[i]).dropdown('clear');
			//	$('#' + list_of_dropdowns[i]).parent().addClass('loading');
			
		}
		
		$('#status').dropdown('set selected', 'All');
		
		/*
		$('#country').parent().addClass('loading');
		$('#city_a').parent().addClass('loading');
		
		$('#bandwidth').parent().addClass('loading');
		$('#circuit').parent().addClass('loading');
		$('#segment').parent().addClass('loading');
		$('#po_number').parent().addClass('loading');
		
		*/
		
		
		//Map
		$('#map-container').html('');
		$('#map-container').html('<div id = "map"></div>');
		var map = L.map('map',{
			doubleClickZoom:true,
			dragging:true,
			trackResize	:true,
			inertia: true,
			keyboard: true,
			tap: true,
			fadeAnimation: true,
			zoomAnimation	:true,
			markerZoomAnimation:true,
			inertiaDeceleration: 3000,
			easeLinearity: 0.2,
			// fullscreenControl: {
			// 	pseudoFullscreen: true},
			// layers: [mapnikLayer]
		}).setView([46.05, 11.05], 2); //gave initial position to the map with zoom level defined.
		
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 13,
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			id: 'mapbox.light'
		}).addTo(map);
		
		//init Tabs
		$('.tabular.menu .item').tab();
		$('#tabs').tab();
		// $('#expiry_tab').tab();
		
	}
	
});

</script>




</html>
