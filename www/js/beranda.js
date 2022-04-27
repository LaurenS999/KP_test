function load_beranda(e, page)
{

    $$('.SearchMenu_Span').on('click', function() {
        var nama = $$('#Beranda_SearchMenu').val();
        page.router.navigate("/pencarian/" + nama);
    });

    $$("#Beranda_SearchMenu").on('keypress', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) 
        {    
            var nama = $$('#Beranda_SearchMenu').val();
            page.router.navigate("/pencarian/" + nama);
        }
    });

    // CEK CABANG DEFAULT
    if (localStorage.store_id === null || localStorage.store_id === "")
    {
        app.request({
            method: "POST",
            url: "http://localhost/myorder/beranda/load_cabang.php",
            data: {
                statInit : 'firstInit'
            },
            success: function(data) {
                var obj = JSON.parse(data);
                if (obj['status'] == true)
                {
                    localStorage.store_id = obj['data']['store_id'];
                    $$('#beranda_namaresto').html(obj['data']['store_name']);
                    $$('#beranda_alamatresto').html(obj['data']['store_address']);
                }
            }
        });
    }
    else
    {
        app.request({
            method: "POST",
            url: "http://localhost/myorder/beranda/load_cabang.php",
            data: {
                cabang : localStorage.store_id,
                statInit : 'secondInit'
            },
            success: function(data) {
                var obj = JSON.parse(data);
                if (obj['status'] == true)
                {
                    $$('#beranda_namaresto').html(obj['data']['store_name']);
                    $$('#beranda_alamatresto').html(obj['data']['store_address']);
                }
            }
        });
    }

    if (localStorage.user_role == "Pelanggan")
    {
        menu_promo();
        listbanner('beranda');
        $$('.pencarian').css('margin-top', '1rem');
    }

    cekrole_beranda();
}

// TIDAK DITEMUKAN FUNCTION DIPAKAI DIMANA //
function SearchMenu_Kasir(Menu_nama) //KASIR PENCARIAN
{
    app.request({
        method: "POST",
        url: "http://localhost/myorder/beranda/pencarian.php",
        data: {  
            menu_name : Menu_nama,
            store_id : localStorage.store_id
        },
        success: function(data) {
            var obj = JSON.parse(data);            
            $$("#beranda_list_kategori").html("");
            $$("#Beranda_SearchMenu").val('')

            if (obj['result'] == 'Berhasil')
            {
                for(var i =0; i < obj['data'].length ; i++)
                {
                    var image = "menu_" + obj[0]['menu_id'] + "." + obj[0]['menu_img_ext'];
                    var image_url = "http://localhost/myorder/images/" + image;

                    $$('#beranda_list_kategori').append(
                        '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'Beranda_MenuModal'" +')">' +
                            '<div class="card">'+
                                '<div class="card-content card-content-padding">'+
                                    "<img src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'>"+
                                    '<h5>' + obj['data'][i]['menu_name']  + '</h5><br>'+
                                    '<p style="color: #808080; font-size: 11px;">'+ obj['data'][i]['menu_description'] + '</p><br>'+
                                    '<h5>Rp ' + formatRupiah(obj['data'][i]['menu_sell_price']) +'</h5>'+
                                '</div>'+
                            '</div>'+
                        '</a>'
                    );
                }
            }
            else
            {
                console.log(data)
            }
        }    
    });
}

function KategoriDetil_Beranda_Kasir(id) //LIST MENU PER KATEGORI
{
    var array1 = localStorage.keranjang;
    var array2 = localStorage.JumlahKeranjang;

    if (localStorage.getItem('keranjang') === null || localStorage.getItem('keranjang') === "")
    {

    }
    else
    {
        array1 = array1.split(",");
        array2 = array2.split(",");
    }  
    
    app.request({
        method: "POST",
        url: "http://localhost/myorder/beranda/kategoridetail.php",
        data: {  
            kategori_id : id,
            cabang: localStorage.store_id
        },
        success: function(data) {
            var obj = JSON.parse(data);            
            $$("#beranda_list_kategori").html("");

            if (obj['status'] == true)
            {
                for(var i =0; i < obj['data'].length ; i++)
                {            
                    var image = "menu_" + obj['data'][i]['menu_id'] + "." + obj['data'][i]['menu_img_ext'];
                    var image_url = "http://localhost/myorder/images/" + image;        

                    var discount = (obj['data'][i]['menu_sell_price'] * obj['data'][i]['menu_discount'] / 100);
                    var total = obj['data'][i]['menu_sell_price'] - discount;

                    if (obj['data'][i]['menu_discount'] > 0) // DISKON
                    {
                        if (array1.includes(obj['data'][i]['menu_id'])) //ADA DI KERANJANG
                        {
                            for(var j = 0; j < array1.length; j++)
                            {
                                if (obj['data'][i]['menu_id'] == array1[j])
                                {
                                    $$('#beranda_list_kategori').append(
                                        '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'Beranda_MenuModal'" +')">' +
                                            '<div class="card">'+
                                                '<div class="card-content card-content-padding">'+                                                    
                                                    "<img src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'>"+
                                                    '<h5>' + obj['data'][i]['menu_name']  + '</h5><br>'+
                                                    "<div>" + array2[j] +"</div>"+
                                                    '<p style="color: #808080; font-size: 11px;">'+ obj['data'][i]['menu_desc'] + '</p><br>'+
                                                    '<h5 style="color: #707070;  text-decoration: line-through">Rp ' + formatRupiah(obj['data'][i]['menu_sell_price']) +'</h5>'+
                                                    '<h5> Rp ' + formatRupiah(total) +'</h5>'+
                                                '</div>'+
                                            '</div>'+
                                        '</a>'
                                    );
                                    break;
                                }                        
                            }
                        }
                        else //TIDAK ADA DI KERANJANG
                        {
                            $$('#beranda_list_kategori').append(
                                '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'Beranda_MenuModal'" +')">' +
                                    '<div class="card">'+
                                        '<div class="card-content card-content-padding">'+
                                            //'<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                            "<img src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'>"+

                                            '<h5>' + obj['data'][i]['menu_name']  + '</h5><br>'+                                    
                                            '<p style="color: #808080; font-size: 11px;">'+ obj['data'][i]['menu_desc'] + '</p><br>'+
                                            '<h5 style="color: #707070;  text-decoration: line-through">Rp ' + formatRupiah(obj['data'][i]['menu_sell_price']) +'</h5>'+
                                            '<h5> Rp ' + formatRupiah(total) +'</h5>'+
                                        '</div>'+
                                    '</div>'+
                                '</a>'
                            );
                        }
                    }
                    else //TIDAK DISKON
                    {
                        if (array1.includes(obj['data'][i]['menu_id'])) //ADA DI KERANJANG
                        {
                            for(var j = 0; j < array1.length; j++)
                            {
                                if (obj['data'][i]['menu_id'] == array1[j])
                                {
                                    $$('#beranda_list_kategori').append(
                                        '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'Beranda_MenuModal'" +')">' +
                                            '<div class="card">'+
                                                '<div class="card-content card-content-padding">'+
                                                    //'<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                                    "<img src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'>"+

                                                    '<h5>' + obj['data'][i]['menu_name']  + '</h5><br>'+
                                                    "<div>" + array2[j] +"</div>"+
                                                    '<p style="color: #808080; font-size: 11px;">'+ obj['data'][i]['menu_desc'] + '</p><br>'+
                                                    '<h5>Rp ' + formatRupiah(total) +'</h5>'+
                                                '</div>'+
                                            '</div>'+
                                        '</a>'
                                    );
                                    break;
                                }                        
                            }
                        }
                        else //TIDAK ADA DI KERANJANG
                        {
                            $$('#beranda_list_kategori').append(
                                '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'Beranda_MenuModal'" +')">' +
                                    '<div class="card">'+
                                        '<div class="card-content card-content-padding">'+
                                            //'<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                            "<img src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'>"+

                                            '<h5>' + obj['data'][i]['menu_name']  + '</h5><br>'+                                    
                                            '<p style="color: #808080; font-size: 11px;">'+ obj['data'][i]['menu_desc'] + '</p><br>'+
                                            '<h5>Rp ' + formatRupiah(total) +'</h5>'+
                                        '</div>'+
                                    '</div>'+
                                '</a>'
                            );
                        }
                    }                    
                }
            }
            else
            {
                $$('#beranda_list_kategori').html('<h4 id="statusMenuKosong">'+obj['data']+'</h4>');
                $$('#statusMenuKosong').css({'font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'4rem', 'text-align':'center'});
            }
        }    
    });
}

function Beranda_KategoriSlider_Kasir() //LIST KATEGORI BOX
{
    app.request({
        method: "POST",
        url: "http://localhost/myorder/beranda/kategori.php",

        success: function(data) {
            var obj = JSON.parse(data);            
            $$('#beranda_list_kategoriBox').html("")

            for(var i =0; i < obj.length; i++)
            {
                var image = "kategori_" + obj[i]['category_id'] + "." + obj[i]['category_img_ext'];
                var image_url = "http://localhost/myorder/images/" + image;

                $$('#beranda_list_kategoriBox').append(
                    '<div class="column">' +
                        '<a onclick="KategoriDetil_Beranda_Kasir('+ obj[i]['category_id'] + ')" style="font-size: 12px; font-weight:bold; color: black;">'+
                            //'<img src="./img/drawable-ldpi/Logo.png" alt="" >'+
                            "<img src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'>"+

                            '<label>'+ obj[i]['category_name'] + '</label>'+
                        '</a>'+
                    '</div>'
                );
            }
            KategoriDetil_Beranda_Kasir(obj[0]['category_id'])
        }    
    });
}   

function Beranda_KategoriSlider() //CUSTOMER
{
    app.request({
        method: "POST",
        url: "http://localhost/myorder/beranda/kategori.php",

        success: function(data) {
            var obj = JSON.parse(data);            
            $$('#beranda_list_kategoriBox').html("")
            
            for(var i =0; i < obj.length ; i++)
            {                    
                var image = "kategori_" + obj[i]['category_id'] + "." + obj[i]['category_img_ext'];
                var image_url = "http://localhost/myorder/images/" + image;

                $$('#beranda_list_kategoriBox').append(
                    '<div class="column">' +
                        '<a href="/kategoridetil/' +obj[i]['category_id'] + "/" + obj[i]['category_name']  + '" style="font-size: 12px; font-weight:bold; color: black;">'+
                            "<img src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'>"+
                            '<label>'+ obj[i]['category_name'] + '</label>'+
                        '</a>'+
                    '</div>'
                );
            }
        }    
    });
}

// MODAL MENU DETIL
function ShowModalMenu(id, content) 
{
    var array1 = localStorage.keranjang;
    var array2 = localStorage.JumlahKeranjang;
    console.log(array1);

    var modal = document.getElementById(content);
    modal.style.opacity = 1;
    modal.style.zIndex = 9999;    

    app.request({
        method: "POST",
        url: "http://localhost/myorder/beranda/detailmenu.php",
        data: {  
            menu_id : id
        },
        success: function(data) {
            var obj = JSON.parse(data);            

            if (obj['result'] == "Berhasil")
            {
                //stok_max(obj['data'][0]['menu_id']);
                $$('#'+ content + '_id').html(obj['data'][0]['menu_id']);
                $$('#'+ content + '_nama').html(obj['data'][0]['menu_name']);
                $$('#'+ content + '_deskripsi').html(obj['data'][0]['menu_description']);

                if (obj['data'][0]['menu_discount'] > 0)
                {                                            
                    $$('#'+ content + '_harga').html("Rp " + formatRupiah(obj['data'][0]['menu_sell_price']));
                    var p = document.getElementById(content + '_harga');
                    p.style.textDecoration = 'line-through';
                    p.style.color = '#707070';

                    var total = obj['data'][0]['menu_sell_price'] - (obj['data'][0]['menu_sell_price'] * obj['data'][0]['menu_discount'] / 100);
                    $$('#' + content + '_harga-diskon').show();
                    $$('#' + content + '_harga-diskon').html("Rp " + formatRupiah(total));
                }
                else
                {
                    $$('#'+ content + '_harga').html("Rp " + formatRupiah(obj['data'][0]['menu_sell_price']));
                    var p = document.getElementById(content + '_harga');
                    p.style.textDecoration = 'none';
                    p.style.color = '#04203E';
                    $$('#' + content + '_harga-diskon').hide();
                }
                
                if (array1.includes(obj['data'][0]['menu_id']))
                {
                    for(var i = 0; i < array1.length; i++)
                    {
                        if(array1[i] == obj['data'][0]['menu_id'])
                        {
                            $$("#" + content + '_JumlahPesanan').html(array2[i]);
                        }
                    }
                }
                else
                {
                    $$("#" + content + '_JumlahPesanan').html(0);
                }
            }
        }    
    });

    window.onclick = function(event)
    {
        if (event.target == modal) 
        {
            modal.style.opacity = 0;
            modal.style.zIndex = -10;
            $$('#'+ content + '_JumlahPesanan').html(0);
        }
    }
}

function menu_promo()
{
    app.request({
        method: "POST",
        url: "http://localhost/myorder/beranda/menupromo.php",
        data: {
            cabang : localStorage.store_id
        },
        success: function(data) {
            //loadingData();
            var obj = JSON.parse(data);
            if (obj['status'] == true)
            {
                $$('#customer_BerandaListPromo').html("");
                for(var i=0; i<obj['data'].length; i++)           
                {
                    var image = "menu_" + obj['data'][i]['menu_id'] + "." + obj['data'][i]['menu_img_ext'];
                    var image_url = "http://localhost/myorder/images/" + image;

                    var discount = (obj['data'][i]['menu_sell_price'] * obj['data'][i]['menu_discount'] / 100);
                    var total = obj['data'][i]['menu_sell_price'] - discount;
                    $$('#customer_BerandaListPromo').append( 
                        '<div class="col-50 medium-25">'+
                            '<a onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] +", 'Beranda_MenuModal'"+')" style="color: black;">'+
                                '<div class="card">'+
                                    '<div class="card-content card-content-padding">'+
                                        '<img style="margin:auto;" src="./img/drawable-ldpi/Logo.png" alt="error">'+
                                        '<p><b>'+ obj['data'][i]['menu_name'] +'</b></p>'+
                                        '<p style="color: #707070;"><strike><b>Rp '+ formatRupiah(obj['data'][i]['menu_sell_price']) +'</b></strike></p>'+
                                        '<h4>Rp '+ formatRupiah(total) +'</h4>'+
                                    '</div>'+
                                '</div>'+
                            '</a>'+
                        '</div>'
                    );
                }
            }
            else
            {
                $$('#customer_BerandaListPromo').html('<h4 id="statusPromoKosong">'+obj['data']+'</h4>');
                $$('#statusPromoKosong').css({'font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'4rem'});
            }
            //determinateLoading = false;
            //app.dialog.close();
        }
    });
}

function cekrole_beranda()
{
    if (localStorage.user_role == "Pelanggan")
    {
        $$('.kasir_menu').hide();
        $$('.admin_menu').hide();
        $$('.fab-kasir').hide();
        $$('.kasir-beranda').hide();
        $$('.admin-beranda').hide();
        $$('.statusberanda-kasir').hide();
        $$('.title-kasir').hide();
        $$('.title-admin').hide();
        $$('.admin-konfigurasi').hide();
        $$('#beranda_list_kategori').hide();
    
        $$('.box-button-kasir').hide();

        Beranda_KategoriSlider();
    }
    else if (localStorage.user_role == "Kasir")
    {
        $$('.admin_menu').hide();
        $$('.customer_menu').hide();
        $$('.fab-customer').hide();
        $$('.customer-beranda').hide();
        $$('.admin-beranda').hide();
        $$('.customer-banner').hide();
        $$('.title-admin').hide();
        $$('.admin-konfigurasi').hide();
        $$('.customer-promo').hide();
        $$('.mypromo').hide();
        $$('.img-modal-customer').hide();
        $$('.btn-tambah-customer').hide();

        Beranda_KategoriSlider_Kasir();
    }
    else //ADMIN
    {
        $$('#nama_admin').html('Hai, ' + localStorage.user_name);
        $$('#username_beranda_admin').html(localStorage.username);
        $$('.mypromo').hide();
        $$('.customer-promo').hide();
        $$('.kasir_menu').hide();
        $$('.customer_menu').hide();
        $$('.fab-customer').hide();
        $$('.fab-kasir').hide();
        $$('.customer-beranda').hide();
        $$('.kasir-beranda').hide();
        $$('.statusberanda-kasir').hide();
        $$('.title-kasir').hide();
        $$('.customer-banner').hide();
        $$('.kategori-box-list').hide();
        $$('#beranda_list_kategori').hide();
        $$('.pencarian').hide();
    }
}