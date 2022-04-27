function load_stok(e, page, id) 
{
    cekrole_stok();
    Kasir_Stok_KategoriSlider();
    listresto("mod-pilihcabang", "stok");

    if (localStorage.stok_idcabang > 0)
    {
        $$('#stok_namaresto').html(localStorage.stok_namacabang);
        $$('#stok_alamatresto').html(localStorage.stok_alamatcabang);
        $$('#stok_idresto').html(localStorage.stok_idcabang);
    }

    $$('.SearchMenu_Span').on('click', function() {
        var nama = $$('#Stok_Search').val();
        Stok_Pencarian(nama);
    });

    $$('#Stok_Search').on('keyup', function() {
        $$("#Stok_MenuList").html("");
        var nama = $$('#Stok_Search').val();
        Stok_Pencarian(nama);
    });

    if (id > 0)
    {
        StokList(id);
    }
    else
    {
        default_kategori();
    }
}

function default_kategori()
{
    var id = 0;
    if(localStorage.user_role == "Kasir")
    {
        id = localStorage.cabang;
        console.log(id);
    }
    else
    {
        id = localStorage.stok_idcabang;
    }

    app.request({
        method: "POST",
        url: "http://192.168.1.9/myorder/stok/default_stok.php",
        data: {
            store_id: id
        },
        success: function(data) {
            //console.log(data);
            var obj = JSON.parse(data);
            if (obj['status'] == true)
            {
                StokList(obj['data'][0]['category_id']);

            }
            else
            {
                StokList(0);
            }   
        }    
    });
}

function Stok_Pencarian(Menu_nama)
{
    var store_id = 0;
    if(localStorage.user_role == "Kasir")
    {
        store_id = localStorage.store_id;
    }
    else
    {
        store_id = $$("#stok_idresto").html();
    }
    
    app.request({
        method: "POST",
        url: "http://192.168.1.9/myorder/beranda/pencarian.php",
        data: {  
            menu_name : Menu_nama,
            store_id : store_id
        },
        success: function(data) {
            var obj = JSON.parse(data);                                  
            $$("#Stok_MenuList").html("");
            
            if(obj['result'] == 'Berhasil')
            {
                for(var i =0; i < obj['data'].length ; i++)
                {
                    if (obj['data'][i]['store_name'] == "" || obj['data'][i]['store_name'] == null)
                    {
                        $$('#Stok_MenuList').append(
                            '<a style="color: black;" onclick="ShowModalStok('+ obj['data'][i]['menu_id']  + ",'Stok_ModalStokAda'" +')">'+
                                '<div class="card">'+
                                    '<div class="card-content card-content-padding">'+
                                        '<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                        '<h5>'+ obj['data'][i]['menu_name']  + '</h5><br>'+
                                        '<p style="color: #808080; font-size: 11px;">'+  obj['data'][i]['menu_desc'] +'</p><br>'+
                                        '<h5>Stok: ' + obj['data'][i]['menu_stok'] + '</h5>'+
                                    '</div>'+
                                '</div>'+
                            '</a>'
                        );
                    }
                    else
                    {
                        $$('#Stok_MenuList').append(
                            '<a style="color: black;" onclick="ShowModalStok('+ obj['data'][i]['menu_id']  + ",'Stok_ModalStokAda'" +')">'+
                                '<div class="card">'+
                                    '<div class="card-content card-content-padding">'+
                                        '<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                        '<h5>'+ obj['data'][i]['menu_name']  + " - " +obj['data'][i]['store_name'] +'</h5><br>'+
                                        '<p style="color: #808080; font-size: 11px;">'+  obj['data'][i]['menu_desc'] +'</p><br>'+
                                        '<h5>Stok: ' + obj['data'][i]['menu_stok'] + '</h5>'+
                                    '</div>'+
                                '</div>'+
                            '</a>'
                        );
                    }
                }
            }
        }
    });  
}

function ShowModalStok(id, content)
{    
    var modal = document.getElementById(content);
    modal.style.opacity = 1;
    modal.style.zIndex = 999;    

    app.request({
        method: "POST",
        url: "http://192.168.1.9/myorder/beranda/detailmenu.php",
        data: {  
            menu_id : id
        },
        success: function(data) {
            var obj = JSON.parse(data);

            if(obj['result'] == "Berhasil")
            {
                $$('#'+ content + '_id').html(obj['data'][0]['menu_id']);
                $$('#'+ content + '_nama').html(obj['data'][0]['menu_name']);
                $$('#'+ content + '_deskripsi').html(obj['data'][0]['menu_description']);

                var stk = obj['data'][0]['menu_stok'];
                
                if (stk == 0)
                {
                    $$('#stok_btn').removeClass('btn-mns-warning').addClass('btn-mns');
                }
                else
                {
                    $$('#stok_btn').removeClass('btn-mns').addClass('btn-mns-warning');
                }
                
                $$('#'+ content + '_stok').html("Stok : " + stk);
                $$('#'+ content + '_JumlahPesanan').html(stk);
            
            
                $$('#'+ content + '_stok').val("Stok : " + obj['data'][0]['menu_stok']);
                $$('#'+ content + '_JumlahPesanan').val(obj['data'][0]['menu_stok']);
                
            }
        }    
    });

    window.onclick = function(event)
    {
        if (event.target == modal) 
        {
            modal.style.opacity = 0;
            modal.style.zIndex = -10;
        }
    }
}

function StokList(id) //LIST MENU DENGAN STOK
{
    $$("#Stok_kategoriID").html(id);

    var store_id = 0;
    if (localStorage.user_role == "Kasir")
    {
        store_id = localStorage.store_id;
    }
    else
    {
        store_id = $$("#stok_idresto").html();
    }

    app.request({
        method: "POST",
        url: "http://192.168.1.9/myorder/stok/stok.php",
        data: {  
            kategori_id : id,
            store_id : store_id
        },
        success: function(data) {
            var obj = JSON.parse(data);                                  
            $$("#Stok_MenuList").html("");

            if (obj['status']==true)
            {
                for(var i =0; i < obj['data'].length ; i++)
                {
                    if (localStorage.user_role == "Kasir")
                    {
                        $$('#Stok_MenuList').append(
                            '<div id="Stok_'+  obj['data'][i]['menu_id']  + '">' +                        
                                '<a style="color: black;" onclick="ShowModalStok('+ obj['data'][i]['menu_id']  + ",'Stok_ModalStok'" +')">'+
                                    '<div class="card">'+
                                        '<div class="card-content card-content-padding">'+
                                            '<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                            '<h5>'+ obj['data'][i]['menu_name'] +'</h5><br>'+
                                            '<p style="color: #808080; font-size: 11px;">'+  obj['data'][i]['menu_description'] +'</p><br>'+
                                            '<h5>Stok: ' + obj['data'][i]['menu_stok'] + '</h5>'+
                                        '</div>'+
                                    '</div>'+
                                '</a>' +
                            '</div>'
                        );
                    }
                    else
                    {
                        if (obj['data'][i]['store_name'] == "" || obj['data'][i]['store_name'] == null)
                        {
                            $$('#Stok_MenuList').append(
                                '<div id="Stok_'+  obj['data'][i]['menu_id']  + '">' +                        
                                    '<a style="color: black;" onclick="ShowModalStok('+ obj['data'][i]['menu_id']  + ",'Stok_ModalStok'" +')">'+
                                        '<div class="card">'+
                                            '<div class="card-content card-content-padding">'+
                                                '<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                                '<h5>'+ obj['data'][i]['menu_name'] + '</h5><br>'+
                                                '<p style="color: #808080; font-size: 11px;">'+  obj['data'][i]['menu_description'] +'</p><br>'+
                                                '<h5>Stok: ' + obj['data'][i]['menu_stok'] + '</h5>'+
                                            '</div>'+
                                        '</div>'+
                                    '</a>' +
                                '</div>'
                            );
                        }
                        else
                        {
                            $$('#Stok_MenuList').append(
                                '<div id="Stok_'+  obj['data'][i]['menu_id']  + '">' +                        
                                    '<a style="color: black;" onclick="ShowModalStok('+ obj['data'][i]['menu_id']  + ",'Stok_ModalStok'" +')">'+
                                        '<div class="card">'+
                                            '<div class="card-content card-content-padding">'+
                                                '<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                                '<h5>'+ obj['data'][i]['menu_name'] + " - " +obj['data'][i]['store_name'] +'</h5><br>'+
                                                '<p style="color: #808080; font-size: 11px;">'+  obj['data'][i]['menu_description'] +'</p><br>'+
                                                '<h5>Stok: ' + obj['data'][i]['menu_stok'] + '</h5>'+
                                            '</div>'+
                                        '</div>'+
                                    '</a>' +
                                '</div>'
                            );
                        }
                    }
                }   
            }
            else
            {
                $$('#Stok_MenuList').html('<h4 id="statusadminStokKosong">Menu tidak ditemukan!</h4>');
                $$('#statusadminStokKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'3.5rem'});
            }
        }     
    });
}

function Kasir_Stok_KategoriSlider() //LIST KATEGORI BOX
{
    app.request({
        method: "POST",
        url: "http://192.168.1.9/myorder/beranda/kategori.php",
        success: function(data) {
            var obj = JSON.parse(data);

            $$('#stok_list_kategoriBox').html("")
            
            for(var i =0; i < obj.length ; i++)
            {                    
                $$('#stok_list_kategoriBox').append(
                    '<div class="column">' +
                        '<a onclick="StokList('+ obj[i]['category_id'] +')" style="font-size: 12px; font-weight:bold; color: black;">'+
                            '<img src="./img/drawable-ldpi/Logo.png" alt="" >'+
                            '<label>'+ obj[i]['category_name'] + '</label>'+
                        '</a>'+
                    '</div>'
                );
            }
        }    
    });
}

function cekrole_stok()
{
    if (localStorage.user_role == "Kasir")
    {
        $$('.admin_menu').hide();
        $$('.pilihcabang').hide();
    }
    else //ADMIN
    {
        $$('.kasir_menu').hide();
    }
}