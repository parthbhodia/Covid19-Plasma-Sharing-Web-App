function lob_table(year,pageTitle){
$.ajax({
  type: "GET",
  url: "data/lob/Lob_"+year+".json",
  datatype: "json",
  success: function(result){

    $("#tbody_lob").empty();

    if ($.fn.DataTable.isDataTable("#table_lob")) {
    $('#table_lob').DataTable().clear().destroy();
    //console.log('lob table destroyed');
    }

      var fill_lob = [];
      var txt_lob = " ";
      $.each(result, function(i, value) {

        var check = fill_lob.includes(result[i].Line_of_Business);
        // console.log(check);
        if(check == false){
          console.log(check);
          fill_lob.push(result[i].Line_of_Business);
          txt_lob += "<tr><td>" + result[i].Line_of_Business+ "</td><td>" + result[i].Count_pono_mapped+ "</td><td>" + result[i].Monthly_Amount_in_USD_mapped + "</td><td>" + result[i].Count_pono_unmapped + "</td><td>" + result[i].Monthly_Amount_in_USD_unmapped +  "</td><td>" + result[i].POs_total_count +  "</td><td>" + result[i].Monthly_cost_total + "</td></tr>"
        }
      });
      $("#tbody_lob").append(txt_lob);
      // $('#table_lob').DataTable();
      var lob_title = "BB Cost 6453 Report - LOB Details - " + year;

      $('#table_lob').DataTable(
      {
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],

        dom: 'Blfrtip',
        buttons: [

          {
            extend : 'copy',
            title :  lob_title
          },
          {
            extend: 'print',
            title :  lob_title
          },


          {extend:   'csv',

          title :  lob_title
        },
        {extend:   'pdf',
        title :  lob_title
      },
      {extend:   'excel',
      title :  lob_title
      }



      ],

      });

    }
    });

      
     
 
$('.dt-button').click( function (e) {
  var parent_id = $(this).parent().parent().parent().attr('data-text');
  var date, report, format, download = '';
  report = "Downloaded: " + parent_id;
  //alert(table.button( this ))
    format = "Format: " + e.target.innerText;
        // console.log(e.target.parentElement.parentElement.parentElement.parentElement.dataset.tab);
          var year_str = year.replace('_',' ');
            date = "Selected Year: " + year_str;
              download =  date + ', ' + report + ", " + format;
 
                      $.ajax({
                              url: '../../logger.php',
                                      type: 'POST',
                                              data: {pageTitle: pageTitle, download_bb_lob: download},
                                                      success: function(result){

										console.log('lob logged');
                                                                              }
 
                                                                                      });
 
                                                                                      } );
  
  
   
  
 



    
   
  }
