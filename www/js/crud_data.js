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
    var stok = "";
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
    var ext = 'tes';
    //BANNER
    var aim = "";
    var aim_id = "";

    if (halaman == "menu" || halaman == "kategori" || halaman == "banner" || halaman == "jenispembayaran")
    {
        // IMG
        var path = $$("#"+ halaman +"_propic").attr("src");

        if (path == "./img/drawable-ldpi/Logo.png" || path == "./img/drawable-ldpi/1200x628.png")
        {
            ext = path.split(".")[2];
        }
        else
        {
            ext = path.split(".")[3].substring(0,3);
        }
    }

    if (halaman == "cabang") //DONE
    {
        id =  $$('#cabangdetil_id').html();
        nama = $$('#cabangdetil_nama').val();
        storeaddress = $$('#cabangdetil_Alamat').val();
        storephone = $$("#cabangdetil_telpon").val();

        if ((nama == "" || nama == null) || 
            (storeaddress == "" || storeaddress == null) || 
            (storephone == "" || storephone == null || isNaN(storephone)) )
        {
            var pesan = "";
            if (nama == "" || nama == null) pesan = "Nama";

            if (storeaddress == "" || storeaddress == null)
            {
                if (pesan == "") pesan = "Alamat toko";                
                else pesan += ", Alamat Toko";
            }
            if (storephone == "" || storephone == null || isNaN(storephone))
            {
                if (pesan == "") pesan = "Nomor telepon toko";
                else pesan += ", Nomor telepon toko";                                
            }

            app.dialog.alert(pesan + ' tidak boleh kosong!');
            return;
        }
    }
    else if (halaman == "kategori") //DONE
    {
        id =  $$('#kategoridetil_id').html();
        nama = $$('#kategoridetil_nama').val();

        if (nama == "" || nama == null)
        {
            var pesan = 'Nama tidak boleh kosong!';
            app.dialog.alert(pesan);
            return;
        }   
    }
    else if (halaman == "menu") //DONE
    {         
        nama = $$('#menudetil_menunama').val();
        hargajual = $$('#menudetil_menuharga').val();
        diskon = $$('#menudetil_menudiskon').val();
        desc = $$("#menudetil_menudesc").val();
        stok = $$("#menudetil_stok").val();

        kategoricombobox = document.getElementById("menu_category_combobox");
        idkategori = kategoricombobox.value;        
        cabangcombobox = document.getElementById("menu_cabang_combobox");
        idcabang = cabangcombobox.value;

        if (nama == "" || nama == null || 
            hargajual == "" || hargajual == null || 
            diskon == "" || diskon == null|| 
            desc == "" || desc == null || 
            idkategori == '' || idkategori == null ||
            idcabang == '' || idcabang == null ||
            stok == '' || stok == null)
        {
            var pesan = "";
            if (nama == "" || nama == null) pesan = "Nama";

            if (hargajual == "" || hargajual == null)
            {
                if (pesan == "") pesan = "Harga";
                else pesan += ", Harga";
            }

            if (diskon == "" || diskon == null)
            {
                diskon = 0;
            }

            if (desc == "" || desc == null)
            {
                if (pesan == "") pesan = "Deskripsi";
                else pesan += ", Deskripsi";
            }

            if (idkategori == '' || idkategori == null)
            {
                if (pesan == "") pesan = "Kategori";
                else pesan += ", Kategori";
            }

            if (idcabang == '' || idcabang == null)
            {
                if (pesan == "") pesan = "Cabang";
                else pesan += ", Cabang";
            }

            if (stok == '' || stok == null)
            {
                if (pesan == "") pesan = "Stok";
                else pesan += ", Stok";
            }

            app.dialog.alert(pesan + ' tidak boleh kosong!');
            return;
        }
    }
    else if (halaman == "karyawan") //DONE
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

        if (nama == "" || nama == null || 
            Karyawan_username == "" || Karyawan_username == null || 
            karyawan_email == "" || karyawan_email == null || 
            karyawan_telepon == "" || karyawan_telepon == null || 
            karyawan_password == "" || karyawan_password == null || 
            karyawan_jabatan == "" || karyawan_jabatan == null ||
            karyawan_idcabang == "" || karyawan_idcabang == null)
        {
            var pesan = "";
            if (nama == "" || nama == null) pesan = "Nama";

            if (Karyawan_username == "" || Karyawan_username == null)
            {
                if (pesan == "") pesan = "Username";
                else pesan += ", Username";
            }
            if (karyawan_email == "" || karyawan_email == null)
            {
                if (pesan == "") pesan = "Email";
                else pesan += ", Email";
            }

            if (karyawan_telepon == "" || karyawan_telepon == null)
            {
                if (pesan == "") pesan = "Telepon";
                else pesan += ", Telepon";
            }

            if (karyawan_jabatan == "" || karyawan_jabatan == null)
            {
                if (pesan == "") pesan = "Jabatan";
                else pesan += ", Jabatan";
            }

            if (karyawan_idcabang == "" || karyawan_idcabang == null)
            {
                if (pesan == "") pesan = "Cabang";
                else pesan += ", Cabang";
            }

            if (karyawan_password == "" || karyawan_password == null)
            {
                if (pesan == "") pesan = "Password";
                else pesan += ", Password";
            }
            else if (karyawan_password.split('').length < 8)
            {
                app.dialog.alert("Password minimal 8 karakter!");
                return;
            }

            app.dialog.alert(pesan + ' tidak boleh kosong!');
            return;
        }
    }
    else if (halaman == "jenispembayaran") //DONE
    {
        nama = $$("#jenispembayaran_nama").val();
        
        if (nama == "" || nama == null)
        {
            var pesan = 'Nama tidak boleh kosong !';

            app.dialog.alert(pesan + ' tidak boleh kosong!');
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
        else if (document.getElementById('radio_menu').checked)
        {
            aim = "menu";
            menu_combobox = document.getElementById("banner_menu_combobox");
            aim_id = menu_combobox.value;  
        }

        if (nama == "" || nama == null || aim_id == "" || aim_id == null || idcabang == "" || idcabang == null)
        {
            var pesan = "";
            if (nama == "" || nama == null) pesan = "Nama";

            if (aim_id == "" || aim_id == null)
            {
                if (pesan == "") pesan = "Tujuan banner";                
                else pesan += ", Tujuan banner"; 
            }

            if (idcabang == "" || idcabang == null)
            {
                if (pesan == "") pesan = "Cabang banner";                
                else pesan += ", Cabang banner"; 
            }

            app.dialog.alert(pesan + ' tidak boleh kosong!');
            return;
        }
    }

    loadingData();
    
    app.request({
        method: "POST",
        url: "http://localhost/myorder/admin/admin_tambah.php",
        data: {            
            halaman: halaman,
            //CABANG
            storename: nama,
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
            stok:stok,
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
          
            var obj = JSON.parse(data);

            if (obj.status == true)
            {
                if (halaman == "menu" || halaman == "kategori" || halaman == "banner" || halaman == "jenispembayaran")
                {
                    simpanGambar(halaman, obj['idbaru'], nama);                
                }
                
                app.dialog.alert('Berhasil menambahkan/mengubah '+ nama +' baru!', 
                    function() 
                    {
                        if (halaman == 'kategori')
                        {
                            mainView.router.navigate('/'+halaman+'/kategoriedit');
                        }
                        else if (halaman == 'jenispembayaran')
                        {
                            mainView.router.navigate('/pembayaran/');
                        }
                        else 
                        {
                            mainView.router.navigate('/'+halaman+'/');
                        }
                    }
                );
            }
            else
            {
                app.dialog.alert('Gagal menambahkan/mengubah '+ nama +'!');  
            }
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
    var stok = "";
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

    //BANNER
    var aim = "";
    var aim_id = "";

    var ext = "";
    if (halaman == "menu" || halaman == "kategori" || halaman == "banner" || halaman == "jenispembayaran")
    {
        // IMG
        var path = $$("#"+ halaman +"_propic").attr("src");

        if (path == "./img/drawable-ldpi/Logo.png" || path == "./img/drawable-ldpi/1200x628.png")
        {
            ext = path.split(".")[2];
        }
        else
        {
            path = path.split(".");
            ext = path[path.length -1].substring(0,3);;
        }
    }
    

    if (halaman == "cabang")
    {
        id =  $$('#cabangdetil_id').html();
        nama = $$('#cabangdetil_nama').val();
        storeaddress = $$('#cabangdetil_Alamat').val(); 
        storephone = $$("#cabangdetil_telpon").val();

        if ((nama == "" || nama == null) || 
            (storeaddress == "" || storeaddress == null) || 
            (storephone == "" || storephone == null || isNaN(storephone)))
        {
            var pesan = "";
            if (nama == "" || nama == null) pesan = "Nama";

            if (storeaddress == "" || storeaddress == null)
            {
                if (pesan == "") pesan = "Alamat toko";                
                else pesan += ", Alamat Toko";                
            }
            if (storephone == "" || storephone == null || isNaN(storephone))
            {
                if (pesan == "") pesan = "Nomor telepon toko";
                else pesan += ", Nomor telepon toko";                                
            }
            app.dialog.alert(pesan + ' tidak boleh kosong!');
            return;
        }
    }
    else if (halaman == "kategori")
    {
        id =  $$('#kategoridetil_id').html();
        nama = $$('#kategoridetil_nama').val();
        
        if (nama == "" || nama == null)
        {
            var pesan = 'Nama tidak boleh kosong !';

            app.dialog.alert(pesan + ' tidak boleh kosong!');
            return;
        }
    }
    else if (halaman == "menu")
    {
        id = $$('#menudetil_menuid').html();        
        nama = $$('#menudetil_menunama').val();
        hargajual = $$('#menudetil_menuharga').val();
        stok = $$('#menudetil_stok').val();
        diskon = $$('#menudetil_menudiskon').val();
        desc = $$("#menudetil_menudesc").val();

        kategoricombobox = document.getElementById("menu_category_combobox");
        idkategori = kategoricombobox.value;        
        cabangcombobox = document.getElementById("menu_cabang_combobox");
        idcabang = cabangcombobox.value;

        if ((nama == "" || nama == null) || 
            (hargajual == "" || hargajual == null) || 
            (diskon == "" || diskon == null) || 
            (desc == "" || desc == null) ||
            (stok == "" || stok == null) || 
            (idkategori == "" || idkategori == null) ||
            (idcabang == "" || idcabang == null))
        {
            var pesan = "";
            if (nama == "" || nama == null) pesan = "Nama";

            if (hargajual == "" || hargajual == null)
            {
                if (pesan == "") pesan = "Harga";
                else pesan += ", Harga";
            }

            if (idcabang == "" || idcabang == null)
            {
                if (pesan == "") pesan = "Cabang";
                else pesan += ", Cabang";
            }

            if (idkategori == "" || idkategori == null)
            {
                if (pesan == "") pesan = "Kategori";
                else pesan += ", Kategori";
            }

            if (stok == "" || stok == null)
            {
                if (pesan == "") pesan = "Stok";
                else pesan += ", Stok";
            }

            if (diskon == "" || diskon == null)
            {
                if (pesan == "") pesan = "Diskon";
                else pesan += ", Diskon";
            }

            if (desc == "" || desc == null)
            {
                if (pesan == "") pesan = "Deskripsi";
                else pesan += ", Deskripsi";
            }

            app.dialog.alert(pesan + ' tidak boleh kosong!');
            return;
        }
    }
    else if (halaman == "karyawan")
    {
        id = $$('#karyawandetil_id').html();   
        nama = $$('#karyawandetil_nama').val();
        Karyawan_username = $$('#karyawandetil_username').val();
        karyawan_email = $$('#karyawandetil_email').val();
        karyawan_telepon = $$('#karyawandetil_telepon').val();
        karyawan_password = $$('#karyawandetil_password').val();

        karyawan_jabatan_combobox = document.getElementById("karyawan_jabatan_combobox");
        karyawan_jabatan = karyawan_jabatan_combobox.value;
        
        karyawan_cabang_combobox = document.getElementById("karyawan_cabang_combobox");
        karyawan_idcabang = karyawan_cabang_combobox.value;

        if (nama == "" || nama == null || 
            Karyawan_username == "" || Karyawan_username == null || 
            karyawan_email == "" || karyawan_email == null || 
            karyawan_telepon == "" || karyawan_telepon == null || 
            karyawan_password == "" || karyawan_password == null || 
            karyawan_jabatan == "" || karyawan_jabatan == null ||
            karyawan_idcabang == "" || karyawan_idcabang == null)
        {

            var pesan = "";
            if (nama == "" || nama == null) pesan = "Nama";

            if (Karyawan_username == "" || Karyawan_username == null)
            {
                if (pesan == "") pesan = "Username";
                else pesan += ", Username";
            }
            if (karyawan_email == "" || karyawan_email == null)
            {
                if (pesan == "") pesan = "Email";
                else pesan += ", Email";
            }

            if (karyawan_telepon == "" || karyawan_telepon == null)
            {
                if (pesan == "") pesan = "Telepon";
                else pesan += ", Telepon";
            }

            if (karyawan_password == "" || karyawan_password == null)
            {
                if (pesan == "") pesan = "Password";
                else pesan += ", Password";
            }

            if (karyawan_jabatan == "" || karyawan_jabatan == null)
            {
                if (pesan == "") pesan = "Jabatan";
                else pesan += ", Jabatan";
            }

            if (karyawan_idcabang == "" || karyawan_idcabang == null)
            {
                if (pesan == "") pesan = "Cabang";
                else pesan += ", Cabang";
            }

            app.dialog.alert(pesan + ' tidak boleh kosong!');
            return;
        }
    }
    else if (halaman == "jenispembayaran")
    {
        id = $$("#jenispembayarandetil_id").html();
        nama = $$("#jenispembayaran_nama").val();

        if (nama == "" || nama == null)
        {
            var pesan = 'Nama tidak boleh kosong !';

            app.dialog.alert(pesan + ' tidak boleh kosong!');
            return;
        }
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

        if (nama == "" || nama == null || aim_id == "" || aim_id == null)
        {
            var pesan = "";
            if (nama == "" || nama == null) pesan = "Nama";

            if (aim_id == "" || aim_id == null)
            {
                if (pesan == "") pesan = "Tujuan banner";                
                else pesan += ", Tujuan banner"; 
            }

            app.dialog.alert(pesan + ' tidak boleh kosong!');
            return;
        }
    }
    
    loadingData();    

    if (halaman == "menu" || halaman == "kategori" || halaman == "jenispembayaran")
    {
        if (document.getElementById(halaman + '_propic').getAttribute('src') != "./img/drawable-ldpi/Logo.png")
        {
            simpanGambar(halaman, id, nama);
        }
    }
    else if (halaman == "banner")
    {
        if (document.getElementById(halaman + '_propic').getAttribute('src') != "./img/drawable-ldpi/1200x628.png")
        {
            simpanGambar(halaman, id, nama);
        }
    }

    app.request({
        method: "POST",
        url: "http://localhost/myorder/admin/admin_ubah.php",
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
            stok: stok,
            idkategori:idkategori,
            namakategori: namakategori,
            idcabang: idcabang,
            desc:desc,
            //KARYAWAN
            username: Karyawan_username,
            user_name: nama,
            email: karyawan_email,
            user_phone: karyawan_telepon,
            user_role: karyawan_jabatan,
            store_id: karyawan_idcabang,            
            //JENIS PEMBAYARAN
            jenispembayaran_nama: nama,
            //BANNER
            tipe_aim : aim,
            aim_id : aim_id,
            //IMG
            ext:ext
        },
        success: function(data) {       
            console.log(data);            
            var obj = JSON.parse(data);
            
            if (obj.status == true)
            {                
                app.dialog.alert('Berhasil menambahkan/mengubah '+ nama +'!');
            }
            else
            {
                app.dialog.alert('Gagal menambahkan/mengubah '+ nama +'!');
            }

            determinateLoading = false;
            app.dialog.close();
        }
    });
}

function KonfirmasiHapus(halaman)
{
    app.dialog.confirm('Apakah yakin ingin menghapus?', 
        function() 
        {
            HapusData(halaman);
        }
    );
}

function HapusData(halaman)
{
    var id = $$('#'+ halaman +'detil_id').html();

    if (halaman == 'riwayat')
    {
        var array = $$('#riwayatdetil_Transaksi_id').html();
        array = array.split(":");
        id = array[1];
    }
    
    app.request({
        method: "POST",
        url: "http://localhost/myorder/admin/admin_hapus.php",
        data: {
            uid : id,
            halaman : halaman
        },
        success: function(data) {
            var obj = JSON.parse(data);
            var text = "";
            if(halaman == "jenispembayaran")
            {
                text = "Jenis Pembayaran";
            }
            else
            {
                text = halaman
            }
            
            if (obj['status'] == true)
            {                             
                app.dialog.alert('Berhasil menghapus ' +text+ '!',
                    function()
                    {
                        if (halaman == 'kategori')
                        {
                            mainView.router.navigate('/'+halaman+'/kategoriedit');
                        }
                        else if (halaman == 'jenispembayaran')
                        {
                            mainView.router.navigate('/pembayaran/');
                        }
                        else 
                        {
                            mainView.router.navigate('/'+halaman+'/');
                        }
                        //! klo pake hardware function, ada yg ter-display:none
                        //app.views.main.router.back();
                    }
                );         
            }
            else
            {
                app.dialog.alert('Gagal menghapus '+ halaman +'!');  
            }
        }
    });
}