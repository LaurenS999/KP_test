function load_user(e, page)
{
    user_allOnClick(e, page);

    app.request({
        method: "POST",
        url: "http://localhost/myorder/user/profile.php",
        data: {  
            user_id : localStorage.user_id
        },
        success: function(data) {            
            var obj = JSON.parse(data);
            if (obj.status) 
            {
                if (obj['data']['user_delete'] == 0) 
                {
                    localStorage.user_id = obj['data']['user_id'];
                    localStorage.username = obj['data']['username'];
                    localStorage.user_name = obj['data']['user_name'];
                    localStorage.user_phone = obj['data']['user_phone'];
                    localStorage.email = obj['data']['email'];
                    localStorage.user_role = obj['data']['user_role'];
                    localStorage.store_id = obj['data']['store_id'];
                }
                else
                {
                    localStorage.clear();
                    page.router.navigate('/login/');
                }
            }
        }    
    });

    var inputNama = document.getElementById('input-namabaru');
    inputNama.setAttribute('placeholder', localStorage.user_name);
    var inputTelp = document.getElementById('input-telpbaru');
    inputTelp.setAttribute('placeholder', localStorage.user_phone);
    var inputEmail = document.getElementById('input-emailbaru');
    inputEmail.setAttribute('placeholder', localStorage.email);

    cekrole_profile();   
}

function KonfirmasiLogOut()
{
    app.dialog.confirm('Apakah yakin ingin Log out?', 
        function() 
        {
            LogOut();
        }
    );
}

function LogOut()
{
    localStorage.clear();
    window.location.reload(); 
}

function user_allOnClick(e, page)
{
    var count_passlama = 0;
    $$('#eye-passlama').on('click', function() {
        if (count_passlama == 0) {
            count_passlama++;
            $$('#eye-passlama').addClass('fa-eye-slash');
            $$('#input-passlama').attr('type', "text");
        } else {
            count_passlama--;
            $$('#eye-passlama').removeClass('fa-eye-slash');
            $$('#input-passlama').attr('type', "password");
        }
    });

    var count_passbaru = 0;
    $$('#eye-passbaru').on('click', function() {
        if (count_passbaru == 0) {
            count_passbaru++;
            $$('#eye-passbaru').addClass('fa-eye-slash');
            $$('#input-passbaru').attr('type', "text");
        } else {
            count_passbaru--;
            $$('#eye-passbaru').removeClass('fa-eye-slash');
            $$('#input-passbaru').attr('type', "password");
        }
    });
}

function cekrole_profile()
{
    $$('#customer-name').html(localStorage.user_name);
    $$('#customer-phone').html(localStorage.user_phone);
    $$('#customer-email').html(localStorage.email);

    $$('#myname').html('Hai, ' + localStorage.user_name);
    $$('#myusername').html('Username: ' + localStorage.username);  

    if (localStorage.user_role == "Pelanggan")
    {
        $$('.driver_menu').hide();
        $$('.kasir_menu').hide();
        $$('.admin_menu').hide();

        $$('.section_driver_kasir_admin').hide();
        
    }
    else if (localStorage.user_role == "Kasir")
    {
        $$('.driver_menu').hide();
        $$('.admin_menu').hide();
        $$('.customer_menu').hide();
    }
    else if (localStorage.user_role == "Driver")
    {
        $$('.customer_menu').hide();
        $$('.admin_menu').hide();
        $$('.kasir_menu').hide();
    }
    else //ADMIN
    {
        $$('.driver_menu').hide();
        $$('.kasir_menu').hide();
        $$('.customer_menu').hide();
    }
}

function GantiNama()
{   
    var nama = $$('#input-namabaru').val();
    if (nama == "")
    {
        app.dialog.alert("Kolom nama tidak boleh kosong!");
    }
    else if (nama == localStorage.user_name)
    {
        app.dialog.alert("Kolom nama tidak boleh sama seperti sebelumnya!");
    }
    else 
    {
        app.request({
            method: "POST",
            url: "http://localhost/myorder/user/changenama.php",
            data: {  
                user_id : localStorage.user_id,
                nama : nama
            },
            success: function(data) {
                var obj = JSON.parse(data);
                if (obj.status == true) 
                {                                
                    $$('#myname').html('Hai, ' + nama);
                    $$('#customer-name').html(nama);
                    $$('#input-namabaru').val('');
                    TutupModal('modn');
    
                    localStorage.user_name = nama;          
                    app.dialog.alert(obj['pesan']);
                }
                else
                {
                    app.dialog.alert(obj['pesan']);
                }
            }    
        });
    }
}

function GantiTelepon()
{
    var telepon = $$('#input-telpbaru').val();
    if (telepon == "")
    {
        app.dialog.alert("Kolom telepon tidak boleh kosong!");
    }
    else if (telepon == localStorage.user_phone)
    {
        app.dialog.alert("Nomor telepon tidak boleh sama seperti sebelumnya!");
    }
    else
    {
        app.request({
            method: "POST",
            url: "http://localhost/myorder/user/changetelepon.php",
            data: {  
                user_id : localStorage.user_id,
                user_phone : telepon
            },
            success: function(data) {
                var obj = JSON.parse(data);            
                if (obj.status == true) 
                {                                
                    $$('#customer-phone').html(telepon);
                    $$('#input-telpbaru').val('');
                    TutupModal('modt');

                    localStorage.user_phone = telepon;
                    app.dialog.alert(obj['pesan']);
                }
                else
                {
                    app.dialog.alert(obj['pesan']);
                }
            }    
        });
    }
}

function GantiEmail()
{    
    var email = $$('#input-emailbaru').val();
    if (email == "")
    {
        app.dialog.alert("Kolom email tidak boleh kosong!");
    }
    else if (email == localStorage.email)
    {
        app.dialog.alert("Kolom email tidak boleh sama seperti sebelumnya!");
    }
    else
    {
        app.request({
            method: "POST",
            url: "http://localhost/myorder/user/changeemail.php",
            data: {  
                user_id : localStorage.user_id,
                email : email
            },
            success: function(data) {
                var obj = JSON.parse(data);            
                if (obj.status == true) 
                {                                
                    $$('#customer-email').html(email);
                    $$('#input-emailbaru').val('');
                    TutupModal('modem');
    
                    localStorage.email = email;        
                    app.dialog.alert(obj['pesan']);
                }
                else
                {
                    app.dialog.alert(obj['pesan']);
                }
            }    
        });
    }
}

function GantiPassword()
{    
    var passwordbaru = $$('#input-passbaru').val();
    var passwordlama = $$('#input-passlama').val();
    
    if (passwordbaru == "" || passwordlama == "")
    {
        app.dialog.alert("Kolom password tidak boleh kosong!");
    }
    else
    {
        loadingData();

        app.request({
            method: "POST",
            url: "http://localhost/myorder/user/changepass_crypt.php",
            data: {  
                user_id : localStorage.user_id,
                newpass : passwordbaru,
                oldpass : passwordlama
            },
            success: function(data) {
                var obj = JSON.parse(data);            
                if (obj.status == true) 
                {                
                    app.dialog.alert(obj['data']);
                    $$('#input-passbaru').val('');
                    $$('#input-passlama').val('');
                    TutupModal('modp');
                }
                else
                {
                    app.dialog.alert(obj['data']);
                }
                determinateLoading = false;
                app.dialog.close();
            }    
        });
    }
}