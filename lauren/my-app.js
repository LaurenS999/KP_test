var $$ = Dom7;
var app = new Framework7 ({
    root: '#app',
    name: 'My Order-System',
    id: 'com.myordersystem',
    panel: { swipe: 'left', },
    theme: 'md',
    routes: [
        // LOGIN
        {   path: '/login/',
            url: 'pages/login.html',
            on: {
                pageInit: function(e, page) {
                    var count = 0;
					$$('#show_password_login').on('click', function() {
						if (count == 0) {
							count++;
						    $$('#password').attr('type', "text");
						} else {
							count--;
						    $$('#password').attr('type', "password");
						}
                    });

                    $$('#btn-masuk').on('click', function() {
                        if ($$('#email').val() == '' || $$('#password').val() == '') 
                        {
							app.dialog.alert("Mohon masukkan email dan/atau password!");
                        }
                        else 
                        {
                            var isiData = new FormData($$('.form-ajax-login')[0]);
                            app.request.post('http://localhost:8080/myorder/login.php', 
                            isiData, function(data) {
                                var obj = JSON.parse(data);
                                if (obj['status'] == true) 
                                {
                                    var obj = obj['data'];
                                    localStorage.user_id = obj['user_id'];
                                    localStorage.user_role = obj['user_role'];
                                    page.router.navigate('/beranda/');
                                }
                                else 
                                {
                                    app.dialog.alert("Email dan/ataus password salah!"); 
                                }
                            });
                        } 
                    });
                },
                pageAfterIn: function (e, page) {    
                    if (!localStorage.user_id) {
						page.router.navigate('/login/');
                    } 
                    else 
                    {
						page.router.navigate('/beranda/');
					}
                }
            }
        },
        // REGISTER 1
        {   path: '/register1/',
            url: 'pages/register1.html',
            on: {
                pageInit: function(e, page) {
                    $$('#btn-lanjut').on('click', function() {
					    var emailregis = $$('#emailregis').val();
					    var namaregis = $$('#namaregis').val();
					    var teleponregis = $$('#teleponregis').val();
                        
                        if (emailregis == "" || namaregis == "" || teleponregis == "") 
                        {
                            app.dialog.alert("Email/Nama/Telepon wajib diisi!");
                        }
                        else 
                        {
                            var isiData = new FormData($$('.form-ajax-regis1')[0]);
                            app.request.post('http://localhost/myorder/register1.php', 
                            isiData, function(data) {
                                var obj = JSON.parse(data);
                                if (obj['status']) 
                                {
                                    var obj2 = obj['data'];
                                    localStorage.user_id_regis = obj2['user_id'];
                                    localStorage.user_email_regis = emailregis;
                                    localStorage.user_nama_regis = namaregis;
                                    localStorage.user_telepon_regis = teleponregis;
                                    page.router.navigate('/register2/');        
                                }
                                else 
                                {
                                    app.dialog.alert(obj.msg);
                                }
                            });
                        }
                    });
                }
            }
        }, 
        // REGISTER 2
        {
            path: '/register2/',
            url: 'pages/register2.html',
            on: {
                pageInit: function(e, page) {
                    var count = 0;
					$$('#show_password_login').on('click', function() {
						if (count == 0) {
							count++;
						    $$('#password').attr('type', "text");
						} else {
							count--;
						    $$('#password').attr('type', "password");
						}
                    });

                    $$('#btn-daftar2').on('click', function() {
					    var usernameregis = $$('#usernameregis').val();
					    var passwordregis = $$('#passwordregis').val();
					    var localid = localStorage.user_id_regis
                        
                        if (usernameregis == "" || passwordregis == "") 
                        {
                            app.dialog.alert("Username/Password wajib diisi!");
                        }
                        else 
                        {
                            var isiData = new FormData($$('.form-ajax-regis2')[0]);
                            app.request.post('http://localhost/myorder/register2.php?id=' + localid, 
                            isiData, function(data) {
                                var obj = JSON.parse(data);
                                if (obj.status) 
                                {
                                    localStorage.removeItem('user_id_regis');
                                    localStorage.removeItem('user_nama_regis');
                                    localStorage.removeItem('user_telepon_regis');
                                    page.router.navigate('/login/');        
                                }
                                else 
                                {
                                    app.dialog.alert(obj.msg);
                                }
                            });
                        }
                    });
                }
            }
        },
        // PROFILE
        {
            path: '/profile/',
            url: 'pages/user/profile.html',
            on: {
                pageInit: function(e ,page) {
                    load_profile_index(e, page);
                }
            }
        },
        // BERANDA
        {
            path: '/beranda/',
            url: 'pages/beranda/beranda.html',
            on: {
                pageInit: function(e ,page) {
                    load_beranda_index(e, page);

                    $$('#pencarian3').keyup(function()
                    {
                        if( event.keyCode === 13)
                        {
                            var nama = $$('#pencarian3').val();
                            page.router.navigate("/pencarian/" + nama);
                        }
                    });

                    app.request.post('http://localhost:8080/projectKP/kategori.php', {}, function (data) 
                    {
                        var kategoris = JSON.parse(data);
                        for(var i=0; i < kategoris.length; i++) 
                        {
                            $$('#kategoricolumn').append(                      
                            '<div class="column">' +
                                "<a href='/detailkategori/" + kategoris[i]["category_id"] + "'> " +
                                    '<img src="assets/Logo-sm.png" alt="" >' +
                                    '<label for="">' + kategoris[i]["category_name"] + '</label>' +
                                '</a>' +
                            '</div>'
                            );                  
                        }                                                     
                    });

                    app.request.post('http://localhost:8080/myorder/menupromo.php', {}, function (data) 
                    {
                        var promo = JSON.parse(data);
                        console.log(promo);
                        for(var i=0; i < promo['data'].length; i++) 
                        {
                            var harga_setelah_diskon = promo['data'][i]['menu_sell_price'] - promo['data'][i]['menu_discount'];
                            $$('.mypromo').append(
                               '<div class="column" style="background-color:#aaa;">' +
                                    '<img src="assets/Logo-sm.png" alt="">' +
                                    '<p> '+ promo['data'][i]['menu_name'] + '</p>' +
                                    '<p><strike>Rp. ' + promo['data'][i]['menu_sell_price'] + '</strike></p>' +
                                    '<p style="font-size: 1rem;"><b>Rp. ' + harga_setelah_diskon +'</b></p>' +
                                '</div>'
                            );                  
                        }                                                     
                    });
                }
            }
        },
        // CUSTOMER PESANAN
        {
            path: '/pesanan/',
            url: 'pages/pesanan/pesanan.html',
            on: {
                pageInit: function(e ,page) {
                    load_pesanan_index(e, page);
                }
            }
        },

        //kategori list
        {
            path: '/kategori_list/',
            url: 'page10.html',
            on: 
            {
                pageInit: function(e, page)
                {               
                  // listkategori
                  app.request.post('http://localhost:8080/projectKP/kategori.php', {}, function (data) 
                  {
                      console.log(data);
                      var kategoris = JSON.parse(data);
    
                      for(var i=0; i < kategoris.length; i++) 
                      {
                        $$('#listkategori').append(                    
                          "<li>" +                    
                              "<a href='/detailkategori/" + kategoris[i]["category_id"] + "'> " +
                                  "<div><img style='width: 4rem;' src='assets/Logo-sm.png'></div> "+
                                  "<div style='width: 95%;'>" + kategoris[i]["category_name"] + "</div>" +
                              "</a>" +
                          "</li>"
                        );                  
                      }                                                     
                  });
                }  
            }
        },

        //detail kategori
        {
            path: '/detailkategori/:id',
            url: 'page11.html',
            on: 
            {
                pageInit: function(e, page)
                {            
                    app.request.post('http://localhost:8080/projectKP/kategori.php', {}, function (data) 
                    {
                        var kategoris = JSON.parse(data);
                        for(var i=0; i < kategoris.length; i++) 
                        {
                            $$('#kategoricolumn').append(                      
                            '<div class="column">' +
                                '<a onclick=" changekategori(' + kategoris[i]["category_id"] + ') ">' +
                                    '<img src="assets/Logo-sm.png" alt="" >' +
                                    '<label for="">' + kategoris[i]["category_name"] + '</label>' +
                                '</a>' +
                            '</div>'
                            );
                        }
                    });
                                                
                    app.request.post('http://localhost:8080/projectKP/kategoridetail.php', {kategori_id: page.router.currentRoute.params.id}, function (data) 
                    {
                        $$('#kategoridetaillist').html("");                 
                        var menus = JSON.parse(data);

                        for(var i=0; i < menus.length; i++) 
                        {
                            $$('#kategoridetaillist').append(  
                            '<a onclick=" DetailMenu('+ menus[i]['menu_id'] +')">' +                  
                            '<div class="card">' +
                                '<img src="assets/Logo-sm.png" alt="">' +
                                '<h4>' + menus[i]['menu_name'] + '</h4>' +
                                '<p style="color: #808080; font-size: 10px;">' +
                                    menus[i]['menu_description'] +
                                '</p>' +
                                '<h5> Rp.' + menus[i]['menu_sell_price'] + '</h5>' +
                            '</div>' +
                            '</a>'
                            );                  
                        }                                                     
                    });


                    $$('#pencarian').keyup(function()
                    {
                        if( event.keyCode === 13)
                        {
                            var nama = $$('#pencarian').val();
                            page.router.navigate("/pencarian/" + nama);
                        }
                    });
                },        
            }
        },

        //pencarian
        {
            path: '/pencarian/:nama',
            url: 'page12.html',
            on: 
            {
                pageInit: function(e, page)
                {               
                    $$('#pencarian2').keyup(function()
                    {
                        if( event.keyCode === 13)
                        {
                            var nama = $$('#pencarian2').val();
                            
                            app.request.post('http://localhost:8080/projectKP/pencarian.php', {menu_name: nama}, function (data) 
                            {
                              $$('#textpencarian').html(nama);
                              $$('#pencarianlist').html("");                 
                              var menus = JSON.parse(data);
    
                              if(menus['result'] == "Berhasil")
                              {
                                for(var i=0; i < menus['data'].length; i++) 
                                {
                                  $$('#pencarianlist').append(
                                    '<a onclick=" DetailMenu('+ menus['data'][i]['menu_id'] +')">' +
                                      '<div class="card">' +
                                          '<img src="assets/Logo-sm.png" alt="">' +
                                          '<h4>' + menus['data'][i]['menu_name'] + '</h4>' +
                                          '<p style="color: #808080; font-size: 10px;">' +
                                          menus['data'][i]['menu_description'] +
                                          '</p>' +
                                          '<h5> Rp.' + menus['data'][i]['menu_sell_price'] + '</h5>' +
                                      '</div>' +
                                    '</a>'
                                  );
                                } 
                              }
                              else
                              {
                                alert("data Tidak Ada");
                              }                                                    
                            });
                        }
                    });
    
                    app.request.post('http://localhost:8080/projectKP/pencarian.php', {menu_name: page.router.currentRoute.params.nama}, function (data) 
                    {
                      $$('#textpencarian').html(page.router.currentRoute.params.nama);
                      $$('#pencarianlist').html("");
                      //console.log(data['result']);                 
                      var menus = JSON.parse(data);
                      
                      if(menus['result'] == "Berhasil")
                      {
                        for(var i=0; i < menus['data'].length; i++) 
                        {
                          
                          $$('#pencarianlist').append(
                            '<a onclick=" DetailMenu('+ menus['data'][i]['menu_id'] +')">' +
                            '<div class="card">' +
                                '<img src="assets/Logo-sm.png" alt="">' +
                                '<h4>' + menus['data'][i]['menu_name'] + '</h4>' +
                                '<p style="color: #808080; font-size: 10px;">' +
                                menus['data'][i]['menu_description'] +
                                '</p>' +
                                '<h5> Rp.' + menus['data'][i]['menu_sell_price'] + '</h5>' +
                            '</div>' +
                            '</a>'
                          );
                        } 
                      }
                      else
                      {
                        alert("data Tidak Ada");
                      }
                    });
                }
                
            }
        },

        //stok
        {
            path: '/stok/:id',
            url: 'stok.html',
            on:
            {
                pageInit: function(e, page)
                {
                    app.request.post('http://localhost:8080/projectKP/kategori.php', {}, function (data) 
                    {
                        var kategoris = JSON.parse(data);
                        
                        for(var i=0; i < kategoris.length; i++) 
                        {
                            $$('#kategoricolumn2').append(                      
                            '<div class="column">' +
                                '<a onclick=" changekategori_Kasir(' + kategoris[i]["category_id"] + ') ">' +
                                    '<img src="assets/Logo-sm.png" alt="" >' +
                                    '<label for="">' + kategoris[i]["category_name"] + '</label>' +
                                '</a>' +
                            '</div>'
                            );
                        }
                    });

                    var kategoriid = 8;
                    app.request.post('http://localhost:8080/myorder/stok.php', {kategori_id:kategoriid}, function (data) 
                    {
                        $$('#kategoridetaillist').html("");                 
                        var menus = JSON.parse(data);
                        console.log(data);
                        for(var i=0; i < menus.length; i++) 
                        {
                            $$('#kategoridetaillist').append(  
                            '<a onclick=" DetailMenu('+ menus[i]['menu_id'] +')">' +                  
                            '<div class="card">' +
                                '<img src="assets/Logo-sm.png" alt="">' +
                                '<h4>' + menus[i]['menu_name'] + '</h4>' +
                                '<p style="color: #808080; font-size: 10px;">' +
                                    menus[i]['menu_description'] +
                                '</p>' +
                                '<h5> Stok :' + menus[i]['menu_stok'] + '</h5>' +
                            '</div>' +
                            '</a>'
                            );                  
                        }                                                     
                    });
                }
                
            }
        }
    ]
});

//var mainView = app.views.create('.view-main', {url: '/profile/'});
var mainView = app.views.create('.view-main', {url: '/stok/2'});

function changekategori(id)
{
  app.request.post('http://localhost:8080/projectKP/kategoridetail.php', {kategori_id: id}, function (data) 
  {    
    $$('#kategoridetaillist').html("");                 
      var menus = JSON.parse(data);
      for(var i=0; i < menus.length; i++) 
      {        
        $$('#kategoridetaillist').append( 
          '<a onclick=" DetailMenu('+ menus[i]['menu_id'] +')">' +                   
          '<div class="card">' +
              '<img src="assets/Logo-sm.png" alt="">' +
              '<h4>' + menus[i]['menu_name'] + '</h4>' +
              '<p style="color: #808080; font-size: 10px;">' +
              menus[i]['menu_description'] +
              '</p>' +
              '<h5> Rp.' + menus[i]['menu_sell_price'] + '</h5>' +
          '</div>' +
          '</a>'
        );                  
      }                        
  });
}

function changekategori_Kasir(id)
{
  app.request.post('http://localhost:8080/myorder/stok.php', {kategori_id: id}, function (data) 
  {    
      $$('#kategoridetaillist').html("");                 
      var menus = JSON.parse(data);
      console.log(data);

      for(var i=0; i < menus.length; i++) 
      {        
        $$('#kategoridetaillist').append( 
          '<a onclick=" DetailMenu('+ menus[i]['menu_id'] +')">' +                   
          '<div class="card">' +
              '<img src="assets/Logo-sm.png" alt="">' +
              '<h4>' + menus[i]['menu_name'] + '</h4>' +
              '<p style="color: #808080; font-size: 10px;">' +
              menus[i]['menu_description'] +
              '</p>' +
              '<h5> Stok :' + menus[i]['menu_stok'] + '</h5>' +
          '</div>' +
          '</a>'
        );                  
      }                        
  });
}


function DetailMenu(id)
{
  var idmenu = "";
  var namamenu = "";
  var price =0;
  var deskripsi = "";

  app.request.post('http://localhost:8080/projectKP/detailmenu.php', {menu_id: id}, function (data) 
  {        
    var menus = JSON.parse(data);    
    if(menus['result'] == "Berhasil")
    {
      idmenu = menus['data'][0]['menu_id'];
      namamenu = menus['data'][0]['menu_name'];
      price = menus['data'][0]['menu_sell_price'];
      deskripsi = menus['data'][0]['menu_description'];


      var dialog = app.dialog.create({                      
        
        content: 
        '<div class="dialog-input-field item-input">' +
          '<div class="item-input-wrap">' +
            '<img src="assets/Logo-sm.png" alt="">' +
            '<h4>' + namamenu + '</h4>' +
            '<p style="color: #808080; font-size: 10px;">' +
                deskripsi +
            '</p>' +
            '<h5> Rp.' + price + '</h5>' +
    
            '<button onclick="minus()">-</button>' +
            '<div id="jumlah" value="0"> 0 </div>' +
            '<button onclick="plus()">+</button>' +
          '</div> '+
        '</div>',
        
        buttons: [
          {
            text:'Confirm',
            onClick: function(dialog, index)
            {                  
                  
            }
          },
        ],
        
        on: {
            open: function () {
                console.log("OPEN");
            }
        }
      }).open();
    }
    else
    {
      alert("data Tidak Ada");
    }
  });
    
}

function plus()
{
    var count = parseInt($$("#jumlah").attr("value"));

    count = count +1;

    if(count < 0)
    {
      count = 0;
    }

    var object = document.getElementById("jumlah");
    object.setAttribute("value", count)

    $$("#jumlah").html(count);
}

function minus()
{
  var count = parseInt($$("#jumlah").attr("value"));

  count = count - 1;

  if(count < 0)
  {
    count = 0;
  }

  var object = document.getElementById("jumlah");
  object.setAttribute("value", count)

  $$("#jumlah").html(count); 
}