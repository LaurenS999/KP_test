function load_kategori_detil(e, page)
{
    cekrole_kategoridetil();
    KategoriDetil_KategoriSlider();
    KategoriDetil(page.router.currentRoute.params.id, page.router.currentRoute.params.nama);

    $$('.SearchMenu_Span').on('click', function() {
        var nama = $$('#KategoriDetil_Search').val();
        page.router.navigate("/pencarian/" + nama);
    });

    $$("#KategoriDetil_Search").on('keypress', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) 
        {    
            var nama = $$('#KategoriDetil_Search').val();
            page.router.navigate("/pencarian/" + nama);
        }
    });
}

function KategoriDetil_KategoriSlider()
{
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/beranda/kategori.php",

        success: function(data) {
            var obj = JSON.parse(data);            
            $$('#KategoriDetil_list_kategoriBox').html("")
            
            for(var i =0; i < obj.length ; i++)
            {                
                $$('#KategoriDetil_list_kategoriBox').append(
                    '<div class="column">'+
                        '<a onclick="KategoriDetil('+ obj[i]['category_id'] + ",'" + obj[i]['category_name'] + "'" +')" style="font-size: 12px; font-weight:bold; color: black;">'+
                            '<img src="./img/drawable-ldpi/Logo.png" alt="" >'+
                           '<label>'+  obj[i]['category_name'] + '</label>'+
                       '</a>'+
                    '</div>'
                );
            }
        }    
    });
}

function KategoriDetil(id,nama)
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
        console.log('tesssssssssss');
    }

    $$("#kategoridetil_pilihankategori").html(nama);
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/beranda/kategoridetail.php",
        data: {  
            kategori_id : id,
            cabang : localStorage.store_id
        },
        success: function(data) {
            var obj = JSON.parse(data);                       
            $$("#KategoriDetil_MenuList").html("");
            
            if (obj['status'] == true)
            {   
                for(var i =0; i < obj['data'].length ; i++)
                {
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
                                    $$('#KategoriDetil_MenuList').append(
                                        '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'KategoriDetil_MenuModal'" +')">' +
                                            '<div class="card">'+
                                                '<div class="card-content card-content-padding">'+
                                                    '<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                                    '<h5>' + obj['data'][i]['menu_name']  + '</h5><br>'+
                                                    "<div>" + array2[j] +"</div>"+
                                                    '<p style="color: #808080; font-size: 11px;">'+ obj['data'][i]['menu_desc'] + '</p><br>'+
                                                    '<h5 style="color: #707070;  text-decoration: line-through">Rp ' + formatRupiah(obj['data'][i]['menu_sell_price']) +'</h5>'+
                                                    '<h5>  Rp ' + formatRupiah(total) +'</h5>'+
                                                '</div>'+
                                            '</div>'+
                                        '</a>'
                                    );
                                    break;
                                }                        
                            }
                        }
                        else
                        {
                            $$('#KategoriDetil_MenuList').append(
                                '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'KategoriDetil_MenuModal'" +')">' +
                                    '<div class="card">'+
                                        '<div class="card-content card-content-padding">'+
                                            '<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                            '<h5>' + obj['data'][i]['menu_name']  + '</h5><br>'+
                                            '<p style="color: #808080; font-size: 11px;">'+ obj['data'][i]['menu_desc'] + '</p><br>'+
                                            '<h5 style="color: #707070;  text-decoration: line-through">Rp ' + formatRupiah(obj['data'][i]['menu_sell_price']) +'</h5>'+
                                            '<h5>  Rp ' + formatRupiah(total) +'</h5>'+
                                        '</div>'+
                                    '</div>'+
                                '</a>'
                            );
                        }
                    }
                    else // TIDAK DISKON
                    {
                        if (array1.includes(obj['data'][i]['menu_id'])) //ADA DI KERANJANG
                        {
                            for(var j = 0; j < array1.length; j++)
                            {
                                if (obj['data'][i]['menu_id'] == array1[j])
                                {
                                    $$('#KategoriDetil_MenuList').append(
                                        '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'KategoriDetil_MenuModal'" +')">' +
                                            '<div class="card">'+
                                                '<div class="card-content card-content-padding">'+
                                                    '<img src="./img/drawable-ldpi/Logo.png" alt="">'+
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
                            $$('#KategoriDetil_MenuList').append(
                                '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'KategoriDetil_MenuModal'" +')">' +
                                    '<div class="card">'+
                                        '<div class="card-content card-content-padding">'+
                                            '<img src="./img/drawable-ldpi/Logo.png" alt="">'+
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
                $$('#KategoriDetil_MenuList').html('<h4 id="statusKategoriDetilKosong">'+obj['data']+'</h4>');
                $$('#statusKategoriDetilKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'5rem'});
            }
        }    
    });
}

function cekrole_kategoridetil()
{
    if (localStorage.user_role == "Pelanggan")
    {
        $$('.kasir_menu').hide();
        //$$('.admin_menu').hide();
        $$('.fab-kasir').hide();
        $$('.kasir-beranda').hide();
        $$('.admin-beranda').hide();
        $$('.statusberanda-kasir').hide();
        $$('.title-kasir').hide();
        $$('.title-admin').hide();
        $$('.admin-konfigurasi').hide();
    }
    else if (localStorage.user_role == "Kasir")
    {
        $$('.customer_menu').hide();
        //$$('.admin_menu').hide();
        $$('.fab-kasir').hide();
        $$('.kasir-beranda').hide();
        $$('.admin-beranda').hide();
        $$('.statusberanda-kasir').hide();
        $$('.title-kasir').hide();
        $$('.title-admin').hide();
        $$('.admin-konfigurasi').hide();
    }
}