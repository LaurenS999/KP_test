function load_pesanan(e, page)
{
    cekrole_pesanan();

    Tab_1();
}

function pesananlist(status)
{
    var store_id = "";
    if (localStorage.user_role == "Admin")
    {
        store_id = $$("#pesanan_idresto").html();
    }
    else
    {
        store_id = localStorage.cabang;
    }

    app.request({
        method: "POST",
        url: "http://localhost/myorder/pesanan/pesananlist.php",
        data: {
            uid : localStorage.user_id,
            role : localStorage.user_role,
            status: status,
            storeId: store_id,
        },
        success: function(data) {
            var obj = JSON.parse(data);
            if (obj['result'] == "Berhasil")
            {
                if (localStorage.user_role == "Pelanggan")
                {
                    $$(".listpesan-customer").html("");
                    for(var i=0; i < obj['data'].length; i++)
                    {
                        var tanggal = formatTanggal(obj['data'][i]['transaction_date']);
                        var time = FormatTime(obj['data'][i]['transaction_time']);
                        //DISPLAY KODE
                        var tanggaltext = obj['data'][i]['transaction_date'].replace(/\-/g, '');
                        var ordernumbertext = pad_ordernumber(obj['data'][i]['transaction_order_number']);

                        $driver ="";
                        if (obj['data'][i]['user_name'] != "")
                        {
                            $driver = obj['data'][i]['user_name'];
                        }
                        else
                        {
                            $driver = "-";
                        }

                        $$('.listpesan-customer').append(
                            "<a style='color: black;' href='/pesanandetil/"+ obj['data'][i]['transaction_id'] + "'>" +
                                ' <div class="card card-outline">' +
                                    ' <div class="card-content card-content-padding">'+
                                            '<div class="row">'+
                                                '<div class="col-66">'+
                                                    '<p><b>['+ tanggaltext + ordernumbertext +']</b></p>'+
                                                    '<p>Driver: <label>'+ $driver +'</label></p>'+
                                                '</div>'+
                                                '<div style="color: #F32E25;" class="col-33">'+
                                                    '<b>Status</b>'+
                                                    '<p>'+obj['data'][i]['transaction_status'] +'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="card-footer">'+
                                            '<label>'+ tanggal+ ' | '+ time +'</label>'+
                                        '</div>'+
                                '</div>' +
                            '</a>'
                        );
                    }    
                }
                else if(localStorage.user_role == "Driver")
                {
                    $$(".listpesan-driver").html("");
                    for(var i=0; i < obj['data'].length; i++)
                    {
                        var tanggal = formatTanggal(obj['data'][i]['transaction_date']);
                        var time = FormatTime(obj['data'][i]['transaction_time']);
                        //DISPLAY KODE
                        var tanggaltext = obj['data'][i]['transaction_date'].replace(/\-/g, '');
                        var ordernumbertext = pad_ordernumber(obj['data'][i]['transaction_order_number']);
                        $$('.listpesan-driver').append(
                            "<a style='color: black;' href='/pesanandetil/"+ obj['data'][i]['transaction_id'] + "'>" +
                                '<div class="card card-outline">'+
                                    '<div class="card-content card-content-padding">'+
                                        '<div class="row">'+
                                            '<div class="col-66">'+
                                                '<p><b>[' + tanggaltext + ordernumbertext  +']</b></p>'+
                                                '<p>Pelanggan: <label>'+ obj['data'][i]['user_name'] +'</label></p>'+
                                            '</div>'+
                                            '<div style="color: #F32E25;" class="col-33">'+
                                                '<b>Status</b>'+
                                                '<p>'+ obj['data'][i]['transaction_status'] +'</p>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="card-footer">'+
                                        '<label>'+ tanggal +' | '+ time +'</label>'+
                                    '</div>'+
                                '</div>' +
                            '</a>'
                        );
                    }
                }
                else if(localStorage.user_role == "Admin" && status=="Masuk" || localStorage.user_role == "Kasir" && status=="Masuk")
                {
                    $$(".listpesan-kasir").html("");
                    for(var i=0; i < obj['data'].length; i++)
                    {                    
                        var tanggal = formatTanggal(obj['data'][i]['transaction_date']);
                        var time = FormatTime(obj['data'][i]['transaction_time']);

                        //DISPLAY KODE
                        var tanggaltext = obj['data'][i]['transaction_date'].replace(/\-/g, '');
                        var ordernumbertext = pad_ordernumber(obj['data'][i]['transaction_order_number']);
                        $$('.listpesan-kasir').append(
                            "<a style='color: black;' href='/pesanandetil/"+ obj['data'][i]['transaction_id'] + "'>" +
                                '<div class="card card-outline">' +
                                    '<div class="card-content card-content-padding">'+
                                            '<div class="row">'+
                                                '<div class="col-66">'+
                                                    '<p><b>['+ tanggaltext +ordernumbertext +']</b></p>'+
                                                    '<p>Pelanggan: <label>'+ obj['data'][i]['user_name'] +'</label></p>'+
                                                '</div>'+
                                                '<div style="color: #F32E25;" class="col-33">'+
                                                    '<b>Status</b>'+
                                                    '<p>'+obj['data'][i]['transaction_status'] +'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="card-footer">'+
                                            '<label>'+ tanggal+ ' | '+ time +'</label>'+                                            
                                        '</div>'+
                                '</div>' +
                            '</a>'
                        );
                    }  
                }
                else if(localStorage.user_role == "Admin" && status=="Kirim" || localStorage.user_role == "Kasir" && status=="Kirim")
                {
                    $$(".listpesan-kasir").html("");
                    for(var i=0; i < obj['data'].length; i++)
                    {                    
                        var tanggal = formatTanggal(obj['data'][i]['transaction_date']);
                        var time = FormatTime(obj['data'][i]['transaction_time']);

                        //DISPLAY KODE
                        var tanggaltext = obj['data'][i]['transaction_date'].replace(/\-/g, '');
                        var ordernumbertext = pad_ordernumber(obj['data'][i]['transaction_order_number']);
                        $$('.listpesan-kasir').append(
                            "<a style='color: black;' href='/pesanandetil/"+ obj['data'][i]['transaction_id'] + "'>" +
                                '<div class="card card-outline">' +
                                    '<div class="card-content card-content-padding">'+
                                            '<div class="row">'+
                                                '<div class="col-66">'+
                                                    '<p><b>['+ tanggaltext + ordernumbertext +']</b></p>'+
                                                    '<p>Pelanggan: <label>'+ obj['data'][i]['pelanggan_nama'] +'</label></p>'+
                                                '</div>'+
                                                '<div style="color: #F32E25;" class="col-33">'+
                                                    '<b>Status</b>'+
                                                    '<p>'+obj['data'][i]['transaction_status'] +'</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="card-footer">'+
                                            '<label>'+ tanggal+ ' | '+ time +'</label>'+                                            
                                            '<label>Driver: '+ obj['data'][i]['driver_nama'] +'</label>'+                                            
                                        '</div>'+
                                '</div>' +
                            '</a>'
                        );
                    }
                }
            }
            else
            {
                if (localStorage.user_role == "Pelanggan")
                {
                    $$('.listpesan-customer').html('<h4 id="statusPesananKosong">Anda belum melakukan pesanan apapun.</h4>');
                    $$('#statusPesananKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'10rem'});
                }
                else if (localStorage.user_role == 'Driver')
                {
                    $$('.listpesan-driver').html('<h4 id="statusPesananKosong">Belum ada pesanan yang diproses.</h4>');
                    $$('#statusPesananKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'10rem'});
                }
                else if (localStorage.user_role == 'Kasir' || localStorage.user_role == 'Admin')
                {
                    $$('.listpesan-kasir').html('<h4 id="statusPesananKosong">Belum ada pesanan yang masuk.</h4>');
                    $$('#statusPesananKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'10rem'});
                }
            }
        }
    });
}


function Tab_1()
{
    if (localStorage.user_role == 'Driver')
    {
        $$(".listpesan-driver").html("");
        $$(".status-driver").html(
            '<div class="col activated"><a><b>Sedang Diproses</b></a></div>' +
            '<div class="col" onclick="Tab_2()"><a><b>Sedang Dikirim</b></a></div>' 
        );
        pesananlist('Proses');

    }
    else if (localStorage.user_role == 'Pelanggan')
    {
        $$(".listpesan-customer").html("");
        $$(".status-customer").html(
            '<div class="col activated"><a><b>Dalam Proses</b></a></div>' +
            '<div class="col" onclick="Tab_2()"><a><b>Selesai</b></a></div>' 
        );
        pesananlist('Proses');

    }
    else //KASIR DAN ADMIN
    {
        $$('.listpesan-kasir').html("");
        $$(".status-kasir").html(
            '<div class="col activated"><a><b>Masuk</b></a></div>' +
            '<div class="col" onclick="Tab_2()"><a><b>Sedang Dikirim</b></a></div>' 
        );
        pesananlist('Masuk');

    }    
}

function Tab_2() 
{
    if (localStorage.user_role == 'Driver')
    {
        $$(".listpesan-driver").html("");
        $$(".status-driver").html(
            '<div class="col" onclick="Tab_1()"><a><b>Sedang Diproses</b></a></div>' +
            '<div class="col activated"><a><b>Sedang Dikirim</b></a></div>' 
        );
        pesananlist('Kirim');
    }
    else if (localStorage.user_role == 'Pelanggan')
    {
        $$(".listpesan-customer").html("");
        $$(".status-customer").html(
            '<div class="col" onclick="Tab_1()"><a><b>Dalam Proses</b></a></div>' +
            '<div class="col activated"><a><b>Selesai</b></a></div>'
        );
        pesananlist('Selesai');

    }
    else //KASIR DAN ADMIN
    {
        $$('.listpesan-kasir').html("");
        $$(".status-kasir").html(
            '<div class="col" onclick="Tab_1()"><a><b>Masuk</b></a></div>' +
            '<div class="col activated"><a><b>Sedang Dikirim</b></a></div>' 
        );
        pesananlist('Kirim');
    }   
}




function cekrole_pesanan()
{
    if (localStorage.user_role == 'Pelanggan')
    {
        $$('.kasir_menu').hide();
        $$('.admin_menu').hide();
        $$('.driver_menu').hide();
        $$('.listpesan-driver').hide();
        $$('.listpesan-kasir').hide();
        $$('.status-kasir').hide();
        $$('.status-driver').hide();
        $$('.title-driver-kasir').hide();
        $$('.pilihcabang').hide();
    }
    else if (localStorage.user_role == 'Driver')
    {
        $$('.kasir_menu').hide();
        $$('.admin_menu').hide();
        $$('.customer_menu').hide();
        $$('.title-customer').hide();
        $$('.status-kasir').hide();
        $$('.status-customer').hide();
        $$('.pilihcabang').hide();
        $$('.listpesan-customer').hide();
        $$('.listpesan-kasir').hide();
    }
    else if (localStorage.user_role == 'Kasir')
    {
        $$('.customer_menu').hide();
        $$('.driver_menu').hide();
        $$('.listpesan-customer').hide();
        $$('.listpesan-driver').hide();
        $$('.admin_menu').hide();
        $$('.pilih-kasir-admin').hide();
        $$('.title-customer').hide();
        $$('.status-customer').hide();
        $$('.status-driver').hide();
    }
    else //ADMIN
    {
        $$('.kasir_menu').hide();
        $$('.customer_menu').hide();
        $$('.driver_menu').hide();
        $$('.status-customer').hide();
        $$('.status-driver').hide();
        $$('.listpesan-driver').hide();
        $$('.listpesan-customer').hide();
        $$('.title-customer').hide();
    }
}