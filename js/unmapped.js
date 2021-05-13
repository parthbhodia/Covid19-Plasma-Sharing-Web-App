function unmapped_table(year,pageTitle){
$.ajax({
	url: "data/unmapped/UNMAPPED_"+year+".json",
	dataType: "json",
})
.done(function (result){
	$("#tbody_po_unmapped").empty();

	if ($.fn.DataTable.isDataTable("#table_po_unmapped")) {
	$('#table_po_unmapped').DataTable().clear().destroy();
	}
	var txt_po_unmapped = "";
	var fill_data = [];
        //console.log(result);

	
	$.each(result, function(i, value) {



		var check = fill_data.includes(result[i].PO_no);
		if(check == false)
		{
			fill_data.push(result[i].PO_no);
			txt_po_unmapped += "<tr><td>" + result[i].PO_no + "</td><td>" + result[i].TIGER_OO + "</td><td>" + result[i].NIMS_Circuit_ID + "</td><td>" +  result[i].Total_Qauntity + "</td><td>" + result[i].Speed + "</td><td>" + result[i].Bandwidth_Type + "</td><td>" + result[i].expiry_info + "</td><td>" +  result[i].Site_A_Name + "</td><td>" + result[i].Site_B_Name + "</td><td>" + result[i].Monthly_Amount_in_USD   +"</td><td>" + result[i].Line_of_Business + "</td></tr>";
		}
	});
	$("#tbody_po_unmapped").append(txt_po_unmapped);
	
	var unmapped_title = "BB Cost 6453 Report - Unmapped POs - " + year;

	$('#table_po_unmapped').DataTable(
	{
		lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],

		dom: 'Blfrtip',
		buttons: [

			{
				extend : 'copy',
				title :  unmapped_title
			},
			{
				extend: 'print',
				title :  unmapped_title
			},


			{extend:   'csv',

			title :  unmapped_title
		},
		{extend:   'pdf',
		title :  unmapped_title
	},
	{extend:   'excel',
	title :  unmapped_title
	}



	],

	});

});

   

$('.dt-button').click( function (e) {
  var parent_id = $(this).parent().parent().parent().attr('data-text');
  var date, report, format, download = '';
  report = "Downloaded: " + parent_id;
 /// alert(table.button( this ))
    format = "Format: " + e.target.innerText;
        // console.log(e.target.parentElement.parentElement.parentElement.parentElement.dataset.tab);
          var year_str = year.replace('_',' ');
            date = "Selected Year: " + year_str;
              download =  date + ', ' + report + ", " + format;
 
                      $.ajax({
                              url: '../../logger.php',
                                      type: 'POST',
                                              data: {pageTitle: pageTitle, download_bb_unmap: download},
                                                      success: function(result){

 
                                                                              }
 
                                                                                      });
 
                                                                                      } );
 
 







}
