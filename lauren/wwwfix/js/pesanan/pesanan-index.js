function load_pesanan_index(e, page) {
    proses();    
}

function proses()
{
  var object = document.getElementById("borderproses");
  object.setAttribute("class", "col activated");

  var object2 = document.getElementById("btnProses");
  object2.setAttribute("style", "color: #F32E25");
  object2.setAttribute("onclick", "");

  var object3 = document.getElementById("borderselesai");
  object3.setAttribute("class", "col");

  var object4 = document.getElementById("btnSelesai");
  object4.setAttribute("style", "color: #9B9B9B");
  object4.setAttribute("onclick", "selesai()");

  $$('#Pesanan').html("");
  var id=13;

  app.request.post('http://localhost/myorder/pesanan/pesananproses.php', {pesanan_id: id}, function (data) 
  {
      var pesanan = JSON.parse(data);
      for(var i=0; i < pesanan['data'].length; i++) 
      {
        if(pesanan['data'][i]['driver_id'] == "" || pesanan['data'][i]['driver_id'] == null)
        {
          var date = FormatDate(pesanan['data'][i]['transaction_date']);
          var time = FormatTime(pesanan['data'][i]['transaction_time']);

          $$('#Pesanan').append(         
            '<div class="card card-outline" style="margin: 1rem;">' +
             '<div class="card-content card-content-padding">' +
                '<div class="row orderlist">' +
                  '<div class="col-66">' +
                    '<b>[' + pesanan['data'][i]['transaction_id'] + ']</b>' +
                    '<p>Driver: <label>-</label></p>' +
                   '</div>' +
                  '<div style="color: #F32E25;" class="col-33">' +
                     '<b>Status</b>' +
                    '<p>' + pesanan['data'][i]['transaction_status'] + '</p>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="card-footer">' +
                '<label>'+ date+ ' / ' + time + '</label>' +
              '</div>' +
            '</div>' 
          );
        }   
        else
        {
          var count = i;
          var date = FormatDate(pesanan['data'][count]['transaction_date']);
          var time = FormatTime(pesanan['data'][count]['transaction_time']);
          app.request.post('http://localhost/myesto/pesanan/driver.php', {driver_id: pesanan['data'][i]['driver_id']}, function (data2) 
          {
              var driver =JSON.parse(data2);
              
              $$('#Pesanan').append(         
                '<div class="card card-outline" style="margin: 1rem;">' +
                  '<div class="card-content card-content-padding">' +
                      '<div class="row orderlist">' +
                        '<div class="col-66">' +
                          '<b>[' + pesanan['data'][count]['transaction_id'] + ']</b>' +
                          '<p>Driver: <label>'+ driver['data'][0]['user_name'] + '</label></p>' +
                        '</div>' +
                        '<div style="color: #F32E25;" class="col-33">' +
                          '<b>Status</b>' +
                          '<p>' + pesanan['data'][count]['transaction_status'] + '</p>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                    '<div class="card-footer">' +
                      '<label>'+ date + ' / ' + time + '</label>' +
                    '</div>' +
                '</div>' 
              );  
          });
        }                     
      }
  });
}

function selesai()
{
  var object = document.getElementById("borderselesai");
  object.setAttribute("class", "col activated");

  var object2 = document.getElementById("btnSelesai");
  object2.setAttribute("style", "color: #F32E25");
  object2.setAttribute("onclick", "");

  var object3 = document.getElementById("borderproses");
  object3.setAttribute("class", "col");

  var object4 = document.getElementById("btnProses");
  object4.setAttribute("style", "color: #9B9B9B");
  object4.setAttribute("onclick", "proses()");

  $$('#Pesanan').html("");
  var id=13;

  app.request.post('http://localhost/myresto/pesanan/pesananselesai.php', {pesanan_id: id}, function (data) 
  {
    var pesanan = JSON.parse(data);
    for(var i=0; i < pesanan['data'].length; i++) 
    {
      if(pesanan['data'][i]['driver_id'] == "" || pesanan['data'][i]['driver_id'] == null)
      {
        var date = FormatDate(pesanan['data'][i]['transaction_date']);
        var time = FormatTime(pesanan['data'][i]['transaction_time']);

        $$('#Pesanan').append(         
          '<div class="card card-outline" style="margin: 1rem;">' +
           '<div class="card-content card-content-padding">' +
              '<div class="row orderlist">' +
                '<div class="col-66">' +
                  '<b>[' + pesanan['data'][i]['transaction_id'] + ']</b>' +
                  '<p>Driver: <label>-</label></p>' +
                 '</div>' +
                '<div style="color: #F32E25;" class="col-33">' +
                   '<b>Status</b>' +
                  '<p>' + pesanan['data'][i]['transaction_status'] + '</p>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="card-footer">' +
              '<label>'+ date+ ' / ' + time + '</label>' +
            '</div>' +
          '</div>' 
        );
      }   
      else
      {
        var count = i;
        var date = FormatDate(pesanan['data'][count]['transaction_date']);
        var time = FormatTime(pesanan['data'][count]['transaction_time']);
        app.request.post('http://localhost/myresto/pesanan/driver.php', {driver_id: pesanan['data'][i]['driver_id']}, function (data2) 
        {
            var driver =JSON.parse(data2);
            
            $$('#Pesanan').append(         
              '<div class="card card-outline" style="margin: 1rem;">' +
                '<div class="card-content card-content-padding">' +
                    '<div class="row orderlist">' +
                      '<div class="col-66">' +
                        '<b>[' + pesanan['data'][count]['transaction_id'] + ']</b>' +
                        '<p>Driver: <label>'+ driver['data'][0]['user_name'] + '</label></p>' +
                      '</div>' +
                      '<div style="color: #F32E25;" class="col-33">' +
                        '<b>Status</b>' +
                        '<p>' + pesanan['data'][count]['transaction_status'] + '</p>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                  '<div class="card-footer">' +
                    '<label>'+ date + ' / ' + time + '</label>' +
                  '</div>' +
              '</div>' 
            );  
        });
      }                     
    }
  });

}

function FormatDate(date)
{
    var monthlist = Array("Januari", "Febuari", "Maret", "April", "Mei", 
                      'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 
                      'November', 'Desember')

    var split = date.split('-');

    var month = monthlist[split[1]];

    var text = split[2] + " " + month + " " + split[0];

    return text;
}

function FormatTime(time)
{
    var split = time.split(':');
    var text = "";
    if(split[0] >= 12)
    {
       var jam = split[0] - 12;
       text = jam + ":" + split[1] + " PM";
    }
    else
    {
       text = split[0] + ":" + split[1] + " AM";
    }

    return text;
}