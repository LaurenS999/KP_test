var $$ = Dom7;
var app = new Framework7 ({
    root: '#app',
    name: 'Ordering System',
    id: 'com.ordersystem',
    panel: { swipe: 'left', },
    theme: 'md',
    routes: [
        {   // LOGIN - DONE
            path: '/login/',
            url: 'pages/login.html',
            on: {
                pageInit: function(e, page) {
                    var count = 0;
                    $$('#show_password_login').on('click', function() {
                        if (count == 0) {
                            count++;
                            $$('#eye-login').addClass('fa-eye-slash');
                            $$('#password-login').attr('type', "text");
                        } else {
                            count--;
                            $$('#eye-login').removeClass('fa-eye-slash');
                            $$('#password-login').attr('type', "password");
                        }
                    });

                    login(e, page);
                },
                pageAfterIn: function (e, page) {    
                    if (!localStorage.user_id) {
						page.router.navigate('/login/');
                    } 
                    else 
                    {
						if (localStorage.user_role == "Driver")
                        {
                            page.router.navigate('/pesanan/');
                        }
                        else
                        {
                            page.router.navigate('/beranda/');
                        }
					}
                }
            }
        },
        {   // REGISTER 1
            path: '/register1/',
            url: 'pages/register1.html',
            on: { 
                pageInit: function(e, page) {
                    registrasi_1(e, page);
                }
            }
        },
        {   // REGISTER 2
            path: '/register2/',
            url: 'pages/register2.html',
            on: { 
                pageInit: function(e, page) {
                    registrasi_2(e, page);
                }
            }
        },
        {   // USER / PROFILE - DONE
            path: '/profile/',
            url: 'pages/user.html',
            on: {
                pageInit: function(e, page) {
                    load_user(e, page);
                }
            }
        },
        {   // BERANDA
            path: '/beranda/',
            url: 'pages/beranda.html',
            on: {
                pageInit: function(e, page) {                    
                    load_beranda(e, page);
                    
                    listresto('mod-pilihcabang','beranda');
                    listbanner('beranda');

                    cekKeranjang();

                    if (localStorage.user_role == "Kasir")
                    {
                        count_pesananBaru();
                    }
                },
                pageAfterIn:function(e,page)
                {
                    load_beranda(e, page);
                    cekKeranjang();
                }
            }
        },
        {   // PESANAN
            path: '/pesanan/',
            url: 'pages/pesanan/pesanan.html',
            on: { 
                pageInit: function(e, page) {
                    load_pesanan(e, page);
                    if (localStorage.user_role == "Admin")
                    {
                        listresto('mod-pilihcabang','pesanan');
                    }
                },
                pageAfterIn: function (e, page) {    
                    load_pesanan(e, page);
                    if (localStorage.user_role == "Admin")
                    {
                        listresto('mod-pilihcabang','pesanan');
                    }
                }
            }
        },
        {   // PESANAN DETIL
            path: '/pesanandetil/:id',
            url: 'pages/pesanan/detil.html',
            on: { 
                pageInit: function(e, page) {
                    load_pesanan_detil(e, page);
                }
            }
        },
        {   // KERANJANG
            path: '/keranjang/',
            url: 'pages/pesanan/keranjang.html',
            on: {
                pageInit: function(e, page)
                {
                    cekrole_keranjang();
                    
                    modalPembayaran("keranjang");             
                    
                    if (localStorage.user_role == 'Pelanggan')
                    {
                        // getMapLocation();
                        // biaya_antar();
                        // var input = document.getElementById("keranjang_alamat");                    
                        // input.addEventListener("keyup", function(event) {                
                        //     if (event.keyCode === 13) {
                        //     getMapLocation("keranjang_map",0,0);
                        //         biaya_antar();
                        //     }
                        // });
                    }
                    
                    DetailKeranjang();
                }
            }
        },
        {   // PENCARIAN
            path: '/pencarian/:nama',
            url: 'pages/kategori/pencarian.html',
            on: { 
                pageInit: function(e, page) {
                    load_pencarian(e, page);
                    cekKeranjang();
                },
                pageAfterIn: function(e, page) {
                    load_pencarian(e,page);
                    cekKeranjang();
                }
            }
        },
        {   // KATEGORI
            path: '/kategori/:halaman',
            url: 'pages/kategori/kategori.html',
            on: {
                pageInit: function(e, page) {
                    if (localStorage.user_role == "Pelanggan")
                    {
                        load_kategori(e, page, "");
                        cekKeranjang();    
                    }
                    else if (localStorage.user_role == "Admin" || localStorage.user_role == 'Kasir')
                    {
                        load_kategori(e, page, page.router.currentRoute.params.halaman);
                    }
                    
                    if (page.router.currentRoute.params.halaman == 'stok')
                    {
                        $$("#admin_kategori_search").on('keyup', function (){
                            admin_search('stok_kategori');
                        });
                    }
                    else
                    {
                        $$("#admin_kategori_search").on('keyup', function (){
                            admin_search('kategori');
                        });
                    }
                },
                pageAfterIn: function(e,page)
                {
                    if (localStorage.user_role == "Admin")
                    {
                        load_kategori(e, page, page.router.currentRoute.params.halaman);
                    }
                }
            }
        },
        {   // KATEGORI DETIL
            path: '/kategoridetil/:id/:nama',
            url: 'pages/kategori/detil.html',
            on: {
                pageInit: function(e, page) {
                    load_kategori_detil(e, page);
                    cekKeranjang();
                }
            }
        },
        {   // STOK 
            path: '/stok/',
            url: 'pages/stok/stok.html',
            on: {
                pageInit: function(e, page) {
                    load_stok(e, page);
                }
            }
        },
        {   // STOK WITH KATEGORI
            path: '/stok/:id',
            url: 'pages/stok/stok.html',
            on: {
                pageInit: function(e, page) {
                    load_stok(e, page, page.router.currentRoute.params.id);
                }
            }
        },
        {   // RIWAYAT
            path: '/riwayat/',
            url: 'pages/riwayat/riwayat.html',
            on: { 
                pageInit: function(e, page){
                    cekrole_riwayat();
                    modalTanggal('riwayat');
                    riwayat();

                    if (localStorage.user_role == "Driver")
                    {                       
                        riwayat();
                    }
                    else if(localStorage.user_role =="Admin")
                    {
                        listresto("mod-pilihcabang", "riwayat");
                    }
                },
                pageAfterIn: function(e, page){
                    cekrole_riwayat();
                    //modalTanggal('riwayat');                
                    if (localStorage.user_role == "Driver")
                    {                       
                        riwayat();
                    }
                    else if(localStorage.user_role =="Admin")
                    {
                        listresto("mod-pilihcabang", "riwayat");
                    }
                }
            }
        },
        {   // RIWAYAT DETIL
            path: '/riwayatdetil/:id',
            url: 'pages/riwayat/detil.html',
            on: { 
                pageInit: function(e,page)
                {
                    cekrole_riwayatdetil();
                    riwayatdetil(page.router.currentRoute.params.id);

                    if (localStorage.user_role == 'Driver')
                    {
                        $$('#btnBack-driver').show();
                        $$('#btnBack-selainDriver').hide();
                    }
                    else
                    {
                        $$('#btnBack-driver').hide();
                        $$('#btnBack-selainDriver').show();
                    }
                }
            }
        },
        {   // CABANG
            path: '/cabang/',
            url: 'pages/admin/cabang.html',
            on: {
                pageInit: function(e, page)
                {                    
                    listresto('admin_cabanglist','admin');

                    $$("#admin_cabang_search").on('keyup', function () {                        
                        admin_search('cabang')
                    });
                }
             }
        },
        {   // CABANG DETIL
            path: '/cabangdetil/:id',
            url: 'pages/admin/cabangdetil.html',
            on: { 
                pageInit: function(e, page)
                {
                    if(page.router.currentRoute.params.id == 0)
                    {
                        $$("#cabang_ubah").hide();
                        $$("#cabang_titel_ubah").hide();
                    }
                    else
                    {
                        cabangdetil(page.router.currentRoute.params.id);
                        $$("#cabang_titel_tambah").hide();
                        $$("#cabang_tambah").hide();

                    }
                }
            }
        },
        {   // KATEGORI EDIT (ADMIN)
            path: '/kategoriedit/:id',
            url: 'pages/admin/kategoridetil.html',
            on: { 
                pageInit: function(e, page)
                {
                    if(page.router.currentRoute.params.id ==0)
                    {
                        $$("#kategoridetil_title_ubah").hide();
                        $$("#kategoridetil_ubah").hide();
                    }
                    else
                    {
                        $$("#kategoridetil_title_tambah").hide();
                        $$("#kategoridetil_tambah").hide();
                        admin_kategoridetil(page.router.currentRoute.params.id);
                    }
                }
            }
        },
        {   // PEMBAYARAN DETIL
            path: '/pembayarandetil/:id',
            url: 'pages/admin/pembayarandetil.html',
            on: {
                pageInit: function(e,page)
                {
                    if(page.router.currentRoute.params.id == 0)
                    {
                        $$("#pembayarandetil_ubah").hide();
                        $$("#pembayarandetil_title_ubah").hide();
                    }
                    else
                    {
                        $$("#pembayarandetil_tambah").hide();
                        $$("#pembayarandetil_title_tambah").hide();
                        admin_jenispembayarandetil(page.router.currentRoute.params.id);
                    }
                }
             }
        },
        {   // PEMBAYARAN
            path: '/pembayaran/',
            url: 'pages/admin/pembayaran.html',
            on: {
                pageInit: function(e,page)
                {
                    admin_jenispembayaran();

                    $$("#admin_jenispembayaran_search").on('keyup', function (){
                        admin_search('jenispembayaran');
                    });
                }
             }
        },
        {   // MENU
            path: '/menu/',
            url: 'pages/admin/menu.html',
            on: {
                pageInit: function(e,page)
                {
                    listresto('mod-pilihcabang','menu');
                    admin_menu();

                    $$("#admin_menu_search").on('keyup', function (){                        
                        admin_search('menu')
                    });
                }
             }
        },
        {   // MENU DETIL (ADMIN)
            path: '/menudetil/:id',
            url: 'pages/admin/menudetil.html',
            on: {
                pageInit: function(e, page)
                {
                    if(page.router.currentRoute.params.id == 0)
                    {
                        $$('#menu_title_ubah').hide();
                        $$("#menu_ubah").hide();
                        admin_kategori_combobox(0);
                        admin_cabang_combobox(0);
                    }
                    else
                    {
                        $$('#menu_title_tambah').hide();
                        $$("#menu_tambah").hide();
                        admin_menudetil(page.router.currentRoute.params.id);
                    }
                }
             }
        },
        {   // BANNER
            path: '/banner/',
            url: 'pages/admin/banner.html',
            on: { 
                pageInit: function(e,page)
                {
                    listbanner("banner");
                }
            }
        },
        {   // BANNER DETIL (ADMIN)
            path: '/bannerdetil/:id',
            url: 'pages/admin/bannerdetil.html',
            on: { 
                pageInit: function(e,page)
                {
                    var id = page.router.currentRoute.params.id;

                    if (id == 0)
                    {
                        $$('#ubahBanner').hide();
                        $$('#tambahBanner').show();
                        $$("#banner_title").html("Tambah Banner");
                        admin_cabang_combobox(0);
                    }
                    else
                    {
                        bannerdetil(id);
                        $$('#ubahBanner').show();
                        $$('#tambahBanner').hide();
                        $$("#banner_title").html("Ubah Banner");                        
                    }
                }
            }
        },
        {   // KARYAWAN
            path: '/karyawan/',
            url: 'pages/admin/karyawan.html',
            on: { 
                pageInit: function(e, page)
                {
                    listresto('mod-pilihcabang','karyawan');
                    admin_karyawan();

                    $$("#admin_karyawan_search").on('keyup', function (){                        
                        admin_search('karyawan')
                    });
                }
            }
        },
        {   // KARYAWAN EDIT (ADMIN)
            path: '/karyawanedit/:id',
            url: 'pages/admin/karyawandetil.html',
            on: {
                pageInit: function(e, page)
                {
                    if(page.router.currentRoute.params.id ==0)
                    {
                        $$("#karyawanedit_ubah").hide();
                        $$("#karyawandetil_title_ubah").hide();
                        admin_cabang_combobox(0);
                    }
                    else
                    {
                        $$("#karyawanedit_tambah").hide();
                        $$("#karyawandetil_title_tambah").hide();
                        admin_karyawandetil(page.router.currentRoute.params.id);
                    }

                    var count_password_karyawan = 0;
                    $$('#eye-password-karyawan').on('click', function() {
                        if (count_password_karyawan == 0) {
                            count_password_karyawan++;
                            $$('#eye-password-karyawan').addClass('fa-eye-slash');
                            $$('#karyawandetil_password').attr('type', "text");
                        } else {
                            count_password_karyawan--;
                            $$('#eye-password-karyawan').removeClass('fa-eye-slash');
                            $$('#karyawandetil_password').attr('type', "password");
                        }
                    });
                }
             }
        },
        {   // LAPORAN (ADMIN)
            path: '/laporan/',
            url: 'pages/admin/laporan.html',
            on: { 
                pageInit:function(e,page)
                {
                    modalTanggal('laporan');
                    admin_laporan();
                    listresto("mod-pilihcabang", "laporan");
                }
            }
        }
    ]
});

var mainView = app.views.create('.view-main', {url: '/login/'});

function stok_max(id_menu)
{
    //console.log(id_menu);

    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/beranda/detailmenu.php",
        data: {  
            menu_id : id_menu
        },
        success: function(data) {
            var obj = JSON.parse(data);
            if (obj['result'] == 'Berhasil') 
            {                                
                localStorage.stokMax = obj['data'][0]['menu_stok'];
            }
            else
            {
                app.dialog.alert(obj['result']);
            }
        }    
    });
}

function TambahStok(content)
{
    var jumlah = $$("#"+ content + "_JumlahPesanan").val();
    if (jumlah == '')
    {
        jumlah = 0;
    }
    var total = parseInt(jumlah) + 1;

    $$("#"+ content + "_JumlahPesanan").val(total);
}

function Tambah(content)
{
    //console.log(content);
    var id_menu = $$("#"+ content + "_id").html();

    stok_max(id_menu);

    var jumlah = $$("#"+ content + "_JumlahPesanan").html();
    var total = parseInt(jumlah) + 1;

    if (total > localStorage.stokMax)
    {
        total = total - 1;
        app.dialog.alert('Stok tidak cukup!');
    }

    $$("#"+ content + "_JumlahPesanan").html(total);
}
function Kurang(content)
{
    if (content == 'Stok_ModalStok')
    {
        var jumlah = $$("#" + content + "_JumlahPesanan").val();
        if (jumlah == "")
        {
            jumlah =0;
        }
        var total = parseInt(jumlah) - 1;
        if (total < 0)
        {
            total = 0;
        }
        $$("#" + content + "_JumlahPesanan").val(total);
    }
    else
    {
        var jumlah = $$("#" + content + "_JumlahPesanan").html();
        if (jumlah == "")
        {
            jumlah =0;
        }
        var total = parseInt(jumlah) - 1;
        if (total < 0)
        {
            total = 0;
        }
        $$("#" + content + "_JumlahPesanan").html(total);
    }
}



function formatTanggal(date)
{
		var monthlist = Array("Januari", "Febuari", "Maret", "April", "Mei", 
											'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 
											'November', 'Desember')

		var split = date.split('-');
        var index = parseInt(split[1] -1 );
		var month = monthlist[index];        
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
             jam = pad(jam);
			 text = jam + ":" + split[1] + " PM";
		}
		else
		{
			 text = split[0] + ":" + split[1] + " AM";
		}

		return text;
}

function pad(number) {   
    return (number < 10 ? '0' : '') + number;
}

function pad_ordernumber(number) {
    if (number.length == 1)
    {
        return (number < 100 ? '00' : '') + number;
    }
    else if (number.length >= 2)
    {
        return (number < 100 ? '0' : '') + number;
    }
}

function BukaModal(modalName)
{   
    if (modalName == "mod-ubahmenu" && (localStorage.user_role == "Pelanggan" || localStorage.user_role =="Driver"))
    {
        return;
    } 
    var modal = document.getElementById(modalName);
    modal.style.opacity = 1;
    modal.style.zIndex = 9999;

    window.onclick = function(event)
    {
        if (event.target == modal) 
        {
            modal.style.opacity = 0;
            modal.style.zIndex = -10;

            $$('.' + modalName + '_input').val('');
        }
    }
}
function TutupModal(modalName)
{
    var modal = document.getElementById(modalName);
    modal.style.opacity = 0;
    modal.style.zIndex = -10;

    $$('.' + modalName + '_input').val('');
}




function ValidateEmail(inputText)
{
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(inputText.match(mailformat))
    {
        //alert("Valid email address!");
        //document.form1.text1.focus();
        return true;
    }
    else
    {
        //document.form1.text1.focus();
        return false;
    }
}

function registrasi_1(e, page)
{
    $$('#btn-regis1').on('click', function() {
        var nama = $$('#nama-regis').val();
        var tlpn = $$('#tlpn-regis').val();
        var email = $$('#email-regis').val();

        if ( !ValidateEmail(email))
        {
            app.dialog.alert("Email salah!");
        }
        else
        {
            if (nama == '' || tlpn == '' || email == '')
            {
                app.dialog.alert("Kolom tidak boleh kosong!");
            }
            else
            {
                localStorage.nama_temp = nama;
                localStorage.email_temp = email;
                localStorage.tlpn_temp = tlpn;
                page.router.navigate('/register2/');
            }
        }
    });
}

function registrasi_2(e, page)
{
    var count = 0;
    $$('#show_password_regis').on('click', function() {
        if (count == 0) {
            count++;
            $$('#eye-login').addClass('fa-eye-slash');
            $$('#password-regis').attr('type', "text");
        } else {
            count--;
            $$('#eye-login').removeClass('fa-eye-slash');
            $$('#password-regis').attr('type', "password");
        }
    });

    $$('#btn-regis2').on('click', function() {
        var uname = $$('#uname-regis').val();
        var pass = $$('#password-regis').val();
        var tlpn = localStorage.tlpn_temp;
        var nama = localStorage.nama_temp;
        var email = localStorage.email_temp;
        var role = "Pelanggan";
        var u_delete = 0;
        var token = 0;

        if (pass == '' || uname == '')
        {
            app.dialog.alert("Kolom tidak boleh kosong!");
        }
        else
        {
            loadingData();
            app.request({
                method: 'POST',
                url: 'http://192.168.0.15/myorder/register.php',
                data: {
                    email : email,
                    password : pass,
                    uname : uname,
                    name : nama,
                    phone : tlpn,
                    role : role,
                    udelete : u_delete
                },
                success: function(data) {
                    var obj = JSON.parse(data);
                    if (obj['status'] == true)
                    {
                        localStorage.clear();
                        app.dialog.alert(obj['data']);
                        page.router.navigate('/login/');
                    }
                    else
                    {
                        app.dialog.alert(obj['data']);
                        page.router.navigate('/register1/');
                    }
                    determinateLoading = false;
                    app.dialog.close();
                }
            });
        }
    });
}

function loadingData() {
	showDeterminate(true);
	determinateLoading = false;
	function showDeterminate(inline) {
		determinateLoading = true;
		var progressBarEl;
		if (inline) {
			progressBarEl = app.dialog.progress("Loading");
		} else {
			progressBarEl = app.progressbar.show(0, app.theme === 'md' ? 'yellow' : 'blue');
		}
		function simulateLoading() {
			setTimeout(function () {
				simulateLoading();
			}, Math.random() * 200 + 200);
		}
		simulateLoading();
	}
}

function login(e, page) 
{
    $$('#btn-login').on('click', function() {
        var email = $$('#email-login').val();

        if ($$('#email-login').val() == '' || $$('#password-login').val() == '') 
        {
            app.dialog.alert("Mohon masukkan email dan/atau password!");
        }
        else 
        {
            if ( !ValidateEmail(email))
            {
                app.dialog.alert("Email salah!");
            }
            else
            {
                //loadingData();
                var isiData = new FormData($$('.form-ajax-login')[0]);

                //app.request.post('http://192.168.0.15/myorder/login.php', 
                app.request.post('https://skdevtechnology.com/ordering/login_crypt.php', 
                //app.request.post('http://192.168.0.15/myorder/login_crypt.php', 
                isiData, function(data) {

                    var obj = JSON.parse(data);
                    if (obj['status'] == true) 
                    {
                        var obj = obj['data'];
                        localStorage.user_id = obj['user_id'];
                        localStorage.user_role = obj['user_role'];
                        localStorage.username = obj['username'];
                        localStorage.user_name = obj['user_name'];
                        localStorage.password = obj['password'];
                        localStorage.user_phone = obj['user_phone'];
                        localStorage.email = obj['email'];
                        localStorage.user_token = obj['user_token'];
                        localStorage.user_delete = obj['user_delete'];
                        localStorage.store_id = obj['store_id'];
                        localStorage.keranjang = "";
                        localStorage.JumlahKeranjang = "";
                        
                        if (localStorage.user_role == "Admin" || localStorage.user_role == "Pelanggan" || localStorage.user_role == "Kasir")
                        {
                            localStorage.cabang = obj['store_id'];
                            page.router.navigate('/beranda/');
                        }
                        else
                        {
                            page.router.navigate('/pesanan/');
                        }
                    }
                    else 
                    {
                        app.dialog.alert(obj['data']); 
                    }
                    determinateLoading = false;
                    app.dialog.close();
                });
            }
        } 
    });
}

function onBackKeyDown() {
	if(app.views.main.history.length == 1 || app.views.main.router.url == '/user_home/') {
		navigator.app.exitApp();
	} else {
		if(app.views.main.router.url == '/login/') {  
			navigator.app.exitApp();
		} else {
			app.dialog.close();

            var link = "";
            if (localStorage.user_role == 'Dirver')
            {
                link = '/pesanan/';
            }
            else
            {
                link = '/beranda/';
            }

			// app.views.main.router.back();
			app.views.main.router.back({
				url: link,
				force: true,
				ignoreCache: true
			});
			return false;
		}
	}
}
document.addEventListener("backbutton", onBackKeyDown, false);

//MASIH KURANG PENGECHEKAN JIKA JUMLAH == 0
function MasukKeranjang(content)
{
    var array_id = "";
    var array_jumlah ="";
    var id = $$("#"+ content + "_id").html();
    var jumlah = $$("#"+ content + "_JumlahPesanan").html();

    if (jumlah < 1)
    {
        app.dialog.alert('Masukan jumlah!');
    }
    else
    {
        if ((localStorage.keranjang == null || localStorage.keranjang == "") && (localStorage.JumlahKeranjang == null || localStorage.JumlahKeranjang == "" ))
        {            
            localStorage.keranjang = id;               
            localStorage.JumlahKeranjang = jumlah;
        }
        else
        {
            array_id = localStorage.keranjang;
            array_jumlah = localStorage.JumlahKeranjang;
    
            var array = array_id.split(",");
            var array2 = array_jumlah.split(",");        
    
            for(var i =0; i < array.length; i++)
            {
                if (id == array[i])
                {
                    array2[i] = jumlah;
                    break;
                }
    
                if (i == array.length -1)
                {
                    array.push(id);                
                    array2.push(jumlah);
                }                                            
            }
    
            array_id_akhir ="";
            array_jumlah_akhir = "";
            for(var i =0; i < array.length; i++)
            {
                if (array2[i] == 0)
                {
                    continue;
                }
    
                if (array_id_akhir.length ==0)
                {
                    array_id_akhir = array[i] ;
                    array_jumlah_akhir = array2[i];
                }
                else
                {
                    array_id_akhir = array_id_akhir+ "," + array[i] ;
                    array_jumlah_akhir =  array_jumlah_akhir + "," + array2[i];
                }            
            }        
            localStorage.keranjang = array_id_akhir;                        
            localStorage.JumlahKeranjang = array_jumlah_akhir;
        }
        console.log(localStorage.keranjang);
        console.log(localStorage.JumlahKeranjang);
        TutupModal(content);
        $$("#"+ content + "_JumlahPesanan").html(0);
    
        cekKeranjang();
        window.location.reload();
    }
}

//RIWAYAT
function cekrole_riwayat()
{
    if (localStorage.user_role == "Kasir")
    {
        $$(".driver_menu").hide();
        $$(".admin_menu").hide();
        $$(".title-driver").hide();
        $$(".admin_title").hide();
        $$(".pilihcabang").hide();
        $$(".listpesan-driver").hide();
    }
    else if (localStorage.user_role == "Driver")
    {
        $$(".kasir_menu").hide();        
        $$(".admin_menu").hide();
        $$(".pilihcabang").hide();
        $$(".kasir-beranda").hide(); //NAMA CLASS KASIR TITLE
        $$(".admin_title").hide();
        $$(".pilih-kasir-admin").hide();
        $$(".listriwayat-kasir-admin").hide();
    }
    else //ADMIN
    {
        $$(".kasir_menu").hide();        
        $$(".driver_menu").hide();
        $$(".title-driver").hide();
        $$(".kasir-beranda").hide();    
        $$(".listpesan-driver").hide();
    }
}

function modalTanggal(halaman)
{
    var calendarDateFormat = app.calendar.create({
        inputEl: '#demo-calendar-date-format',
        rangePicker:true,
        backdrop: true,
        openIn: 'customModal',
        footer: true,
        // closeByOutsideClick:false,
        monthNames:['Januari','Febuari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
        dateFormat:'dd-MM-yyyy',
        
        on:{
            close:function(calendar)
            {
                if (calendar.value == undefined)
                {
                    return;
                }

                if (calendar.value[1] == null)
                {
                    calendar.value[1] = calendar.value[0];
                }

                var bulan=['Januari','Febuari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

                var bulanstart = bulan[ calendar.value[0].getMonth() ];
                var bulanend = bulan[ calendar.value[1].getMonth() ];

                var haristart = calendar.value[0].getDate();
                var tahunstart = calendar.value[0].getFullYear();

                var hariend = calendar.value[1].getDate();
                var tahunend = calendar.value[1].getFullYear();

                if (halaman == "riwayat")
                {
                    $$('#Riwayat_TanggalAwal').html(haristart + " " + bulanstart + " " + tahunstart);
                    $$('#Riwayat_TanggalAkhir').html(hariend + " " + bulanend + " " + tahunend);

                    $$('#tanggalawal').html(tahunstart+ "-" + pad(calendar.value[0].getMonth() + 1) + "-" + pad(haristart) );
                    $$('#tanggalakhir').html(tahunend+ "-" + pad(calendar.value[1].getMonth() + 1) + "-" + pad(hariend)  );

                    riwayat();    
                }
                else if (halaman == "laporan")
                {
                    $$('#Laporan_TanggalAwal').html(haristart + " " + bulanstart + " " + tahunstart);
                    $$('#Laporan_TanggalAkhir').html(hariend + " " + bulanend + " " + tahunend);

                    $$('#tanggalawal_laporan').html(tahunstart+ "-" + pad(calendar.value[0].getMonth() + 1) + "-" + pad(haristart) );
                    $$('#tanggalakhir_laporan').html(tahunend+ "-" + pad(calendar.value[1].getMonth() + 1) + "-" + pad(hariend)  );

                    admin_laporan();
                    admin_laporan_menulist();
                }
            }
        }
    });
}

function riwayat()
{    
    var tanggalstart = "";
    var tanggalend = "";
    var store = "";    

    if (localStorage.user_role == "Kasir")
    {
        tanggalstart = $$('#tanggalawal').html();
        tanggalend = $$('#tanggalakhir').html();
    }
    else if (localStorage.user_role == "Admin")
    {
        tanggalstart = $$('#tanggalawal').html();
        tanggalend = $$('#tanggalakhir').html();
        store = $$("#riwayat_idresto").html();
    }

    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/riwayat/riwayat.php",
        data: {            
            uid : localStorage.user_id,                   
            role : localStorage.user_role,
            tanggal1 : tanggalstart,
            tanggal2 : tanggalend,
            store : store
        },
        success: function(data) {
            console.log(data);
            var obj = JSON.parse(data);

            if (obj['result'] == "Berhasil")
            {         
                if (localStorage.user_role == "Driver")
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
                            "<a style='color: black;' href='/riwayatdetil/"+ obj['data'][i]['transaction_id'] + "'>" +
                                '<div class="card card-outline">' +
                                    ' <div class="card-content card-content-padding">'+
                                            '<div class="row">'+
                                                '<div class="col-66">'+
                                                    '<p><b>['+ tanggaltext + ordernumbertext +']</b></p>'+
                                                    '<p>Driver: <label>'+ obj['data'][i]['user_name'] + '</label></p>'+
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
                else if (localStorage.user_role == "Kasir" || localStorage.user_role == "Admin")
                {                                        
                    $$('#riwayat_listriwayat_kasir_admin').html("");                    
                    for(var i=0; i < obj['data'].length; i++)
                    {                    
                        var tanggal = formatTanggal(obj['data'][i]['transaction_date']);
                        var time = FormatTime(obj['data'][i]['transaction_time']);

                        //DISPLAY KODE
                        var tanggaltext = obj['data'][i]['transaction_date'].replace(/\-/g, '');
                        var ordernumbertext = pad_ordernumber(obj['data'][i]['transaction_order_number']);

                        $$('#riwayat_listriwayat_kasir_admin').append(
                            "<a style='color: black;' href='/riwayatdetil/"+ obj['data'][i]['transaction_id'] + "'>" +
                            '<div class="card">'+
                                '<div class="card-content">'+
                                    '<div>'+
                                        '<h5 style="float: left;">[' + tanggaltext + ordernumbertext +']</h5>'+
                                        '<h5 style="float: right;">Rp '+ formatRupiah(obj['data'][i]['transaction_total_amount']) +'</h5>'+
                                    '</div>'+
                                    '<div style="padding-top: 1.5rem;">'+
                                        '<p>Pelanggan: <label>'+ obj['data'][i]['transaction_customer_name'] +'</label></p>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="card-footer">'+
                                    '<p style="color: #4A90E2;">Kasir: <label>'+ obj['data'][i]['KasirName'] + '</label></p>'+
                                    '<p>'+ tanggal + ' | ' + time +'</p>'+
                                '</div>'+
                            '</div>' +
                            '</a>'                            
                        );
                        $$('#Riwayat_JumlahPesanan').html(i +1);
                    } 
                }
            }
            else
            {
                if (localStorage.user_role == "Driver")
                {
                    $$('#Riwayat_JumlahPesanan').html("0");
                    $$('#riwayat-driver').html('<h4 id="statusRiwayatKosong">Belum ada riwayat pesanan.</h4>');
                    $$('#statusRiwayatKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'10rem'});
                }
                else if (localStorage.user_role == "Kasir" || localStorage.user_role == "Admin")
                {
                    $$('#Riwayat_JumlahPesanan').html("0");
                    $$('#riwayat_listriwayat_kasir_admin').html('<h4 id="statusRiwayatKosongKasir">Belum ada riwayat pesanan.</h4>');
                    $$('#statusRiwayatKosongKasir').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'10rem'});   
                }
            }
        }        
    });
}

function listresto(content, halaman)
{    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/riwayat/listresto.php",

        success: function(data) {
            var obj = JSON.parse(data);            

            if (obj['result'] == "Berhasil")
            {                
                if (content == "admin_cabanglist")
                {                   
                    $$('#admin_cabanglist').html("");
                    for(var i=0; i < obj['data'].length; i++)
                    {
                        $$('#admin_cabanglist').append(
                            '<a style="color: black;" href="/cabangdetil/'+ obj['data'][i]['store_id'] + '">' +
                                '<div class="card" style="padding: 7px 16px;">'+
                                    '<h5>'+ obj['data'][i]['store_name'] + '</h5>'+
                                    '<label>'+ obj['data'][i]['store_address'] +'</label><br>'+
                                    '<label><b style="font-size:12px;">Kontak :</b> '+ obj['data'][i]['store_phone'] +'</label>'+
                                '</div>'+
                            '</a>'
                        );
                    } 
                }   
                else if (content == 'mod-pilihcabang')
                {
                    $$('.mod_pilihcabang_content').html("");    
                    for(var i=0; i < obj['data'].length; i++)
                    {                        
                        $$('.mod_pilihcabang_content').append(
                            '<div class="row" onclick="listresto_function('+ "'" + halaman +"','" + obj['data'][i]['store_id'] +"','"+ obj['data'][i]['store_name']+ "','" + obj['data'][i]['store_address']+ "'"  + ')">' +
                                '<a>'+ obj['data'][i]['store_name'] +'</a>' +
                            '</div>' 
                        );
                    }
                }
            }
            else
            {
                if (content == "admin_cabanglist")
                {
                    $$('#admin_cabanglist').html('<h4 id="statusadminCabangKosong">Cabang tidak ditemukan!</h4>');
                    $$('#statusadminCabangKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'13rem'});
                }
            }
        }
    });
}

function listresto_function(halaman, id, nama, alamat)
{
    //mainView.router.refreshPage();
    //location.reload();
    $$('#'+ halaman +'_namaresto').html(nama);
    $$('#'+ halaman + '_alamatresto').html(alamat);
    $$('#'+ halaman + '_idresto').html(id);

    if (alamat == '-')
    {
        $$('#'+ halaman + '_alamatresto').html('Alamat: ' + alamat);
    }

    if (halaman == 'menu')
    {        
        admin_menu();
        TutupModal('mod-menu-pilihcabang');
    }
    else if (halaman == 'riwayat')
    {        
        TutupModal("mod-pilihcabang"); 
    }
    else if (halaman == 'karyawan')
    {
        admin_karyawan();
        TutupModal('mod-karyawan-pilihcabang');
    }
    else if (halaman == 'laporan')
    {
        TutupModal('mod-pilihcabang-laporan');
    }
    else if (halaman == 'pesanan')
    {        
        TutupModal("mod-pilihcabang-pesanan");
        Tab_1();
    }
    else if (halaman == "beranda")
    {
        TutupModal("mod-beranda-pilihcabang");
        localStorage.store_id = id;
        localStorage.keranjang = "";
        localStorage.JumlahKeranjang = "";
        menu_promo();
        listbanner('beranda');
        cekKeranjang();
    }
    else if (halaman == "stok")
    {
        localStorage.stok_idcabang = id;        
        localStorage.stok_namacabang = nama;        
        localStorage.stok_alamatcabang = alamat;

        default_kategori();
        
        TutupModal("mod-stok-pilihcabang");
        $$('#Stok_Search').html('');    
    }
}

//RIWAYAT DETIL
function cekrole_riwayatdetil()
{
    if(localStorage.user_role == "Kasir")
    {
        $$('.admin_menu').hide();        
        $$('.driver_menu').hide();
        $$('.admin-button-list').hide();
       
    }
    else if(localStorage.user_role == "Driver")
    {
        $$('.kasir_menu').hide();
        $$('.admin_menu').hide();
        $$('.kasir-button-list').hide();
        
        $$('.kasir-button-list').hide();
        $$('.admin-button-list').hide();
        $$(".pembayaran_kembalian").hide();

    }
    else if(localStorage.user_role == "Admin")
    {
        $$('.kasir_menu').hide();
        $$('.driver_menu').hide();
        $$('.kasir-button-list').hide();   

    }
}

function riwayatdetil(id)
{
    $$(".listpesan-customer").html("");
    $$('#riwayatdetil_listMenu').html("");
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/riwayat/riwayatdetil.php",
        data: {
            uid : id
        },
        success: function(data) {
            console.log(data);
            var obj = JSON.parse(data);        
            if(obj['result'] == "Berhasil")
            {    
                var SubTotal = 0;                              
                var tanggal = formatTanggal(obj['data'][0]['transaction_date']);
                var time = FormatTime(obj['data'][0]['transaction_time']);

                //DISPLAY KODE
                var tanggaltext = obj['data'][0]['transaction_date'].replace(/\-/g, '');
                var ordernumbertext = pad_ordernumber(obj['data'][0]['transaction_order_number']);

                $$('#riwayatdetil_Transaksi_id').html("Nomor Nota: " + tanggaltext + ordernumbertext);
                $$("#riwayatdetil_Transaksi_tanggal").html(tanggal + " | " + time);
                $$('#riwayatdetil_Transaksi_status').html(obj['data'][0]['transaction_status']);
                $$('#riwayatdetil_Customer_Nama').html(obj['data'][0]['customer_nama']);
                $$('#riwayatdetil_Customer_Telepon').html(obj['data'][0]['customer_phone']);
                $$('#riwayatdetil_Customer_Alamat').html(obj['data'][0]['transaction_address']);

                //MAP
                var latitude = obj['data'][0]['transaction_latitude'];
                var longtitude = obj['data'][0]['transaction_longitude'];
                
                //getMap("riwayat",latitude, longtitude);

                if (obj['data'][0]['Kasir_name'] != "")
                {
                    $$('#riwayatdetil_Kasir_Nama').html(obj['data'][0]['Kasir_name']);
                }
                else
                {
                    $$('#riwayatdetil_Kasir_Nama').html("-");
                }
                if(obj['data'][0]['driver_name'] != "")
                {
                    $$('#riwayatdetil_Driver_Nama').html(obj['data'][0]['driver_name']);
                }
                else
                {
                    $$('#riwayatdetil_Driver_Nama').html("-");
                }
                
                $$('#riwayatdetil_Transaksi_JeniSPembayaran').html(obj['data'][0]['jenisPembayaran']);
                $$('#riwayatdetil_Transkasi_Catatan').html(obj['data'][0]['transaction_message']);

                if (obj['data'][0]['transaction_message'] == '' || obj['data'][0]['transaction_message'] == null)
                {
                    $$('#riwayatdetil_Transkasi_Catatan').html('-');
                }

                $$('#riwayatdetil_Pembayaran').html("Rp " + formatRupiah(obj['data'][0]['transaction_total_paid']));
                $$('#riwayatdetil_kembalian').html("Rp " + formatRupiah(obj['data'][0]['transaction_total_change']));

                for(var i =0; i < obj['data'].length;i++)
                {
                    var subtotalPerMenu =  obj['data'][i]['transaction_detail_price'] *  obj['data'][i]['transaction_detail_count'];
                    
                    // SubTotal += parseInt(subtotalPerMenu);
                    // var totalDiscount = parseInt(obj['data'][i]['transaction_detail_discount']);
                    // var Total = SubTotal - totalDiscount;
                    
                    $$('#riwayatdetil_listMenu').append(
                        $$(
                            '<tr>'+
                                '<td class="detil_name"><img src="./img/drawable-ldpi/Logo.png" alt=""></td>'+
                                '<td><b>'+ obj['data'][i]['menuNama'] +'</b></td>'+
                                '<td>'+ obj['data'][i]['transaction_detail_count'] +'x</td>'+
                                '<td class="detil_price">Rp '+ formatRupiah(subtotalPerMenu) +'</td>'+
                            '</tr>'
                        )
                    );
                }

                $$('#riwayatdetil_Subtotal').html("Rp " + formatRupiah(obj['data'][0]['transaction_total_amount']));
                $$('#riwayatdetil_Diskon').html("-Rp " + formatRupiah(obj['data'][0]['transaction_total_discount']));
                $$('#riwayatdetil_Total').html("Rp " + formatRupiah(obj['data'][0]['transaction_total_amount'] - obj['data'][0]['transaction_total_discount']));
            }
        }
    });
}

//CABANG DETIL
function cabangdetil(id)
{
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/cabangdetil.php",
        data: {
            uid : id        
        },
        success: function(data) {
            var obj = JSON.parse(data);            

            if(obj['result'] == "Berhasil")
            {           
                $$('#cabangdetil_id').html(obj['data'][0]['store_id']);                             
                document.getElementById("cabangdetil_nama").value = obj['data'][0]['store_name'];
                document.getElementById("cabangdetil_Alamat").value = obj['data'][0]['store_address'];
                document.getElementById("cabangdetil_telpon").value = obj['data'][0]['store_phone'];
            }
        }
    });
}

function TambahData(halaman)
{    
    var id = "";
    var nama = "";

    //CABANG
    var storeaddress = "";
    var storephone = "";
    //MENU
    var hargajual = "";
    var diskon = "";
    var kategoricombobox = "";
    var idkategori = "";
    var namakategori = "";
    var cabangcombobox = "";
    var idcabang = "";
    var desc = "";
    //KARYAWAN   
    var Karyawan_username = "";
    var karyawan_email = "";
    var karyawan_telepon = 0;
    var karyawan_jabatan_combobox ="";
    var karyawan_jabatan = "";
    var karyawan_cabang_combobox ="";
    var karyawan_idcabang = "";
    var karyawan_password = "";
    var ext = '';
    //BANNER
    var aim = "";
    var aim_id = "";

    if (halaman == "menu" || halaman == "kategori" || halaman == "banner" || halaman == "jenispembayaran")
    {
        // IMG
        var path = $$("#"+ halaman +"_propic").attr("src");
        ext = path.split(".")[3].substring(0,3);
    }


    if (halaman == "cabang")
    {
        id =  $$('#cabangdetil_id').html();
        nama = $$('#cabangdetil_nama').val();
        storeaddress = $$('#cabangdetil_Alamat').val();
        storephone = $$("#cabangdetil_telpon").val();

        if((nama == "" || nama == null) || (storeaddress == "" || storeaddress == null) || (storephone == "" || storephone == null) )
        {
            app.dialog.alert("Kolom tidak boleh kosong!");
            return;
        }
    }
    else if(halaman == "kategori")
    {
        id =  $$('#kategoridetil_id').html();
        nama = $$('#kategoridetil_nama').val();
        if(nama == "" || nama == null)
        {
            app.dialog.alert("Kolom tidak boleh kosong!");
            return;
        }   
    }
    else if(halaman == "menu")
    {         
        nama = $$('#menudetil_menunama').val();
        hargajual = $$('#menudetil_menuharga').val();
        diskon = $$('#menudetil_menudiskon').val();
        desc = $$("#menudetil_menudesc").val();

        kategoricombobox = document.getElementById("menu_category_combobox");
        idkategori = kategoricombobox.value;        
        cabangcombobox = document.getElementById("menu_cabang_combobox");
        idcabang = cabangcombobox.value;

        if((nama == "" || nama == null) || 
            (hargajual == "" || hargajual == null) || 
            (diskon == "" || diskon == null) || 
            (desc == "" || desc == null) )
        {
            app.dialog.alert("Kolom tidak boleh kosong!");
            return;
        }
    }
    else if(halaman == "karyawan")
    {
        id = $$('#karyawandetil_id').html();   
        nama = $$('#karyawandetil_nama').val();
        Karyawan_username = $$('#karyawandetil_username').val();
        karyawan_email = $$('#karyawandetil_email').val();
        karyawan_telepon =$$('#karyawandetil_telepon').val();
        karyawan_password =$$('#karyawandetil_password').val();

        karyawan_jabatan_combobox = document.getElementById("karyawan_jabatan_combobox");
        karyawan_jabatan = karyawan_jabatan_combobox.value;
        
        karyawan_cabang_combobox = document.getElementById("karyawan_cabang_combobox");
        karyawan_idcabang = karyawan_cabang_combobox.value;

        if((nama == "" || nama == null) || 
            (Karyawan_username == "" || Karyawan_username == null) || 
            (karyawan_email == "" || karyawan_email == null) || 
            (karyawan_telepon == "" || karyawan_telepon == null) || 
            (karyawan_password == "" || karyawan_password == null) )
        {
            app.dialog.alert("Kolom tidak boleh kosong!");
            return;
        }
    }
    else if(halaman == "jenispembayaran")
    {
        nama = $$("#jenispembayaran_nama").val();
        if(nama == "" || nama == null)
        {
            app.dialog.alert("Kolom tidak boleh kosong!");
            return;
        }
    }
    else if(halaman == "banner")
    {
        id = $$('#bannerdetil_id').html();
        nama = $$('#banner_nama').val();

        idcabang_combobox = document.getElementById("banner_cabang_combobox");
        idcabang = idcabang_combobox.value;

        if (document.getElementById('radio_kategori').checked)
        {
            aim = "kategori";
            kategori_combobox = document.getElementById("banner_kategori_combobox");
            aim_id = kategori_combobox.value;            
            
        }
        else if(document.getElementById('radio_menu').checked)
        {
            aim = "menu";
            menu_combobox = document.getElementById("banner_menu_combobox");
            aim_id = menu_combobox.value;  
        }

        if( (nama == "" || nama == null) || (aim_id == "" || aim_id == null) )
        {
            app.dialog.alert("Kolom tidak boleh kosong!");
            return;
        }
    }

    loadingData();
    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/admin_tambah.php",
        data: {            
            halaman: halaman,
            //CABANG
            storename: nama ,
            storeaddress: storeaddress,
            storephone:storephone,
            //KATEGORI
            categoryname: nama,
            //MENU
            nama: nama,
            harga: hargajual,
            diskon: diskon,
            idkategori:idkategori,            
            idcabang: idcabang,
            desc:desc, 
            //KARYAWAN
            username: Karyawan_username,
            user_name: nama,
            email: karyawan_email,
            user_phone: karyawan_telepon,
            user_role: karyawan_jabatan,
            user_password:karyawan_password,
            store_id: karyawan_idcabang,            
            //JENIS PEMBAYARAN
            jenispembayaran_nama: nama,
            //BANNER
            tipe_aim : aim,
            aim_id : aim_id,
            nama_banner: nama,
            uid : id,

            // IMG
            ext : ext
        },
        success: function(data) {
            determinateLoading = false;
            app.dialog.close();

            //console.log(data);            
            var obj = JSON.parse(data);

            if (halaman == "menu" || halaman == "kategori" || halaman == "banner" || halaman == "jenispembayaran")
            {
                simpanGambar(halaman, obj['idbaru'], nama);                
            }

            $$("#modnotif_"+ halaman +"_pesan").html(obj['pesan']);
            BukaModal("modnotif_" + halaman);
        }
    });
}


function UbahData(halaman)
{    
    var id = "";
    var nama = "";
    //CABANG
    var storeaddress = "";
    var storephone = "";
    //MENU
    var hargajual = "";
    var diskon = "";
    var kategoricombobox = "";
    var idkategori = "";
    var namakategori = "";
    var cabangcombobox = "";
    var idcabang = "";
    var desc = "";
    //KARYAWAN
    var karyawan_nama = "";
    var Karyawan_username = "";
    var karyawan_email = "";
    var karyawan_telepon = 0;
    var karyawan_jabatan_combobox ="";
    var karyawan_jabatan = "";
    var karyawan_cabang_combobox ="";
    var karyawan_idcabang = "";

    //BANNER
    var aim = "";
    var aim_id = "";

    if (halaman == "cabang")
    {
        id =  $$('#cabangdetil_id').html();
        nama = $$('#cabangdetil_nama').val();
        storeaddress = $$('#cabangdetil_Alamat').val(); 
        storephone = $$("#cabangdetil_telpon").val();
    }
    else if (halaman == "kategori")
    {
        id =  $$('#kategoridetil_id').html();
        nama = $$('#kategoridetil_nama').val();           
    }
    else if (halaman == "menu")
    {
        id = $$('#menudetil_id').html();        
        nama = $$('#menudetil_menunama').val();
        hargajual = $$('#menudetil_menuharga').val();
        diskon = $$('#menudetil_menudiskon').val();
        desc = $$("#menudetil_menudesc").val();

        kategoricombobox = document.getElementById("menu_category_combobox");
        idkategori = kategoricombobox.value;        
        cabangcombobox = document.getElementById("menu_cabang_combobox");
        idcabang = cabangcombobox.value;
    }
    else if (halaman == "karyawan")
    {
        id = $$('#karyawandetil_id').html();   
        nama = $$('#karyawandetil_nama').val();
        Karyawan_username = $$('#karyawandetil_username').val();
        karyawan_email = $$('#karyawandetil_email').val();
        karyawan_telepon =$$('#karyawandetil_telepon').val();

        karyawan_jabatan_combobox = document.getElementById("karyawan_jabatan_combobox");
        karyawan_jabatan = karyawan_jabatan_combobox.value;
        
        karyawan_cabang_combobox = document.getElementById("karyawan_cabang_combobox");
        karyawan_idcabang = karyawan_cabang_combobox.value;
    }
    else if (halaman == "jenispembayaran")
    {
        id= $$("#jenispembayarandetil_id").html();
        nama = $$("#jenispembayaran_nama").val();
    }
    else if (halaman == "banner")
    {
        id = $$('#bannerdetil_id').html();
        nama = $$("#banner_nama").val();

        idcabang_combobox = document.getElementById("banner_cabang_combobox");
        idcabang = idcabang_combobox.value;

        if (document.getElementById('radio_kategori').checked)
        {
            aim = "kategori";
            kategori_combobox = document.getElementById("banner_kategori_combobox");
            aim_id = kategori_combobox.value;                        
        }
        else if (document.getElementById('radio_menu').checked)
        {
            aim = "menu";
            menu_combobox = document.getElementById("banner_menu_combobox");
            aim_id = menu_combobox.value;  
        }
    }
    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/admin_ubah.php",
        data: {
            uid : id,
            halaman: halaman,
            //CABANG
            storename: nama ,
            storeaddress: storeaddress,
            store_phone: storephone,
            //KATEGORI
            categoryname: nama,
            //MENU
            nama: nama,
            harga: hargajual,
            diskon: diskon,
            idkategori:idkategori,
            namakategori: namakategori,
            idcabang: idcabang,
            desc:desc,
            //KARYAWAN
            username: nama,
            user_name: Karyawan_username,
            email: karyawan_email,
            user_phone: karyawan_telepon,
            user_role: karyawan_jabatan,
            store_id: karyawan_idcabang,            
            //JENIS PEMBAYARAN
            jenispembayaran_nama: nama,
            //BANNER
            tipe_aim : aim,
            aim_id : aim_id
        },
        success: function(data) {       
            console.log(data);            
            var obj = JSON.parse(data);
            //this.router.navigate('/banner/');
            
            if(halaman == "menu" || halaman == "kategori" || halaman == "banner" || halaman == "jenispembayaran")
            {
                simpanGambar(halaman, id, nama);
            }
            
            $$("#modnotif_"+ halaman +"_pesan").html(obj['pesan']);
            BukaModal("modnotif_" + halaman);

        }
    });
}

function HapusData(halaman)
{
    var id = "";    

    id =  $$('#'+ halaman +'detil_id').html();

    if(halaman == 'riwayat')
    {
        var array = $$('#riwayatdetil_Transaksi_id').html();
        array = array.split(":");
        id = array[1];
    }
    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/admin_hapus.php",
        data: {
            uid : id,
            halaman : halaman
        },
        success: function(data) {
                        
            var obj = JSON.parse(data);                        
            if(obj['result'] == "Berhasil")
            {                                                            
                console.log(data);
            }
        }
    });
}

//KATEGORI DETIL ADMIN
function admin_kategoridetil(id)
{
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/admin_kategoridetail.php",
        data: {
            kategori_id : id        
        },
        success: function(data) {
            var obj = JSON.parse(data);                        
                     
            $$('#kategoridetil_id').html(obj[0]['category_id']);                                                 
            document.getElementById("kategoridetil_nama").value = obj[0]['category_name'];                            
        }
    });
}

//ADMIN MENU
function admin_menu()
{
    var id = $$('#menu_idresto').html();
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/menulist.php",
        data: {  
            storeid : id
        },
        success: function(data) {
            var obj = JSON.parse(data);            
            
            $$("#admin_menulist").html("");

            if (obj['status'] == true)
            {
                for(var i =0; i < obj['data'].length ; i++)
                {   
                    if(obj['data'][i]['menu_discount'] > 0)
                    {
                        var discount = (obj['data'][i]['menu_sell_price'] * obj['data'][i]['menu_discount'] / 100);
                        var total = obj['data'][i]['menu_sell_price'] - discount;
    
                        $$('#admin_menulist').append(
                            '<a style="color: black;" href="/menudetil/'+ obj['data'][i]['menu_id'] +'">' +
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
                    else
                    {
                        $$('#admin_menulist').append(
                            '<a style="color: black;" href="/menudetil/'+ obj['data'][i]['menu_id'] +'">' +
                                '<div class="card">'+
                                    '<div class="card-content card-content-padding">'+
                                        '<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                        '<h5>' + obj['data'][i]['menu_name']  + '</h5><br>'+
                                        '<p style="color: #808080; font-size: 11px;">'+ obj['data'][i]['menu_desc'] + '</p><br>'+
                                        '<h5>Rp ' + formatRupiah(obj['data'][i]['menu_sell_price']) +'</h5>'+
                                    '</div>'+
                                '</div>'+
                            '</a>'
                        );
                    }                 
                }
            }
            else
            {
                $$('#admin_menulist').html('<h4 id="statusadminMenunKosong">Menu tidak ditemukan!</h4>');
                $$('#statusadminMenunKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'7rem'});
            }  
        }
    });
}

//ADMIN MENU DETIL
function admin_menudetil(id)
{    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/beranda/detailmenu.php",
        data: {
            menu_id : id,
        },
        success: function(data) {
            var obj = JSON.parse(data);                                    
            
            $$('#menudetil_id').html(obj['data'][0]['menu_id']);
            document.getElementById("menudetil_menuid").value = obj['data'][0]['menu_id'];
            document.getElementById("menudetil_menunama").value = obj['data'][0]['menu_name'];
            document.getElementById("menudetil_menuharga").value = obj['data'][0]['menu_sell_price'];
            document.getElementById("menudetil_menudiskon").value = obj['data'][0]['menu_discount'];

            admin_kategori_combobox(obj['data'][0]['category_id']);
            admin_cabang_combobox(obj['data'][0]['store_id']);
        }    
    });
}

//KARYAWAN
function admin_karyawan()
{
    var id = $$('#karyawan_idresto').html();
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/karyawan.php",
        data: {  
            storeid : id
        },
        success: function(data) {            
            var obj = JSON.parse(data);   

            $$("#karyawan_list").html("");

            if (obj['result'] == "Berhasil")
            {
                for(var i =0; i < obj['data'].length ; i++)
                {                    
                    $$('#karyawan_list').append(      
                        '<a style="color: black;" href="/karyawanedit/'+ obj['data'][i]['user_id'] +'">' +             
                            '<div class="card">' +
                                '<h5>'+ obj['data'][i]['user_name'] +'</h5>'+
                                '<label>'+ obj['data'][i]['user_role'] +'</label><br>'+
                                '<label><b style="font-size: 12px;">Telepon: </b>'+ obj['data'][i]['user_phone'] +'</label><br>'+
                                '<p>'+ obj['data'][i]['store_name'] +'</p>'+
                            '</div>' +
                        '</a>'
                    );
                }
            }
            else
            {
                $$('#karyawan_list').html('<h4 id="statusadminKaryaKosong">Karyawan tidak ditemukan!</h4>');
                $$('#statusadminKaryaKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'10rem'});
            }
        }    
    });
}

//KARYAWAN DETIL
function admin_karyawandetil(id)
{    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/karyawandetil.php",
        data: {  
            uid : id,            
        },
        success: function(data) {
            var obj = JSON.parse(data);                                    
            
            $$('#karyawandetil_id').html(obj['data'][0]['user_id']);
            document.getElementById("karyawandetil_nama").value = obj['data'][0]['user_name'];
            document.getElementById("karyawandetil_username").value = obj['data'][0]['username'];
            document.getElementById("karyawandetil_email").value = obj['data'][0]['email'];
            document.getElementById("karyawandetil_telepon").value = obj['data'][0]['user_phone'];
            
            admin_cabang_combobox(obj['data'][0]['store_id']);
        }
    });
}

//JENIS PEMBAYARAN
function admin_jenispembayaran()
{    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/pesanan/jenispembayaran.php",        
        success: function(data) {
            var obj = JSON.parse(data);                                    
            if(obj['result'] == "Berhasil")
            {
                $$('#list_jenisbayar').html("");
                for(var i =0; i < obj['data'].length; i++)
                {
                    $$('#list_jenisbayar').append(
                        "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                            '<a href="/pembayarandetil/'+ obj['data'][i]['payment_type_id'] +'">' +
                                "<div><img style='width: 4rem;' src='./img/drawable-ldpi/Logo.png'></div>"+
                                "<div style='width: 95%;'>" +  obj['data'][i]['payment_type_name'] + "</div>"+
                            "</a>"+
                        "</li>"
                    );
                }
            }
            else
            {
                $$('#jenisBayarAdmin').html('<h4 id="statusadminBayarKosong">Jenis Pembayaran tidak ditemukan!</h4>');
                $$('#statusadminBayarKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'13rem', 'background-color':'transparent'});
            }
        }
    });
}

//JENIS PEMBAYARAN DETIL
function admin_jenispembayarandetil(id)
{    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/jenispembayarandetil.php",  
        data: {  
            uid : id,            
        },
        success: function(data) {
            var obj = JSON.parse(data);
            if(obj['result'] == "Berhasil")
            {
                $$('#jenispembayarandetil_id').html(obj['data'][0]['payment_type_id']);
                $$('#jenispembayaran_nama').val(obj['data'][0]['payment_type_name']);
            }
            else
            {
                
            }
        }
    });
}


//SHOW COMBO BOX HALAMAN EDIT
function admin_cabang_combobox(id)
{
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/riwayat/listresto.php",

        success: function(data) {
            var obj = JSON.parse(data);
            $$('.cabang_combobox').html("");
            for(var i =0; i < obj['data'].length; i++)
            {
                if(obj['data'][i]['store_id'] == id)
                {
                    $$('.cabang_combobox').append(
                        '<option selected value="'+ obj['data'][i]['store_id'] +'">' + obj['data'][i]['store_name'] +"</option>"
                    )
                }
                else
                {
                    $$('.cabang_combobox').append(
                        '<option value="'+ obj['data'][i]['store_id'] +'">' + obj['data'][i]['store_name'] +"</option>"
                    )
                }                
            }            
        }    
    });
}

function admin_kategori_combobox(id)
{
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/beranda/kategori.php",

        success: function(data) {
            var obj = JSON.parse(data);            
            $$('.category_combobox').html("");
            $$('.menu_combobox').html("");
            for(var i =0; i < obj.length; i++)
            {
                if(obj[i]['category_id'] == id)
                {
                    $$('.category_combobox').append(
                        '<option selected value="'+ obj[i]['category_id'] +'">' + obj[i]['category_name'] +"</option>"
                    )
                }
                else
                {
                    $$('.category_combobox').append(
                        '<option value="'+ obj[i]['category_id'] +'">' + obj[i]['category_name'] +"</option>"
                    )
                }                
            }            
        }    
    });
}

function admin_laporan()
{    
    tanggalstart = $$('#tanggalawal_laporan').html();
    tanggalend = $$('#tanggalakhir_laporan').html();
    store = $$("#laporan_idresto").html();
    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/laporan.php",
        data: {            
            storeid : store,
            tanggalawal : tanggalstart,
            tanggalakhir : tanggalend,            
        },
        success: function(data) {
            var obj = JSON.parse(data);
            
            $subtotal = obj['data'][0]['SubTotal'];
            $totaldiskon = obj['data'][0]['TotalDiskon'];
            $total = $subtotal - $totaldiskon;

            if (obj['result'] == "Berhasil")
            {                         
                if(obj['data'][0]['jumlahpesanan'] ==0)
                {
                    $$('#laporan_jumlahpesanan').html("0");
                    $$('#laporan_totalpendapatan').html("Rp 0");
                    $$('#laporan_totaldiskon').html("Rp 0");
                    $$('#laporan_total').html("Rp 0");
                    
                    $$('#tableLaporan').hide();
                    $$('#tableLaporanNull').html('<h4 id="statusRiwayatKosong">Belum ada laporan yang masuk.</h4>');
                    $$('#statusRiwayatKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'5rem'});
                }
                else
                {
                    $$('#laporan_jumlahpesanan').html(obj['data'][0]['jumlahpesanan']);
                    $$('#laporan_totalpendapatan').html("Rp " + formatRupiah($subtotal));
                    $$('#laporan_totaldiskon').html("Rp " + formatRupiah($totaldiskon));
                    $$('#laporan_total').html("Rp " + formatRupiah($total));
                }
            }
        }
    });
}

function admin_laporan_menulist()
{
    tanggalstart = $$('#tanggalawal_laporan').html();
    tanggalend = $$('#tanggalakhir_laporan').html();
    store = $$("#laporan_idresto").html();
    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/laporan_menulist.php",
        data: {            
            storeid : store,
            tanggalawal : tanggalstart,
            tanggalakhir : tanggalend,            
        },
        success: function(data) {

            var obj = JSON.parse(data);
                        
            if (obj['result'] == "Berhasil")
            {               
                $$('#laporan_listmenu_table').html("");
                $$('#laporan_listmenu_table').append(
                    $$(
                        '<tr style="margin-bottom: 1rem;">'+
                            '<td><b>Menu</b></td>'+
                            '<td><b>Jumlah</b></td>'+
                            '<td class="detil_price"><b>Harga</b></td>'+
                        '</tr>'+
                        '<tr></tr>'+
                        '<tr></tr>'+
                        '<tr></tr>'
                    )
                );
                for(var i =0; i < obj['data'].length; i++)
                {
                    var subtotal = obj['data'][i]['TotalCount'] * obj['data'][i]['menu_sell_price']

                    $$('#laporan_listmenu_table').append(
                        $$(
                            '<tr>'+
                                '<td><b>'+ obj['data'][i]['menu_name'] +'</b></td>'+
                                '<td>'+ obj['data'][i]['TotalCount'] +'x</td>'+
                                '<td class="detil_price">Rp '+ formatRupiah(subtotal) +'</td>'+
                            '</tr>'
                        )
                    );
                }
            }
            else
            {
                $$('#tableLaporan').hide();
                $$('#tableLaporanNull').html('<h4 id="statusRiwayatKosong">Belum ada laporan yang masuk.</h4>');
                $$('#statusRiwayatKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'5rem'});
            }
        }
    });
}

//Detail Keranjang
function DetailKeranjang()
{    
    var idMenu = localStorage.keranjang;
    var jumlahMenu = localStorage.JumlahKeranjang;

    var Array_idMenu = idMenu.split(",");
    var Array_jumlahMenu = jumlahMenu.split(",");
    var SubTotal = 0;
    var totalDiscount =0;
    var Total = 0;

    // DEFAULT VALUE
    //var biayaAntar = localStorage.biayakirim;
    var biayaAntar = 2000;
    var jarak = 5;
    biayaAntar = biayaAntar * jarak;
    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/keranjang/keranjang_menulist.php",
        data: {
            menu_id : Array_idMenu,                
        },
        success: function(data) {
            var obj = JSON.parse(data);

            if (localStorage.user_role == "Pelanggan")
            {
                $$('#keranjang_nama').html(localStorage.username);
                $$('#Keranjang_ContentMenuList').html("");
                $$("#mod_ubahmenu_content_keranjang").html("");

                for(var i=0 ;i < obj['data'].length; i++)
                {
                    var subtotalPerMenu =  obj['data'][i]['menu_sell_price'] * Array_jumlahMenu[i];
                    SubTotal += parseInt(subtotalPerMenu);

                    var discount = subtotalPerMenu * parseFloat(obj['data'][i]['menu_discount']) / 100;
                    totalDiscount+= discount;

                    Total = SubTotal - totalDiscount;

                    if(obj['result'] == "Berhasil")
                    {
                        $$('#Keranjang_ContentMenuList').append(
                            $$(
                                '<tr>'+
                                    '<td class="detil_name"><img src="./img/drawable-ldpi/Logo.png" alt=""></td>'+
                                    '<td><b>'+ obj['data'][i]['menu_name'] +'</b></td>'+
                                    '<td>'+ Array_jumlahMenu[i] +'x</td>'+
                                    '<td class="detil_price">Rp '+ formatRupiah(subtotalPerMenu) +'</td>'+
                                '</tr>'
                            )
                        );

                        $$("#mod_ubahmenu_content_keranjang").append(
                            '<div class="item-pesandetil" id="mod_item_' + obj['data'][i]['menu_id'] + '">'+
                                '<h5 style="display: inline;">' + obj['data'][i]['menu_name'] +'</h5>'+
                                '<div id="item_pesandetil_keranjang_'+ i +'" hidden>' + obj['data'][i]['menu_id'] +'</div>'+
                                '<div class="btn-group">'+
                                    '<a class="button btn-trsh" onclick="set0('+ "'mod_ubahmenu_content_keranjang_'" + "," + obj['data'][i]['menu_id'] +')"><i class="f7-icons">trash_fill</i></a>'+
                                    '<a class="button btn-mns"><i class="fa fa-minus" onclick="Kurang(' + "'mod_ubahmenu_content_keranjang_" + obj['data'][i]['menu_id'] + "'" +')"></i></a>'+
                                    '<label id="mod_ubahmenu_content_keranjang_'+ obj['data'][i]['menu_id']  +'_JumlahPesanan">'+ Array_jumlahMenu[i] +'</label>'+
                                    '<a class="button btn-pls" onclick="Tambah(' + "'mod_ubahmenu_content_keranjang_" + obj['data'][i]['menu_id'] + "'" +')"><i class="fa fa-plus"></i></a>'+
                                '</div>'+
                            '</div> '
                        );
                    }                    
                }
                Total += parseInt(biayaAntar);
                $$("#Keranjang_SubTotal").html("Rp " + formatRupiah(SubTotal));
                $$("#Keranjang_Diskon").html("-Rp " + formatRupiah(totalDiscount));
                $$("#Keranjang_Total").html("Rp " + formatRupiah(Total));
                $$("#Keranjang_Total_bottom").html("Rp " + formatRupiah(Total));
                $$("#Keranjang_BiayaKirim").html("Rp " + formatRupiah(biayaAntar));
            }
            else if(localStorage.user_role=="Kasir")
            {
                $$("#keranjang_kasir_menulist").html("");
                $$("#mod_ubahmenu_content_keranjang").html("");

                for(var i=0 ;i < obj['data'].length; i++)
                {
                    var subtotalPerMenu =  obj['data'][i]['menu_sell_price'] * Array_jumlahMenu[i];
                    SubTotal += parseInt(subtotalPerMenu);

                    var discount = subtotalPerMenu * parseFloat(obj['data'][i]['menu_discount']) / 100;
                    totalDiscount+= discount;

                    Total = SubTotal - totalDiscount;

                    if(obj['result'] == "Berhasil")
                    {
                        $$('#keranjang_kasir_menulist').append(
                            $$(
                                '<tr>'+
                                    '<td class="detil_name"><img src="./img/drawable-ldpi/Logo.png" alt=""></td>'+
                                    '<td><b>'+ obj['data'][i]['menu_name'] +'</b></td>'+
                                    '<td>'+ Array_jumlahMenu[i] +'x</td>'+
                                    '<td class="detil_price">Rp '+ formatRupiah(subtotalPerMenu) +'</td>'+
                                '</tr>'
                            )
                        );

                        $$("#mod_ubahmenu_content_keranjang").append(
                            '<div class="item-pesandetil" id="mod_item_' + obj['data'][i]['menu_id'] + '">'+
                                '<h5 style="display: inline;">' + obj['data'][i]['menu_name'] +'</h5>'+
                                '<div id="item_pesandetil_keranjang_'+ i +'" hidden>' + obj['data'][i]['menu_id'] +'</div>'+
                                '<div class="btn-group">'+
                                    '<a class="button btn-trsh" onclick="set0('+ "'mod_ubahmenu_content_keranjang_'" + "," + obj['data'][i]['menu_id'] +')"><i class="f7-icons">trash_fill</i></a>'+
                                    '<a class="button btn-mns"><i class="fa fa-minus" onclick="Kurang(' + "'mod_ubahmenu_content_keranjang_" + obj['data'][i]['menu_id'] + "'" +')"></i></a>'+
                                    '<label id="mod_ubahmenu_content_keranjang_'+ obj['data'][i]['menu_id']  +'_JumlahPesanan">'+ Array_jumlahMenu[i] +'</label>'+
                                    '<a class="button btn-pls" onclick="Tambah(' + "'mod_ubahmenu_content_keranjang_" + obj['data'][i]['menu_id'] + "'" +')"><i class="fa fa-plus"></i></a>'+
                                '</div>'+
                            '</div> '
                        );
                                            
                        $$("#keranjang_kasir_subtotal").html("Rp " + formatRupiah(SubTotal));
                        $$("#keranjang_kasir__totaldiskon").html("-Rp " + formatRupiah(totalDiscount));
                        $$("#keranjang_kasir_total").html("Rp " + formatRupiah(Total));
                        $$("#keranjang_kasir_total2").html("Rp " + formatRupiah(Total));
                        $$("#modal-pembayaran-keranjang_totalbayar").html("Rp " + formatRupiah(Total));
                    }
                }
            }
        }
    });    
}

function biaya_antar()
{
    
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/pesanan/biaya_antar.php",
        data: {
            store_id: localStorage.cabang,
            latitude: localStorage.Latitude,
            longtitude : localStorage.Longtitude
        },
        success: function(data) {
            
            var obj = JSON.parse(data);
            localStorage.biayakirim = obj['transaction_delivery_fee'];
            $$("#keranjang_jarak").html(obj['transaction_distance']);
            $$("#Keranjang_BiayaKirim").html("Rp " + formatRupiah(obj['transaction_delivery_fee']));
            $$("#keranjang_biaya_kirim").html("Rp " + formatRupiah(obj['transaction_delivery_fee']));
        }    
    });
  }

function modal_ubahmenu_keranjang()
{    
    var jumlah = "";    
    var menuid =0;

    var count = 0;

    var hasil_menuid = "";
    var hasil_jumlah = "";
    while(menuid != null)
    {
        menuid = $$("#item_pesandetil_keranjang_" + count).html();
        count++;
              
        jumlah = $$("#mod_ubahmenu_content_keranjang_"+ menuid +"_JumlahPesanan").html();

        if(menuid == null || jumlah == 0)
        {
            continue;
        }  

        if(hasil_menuid == "")
        {
            hasil_menuid = menuid;
            hasil_jumlah = jumlah;
        }
        else
        {
            hasil_menuid = hasil_menuid + "," + menuid;
            hasil_jumlah = hasil_jumlah + "," + jumlah;
        }
    }
    localStorage.keranjang = hasil_menuid;
    localStorage.JumlahKeranjang = hasil_jumlah;
    DetailKeranjang();
    TutupModal("mod-ubahmenu-keranjang");    
}



function cekrole_keranjang()
{
    if(localStorage.user_role == "Pelanggan")
    {
        $$('.kasir_menu').hide();
        $$('.keranjang-kasir').hide();        
    }
    else if(localStorage.user_role == "Kasir")
    {
        $$('.customer_menu').hide();
        $$('.keranjang-customer').hide();        
    }
}

function formatRupiah(angka) {
	var number_string = angka.toString();
	sisa  = number_string.length % 3;
	rupiah  = number_string.substr(0, sisa);
	ribuan  = number_string.substr(sisa).match(/\d{3}/g);

	if (ribuan) {
	 	separator = sisa ? '.' : '';
	 	rupiah += separator + ribuan.join('.');
	}
	return rupiah;
}
function tes(){

    var idMenu = localStorage.keranjang;
    var jumlahMenu = localStorage.JumlahKeranjang;
    var Array_idMenu = idMenu.split(",");
    var Array_jumlahMenu = jumlahMenu.split(",");

    console.log(idMenu);
    console.log(jumlahMenu);
    console.log(Array_idMenu);
    console.log(Array_jumlahMenu);
}

function pesan(){
    var uid = "";
    var customer_name = "";
    var total = 0;
    var diskon = 0;
    // DEFAULT VALUE TESTING
    var jarak = 5;
    var biayaAntar = 2000;

    var catatan = 0;
    var alamat = "";
    var payment = 0;
    var idMenu = localStorage.keranjang;
    var jumlahMenu = localStorage.JumlahKeranjang;
    var Array_idMenu = idMenu.split(",");
    var Array_jumlahMenu = jumlahMenu.split(",");

    if (localStorage.user_role == "Kasir")
    {
        uid =localStorage.user_id;
        customer_name = $$("#keranjang_kasir_namapelanggan").val();

        total = $$("#keranjang_kasir_subtotal").html();
        total = total.split(" ");
        total = total[1].replace(/\./g, '');

        total_amount = $$('#keranjang_kasir_total2').val();

        diskon = $$("#keranjang_kasir__totaldiskon").html().split(" ");
        diskon = diskon[1].replace(/\./g, '');

        jarak = 5;
        biayaAntar = 2000;
        catatan = $$("#keranjang_kasir_catatan").val();
        
        biayaAntar_Total = jarak * biayaAntar;
        payment = $$('#jenispembayaran_kasir_id').html();    

        var jumlahbayar = $$("#keranjang_kasir_nominalpembayaran").val();
    }
    else if(localStorage.user_role == "Pelanggan")
    {
        uid =localStorage.user_id;
        customer_name = localStorage.username;
        
        total = $$("#Keranjang_SubTotal").html();
        total = total.split(" ");
        total = total[1].replace(/\./g, '');
    
        diskon = $$("#Keranjang_Diskon").html().split(" ");
        diskon = diskon[1].replace(/\./g, '');
    
        jarak = $$("#keranjang_jarak").html().split(" ");
        jarak = jarak[0];

        biayaAntar = $$("#keranjang_biaya_kirim").html().split(" ");
        biayaAntar = biayaAntar[1].replace(/\./g, '');
        console.log(biayaAntar);

        catatan = $$("#keranjang_catatan").val();
        alamat = $$("#keranjang_alamat").val();

        payment = $$('#jenispembayaran_id').html();       
        localStorage.removeItem('biayakirim'); 
    }
    
    if(localStorage.user_role == "Kasir")
    {
        var test = total - diskon;
        if(jumlahbayar < test)
        {
            console.log("Salah");
            return;
        }
    }

    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/keranjang/pesan.php",
        data: {
            role : localStorage.user_role,
            uid : uid,   
            nama : customer_name,
            SubTotal : total,
            diskon : diskon,
            jarak : jarak,
            biaya_antar : biayaAntar,
            catatan : catatan,
            alamat : alamat,        
            pembayaran : payment,
            menu_id : Array_idMenu,
            jumlahPesanan : Array_jumlahMenu,
            store_id:localStorage.store_id,

            // DEFAULT VALUE 
            Latitude : localStorage.Latitude,
            Longtitude : localStorage.Longtitude,
            Latitude : 0,
            Longtitude : 0,
            //KASIR
            bayar: jumlahbayar
            
        },
        success: function(data) {
            console.log(data);
            var obj = JSON.parse(data);

            if(localStorage.user_role == "Kasir")
            {
                keranjang_combobox = document.getElementById("keranjang_combobox");
                keranjang_combobox = keranjang_combobox.value;
                console.log(keranjang_combobox);

                TutupModal("modal-pembayaran-keranjang");
            }
            
            localStorage.removeItem("Latitude");
            localStorage.removeItem("Longtitude");
            //localStorage.removeItem("keranjang");
            localStorage.keranjang = "";
            localStorage.JumlahKeranjang = "";
            //localStorage.removeItem("JumlahKeranjang");
            localStorage.removeItem("biayakirim");
            cekKeranjang();

            update_stok(Array_idMenu, Array_jumlahMenu);
            
            window.location.reload();
        }
    });
}

function update_stok(id_menu, jumlah)
{
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/keranjang/update_stok.php",
        data: {
            menu_id : id_menu,
            jumlah : jumlah
        },
        success: function(data) {
            console.log("Stok Updated");
        }
    });
}

function modalPembayaran(halaman)
{   
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/pesanan/jenispembayaran.php",
        
        success: function(data) {
            var obj = JSON.parse(data);

            $$(".mod_jenisbayar_content").html("");

            if(obj['result'] == "Berhasil")
            {                
                for(var i =0; i < obj['data'].length; i++)
                {
                    $$('.mod_jenisbayar_content').append(
                        '<div class="row" onclick="modalPembayaran_function(' + "'" + halaman + "','" + obj['data'][i]['payment_type_id']  + "','" + obj['data'][i]['payment_type_name'] + "'" +')">' +
                            '<a href="">' + obj['data'][i]['payment_type_name'] + '</a>' +
                        '</div>'
                    );
                }
            }

        }
    });    
}

function modalPembayaran_function(halaman, id, nama)
{
    if (localStorage.user_role == "Kasir")
    {
        if (halaman == "keranjang")
        {
            $$("#jenispembayaram_kasir_text").html(nama + ' <i class="f7-icons" style="color: black;">chevron_right</i>');
            $$("#jenispembayaran_kasir_id").html(id);
            TutupModal("mod-jenisbayar");
        }
        else(halaman == "pesanandetil")
        {
            $$("#PesananDetil_Transaksi_JeniSPembayaran").html(nama + ' <i class="f7-icons" style="color: black;">chevron_right</i>');
            $$('#PesananDetil_Transaksi_JeniSPembayaran_id').html(id);
            TutupModal("mod-jenisbayar-pesanandetil");
        }
    }
    else //PELANGGAN
    {
        $$("#jenispembayaram_text").html(nama + ' <i class="f7-icons" style="color: black;">chevron_right</i>');
        $$("#jenispembayaran_id").html(id);
        TutupModal("mod-jenisbayar");
    }
}

// function modalPembayaran_function(id, nama)
// {
//     if(localStorage.user_role == "Kasir")
//     {
//         $$("#jenispembayaram_kasir_text").html(nama);
//         $$("#jenispembayaran_kasir_id").html(id);
//         TutupModal("mod-jenisbayar");
//     }
//     else //PELANGGAN
//     {
//         $$("#jenispembayaram_text").html(nama);
//         $$("#jenispembayaram_id").html(id);
//         TutupModal("mod-jenisbayar");
//     }
// }

// function Tombol Ubah di modal stok di halaman stok kasir
function ubahStok(content)
{    
    var id = $$('#' + content + '_id').html();
    var kategoriid = $$("#Stok_kategoriID").html();
    var jumlah = $$("#" + content+ "_JumlahPesanan").val();

    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/stok/ubahstok.php",
        data: { 
            user_id : id,
            stokbaru : jumlah
        },
        success: function(data) {
            var obj = JSON.parse(data);        
            StokList(kategoriid);  
        }    
    });

    $$("#" + content+ "_JumlahPesanan").html('');
    TutupModal(content);
}

//BANNER
function listbanner(halaman)
{
    var store_id= 0;
    if (localStorage.user_role == 'Admin')
    {
        store_id = 'semuaresto';
    } 
    else
    {
        store_id = localStorage.store_id;
    }

    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/bannerlist.php",
        data: {
            store_id : store_id
        },
        success: function(data) {                        
            var obj = JSON.parse(data);

            if (halaman == "beranda")
            {
                if (obj['status'] == true)
                {
                    $$(".customer-banner").show();                                    
                    $$('#beranda_banner_promo').html("");
                    for(var i =0; i < obj['data'].length; i++)
                    {                 
                        if(obj['data'][i]['category_aim_id'] == null || obj['data'][i]['category_aim_id'] == "")
                        {
                            $$("#beranda_banner_promo").append(                        
                                '<div>'+
                                    '<img class="banner" src="./img/drawable-ldpi/1200x628.png" alt="" onclick="ShowModalMenu('+ obj['data'][i]['menu_aim_id'] + ",'Beranda_MenuModal')" + '">'+
                                '</div>'
                            )
                        }
                        else
                        {
                            $$("#beranda_banner_promo").append(                        
                                '<div>'+
                                    '<a style="width:100%" href="/kategoridetil/'+ obj['data'][i]['category_aim_id'] +'/'+ "'test'" +'">' +
                                        '<img class="banner" src="./img/drawable-ldpi/1200x628.png" alt=""'+
                                    '</a>' +
                                '</div>'
                            )
                        }  
                       
                    }
                }
                else
                {
                    $$('#beranda_banner_promo').html("");
                    $$(".customer-banner").hide();                                    
                }   
            }
            else if (halaman == "banner")
            {
                $$('.banner-list').html("");
                if (obj['status'] == true)
                {
                    for(var i =0; i < obj['data'].length; i++)
                    {
                        var tanggal = formatTanggal(obj['data'][i]['banner_date_edited']);
                        $$(".banner-list").append(                        
                            '<div class="card" style=" margin-bottom: 1rem;">' +
                                '<img style="width: 100%;" src="./img/drawable-ldpi/1200x628.png" alt="">' +
                                '<div class="card-content">' +
                                    '<div class="row">' +
                                        '<div style="padding-left: 1rem;" class="col-50">' +
                                            '<h4>'+ obj['data'][i]['banner_name'] +'</h4>' +
                                            '<p>Terakhir diubah: '+ tanggal +'</p>' +
                                        '</div>' +
                                        '<div style="padding-right: .5rem;" class="col-33">' +
                                            '<a class="button button-round button-fill" href="/bannerdetil/'+ obj['data'][i]['banner_id'] +'">Ubah</a>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>'
                        );
                    }
                }
                else
                {
                    $$('.banner-list').html('<h4 id="statusadminBanerKosong">Banner tidak ditemukan!</h4>');
                    $$('#statusadminBanerKosong').css({'text-align':'center','font-weight':'700', 'margin':'auto', 'color':'gray', 'margin-top':'15rem'});
                }      
            }         
        }    
    });
}

function bannerdetil(id)
{
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/bannerdetil.php",
        data: {
            uid:id,
        },
        success: function(data) {            
            var obj = JSON.parse(data);                        

            $$('#bannerdetil_id').html(id);
            $$("#banner_nama").val(obj['data'][0]['banner_name']);
            admin_cabang_combobox(obj['data'][0]['store_id']);
            if ( obj['data'][0]['menu_aim_id'] != null)
            {                
                document.getElementById('radio_menu').checked = true;
                admin_menu_combobox(obj['data'][0]['menu_aim_id']);
                
            }   
            else if( obj['data'][0]['category_aim_id'] != null)
            {
                document.getElementById('radio_kategori').checked = true;
                admin_kategori_combobox(obj['data'][0]['category_aim_id']);
            }               
        }    
    });
}

function admin_menu_combobox(id)
{
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/menulist.php",
        data: {
            storeid:'semuaresto',
        },
        success: function(data) {
            console.log(data);
            var obj = JSON.parse(data);            
            
            $$('.menu_combobox').html("");
            $$('.category_combobox').html("");
            for(var i =0; i < obj['data'].length; i++)
            {
                if(obj['data'][i]['menu_id'] == id)
                {
                    $$('.menu_combobox').append(
                        '<option selected value="'+ obj['data'][i]['menu_id'] +'">' + obj['data'][i]['menu_name'] +"</option>"
                    )
                }
                else
                {
                    $$('.menu_combobox').append(
                        '<option value="'+ obj['data'][i]['menu_id'] +'">' + obj['data'][i]['menu_name'] +"</option>"
                    )
                }                
            }                                     
        }    
    });
}

function camera(halaman)
{
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.PNG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true
    });   
    function onSuccess(imageData) { 
      $$("#"+ halaman +"_propic").attr('src', imageData);
      $$("#"+ halaman +"_propic").css({'width':'100px', 'height':'100px'});
    }
    function onFail(message) { 
      app.dialog.alert('Failed because: ' + message);
    }
    TutupModal('modgambar_' + halaman);
}

// KATEGORI, BANNER, MENU, JENIS BAYAR
function library(halaman)
{
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.PNG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true
    });   
    function onSuccess(imageData) { 
      $$("#"+ halaman +"_propic").attr('src', imageData);
      $$("#"+ halaman +"_propic").css({'width':'100px', 'height':'100px'});
    }
    function onFail(message) { 
      app.dialog.alert('Failed because: ' + message);
    }
    TutupModal('modgambar_' + halaman);
}

function simpanGambar(halaman, id, nama)
{
    var imgUri = $$("#"+ halaman +"_propic").attr("src");
    if (!imgUri) {
        app.dialog.alert('Please select an image first.');
        return;
    }    
    var path = $$("#"+ halaman +"_propic").attr("src");
    var ext = path.split(".")[3].substring(0,3);
    var options = new FileUploadOptions();
    options.fileKey = "photo";
    options.fileName = imgUri.substr(imgUri.lastIndexOf('/') + 1);
    options.mimeType = "image/png";
    options.params = {
        halaman: halaman,
        nama: nama,
        id : id,
        ext :ext
    };
    var ft = new FileTransfer();
    ft.upload(imgUri,
    encodeURI("http://192.168.0.15/myorder/uploadpic.php"),
    function(result){
        //app.dialog.alert("Ubah Data Sukses","Success");        
    }, 
    function(error){ 
        app.dialog.alert("Error Input","Error");        
    }, 
        options);
}

//DONE
function admin_search(halaman)
{
    if (halaman == 'stok_kategori')
    {
        var nama = $$("#admin_kategori_search").val();
    }
    else
    {
        var nama = $$("#admin_"+ halaman +"_search").val();
    }

    var storeid = $$('#'+halaman+'_idresto').html();

    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/admin/admin_search.php",
        data: {
            halaman:halaman,
            nama:nama,
            //menu
            storeid : storeid,
        },
        success: function(data) {              
            var obj = JSON.parse(data);            
            
            if (halaman == 'menu')
            {
                $$("#admin_menulist").html("");

                for(var i =0; i < obj.length ; i++)
                {                    
                    $$('#admin_menulist').append(
                        '<a style="color: black;" href="/menudetil/'+ obj[i]['menu_id'] +'">' +
                            '<div class="card">'+
                                '<div class="card-content card-content-padding">'+
                                    '<img src="./img/drawable-ldpi/Logo.png" alt="">'+
                                    '<h5>' + obj[i]['menu_name']  + '</h5><br>'+
                                    '<p style="color: #808080; font-size: 11px;">'+ obj[i]['menu_description'] + '</p><br>'+
                                    '<h5>Rp' + obj[i]['menu_sell_price'] +'</h5>'+
                                '</div>'+
                            '</div>'+
                        '</a>'
                    );
                }
            }
            else if (halaman == "cabang")
            {
                $$('#admin_cabanglist').html("");
                for(var i=0; i < obj['data'].length; i++)
                {
                    $$('#admin_cabanglist').append(
                        '<a style="color: black;" href="/cabangdetil/'+ obj['data'][i]['store_id'] + '">' +
                            '<div class="card" style="padding: 7px 16px;">'+
                                '<h5>'+ obj['data'][i]['store_name'] + '</h5>'+
                                '<label>'+ obj['data'][i]['store_address'] +'</label><br>'+
                                '<label><b style="font-size:12px;">Kontak :</b> '+ obj['data'][i]['store_phone'] +'</label>'+
                            '</div>'+
                        '</a>'
                    );
                } 
            }
            else if (halaman == "karyawan")
            {
                $$("#karyawan_list").html("");
                for(var i =0; i < obj['data'].length ; i++)
                {                    
                    $$('#karyawan_list').append(      
                        '<a style="color: black;" href="/karyawanedit/'+ obj['data'][i]['user_id'] +'">' +             
                            '<div class="card">' +
                                '<h5>'+ obj['data'][i]['user_name'] +'</h5>'+
                                '<label>'+ obj['data'][i]['user_role'] +'</label><br>'+
                                '<label>'+ obj['data'][i]['user_phone'] +'</label><br>'+
                                '<p>'+ obj['data'][i]['store_name'] +'</p>'+
                            '</div>' +
                        '</a>'
                    );
                }
            }
            else if (halaman == "kategori")
            {
                $$("#listkategori").html("");
                for(var i =0; i < obj['data'].length ; i++)
                {
                    var image = obj['data'][i]['category_id'] + "_" + obj['data'][i]['category_name'] + "." + obj['data'][i]['category_img_ext'];
                    var image_url = "http://192.168.0.15/myorder/images/" + image;
                    $$('#listkategori').append(
                        "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                            '<a href="/kategoriedit/'+ obj['data'][i]['category_id'] +'">' +
                                "<div><img style='object-fit: contain;  width: 4rem; height:4rem; margin-right:7px;' src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'></div>"+
                                "<div style='width: 95%;'>" +  obj['data'][i]['category_name'] + "</div>"+
                            "</a>"+
                        "</li>"
                    );
                }
            }
            else if (halaman == "stok_kategori")
            {
                $$("#listkategori").html("");
                for(var i =0; i < obj['data'].length ; i++)
                {
                    var image = obj['data'][i]['category_id'] + "_" + obj['data'][i]['category_name'] + "." + obj['data'][i]['category_img_ext'];
                    var image_url = "http://192.168.0.15/myorder/images/" + image;
                    $$('#listkategori').append(
                        "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                            '<a href="/stok/'+ obj['data'][i]['category_id'] +'">' +
                                "<div><img style='object-fit: contain;  width: 4rem; height:4rem; margin-right:7px;' src='"+ image_url +"'" + " onerror='this.onerror=null;this.src=" + '"./img/drawable-ldpi/Logo.png";' + "'></div>"+
                                "<div style='width: 95%;'>" +  obj['data'][i]['category_name'] + "</div>"+
                            "</a>"+
                        "</li>"
                    );
                }
            }
            else if (halaman == "jenispembayaran")
            {
                $$('#list_jenisbayar').html("");
                for(var i =0; i < obj['data'].length; i++)
                {
                    $$('#list_jenisbayar').append(
                        "<li style='padding: 8px 0px; border-bottom: 1px solid rgba(0,0,0,0.1);'>" +                
                            '<a href="/pembayarandetil/'+ obj['data'][i]['payment_type_id'] +'">' +
                                "<div><img style='width: 4rem;' src='./img/drawable-ldpi/Logo.png'></div>"+
                                "<div style='width: 95%;'>" +  obj['data'][i]['payment_type_name'] + "</div>"+
                            "</a>"+
                        "</li>"
                    );
                }
            }
        }    
    });
}

function cekKeranjang()
{
    if((localStorage.keranjang == null || localStorage.keranjang == "") && (localStorage.JumlahKeranjang == null || localStorage.JumlahKeranjang == "" ))
    {        
        var divsToHide = document.getElementsByClassName("fab_keranjang");
        for(var i = 0; i < divsToHide.length; i++)
        {
            divsToHide[i].style.opacity = 0;
            divsToHide[i].style.zIndex = -9999;
            //divsToHide[i].hide();
        }
    }
    else
    {       
        var divsToHide = document.getElementsByClassName("fab_keranjang");
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.opacity = 1;
            divsToHide[i].style.zIndex = 7777;
            //divsToHide[i].show();
        }
    }
}

// Get geo coordinates
function getMapLocation() 
{
    navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true });
}

  // Success callback for get geo coordinates
  function onMapSuccess(position) {
    Latitude = position.coords.latitude;
    Longtitude = position.coords.longitude;

    getMap("keranjang",Latitude, Longtitude);

    localStorage.Latitude =  Latitude;
    localStorage.Longtitude = Longtitude;

    var geocoder = new google.maps.Geocoder;

    var latlng = { lat: Latitude, lng: Longtitude };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                map.setZoom(20);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                $$('#keranjang_alamat').val(results[0].formatted_address);

                $$('#keranjang_alamat').change();
            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
  }

  // Error callback
  function onMapError(error) {
    console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  }

  // Get map by using coordinates
  function getMap(content, latitude, longitude) {
    var mapOptions = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById(content +"_map"), mapOptions);

    var latLong = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(20);
    map.setCenter(marker.getPosition());   
    
  }

function count_pesananBaru()
{
    app.request({
        method: "POST",
        url: "http://192.168.0.15/myorder/beranda/count_pesananBaru.php",
        data: {            
            store_id: localStorage.cabang,
        },
        success: function(data) {
            var obj = JSON.parse(data);
            $$('#jumlah_pesanBaru').html(obj['data']);
        }
    });
}

//TOMBOL RUTE
function Rute()
{
    var location =  $$('#PesananDetil_Customer_latitude').html() + "," + $$('#PesananDetil_Customer_longtitude').html()
    window.plugins.launcher.launch({uri:'google.navigation:q=' + location}, successCallback, errorCallback);  
}
// Default handlers
var successCallback = function(data) {
    alert("Success!");
};
var errorCallback = function(errMsg) {
    alert("Error! " + errMsg);
}