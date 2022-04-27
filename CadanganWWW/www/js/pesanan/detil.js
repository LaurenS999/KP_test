function load_pesanan_detil(e, page)
{
    PesananDetail(page.router.currentRoute.params.id);

    if(localStorage.user_role == "Kasir" || localStorage.user_role == "Admin")
    {
        listDriver();
        modalPembayaran("pesanandetil");
    }
    cekrole_pesanandetil();
}

function PesananDetail(id)
{
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/pesanan/pesanandetil.php",
        data: {
            uid : id
        },
        success: function(data) {            
            var obj = JSON.parse(data);

            if (obj['result'] == "Berhasil")
            {                       
                //KODE NOTA
                var tanggaltext = obj['data'][0]['transaction_date'].replace(/\-/g, '');
                var ordernumbertext = pad_ordernumber(obj['data'][0]['transaction_order_number']);      
                var tanggal = formatTanggal(obj['data'][0]['transaction_date']);
                var time = FormatTime(obj['data'][0]['transaction_time']);
                var discount = parseInt(obj['data'][0]['transaction_total_discount'] * obj['data'][0]['transaction_total_amount'] / 100);
                var biayakirim = parseInt(obj['data'][0]['transaction_delivery_fee_total']);

                var SubTotal = obj['data'][0]['transaction_total_amount'];
                var total = SubTotal - discount + biayakirim;
                $$('#PesananDetail_SubTotal').html("Rp " + formatRupiah(SubTotal));
                //$$('#PesananDetail_Diskon').html("-Rp " + formatRupiah(discount));
                $$('#PesananDetail_Total_bottom').html("Rp " + formatRupiah(total));                

                $$('#PesananDetil_Transaksi_id').html("Nomor Nota: " + tanggaltext + ordernumbertext);
                $$('#PesananDetil_Transaksi_id_text').html(obj['data'][0]['transaction_id']);
                $$("#PesananDetil_Transaksi_tanggal").html(tanggal + " | " + time);
                $$('#PesananDetil_Transaksi_status').html(obj['data'][0]['transaction_status']);                
                $$('#PesananDetil_Customer_Nama').html(localStorage.user_name);
                $$('#PesananDetil_Customer_Telepon').html(obj['data'][0]['pelanggan_telepon']);
                $$('#PesananDetil_Customer_Alamat').html(obj['data'][0]['transaction_address']);                
                $$('#PesananDetail_Kirim').html("Rp " + formatRupiah(biayakirim));                
                $$('#PesananDetail_Diskon_bottom').html("-Rp " + formatRupiah(obj['data'][0]['transaction_total_discount']));
                $$('#PesananDetil_Transkasi_Catatan').html(obj['data'][0]['transaction_message']);
                $$('#PesananDetil_Transkasi_Catatan').html(obj['data'][0]['transaction_message']);

                var latitude = obj['data'][0]['transaction_latitude'];
                var longtitude = obj['data'][0]['transaction_longitude'];                
                //getMap("pesanan",latitude, longtitude);
                $$('#PesananDetil_Customer_latitude').html(latitude);
                $$('#PesananDetil_Customer_longtitude').html(longtitude)

                $$('#PesananDetil_listMenu').html("");
                $$("#mod_ubahmenu_content").html("");
                for (var i =0; i < obj['menu'].length;i++)
                {                    
                    var subtotalPerMenu =  obj['menu'][i]['transaction_detail_price'] *  obj['menu'][i]['transaction_detail_count'];                    

                    $$('#PesananDetil_listMenu').append(
                        $$(
                            '<tr>'+
                                '<td class="detil_name"><img src="./img/drawable-ldpi/Logo.png" alt=""></td>'+
                                '<td><b>'+ obj['menu'][i]['menuNama'] +'</b></td>'+
                                '<td>'+ obj['menu'][i]['transaction_detail_count'] +'x</td>'+
                                '<td class="detil_price">Rp '+ formatRupiah(subtotalPerMenu) +'</td>'+
                            '</tr>'
                        )
                    );

                    $$("#mod_ubahmenu_content").append(
                        '<div class="item-pesandetil" id="mod_item_' + obj['menu'][i]['menu_id']+ '">'+
                            '<h5 style="display: inline;">' + obj['menu'][i]['menuNama'] +'</h5>'+
                            '<div id="item_pesandetil_'+ i +'"hidden>' + obj['menu'][i]['menu_id'] +'</div>'+
                            '<div id="mod_ubahmenu_content_'+ obj['menu'][i]['menu_id'] +'_id" hidden>' + obj['menu'][i]['menu_id'] +'</div>'+
                            '<div class="btn-group">'+
                                '<a class="button btn-trsh" onclick="set0('+ "'mod_ubahmenu_content_'" + "," + obj['menu'][i]['menu_id'] +')"><i class="f7-icons">trash_fill</i></a>'+
                                '<a class="button btn-mns"><i class="fa fa-minus" onclick="Kurang(' + "'mod_ubahmenu_content_" + obj['menu'][i]['menu_id'] + "'" +')"></i></a>'+
                                '<label id="mod_ubahmenu_content_'+ obj['menu'][i]['menu_id']  +'_JumlahPesanan">'+ obj['menu'][i]['transaction_detail_count'] +'</label>'+
                                '<a class="button btn-pls" onclick="Tambah(' + "'mod_ubahmenu_content_" + obj['menu'][i]['menu_id'] + "'" +')"><i class="fa fa-plus"></i></a>'+
                            '</div>'+
                        '</div> '
                    )
                }

                // CEK STATUS PENGIRIMAN
                if (obj['data'][0]['transaction_delivery_status'] == null || obj['data'][0]['transaction_delivery_status'] == "")
                {
                    $$("#PesananDetil_Transaksi_delivery_status").html("-");
                }
                else
                {
                    $$("#PesananDetil_Transaksi_delivery_status").html(obj['data'][0]['transaction_delivery_status']);
                }

                // CEK CATATAN TAMBAHAN NULL
                if (obj['data'][0]['transaction_message'] == "" || obj['data'][0]['transaction_message'] == null )
                {
                    $$('#PesananDetil_Transkasi_Catatan').html("-");
                }
                else
                {
                    $$('#PesananDetil_Transkasi_Catatan').html(obj['data'][0]['transaction_message']);
                }

                // CEK STATUS PESANAN UTK HIDE SHOW BUTTON
                if (obj['data'][0]['transaction_status'] == "Menunggu Konfirmasi")
                {
                    $$("#pesanandetil_btn_kirimDriver").show();
                    $$("#pesanandetil_btn_selesai").hide();
                    $$("#pesanan_nominalpembayaran").hide();
                }
                else if (obj['data'][0]['transaction_status'] == "Sedang Diproses")
                {
                    $$(".kasir-option").hide();
                    //$$("#pesanandetil_btn_selesai").hide();
                    $$("#pesanan_nominalpembayaran").hide();
                }
                else if (obj['data'][0]['transaction_status'] == "Sedang Dikirim")
                {
                    var ubahmenu = document.getElementById("detilpesan");
                    ubahmenu.onclick = "";
                    $$(".kasir-option").hide();
                    $$("#pesanan_nominalpembayaran").hide();
                }
                
                if (obj['data'][0]['transaction_delivery_status'] == "Arrived")
                {
                    $$("#pesanandetil_btn_kirimDriver").hide();
                    $$("#pesanan_nominalpembayaran").show();
                    $$("#pesanandetil_btn_selesai").show();
                }
                

                if (localStorage.user_role == 'Driver')
                {
                    var pilihpembayaran = document.getElementById("pilihpembayaran");
                    pilihpembayaran.onclick = "";

                    var stat = obj['data'][0]['transaction_delivery_status'];
                    if (stat == "On The Way")
                    {
                        $$('#status_driver').html('Tiba Ditujuan');
                    }
                    else if (stat == null || stat == "")
                    {
                        $$('#status_driver').html('Antar');
                    }
                    else if (stat == "Arrived")
                    {
                        var stat_btn = document.getElementById("status_driver");
                        stat_btn.onclick = "";
                        $$('.driver-option').hide();
                    }
                }
                
                // CEK NAMA KASIR/DRIVER NULL
                if (localStorage.user_role == "Pelanggan" || localStorage.user_role == "Driver")
                {
                    var pilihpembayaran = document.getElementById("pilihpembayaran");
                    pilihpembayaran.onclick = "";
                    if(obj['data'][0]['kasir_nama'] != "")
                    {
                        $$('#PesananDetil_Kasir_Nama').html(obj['data'][0]['kasir_nama']);
                    }
                    else
                    {
                        $$('#PesananDetil_Kasir_Nama').html("-");
                    }
                    if (obj['data'][0]['driver_nama'] != "")
                    {
                        $$('#PesananDetil_Driver_Nama').html(obj['data'][0]['driver_nama']);
                    }
                    else
                    {
                        $$('#PesananDetil_Driver_Nama').html("-");
                    }

                    $$('#PesananDetil_Transaksi_JeniSPembayaran').html(obj['data'][0]['jenisPembayaran']);
                    var changePay = document.getElementById("divBayar");
                    changePay.onclick = "";
                    $$("#pesanan_nominalpembayaran").hide();
                }
                else // KASIR
                {
                    if (obj['data'][0]['driver_nama'] != "")
                    {
                        $$('#pesanan_driver_name').html(obj['data'][0]['driver_nama']);

                        var changeDriver = document.getElementById("pilihdriver");
                        changeDriver.onclick = "";

                        var kirim_driver = document.getElementById("kirim_driver");
                        kirim_driver.onclick = "";

                        if(obj['data'][0]['transaction_delivery_status'] !== "Arrived")
                        {
                            var pilihpembayaran = document.getElementById("pilihpembayaran");
                            pilihpembayaran.onclick = "";
                        }
                    }
                    else
                    {
                        $$('#pesanan_driver_name').html("Pilih Driver");
                        if(obj['data'][0]['transaction_delivery_status'] !== "Arrived")
                        {
                            var pilihpembayaran = document.getElementById("pilihpembayaran");
                            pilihpembayaran.onclick = "";
                        }

                        var selesai_pesan = document.getElementById("selesai_pesan");
                        selesai_pesan.onclick = "";
                    }

                    $$('#PesananDetil_Transaksi_JeniSPembayaran').html(obj['data'][0]['jenisPembayaran'] + ' <i class="f7-icons" style="color: black;">chevron_right</i>');
                }

                
                                
            }
        }
    });
}


function cekrole_pesanandetil()
{
    if (localStorage.user_role == 'Pelanggan')
    {
        $$('.kasir_menu').hide();
        $$('.admin_menu').hide();
        $$('.driver_menu').hide();
        
        $$('.kasir-option').hide();
        $$('.driver-option').hide();
        $$('#pilihdriver').hide();
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
        $$('.kasir-option').hide();
        $$('#pilihdriver').hide();
        $$("#pesanan_nominalpembayaran").hide();
    }
    else if (localStorage.user_role == 'Kasir')
    {
        $$('.customer_menu').hide();
        $$('.driver_menu').hide();
        $$('.listpesan-customer').hide();
        $$('.listpesan-driver').hide();
        $$('.admin_menu').hide();
        $$('.driver-option').hide();
        $$('#customer_Driver_data').hide();
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
        $$('.driver-option').hide();
        $$('#customer_Driver_data').hide();

    }
}

function listDriver()
{    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/pesanan/driver.php",     
        data: {
            cabang : localStorage.store_id
        },
        success: function(data) {        
            var obj = JSON.parse(data);
            if(obj['result'] == "Berhasil")
            {                         
                $$('.mod_pilihdriver_content').html("");
                
                for(var i =0; i < obj['data'].length; i++)
                {
                    $$('.mod_pilihdriver_content').append(
                        '<div class="row" onclick="listDriver_function('+ "'" + obj['data'][i]['user_id'] + "','" + obj['data'][i]['user_name'] + "'"  +')">' +
                            '<a>'+ obj['data'][i]['user_name'] +'</a>' +
                        '</div>'
                    );
                }                             
            }
        }
    });
}

function listDriver_function(id,nama)
{
    $$('#pesanan_driver_name').html(nama + ' <i class="f7-icons" style="color: black;">chevron_right</i>');
    $$('#pesanan_driver_id').html(id);
    TutupModal('mod-pilihdriver');
}

function kirimKeDriver()
{
    var transaction_id = $$("#PesananDetil_Transaksi_id_text").html();
    var driver_id = $$("#pesanan_driver_id").html();
    var pembayaran_id = $$("#PesananDetil_Transaksi_JeniSPembayaran_id").html();

    if (driver_id <= 0)
    {
        app.dialog.alert("Pilih Driver terlebih dahulu!");
    }
    else
    {
        app.request({
            method: "POST",
            url: "http://192.168.0.15/myorder/pesanan/kirimKeDriver.php",        
            data: {
                transaction_id : transaction_id,
                driver_id : driver_id,
                kasir_id : localStorage.user_id,
                pembayaran_id : pembayaran_id        
            },
            success: function(data) {        
                //console.log(data);    
                var obj = JSON.parse(data);
                if(obj['result'] == "Berhasil")
                {                         
                    window.location.reload();                         
                    app.dialog.alert("Berhasil");
                }
            }
        });
    }    
}

function ubahmenu()
{
    var jumlah = "";
    var transaksiid = $$("#PesananDetil_Transaksi_id_text").html();
    var menuid =0;

    var count = 0;
    while(menuid != null)
    {
        menuid = $$("#item_pesandetil_" + count).html();

        count++;

        if(menuid == null)
        {
            break;
        }
        // mod_ubahmenu_content_3_JumlahPesanan
        jumlah = $$("#mod_ubahmenu_content_"+ menuid +"_JumlahPesanan").html();        
        //console.log(jumlah);
        app.request({
            method: "POST",
            url: "http://192.168.0.15/myorder/admin/ubahmenu.php",
            data: {
                transaksiid : transaksiid,
                menuid: menuid,
                jumlah:jumlah

            },
            success: function(data) {
                console.log(data);
                var obj = JSON.parse(data);
                PesananDetail(transaksiid);     
            }
        });
    }


    TutupModal("mod-ubahmenu");
}

function set0(modal, id)
{    
    $$("#"+ modal + id +"_JumlahPesanan").html(0);
}

function button_pesanan(button)
{
    var id = $$('#PesananDetil_Transaksi_id_text').html();    

    if (button == "selesai")
    {
        var pembayaran_id = $$("#PesananDetil_Transaksi_JeniSPembayaran_id").html();
        var total_pembayaran = $$("#pesanan_kasir_nominalpembayaran").val();
    }

    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/pesanan/"+ button +".php",
        data: {
            transaction_id : id,
            pembayaran_id : pembayaran_id,
            total_pembayaran: total_pembayaran
        },
        success: function(data) {
            //console.log(data);
            var obj = JSON.parse(data);
            //console.log(data);
        }    
    });
}