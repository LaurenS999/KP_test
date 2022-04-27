function load_profile_index(e, page) 
{
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

                    $$('#myname').html('Hai, ' + localStorage.user_name);
                    $$('#myusername').html('Username: ' + localStorage.username);
                    
                    if (localStorage.user_role == "Pelanggan")
                    {
                        $$('.driver_menu').hide();
                        $$('.kasir_menu').hide();
                       
                        $$('#driver_profile').hide();
                        $$('#customer_name2').html(localStorage.user_name);
                        $$('#customer_phone').html(localStorage.user_phone);
                        $$('#customer_email').html(localStorage.email);
                    }
                    else if (localStorage.user_role == "Driver")
                    {  
                        $$('.customer_menu').hide();
                        $$('.kasir_menu').hide();

                        $$('#customer_profile').hide();
                        $$('#driver_name2').html(localStorage.user_name);
                        $$('#driver_phone').html(localStorage.user_phone);
                        $$('#driver_email').html(localStorage.email);
                        
                    }
                    else if (localStorage.user_role == "Kasir")
                    {
                        $$('.customer_menu').hide();
                        $$('.driver_menu').hide();

                        $$('#customer_profile').hide();
                        $$('#driver_profile').hide();
                    }
                    else // localStorage.user_role == "Admin"
                    {

                    }
                }
                else
                {
                    localStorage.clear();
                    page.router.navigate('/login/');
                }
            }
        }    
    });

    $$('#btn-logout').on('click', function() {
        localStorage.clear();
        page.router.navigate('/login/');        
    });

    $$('#chgPass').on('click',function()
    {
        app.dialog.create({                      
            text: '<b>Change Password<b/>',
            content: 
            '<div class="dialog-input-field item-input">' +
            '<div class="item-input-wrap">' +
                '<input id="oldpass" style="border-radius: 5px; border: 1px solid black; padding:5px;" class="dialog-input" type="password" placeholder="Old Password">' +
                '<span id="show_password_login" style="color: #E3E3E3; right: 1rem; position: absolute; bottom:3.4rem;"><i id="eyepass" value="eye" class="f7-icons">eye</i></span>' +
                '<input id="newpass" style="border-radius: 5px; border: 1px solid black; padding:5px;" class="dialog-input" type="password" placeholder="New Password">' + 
                '<span id="show_password_login" style="color: #E3E3E3; right: 1rem; position: absolute; bottom:2px;"><i id="eyepass" value="eye" class="f7-icons">eye</i></span>' +          
            '</div> '+
            '</div>',
            buttons: [
                { 
                    text:'Cancel',
                },
                {
                    text:'Confirm',
                    onClick: function(dialog, index)
                    {
                        var oldpass = dialog.$el.find('#oldpass').val();
                        var newpass = dialog.$el.find('#newpass').val();                          
                        var uid = localStorage.user_id;
                        
                        if (newpass == "" || oldpass == "")
                        {
                            app.dialog.alert("Password baru dan/atau Password lama tidak boleh kosong");
                        }
                        else
                        {
                            app.request.post('http://localhost/myorder/user/changepass.php', {newpass: newpass, oldpass: oldpass, user_id:uid}, function (data)
                            {
                                var obj = JSON.parse(data);
                                if (obj['status'] == true) 
                                {
                                    app.dialog.alert(obj['pesan']);
                                }
                                else
                                {
                                    app.dialog.alert(obj['pesan']);
                                }
                            });
                        }     
                    }
                },
            ]
        }).open();
    });    
}

function changeTelepon()
{
    app.dialog.create({                      
        text: '<b>Ganti Telepon</b>',
        content: 
        '<div class="dialog-input-field item-input">' +
        '<div class="item-input-wrap">' +
            '<input id="newTelepon" style="border-radius: 5px; border: 1px solid black; padding:5px;" class="dialog-input" type="tel" value="">' +                                                   
        '</div> '+
        '</div>',

        buttons: [
            { 
                text:'Cancel'
            },
            {
                text:'Confirm',
                onClick: function(dialog, index)
                {
                    var telepon = dialog.$el.find('#newTelepon').val();
                    var uid = localStorage.user_id;

                    if (telepon == localStorage.user_phone)
                    {
                        app.dialog.alert("Kolom telepon tidak boleh sams seperti sebelumnya!")
                    }
                    else if (telepon == "")
                    {
                        app.dialog.alert("Kolom telepon tidak boleh kosong");
                    }
                    else
                    {
                        app.request.post('http://localhost/myorder/user/changetelepon.php', {user_phone:telepon, user_id:uid}, function (data)
                        {
                            var obj = JSON.parse(data);
                            if (obj['status'] == true) 
                            {
                                localStorage.user_phone = telepon;
                                $$('#customer_phone').html(localStorage.user_phone);
                                app.dialog.alert(obj['pesan']);
                            }
                            else
                            {
                                app.dialog.alert(obj['pesan']);
                            }
                        });
                    }
                }
            },
        ]
    }).open();
}

function changeEmail()
{
    app.dialog.create({                      
        text: '<b>Ganti Email</b>',
        content: 
        '<div class="dialog-input-field item-input">' +
        '<div class="item-input-wrap">' +
            '<input style="border-radius: 5px; border: 1px solid black; padding:5px;" id="newEmail" class="dialog-input" type="tel" value="">' +
        '</div> '+
        '</div>',

        buttons: [
            { 
                text:'Cancel'
            },
            {
                text:'Confirm',
                onClick: function(dialog, index)
                {                         
                    var email = dialog.$el.find('#newEmail').val();
                    var uid = localStorage.user_id;

                    if (email == "")
                    {
                        app.dialog.alert("Kolom email tidak boleh kosong!");
                    }
                    else if (email == localStorage.email)
                    {
                        app.dialog.alert("Email sama seperti sebelumnya!");
                    }
                    else
                    {
                        app.request.post('http://localhost/myorder/user/changeemail.php', {email:email, user_id:uid}, function (data)
                        {
                            var obj = JSON.parse(data);
                            if (obj['status'] == true) 
                            {
                                localStorage.email = email;
                                $$('#customer_email').html(localStorage.email);
                                app.dialog.alert(obj['pesan']);
                            }
                            else
                            {
                                app.dialog.alert(obj['pesan']);
                            }
                        });
                    } 
                }
            },
        ]
    }).open();
}

function changeNama ()  
{
    app.dialog.create({                      
        text: '<b>Ganti Nama</b>',
        content: 
        '<div class="dialog-input-field item-input">' +
        '<div class="item-input-wrap">' +
            '<input style="border-radius: 5px; border: 1px solid black; padding:5px;" id="NewName" class="dialog-input" type="tel" value="">' +                                                   
        '</div> '+
        '</div>',

        buttons: [
            { 
                text:'Cancel',
            },
            {
                text:'Confirm',
                onClick: function(dialog, index)
                {
                    var nama = dialog.$el.find('#NewName').val();
                    var localnama = localStorage.user_name;
                    var uid = localStorage.user_id;

                    if (nama == "")
                    {
                        app.dialog.alert("Kolom nama tidak boleh kosong!");
                    }
                    else if (nama == localnama)
                    {
                        app.dialog.alert("Kolom nama tidak boleh sama seperti sebelumnya!");
                    }
                    else
                    {
                        app.request.post('http://localhost/myorder/user/changenama.php', {nama:nama, user_id:uid}, function (data)
                        {
                            var obj = JSON.parse(data);
                            if (obj['status'] == true) 
                            {
                                localStorage.user_name = nama;
                                $$('#myname').html('Hai, ' + localStorage.user_name);
                                $$('#customer_name2').html(localStorage.user_name);
                                app.dialog.alert(obj['pesan']);
                            }
                            else
                            {
                                app.dialog.alert(obj['pesan']);
                            }
                        });
                    }
                }
            },
        ]
    }).open();
}

function routeberanda() {
    //window.router.navigate('/beranda/');
    
    //app.dialog.alert('tes');
}