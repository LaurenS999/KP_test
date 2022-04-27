function load_kategori(e, page, halaman)
{
    cekrole_kategori(halaman);
    KategoriList(halaman);    
}

function KategoriList(halaman)
{
    app.request({
        method: "POST",
        url: "http://localhost/myorder/beranda/kategori.php",
        success: function(data) {
            var obj = JSON.parse(data);            
            $$('#listkategori').html("")
            
            if(localStorage.user_role =="Admin")
            {
                if (obj.length <= 0)
                {
                    $$('#kategoriStatNull').html('<h4 id="statusadminKategoriosong">Kategori tidak ditemukan!</h4>');
                    $$('#statusadminKategoriosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'13rem'});
                }
                
                for(var i =0; i < obj.length ; i++)
                {
                    if (halaman == "stok")
                    {
                        var image = "kategori_" + obj[i]['category_id'] + "." + obj[i]['category_img_ext'];
                        var image_url = "http://localhost/myorder/images/" + image+ '?' + Date.now();
                        $$('#listkategori').append(
                            "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                                '<a href="/stok/'+ obj[i]['category_id'] +'">' +
                                    "<div class='img-box'><img class='img-content' src='"+ image_url + "'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'></div>"+
                                    "<div style='width: 95%;'>" +  obj[i]['category_name'] + "</div>"+
                                "</a>"+
                            "</li>"
                        );
                    }
                    else
                    {
                        var image = "kategori_" + obj[i]['category_id'] + "." + obj[i]['category_img_ext'];
                        var image_url = "http://localhost/myorder/images/" + image+ '?' + Date.now();
                        $$('#listkategori').append(
                            "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                                '<a href="/kategoriedit/'+ obj[i]['category_id'] +'">' +
                                        "<div class='img-box'><img class='img-content' src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'></div>"+
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
                        var image = "kategori_" + obj[i]['category_id'] + "." + obj[i]['category_img_ext'];
                        var image_url = "http://localhost/myorder/images/" + image+ '?' + Date.now();
                        $$('#listkategori').append(
                            "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                                '<a href="/stok/'+ obj[i]['category_id'] +'">' +
                                    "<div class='img-box'><img class='img-content' src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'></div>"+
                                    "<div style='width: 95%;'>" +  obj[i]['category_name'] + "</div>"+
                                "</a>"+
                            "</li>"
                        );
                    }
                    else
                    {
                        var image = "kategori_" + obj[i]['category_id'] + "." + obj[i]['category_img_ext'];
                        var image_url = "http://localhost/myorder/images/" + image+ '?' + Date.now();
                        $$('#listkategori').append(
                            "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                                "<a href='/kategoridetil/"+obj[i]['category_id'] + "/" + obj[i]['category_name'] + "'>" +
                                    "<div class='img-box'><img class='img-content' src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'></div>"+
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