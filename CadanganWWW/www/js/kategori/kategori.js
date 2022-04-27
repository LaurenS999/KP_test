function load_kategori(e, page, halaman)
{
    cekrole_kategori(halaman);
    KategoriList(halaman);    
}

function KategoriList(halaman)
{
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/beranda/kategori.php",
        success: function(data) {
            var obj = JSON.parse(data);            
            $$('#listkategori').html("")
            
            if(localStorage.user_role =="Admin")
            {
                for(var i =0; i < obj.length ; i++)
                {
                    if (halaman == "stok")
                    {
                        $$('#listkategori').append(
                            "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                                '<a href="/stok/'+ obj[i]['category_id'] +'">' +
                                    "<div><img style='width: 4rem;' src='./img/drawable-ldpi/Logo.png'></div>"+
                                    "<div style='width: 95%;'>" +  obj[i]['category_name'] + "</div>"+
                                "</a>"+
                            "</li>"
                        );
                    }
                    else
                    {
                        var image = obj[i]['category_id'] + "_" + obj[i]['category_name'] + "." + obj[i]['category_img_ext'];
                        var image_url = "http://192.168.0.15/myorder/images/" + image;  
                        $$('#listkategori').append(
                            "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                                '<a href="/kategoriedit/'+ obj[i]['category_id'] +'">' +
                                        "<div><img style='width: 4rem;' src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'></div>"+
                                    "<div style='width: 95%;'>" +  obj[i]['category_name'] + "</div>"+
                                "</a>"+
                            "</li>"
                        );
                    }
                }
            }
            else
            {
                for(var i =0; i < obj.length ; i++)
                {
                    if (halaman == "stok")
                    {
                        $$('#listkategori').append(
                            "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                                '<a href="/stok/'+ obj[i]['category_id'] +'">' +
                                    "<div><img style='width: 4rem;' src='./img/drawable-ldpi/Logo.png'></div>"+
                                    "<div style='width: 95%;'>" +  obj[i]['category_name'] + "</div>"+
                                "</a>"+
                            "</li>"
                        );
                    }
                    else
                    {
                        $$('#listkategori').append(
                            "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                                "<a href='/kategoridetil/"+obj[i]['category_id'] + "/" + obj[i]['category_name'] + "'>" +
                                    "<div><img style='width: 4rem;' src='./img/drawable-ldpi/Logo.png'></div>"+
                                    "<div style='width: 95%;'>" +  obj[i]['category_name'] + "</div>"+
                                "</a>"+
                            "</li>"
                        );
                    }
                }
            }
        }    
    });
}

function cekrole_kategori(halaman) 
{
    if (localStorage.user_role == "Pelanggan")
    {
        $$('.kasir_menu').hide();
        $$('.admin_menu').hide();
        $$('.admin-cari').hide();
        $$('.fab-admin').hide();    
    }
    else if (localStorage.user_role == "Kasir")
    {
        $$('.admin_menu').hide();
        $$('.customer_menu').hide();
        $$('.fab-admin').hide();
        $$('.fab-customer').hide();
        $$('.admin-cari').hide();
    }
    else //ADMIN
    {
        $$('.kasir_menu').hide();
        $$('.customer_menu').hide();

        if (halaman == "stok")
        {
            $$('.fab-admin').hide();
            $$('.fab-customer').hide();
        }
    }
}