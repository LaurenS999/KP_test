function load_pencarian(e, page) 
{
    SearchMenu(page.router.currentRoute.params.nama);
    $$('#textSearch').html(page.router.currentRoute.params.nama);
    $$('#Pencarian_seach').val(page.router.currentRoute.params.nama).trigger('change');

    $$('.SearchMenu_Span').on('click', function() {
        var nama = $$('#Pencarian_seach').val();
        $$('#textSearch').html(nama);
        $$('#Pencarian_seach').val(nama);
        SearchMenu(nama);
    });

    $$("#Pencarian_seach").on('keyup',function(){
        var nama = $$('#Pencarian_seach').val();
        $$('#textSearch').html(nama);
        SearchMenu(nama);
    })

    cekrole_pencarian();
}

function cekrole_pencarian()
{
    if (localStorage.user_role == "Pelanggan")
    {
        $$('.driver_menu').hide();
        $$('.kasir_menu').hide();
        $$('.admin_menu').hide();
    }
    else if (localStorage.user_role == "Kasir")
    {
        $$('.driver_menu').hide();
        $$('.admin_menu').hide();
        $$('.customer_menu').hide();

    }
    else if (localStorage.user_role == "Admin")
    {
        $$('.driver_menu').hide();
        $$('.kasir_menu').hide();
        $$('.customer_menu').hide();
    }
}

function SearchMenu(Menu_nama)
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
        url: "http://192.168.0.15/myorder/beranda/pencarian.php",
        data: {  
            menu_name : Menu_nama,
            store_id : localStorage.store_id
        },
        success: function(data) {
            var obj = JSON.parse(data);            
            $$('#Pencarian_MenuList').html("");

            if (obj['result'] == "Berhasil")
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
                                    $$('#Pencarian_MenuList').append(
                                        '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'Pencarian_MenuModal'" +')">' +
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
                        else //TIDAK ADA DI KERANJANG
                        {
                            $$('#Pencarian_MenuList').append(
                                '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'Pencarian_MenuModal'" +')">' +
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
                    else //TIDAK DISKON
                    {
                        if (array1.includes(obj['data'][i]['menu_id'])) //ADA DI KERANJANG
                        {
                            for(var j = 0; j < array1.length; j++)
                            {
                                if (obj['data'][i]['menu_id'] == array1[j])
                                {
                                    $$('#Pencarian_MenuList').append(
                                        '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'Pencarian_MenuModal'" +')">' +
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
                            $$('#Pencarian_MenuList').append(
                                '<a style="color: black;" onclick="ShowModalMenu('+ obj['data'][i]['menu_id'] + ",'Pencarian_MenuModal'" +')">' +
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
                $$('#Pencarian_MenuList').html("");
                $$('#Pencarian_MenuList').html('<h4 id="statusPencarianKosong">Menu tidak ditemukan!</h4>');
                $$('#statusPencarianKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'10rem'});
            }
        }    
    });
}