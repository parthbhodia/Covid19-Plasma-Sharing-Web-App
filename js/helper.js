function clear_datatables(){


  $("#tbody_circuit").empty();
  $("#tbody_segment").empty();
  $("#tbody_po").empty();


  if ($.fn.DataTable.isDataTable("#table_circuit")) {
  $('#table_circuit').DataTable().clear().destroy();
  $('#table_segment').DataTable().clear().destroy();
  $('#table_po').DataTable().clear().destroy();
  }
}

function init_datatables(year,pageTitle){


var circuit_title = "BB Cost 6453 Report - Circuit Details - " + year;

  $('.top.menu .item').tab();

  $('#table_circuit').DataTable(
    {
      dom: 'Blfrtip',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      buttons: [

        {extend:   'copy',
        title : circuit_title
      },
      {extend:   'print',

      title : circuit_title
    },


    {extend:   'csv',

    title : circuit_title
  },
  {extend:   'pdf',
  title : circuit_title,
},
{extend:   'excel',
title : circuit_title
}



],

});




var segment_title = "BB Cost 6453 Report - Segment Details - " + year;

$('#table_segment').DataTable(
{
  dom: 'Blfrtip',
  lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],

  buttons: [

    {
      extend : 'copy',
      title :  segment_title
    },
    {
      extend: 'print',
      title : segment_title
    },
    {extend:   'csv',

    title : segment_title
  },
  {extend:   'pdf',
  title : segment_title
},
{extend:   'excel',
title : segment_title
}



],

title: segment_title
});


var po_title = "BB Cost 6453 Report - PO Details - " + year;

$('#table_po').DataTable(
{
  dom: 'Blfrtip',
  lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],

  buttons: [

    {
      extend : 'copy',
      title :  po_title
    },
    {
      extend: 'print',
      title : po_title
    },


    {extend:   'csv',

    title : po_title
  },
  {extend:   'pdf',
  title : po_title
},
{extend:   'excel',
title : po_title
}



],

});

$('.dt-button').click( function (e) {
  var parent_id = $(this).parent().parent().parent().attr('data-text');
  var date, report, format, download = '';
  report = "Downloaded: " + parent_id;
  // alert(table.button( this ))
  format = "Format: " + e.target.innerText;
    // console.log(e.target.parentElement.parentElement.parentElement.parentElement.dataset.tab);
  var year_str = year.replace('_',' ');	
  date = "Selected Year: " + year_str; 
  download =  date + ', ' + report + ", " + format;
  	
	$.ajax({
	url: '../../logger.php',
	type: 'POST',
	data: {pageTitle: pageTitle, download_bb_tab: download},
	success: function(result){
		console.log(result)
		
	}
	
	});

} );

}
