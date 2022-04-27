function load_beranda_index(e, page) 
{
    if (localStorage.user_role == "Pelanggan")
    {
        $$('.kasir_menu').hide();
        $$('.kasir_beranda').hide();
        $$('.kasir_status').hide();
        $$('.kasir_title').hide();
        $$('.kasir_listmenu').hide();
    }
    else if (localStorage.user_role == "Kasir")
    {
        $$('.customer_menu').hide();
        $$('.customer_beranda').hide();
        $$('.customer_promo').hide();
    }
    else // localStorage.user_role == "Admin"
    {
        
    }
}