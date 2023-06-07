//page
const page = document.getElementById("main_page");


//nav
const top_nav_button = document.getElementById("top_nav_menu");
const side_nav = document.getElementById("side_nav");

//currency
const currency_code = [
    {
        "currency": "Afghan Afghani",
        "code": "AFN",
        "symbol": "؋"
    },
    {
        "currency": "Albanian Lek",
        "code": "ALL",
        "symbol": "Lek"
    },
    {
        "currency": "Algerian Dinar",
        "code": "DZD"
    },
    {
        "currency": "Angolan Kwanza",
        "code": "AOA"
    },
    {
        "currency": "Argentine Peso",
        "code": "ARS",
        "symbol": "$"
    },
    {
        "currency": "Armenian Dram",
        "code": "AMD"
    },
    {
        "currency": "Aruban Florin",
        "code": "AWG",
        "symbol": "ƒ"
    },
    {
        "currency": "Australian Dollar",
        "code": "AUD",
        "symbol": "$"
    },
    {
        "currency": "Azerbaijani Manat",
        "code": "AZN",
        "symbol": "₼"
    },
    {
        "currency": "Bahamian Dollar",
        "code": "BSD",
        "symbol": "$"
    },
    {
        "currency": "Bangladeshi Taka",
        "code": "BDT"
    },
    {
        "currency": "Barbadian Dollar",
        "code": "BBD",
        "symbol": "$"
    },
    {
        "currency": "Belize Dollar",
        "code": "BZD",
        "symbol": "BZ$"
    },
    {
        "currency": "Bermudian Dollar",
        "code": "BMD",
        "symbol": "$"
    },
    {
        "currency": "Bolivian Boliviano",
        "code": "BOB",
        "symbol": "$b"
    },
    {
        "currency": "Bosnia & Herzegovina Convertible Mark",
        "code": "BAM",
        "symbol": "KM"
    },
    {
        "currency": "Botswana Pula",
        "code": "BWP",
        "symbol": "P"
    },
    {
        "currency": "Brazilian Real",
        "code": "BRL",
        "symbol": "R$"
    },
    {
        "currency": "British Pound",
        "code": "GBP",
        "symbol": "£"
    },
    {
        "currency": "Brunei Dollar",
        "code": "BND",
        "symbol": "$"
    },
    {
        "currency": "Bulgarian Lev",
        "code": "BGN",
        "symbol": "лв"
    },
    {
        "currency": "Burundian Franc",
        "code": "BIF"
    },
    {
        "currency": "Cambodian Riel",
        "code": "KHR",
        "symbol": "៛"
    },
    {
        "currency": "Canadian Dollar",
        "code": "CAD",
        "symbol": "$"
    },
    {
        "currency": "Cape Verdean Escudo",
        "code": "CVE"
    },
    {
        "currency": "Cayman Islands Dollar",
        "code": "KYD",
        "symbol": "$"
    },
    {
        "currency": "Central African Cfa Franc",
        "code": "XAF"
    },
    {
        "currency": "Cfp Franc",
        "code": "XPF"
    },
    {
        "currency": "Chilean Peso",
        "code": "CLP",
        "symbol": "$"
    },
    {
        "currency": "Chinese Renminbi Yuan",
        "code": "CNY",
        "symbol": "¥"
    },
    {
        "currency": "Colombian Peso",
        "code": "COP",
        "symbol": "$"
    },
    {
        "currency": "Comorian Franc",
        "code": "KMF"
    },
    {
        "currency": "Congolese Franc",
        "code": "CDF"
    },
    {
        "currency": "Costa Rican Colón",
        "code": "CRC",
        "symbol": "₡"
    },
    {
        "currency": "Croatian Kuna",
        "code": "HRK",
        "symbol": "kn"
    },
    {
        "currency": "Czech Koruna",
        "code": "CZK",
        "symbol": "Kč"
    },
    {
        "currency": "Danish Krone",
        "code": "DKK",
        "symbol": "kr"
    },
    {
        "currency": "Djiboutian Franc",
        "code": "DJF"
    },
    {
        "currency": "Dominican Peso",
        "code": "DOP",
        "symbol": "RD$"
    },
    {
        "currency": "East Caribbean Dollar",
        "code": "XCD",
        "symbol": "$"
    },
    {
        "currency": "Egyptian Pound",
        "code": "EGP",
        "symbol": "£"
    },
    {
        "currency": "Ethiopian Birr",
        "code": "ETB"
    },
    {
        "currency": "Euro",
        "code": "EUR",
        "symbol": "€"
    },
    {
        "currency": "Falkland Islands Pound",
        "code": "FKP",
        "symbol": "£"
    },
    {
        "currency": "Fijian Dollar",
        "code": "FJD",
        "symbol": "$"
    },
    {
        "currency": "Gambian Dalasi",
        "code": "GMD"
    },
    {
        "currency": "Georgian Lari",
        "code": "GEL"
    },
    {
        "currency": "Gibraltar Pound",
        "code": "GIP",
        "symbol": "£"
    },
    {
        "currency": "Guatemalan Quetzal",
        "code": "GTQ",
        "symbol": "Q"
    },
    {
        "currency": "Guinean Franc",
        "code": "GNF"
    },
    {
        "currency": "Guyanese Dollar",
        "code": "GYD",
        "symbol": "$"
    },
    {
        "currency": "Haitian Gourde",
        "code": "HTG"
    },
    {
        "currency": "Honduran Lempira",
        "code": "HNL",
        "symbol": "L"
    },
    {
        "currency": "Hong Kong Dollar",
        "code": "HKD",
        "symbol": "$"
    },
    {
        "currency": "Hungarian Forint",
        "code": "HUF",
        "symbol": "Ft"
    },
    {
        "currency": "Icelandic Króna",
        "code": "ISK",
        "symbol": "kr"
    },
    {
        "currency": "Indian Rupee",
        "code": "INR"
    },
    {
        "currency": "Indonesian Rupiah",
        "code": "IDR",
        "symbol": "Rp"
    },
    {
        "currency": "Israeli New Sheqel",
        "code": "ILS",
        "symbol": "₪"
    },
    {
        "currency": "Jamaican Dollar",
        "code": "JMD",
        "symbol": "J$"
    },
    {
        "currency": "Japanese Yen",
        "code": "JPY",
        "symbol": "¥"
    },
    {
        "currency": "Kazakhstani Tenge",
        "code": "KZT",
        "symbol": "лв"
    },
    {
        "currency": "Kenyan Shilling",
        "code": "KES"
    },
    {
        "currency": "Kyrgyzstani Som",
        "code": "KGS",
        "symbol": "лв"
    },
    {
        "currency": "Lao Kip",
        "code": "LAK",
        "symbol": "₭"
    },
    {
        "currency": "Lebanese Pound",
        "code": "LBP",
        "symbol": "£"
    },
    {
        "currency": "Lesotho Loti",
        "code": "LSL"
    },
    {
        "currency": "Liberian Dollar",
        "code": "LRD",
        "symbol": "$"
    },
    {
        "currency": "Macanese Pataca",
        "code": "MOP"
    },
    {
        "currency": "Macedonian Denar",
        "code": "MKD",
        "symbol": "ден"
    },
    {
        "currency": "Malagasy Ariary",
        "code": "MGA"
    },
    {
        "currency": "Malawian Kwacha",
        "code": "MWK"
    },
    {
        "currency": "Malaysian Ringgit",
        "code": "MYR",
        "symbol": "RM"
    },
    {
        "currency": "Maldivian Rufiyaa",
        "code": "MVR"
    },
    {
        "currency": "Mauritanian Ouguiya",
        "code": "MRO"
    },
    {
        "currency": "Mauritian Rupee",
        "code": "MUR",
        "symbol": "₨"
    },
    {
        "currency": "Mexican Peso",
        "code": "MXN",
        "symbol": "$"
    },
    {
        "currency": "Moldovan Leu",
        "code": "MDL"
    },
    {
        "currency": "Mongolian Tögrög",
        "code": "MNT",
        "symbol": "₮"
    },
    {
        "currency": "Moroccan Dirham",
        "code": "MAD"
    },
    {
        "currency": "Mozambican Metical",
        "code": "MZN",
        "symbol": "MT"
    },
    {
        "currency": "Myanmar Kyat",
        "code": "MMK"
    },
    {
        "currency": "Namibian Dollar",
        "code": "NAD",
        "symbol": "$"
    },
    {
        "currency": "Nepalese Rupee",
        "code": "NPR",
        "symbol": "₨"
    },
    {
        "currency": "Netherlands Antillean Gulden",
        "code": "ANG",
        "symbol": "ƒ"
    },
    {
        "currency": "New Taiwan Dollar",
        "code": "TWD",
        "symbol": "NT$"
    },
    {
        "currency": "New Zealand Dollar",
        "code": "NZD",
        "symbol": "$"
    },
    {
        "currency": "Nicaraguan Córdoba",
        "code": "NIO",
        "symbol": "C$"
    },
    {
        "currency": "Nigerian Naira",
        "code": "NGN",
        "symbol": "₦"
    },
    {
        "currency": "Norwegian Krone",
        "code": "NOK",
        "symbol": "kr"
    },
    {
        "currency": "Pakistani Rupee",
        "code": "PKR",
        "symbol": "₨"
    },
    {
        "currency": "Panamanian Balboa",
        "code": "PAB",
        "symbol": "B/."
    },
    {
        "currency": "Papua New Guinean Kina",
        "code": "PGK"
    },
    {
        "currency": "Paraguayan Guaraní",
        "code": "PYG",
        "symbol": "Gs"
    },
    {
        "currency": "Peruvian Nuevo Sol",
        "code": "PEN",
        "symbol": "S/."
    },
    {
        "currency": "Philippine Peso",
        "code": "PHP",
        "symbol": "₱"
    },
    {
        "currency": "Polish Złoty",
        "code": "PLN",
        "symbol": "zł"
    },
    {
        "currency": "Qatari Riyal",
        "code": "QAR",
        "symbol": "﷼"
    },
    {
        "currency": "Romanian Leu",
        "code": "RON",
        "symbol": "lei"
    },
    {
        "currency": "Russian Ruble",
        "code": "RUB",
        "symbol": "₽"
    },
    {
        "currency": "Rwandan Franc",
        "code": "RWF"
    },
    {
        "currency": "São Tomé and Príncipe Dobra",
        "code": "STD"
    },
    {
        "currency": "Saint Helenian Pound",
        "code": "SHP",
        "symbol": "£"
    },
    {
        "currency": "Salvadoran Colón",
        "code": "SVC",
        "symbol": "$"
    },
    {
        "currency": "Samoan Tala",
        "code": "WST"
    },
    {
        "currency": "Saudi Riyal",
        "code": "SAR",
        "symbol": "﷼"
    },
    {
        "currency": "Serbian Dinar",
        "code": "RSD",
        "symbol": "Дин."
    },
    {
        "currency": "Seychellois Rupee",
        "code": "SCR",
        "symbol": "₨"
    },
    {
        "currency": "Sierra Leonean Leone",
        "code": "SLL"
    },
    {
        "currency": "Singapore Dollar",
        "code": "SGD",
        "symbol": "$"
    },
    {
        "currency": "Solomon Islands Dollar",
        "code": "SBD",
        "symbol": "$"
    },
    {
        "currency": "Somali Shilling",
        "code": "SOS",
        "symbol": "S"
    },
    {
        "currency": "South African Rand",
        "code": "ZAR",
        "symbol": "R"
    },
    {
        "currency": "South Korean Won",
        "code": "KRW",
        "symbol": "₩"
    },
    {
        "currency": "Sri Lankan Rupee",
        "code": "LKR",
        "symbol": "₨"
    },
    {
        "currency": "Surinamese Dollar",
        "code": "SRD",
        "symbol": "$"
    },
    {
        "currency": "Swazi Lilangeni",
        "code": "SZL"
    },
    {
        "currency": "Swedish Krona",
        "code": "SEK",
        "symbol": "kr"
    },
    {
        "currency": "Swiss Franc",
        "code": "CHF",
        "symbol": "CHF"
    },
    {
        "currency": "Tajikistani Somoni",
        "code": "TJS"
    },
    {
        "currency": "Tanzanian Shilling",
        "code": "TZS"
    },
    {
        "currency": "Thai Baht",
        "code": "THB",
        "symbol": "฿"
    },
    {
        "currency": "Tongan Paʻanga",
        "code": "TOP"
    },
    {
        "currency": "Trinidad and Tobago Dollar",
        "code": "TTD",
        "symbol": "TT$"
    },
    {
        "currency": "Turkish Lira",
        "code": "TRY"
    },
    {
        "currency": "Ugandan Shilling",
        "code": "UGX"
    },
    {
        "currency": "Ukrainian Hryvnia",
        "code": "UAH",
        "symbol": "₴"
    },
    {
        "currency": "United Arab Emirates Dirham",
        "code": "AED"
    },
    {
        "currency": "United States Dollar",
        "code": "USD",
        "symbol": "$"
    },
    {
        "currency": "Uruguayan Peso",
        "code": "UYU",
        "symbol": "$U"
    },
    {
        "currency": "Uzbekistani Som",
        "code": "UZS",
        "symbol": "лв"
    },
    {
        "currency": "Vanuatu Vatu",
        "code": "VUV"
    },
    {
        "currency": "Vietnamese Đồng",
        "code": "VND",
        "symbol": "₫"
    },
    {
        "currency": "West African Cfa Franc",
        "code": "XOF"
    },
    {
        "currency": "Yemeni Rial",
        "code": "YER",
        "symbol": "﷼"
    },
    {
        "currency": "Zambian Kwacha",
        "code": "ZMW"
    }
]
let gen_currency = null;
async function currency_code_req(){
    let code = await fetch("/currency");
    code = await code.json();
    code = code.response;
    
    if(!code.symbol){
        code.symbol = code.code;
    }

    return code;
};
(async()=>{
    gen_currency = await currency_code_req();
})();

function currency_code_founder(code){
    code = code.toUpperCase();
    for(const elm of currency_code){
        if(elm.code == code){
            return elm;
        }
    }
}

top_nav_button.onclick = ()=>{
    side_nav.style.left = "0px";
};
page.onclick = ()=>{
    side_nav.style.left = "-220px";
}
side_nav.onclick = ()=>{
    side_nav.style.left = "-220px";
};

//button link
const home = document.getElementById("home");
const shop = document.getElementById("shop");
const product = document.getElementById("product");
const orders = document.getElementById("orders");
const group = document.getElementById("group");
const web_page = document.getElementById("web_page");
const payment = document.getElementById("payments");
const info_set = document.getElementById("settings");



function ap_page(child){
    page.innerHTML = " ";
    page.appendChild(child);
}

//home page
const home_page = document.getElementById("home_pg");
home.onclick = async()=>{
    const home_page_clone = home_page.cloneNode(true);
    home_page_clone.style.display = "block";

    const data = await fetch("/admin/dashboard_data");
    const data_json = await data.json();
    const data_array = [data_json.orders.all, data_json.orders.today, data_json.orders.month, data_json.orders.year];

    const dashboard_data = home_page_clone.getElementsByClassName("id_home_data");

    for(let i = 0; i < data_array.length; i++){
        let data_value = data_array[i];

        if(data_array[i] > 1000){
            data_value = data_array[i]/1000 + "k";
        }
        dashboard_data[i].innerHTML = data_value;
    }

    ap_page(home_page_clone);
};
home.onclick();

//product page
const product_page = document.getElementById("product_pg");
const new_product_page = document.getElementById("new_product_pg");
const update_page = document.getElementById("update_product_pg");
product.onclick = ()=>{
    const product_page_clone = product_page.cloneNode(true);
    product_page_clone.style.display = "block";

    const product_page_list = product_page_clone.getElementsByTagName("section")[0];
    const product_page_list_row = product_page_list.getElementsByTagName("div")[0];
    const product_page_list_row_currency = product_page_list_row.querySelector("#currency_label");
    product_page_list_row_currency.innerText = gen_currency.symbol;

    fetch("/admin/admin_show_product").then((r)=>{
        r.json().then((res)=>{
            if(res.response != "error"){
                
                for(let i = 0; i < res.response.length; i++){
                    const prod = res.response[i];

                    const clone = product_page_list_row.cloneNode(true);
                    clone.className = "products_pg_grid"

                    const image = clone.getElementsByTagName("img")[0];
                    if(prod.image != null){
                        image.src = "/product/"+prod.image;
                    };

                    const labels = clone.getElementsByTagName("label");
                    const id_label = labels[0];
                    const name_label = labels[1];

                    id_label.textContent = prod.id;
                    name_label.textContent = prod.name;

                    const input = clone.getElementsByTagName("input");
                    const price = input[0];
                    const quantity = input[1];

                    if(prod.option == true){
                        const quantity_parent = quantity.parentNode;
                        
                        const p = document.createElement("p");
                        p.innerText = prod.quantity;

                        quantity_parent.appendChild(p);

                        quantity.remove();
                    }else{
                        quantity.value = prod.quantity;
                    }

                    price.value = prod.price/100;

                    //update price
                    price.onchange = ()=>{
                        const val = parseFloat(price.value);
                        price.value = val;
                        prod.price = val.toFixed(2) * 100;

                        const req = {
                            id: prod.id,
                            option: false,
                            mod:{
                                column: "price",
                                value: prod.price
                            }
                        }

                        fetch("/admin/admin_update_product",{
                            method: "POST",
                            headers : {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(req)
                        });
                    }

                    //update qantity
                    quantity.onchange = ()=>{

                        const val = parseInt(quantity.value);
                        quantity.value = val;
                        prod.quantity = val;

                        const req = {
                            id: prod.id,
                            option: false,
                            mod:{
                                column: "quantity",
                                value: prod.quantity
                            }
                        }

                        fetch("/admin/admin_update_product",{
                            method: "POST",
                            headers : {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(req)
                        });
                    }

                    //update product page
                    const a = clone.getElementsByTagName("a")[0];
                    a.onclick = ()=>{
                        const update_page_clone = update_page.cloneNode(true);
                        update_page_clone.style.display = "block";
                        
                        //currency 
                        let currency_labels = update_page_clone.querySelectorAll("#currency_label");
                        currency_labels = [...currency_labels];

                        currency_labels.map(x=>{
                            x.innerText = gen_currency.symbol;
                        });


                        //page
                        ap_page(update_page_clone);

                        const id_prd = prod.id;

                        fetch("/admin/admin_get_product",{
                            method: 'POST',
                            headers : {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({id:id_prd})
                        }).then((r)=>{
                            r.json().then((r)=>{

                                
                                const id = r.response.row_data.id;
                                const input = update_page_clone.getElementsByTagName("input");
                                const img_cnt = update_page_clone.getElementsByClassName("id_update_product_pg_img_cnt")[0];
                                input[0].value =  r.response.row_data.name;
                                input[3].value =  r.response.row_data.price/100;
                                input[4].value =  r.response.row_data.quantity;


                                const a = update_page_clone.getElementsByTagName("a");
                                const delete_prod = a[0];
                                const remove_fimg = a[1];

                                const description = update_page_clone.getElementsByTagName("textarea")[0];
                                description.value = r.response.row_data.description;

                                const first_img = update_page_clone.getElementsByTagName("img")[0];
                                first_img.src = "/product/"+ r.response.row_data.image ;

                                const id_label = update_page_clone.getElementsByClassName("id-update_product_pg_id")[0];
                                id_label.textContent = id;

                                //name
                                input[0].onchange = ()=>{
                                    const request = {
                                        id: id,
                                        option: false,
                                        mod:{
                                            column: "name",
                                            value: input[0].value
                                        }
                                    }

                                    fetch("/admin/admin_update_product",{
                                        method: 'POST',
                                            headers : {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(request)
                                    }).then((r)=>{
                                        r.json().then((r)=>{
                                            
                                        })
                                    })
                                };

                                //first image
                                input[1].onchange = ()=>{
                                    const first_img_file = input[1].files[0];

                                    const first_img_data = new FormData();
                                    first_img_data.append('id',id);
                                    first_img_data.append('is_first',true);
                                    first_img_data.append('img',first_img_file);

                                    fetch("/admin/admin_upload_product_img",{
                                        method: "POST",
                                        body:first_img_data
                
                                    }).then((r1)=>{
                                        r1.json().then((res1)=>{
                                            
                                            if(res1.response == "success"){
                                                const src = "/product/"+ res1.img ;
                                                
                                                first_img.src = "/product/"+ res1.img;
                                                
                                                imgList(src,res1.img);
                                            }
                                        })
                                    });
                                };

                                //delete first image
                                remove_fimg.onclick = ()=>{
                                    first_img.src = "";

                                    const request = {
                                        id:id,
                                        img_id_key: null
                                    };

                                    fetch("/admin/admin_update_product_img",{
                                        method: 'POST',
                                        headers : {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(request)
                                    }).then((r)=>{
                                        r.json().then((r)=>{
                                            
                                        })
                                    });
                                }

                                //images
                                const image_list = r.response.images;
                                function imgList(src){
                                    
                                    let img_name = src.split("/");
                                    img_name = img_name[img_name.length - 1];

                                    const img = document.createElement("img");
                                    img.src = src;

                                    const a = document.createElement("a");
                                    a.innerText = "x";

                                    const div = document.createElement("div");

                                    div.appendChild(a);
                                    div.appendChild(img);

                                    img_cnt.appendChild(div);

                                    a.onclick = ()=>{

                                        const request = {
                                            id:id,
                                            img_id_key: img_name.split(".")[0],
                                        }


                                        fetch("admin_delete_product_img",{
                                            method: 'POST',
                                            headers : {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(request)
                                        }).then((r)=>{
                                            r.json().then((r)=>{
                                                if(r.response == "success"){
                                                    div.remove();
                                                    const path = first_img.src.split("/");
                                                    if(img_name == path[path.length-1]){
                                                        first_img.src = "";

                                                        const request = {
                                                            id:id,
                                                            img: null
                                                        };

                                                        fetch("/admin/admin_update_product_img",{
                                                            method: 'POST',
                                                            headers : {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify(request)
                                                        }).then((r)=>{
                                                            r.json().then((r)=>{
                                                                
                                                            })
                                                        });
                                                    }
                                                }
                                            });
                                        });
                                    }
                                };
                                for(let i = 0; i < image_list.length; i++){
                                    const src = "/product/"+ image_list[i].img_id_key + "." + image_list[i].type;
                                    imgList(src);
                                };
                                input[2].onchange = ()=>{
                                    const first_img_file = input[2].files[0];

                                    const first_img_data = new FormData();
                                    first_img_data.append('id',id);
                                    first_img_data.append('is_first',false);
                                    first_img_data.append('img',first_img_file);

                                    fetch("/admin/admin_upload_product_img",{
                                        method: "POST",
                                        body:first_img_data
                
                                    }).then((r1)=>{
                                        r1.json().then((res1)=>{
                                            
                                            if(res1.response == "success"){
                                                
                                                const src = "/product/"+ res1.img ;
                                                imgList(src,res1.img);
                                            }
                                        })
                                    });
                                }
                                
                                //price
                                input[3].onchange = ()=>{
                                    
                                    let val = parseFloat(input[3].value);
                                    input[3].value = val;
                                    val = val.toFixed(2) * 100;

                                    const req = {
                                        id: id,
                                        option: false,
                                        mod:{
                                            column: "price",
                                            value: val
                                        }
                                    }

                                    fetch("/admin/admin_update_product",{
                                        method: "POST",
                                        headers : {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(req)
                                    });
                                }

                                //quantity
                                input[4].onchange = ()=>{
                                    const val = parseInt(input[4].value);
                                    input[4].value = val;

                                    const req = {
                                        id: id,
                                        option: false,
                                        mod:{
                                            column: "quantity",
                                            value: val
                                        }
                                    }

                                    fetch("/admin/admin_update_product",{
                                        method: "POST",
                                        headers : {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(req)
                                    });
                                };

                                //description
                                description.onchange = ()=>{
                                    const val = description.value;
                                    const req = {
                                        id: id,
                                        option: false,
                                        mod:{
                                            column: "description",
                                            value: val
                                        }
                                    }

                                    fetch("/admin/admin_update_product",{
                                        method: "POST",
                                        headers : {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(req)
                                    });
                                };

                                //options
                                const sections = update_page_clone.getElementsByTagName("section");
                                const cont = sections[0].getElementsByTagName("div")[0];
                                const template = sections[1].getElementsByTagName("div")[0];
                                
                                if(r.response.row_data.option == true){

                                    const quantity_input_arr = [];

                                    const parent = input[4].parentNode;
                                    input[4].remove();

                                    const input_p = document.createElement("p");
                                    input_p.innerText = r.response.row_data.quantity;

                                    parent.appendChild(input_p);
                                    

                                    function update_quantity(){

                                        const sum = quantity_input_arr.reduce((psum,x)=> psum + parseInt(x.value) , 0)
                                        
                                        if(input_p){
                                            input_p.innerText = sum;
                                        }

                                    }


                                    const option_table = r.response.options_table
                                    for(let i = 0; i < option_table.length; i++){

                                        const template_clone = template.cloneNode(true);

                                        const option1 = option_table[i].option1;
                                        const option2 = option_table[i].option2;
                                        const option3 = option_table[i].option3;

                                        const price = option_table[i].price;
                                        
                                        const quantity = option_table[i].quantity;

                                        const value = [option1,option2,option3];
                                        let label_val = "";
                                        for(let c = 0; c < 3; c++){
                                            if(value[c] != "null"){
                                                label_val = label_val + value[c]+"/";
                                            }
                                        }

                                        const p = template_clone.getElementsByTagName("p")[0];
                                        p.textContent = label_val;

                                        const input = template_clone.getElementsByTagName("input");
                                        
                                        const price_el = input[1];
                                        const quantity_el = input[2];
                                        quantity_input_arr.push(quantity_el);

                                        price_el.value = price/100;
                                        quantity_el.value = quantity;


                                        //option price
                                        price_el.onchange = ()=>{
                                            let val = parseFloat(price_el.value);
                                            price_el.value = val;
                                            val = val.toFixed(2) * 100;

                                            const req = {
                                                id: id,
                                                option: true,
                                                mod:{
                                                    position:{
                                                        option1: option1,
                                                        option2: option2,
                                                        option3: option3
                                                    },
                                                    column: "price",
                                                    value: val
                                                }
                                            }

                                            fetch("/admin/admin_update_product",{
                                                method: "POST",
                                                headers : {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(req)
                                            }).then((r)=>{
                                                r.json().then((r)=>{
                                                    
                                                })
                                            });
                                        }

                                        //quantity
                                        quantity_el.onchange = ()=>{
                                            let val = parseInt(quantity_el.value);
                                            quantity_el.value = val;

                                            update_quantity();


                                            const req = {
                                                id: id,
                                                option: true,
                                                mod:{
                                                    position:{
                                                        option1: option1,
                                                        option2: option2,
                                                        option3: option3
                                                    },
                                                    column: "quantity",
                                                    value: val
                                                }
                                            }

                                            fetch("/admin/admin_update_product",{
                                                method: "POST",
                                                headers : {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(req)
                                            });
                                        }

                                        cont.appendChild(template_clone);
                                    }
                                    

                                }

                                //delete product
                                delete_prod.onclick = ()=>{
                                    
                                    const req = {
                                        id:id
                                    };

                                    fetch("/admin/admin_delete_product",{
                                        method: "POST",
                                        headers : {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(req)
                                    }).then((r)=>{
                                        r.json().then((r)=>{
                                            if(r.response == "success"){
                                                //return to product page
                                                product.onclick(); 
                                            }else{
                                                
                                            }
                                        });
                                    });
                                }
                            });
                        })


                    }

                    product_page_list.appendChild(clone);
                }
            }
        })
    });
    

    //new product
    const new_product_btn = product_page_clone.getElementsByClassName("id-new_product")[0];
    new_product_btn.onclick = ()=>{

        const new_product_page_clone = new_product_page.cloneNode(true);
        new_product_page_clone.style.display = "block";

        //currency 
        let currency_labels = new_product_page_clone.querySelectorAll("#currency_label");
        currency_labels = [...currency_labels];

        currency_labels.map(x=>{
            x.innerText = gen_currency.symbol;
        });

        //data
        const data = {
            id: null,
            name: null,
            option: false,
            option1: null, /*{
                title: null,
                list:[],
            }, */
            option2: null,
            option3: null,
            description: null,
            quantity: 0,
            price: 0.00,
            option_table:[]
        }
        let first_img = null;
        const images = [];

        const input = new_product_page_clone.getElementsByTagName("input");
        const textarea = new_product_page_clone.getElementsByTagName("textarea")[0];
        let end_button = new_product_page_clone.getElementsByTagName("a");
        end_button = end_button[end_button.length -1 ];

        //id
        input[0].onchange = ()=>{
            data.id = input[0].value;
        }

        //name
        input[1].onchange = ()=>{
            data.name = input[1].value;
        }

        //first image
        input[2].onchange = ()=>{
            first_img = input[2].files[0];

            const reader = new FileReader();
            reader.onload = ()=>{
                const img = new_product_page_clone.getElementsByClassName("id-new_product_pg_img")[0];
                img.src = reader.result;
            }
            reader.readAsDataURL(first_img);
        }
        
        //images
        input[3].onchange = ()=>{
            images.push(input[3].files[0]);

            const reader = new FileReader();
            reader.onload = ()=>{
                const img = document.createElement("img");
                img.className = "new_product_pg_first_image_img";
                img.src = reader.result;
                
                const cnt = new_product_page_clone.getElementsByClassName("id-new_product_pg_imgs")[0];

                cnt.appendChild(img)
            }
            reader.readAsDataURL(input[3].files[0]);
        }

        //price
        input[4].onchange = ()=>{
            const val = parseFloat(input[4].value);
            data.price = val.toFixed(2);
            input[4].value = data.price;
        }
        
        //quantity
        input[5].onchange = ()=>{
            data.quantity = parseInt(input[5].value);
            input[5].value = data.quantity;
        }


        //option
        //checkbox
        const opt_section = new_product_page_clone.getElementsByTagName("section");
        const option_page = new_product_page_clone.getElementsByClassName("id-new_pg_option_page hide")[0];
        const option_div_sec0 = opt_section[1].getElementsByTagName("div")[0];
        const options_values = [null, null , null];
        let id = 0;


        //option funciton
        function data_option_postition(){
            for(let i = 0; i < 2; i++){
                if(options_values[i] == null){
                    options_values[i] = options_values[i+1];
                    options_values[i+1] = null;
                }
            }

            return options_values.indexOf(null);
        }

        function remove_option(obj_id){
            for(let i = 0; i < 3; i++){
                if(options_values[i] != null && options_values[i].obj_id == obj_id){
                    options_values[i] = null;
                    data_option_postition();
                }
            }
         }

        function create_values(parent,child,price,quantity){
            
            const bld_arr = [];
            for(let i = 0; i < 3 ; i++){
                if(options_values[i] == null){
                    break;
                }else{
                    bld_arr.push( options_values[i].list);
                }
            }

            const result = [];
            
            if(bld_arr.length != 0){
                for(let i = 0; i < bld_arr[0].length; i++){
                
                    if(bld_arr.length > 1){
                        
                        for(let c = 0; c < bld_arr[1].length; c++){
                            
                            if(bld_arr.length == 3){
                                
                                for(let d = 0; d < bld_arr[2].length; d++){
                                    result.push([bld_arr[0][i],bld_arr[1][c],bld_arr[2][d]].join("/"));
                                }
    
                            }else{
                                result.push([bld_arr[0][i],bld_arr[1][c]].join("/"));
                            }
                        }
    
                    }else{
                        result.push(bld_arr[0][i]);
                    }
                }
            }
            
            parent.innerHTML = "";
            data.option_table = null;
            const element = [];
 
            for(let i= 0; i < result.length; i++){
                const all_sc = child.cloneNode(true);
                all_sc.style.display = "block";

                const label = all_sc.getElementsByTagName("p")[0];
                label.textContent = result[i];
                label.setAttribute("val", result[i]);

                const input =  all_sc.getElementsByTagName("input");
                input[1].value = price;
                input[2].value = quantity;

                element.push(all_sc);

                parent.appendChild(all_sc);
            }

            data.option_table = element;
        }

        function optionListElement(val){
            const div = document.createElement("div");
            const label = document.createElement("label");
            const a = document.createElement("a");

            label.textContent = val;

            a.textContent = "x";
            a.className = "delete_button"
        
            div.appendChild(label);
            div.appendChild(a);
            
            return [div,a];
        }

        input[6].onclick = ()=>{
            
            if(input[6].checked){

                option_page.style.display = "block";
                data.option = true;

                const add_option = opt_section[0].getElementsByTagName("a")[0];
                add_option.onclick = ()=>{

                    opt_section[1].style.display = "block";

                    const position = data_option_postition();
                    if(position != -1){
                        id = id+1;

                        let list = input[8].value.split(",");
                        if(list[list.length-1] == "" || list[list.length-1] == " "){
                            list.pop();
                        }

                        //condition
                        let elm_condition = function hasDuplicates() {
                            return (new Set(list)).size !== list.length;
                        }



                        if(elm_condition() != true){
                            const obj = {
                                title: input[7].value,
                                list: list,
                                obj_id: id
                            };
                            options_values[position] = obj;
    
                            input[7].value = "";
                            input[8].value = "";
    
                            //element option tag
                            const opt_list_div = optionListElement(obj.title);
                            option_div_sec0.appendChild(opt_list_div[0]);
    
                            //element list
                            const parent_node = opt_section[2].getElementsByClassName("id-new_product_pg_val_list")[0];
                            create_values(parent_node,opt_section[3],data.price,data.quantity);
    
    
    
                            //delete option
                            opt_list_div[1].onclick = ()=>{
                                opt_list_div[0].remove();
                                remove_option(obj.obj_id);
    
                                create_values(parent_node,opt_section[3],data.price,data.quantity);
                            }
                        }else{
                            alert("option values must be unique");
                        }
                    }
                   

                    
                    opt_section[2].style.display = "block";
                }

                if(data.option_table.length != 0){
                    opt_section[2].style.display = "block";
                }
            }else{
                option_page.style.display = "none";
                data.option = false;
            }
        }

        //description
        textarea.onchange = ()=>{
            data.description = textarea.value;
        }

        end_button.onclick = ()=>{
            
            const list_val =[];

            for(let i = 0; i < data.option_table.length; i++){
            
                const element = data.option_table[i];
                let label = element.getElementsByTagName("p")[0].getAttribute("val");
                label = label.split("/");

                const input = element.getElementsByTagName("input");

                const row = [null,null,null,input[1].value * 100,parseInt(input[2].value)];
                if(label.length <= 3){
                    for(let c = 0; c < label.length;c++){
                        row[c] = label[c];
                    }
                }
                
                list_val.push(row);

            }



            const data2 = {...data};

            const arr = [];
            for(let i = 0; i < options_values.length; i++){
                if(options_values[i] == null){
                    arr.push({title: null});
                }else{
                    arr.push(options_values[i]);
                }
            }

            data2.option1 = arr[0];
            data2.option2 = arr[1];
            data2.option3 = arr[2];
            data2.option_table = list_val;
            data2.price = data2.price*100;

            
            
            
            
            
            fetch("/admin/admin_create_product",{
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data2)
            }).then((r)=>{
                r.json().then((res)=>{
                    
                    
                    if(first_img != null && res.response == "success"){

                        const first_img_data = new FormData();
                        first_img_data.append('id',data2.id);
                        first_img_data.append('is_first',true);
                        first_img_data.append('img',first_img);

                        fetch("/admin/admin_upload_product_img",{
                            method: "POST",
                            body:first_img_data
    
                        }).then((r1)=>{
                            r1.json().then((res1)=>{
                                if(res1.response == "success"){
                                    //return to product page
                                    product.onclick(); 
                                }
                            })
                        });
    
                        for(let i = 0; i < images.length; i++){
                            const formdata = new FormData();
                            formdata.append('id',data2.id);
                            formdata.append('is_first',false);
                            formdata.append('img',images[i]);

                            fetch("/admin/admin_upload_product_img",{
                                method: "POST",
                                body:formdata
                            });
                        }
                        
                    }else if(res.response != "success"){
                        alert(res.response);
                    }else{

                        for(let i = 0; i < images.length; i++){
                            const formdata = new FormData();
                            formdata.append('id',data2.id);
                            formdata.append('is_first',false);
                            formdata.append('img',images[i]);

                            fetch("/admin/admin_upload_product_img",{
                                method: "POST",
                                body:formdata
                            });
                        }
                        //return to product page
                        product.onclick(); 
                    }
                })
            }).catch(()=>{});
        }

        ap_page(new_product_page_clone)
    }

    ap_page(product_page_clone);
};

//group page
const group_page = document.getElementById("group_pg");
const new_group = document.getElementById("new_group_pg");
const update_page_group = document.getElementById("update_group_pg");
group.onclick = ()=>{
    const clone_group_page = group_page.cloneNode(true);
    clone_group_page.style.display = "block";

    //get all the products
    let product_list = [];
    fetch("/admin/admin_show_product").then((r)=>{
        r.json().then((r)=>{
            product_list = r.response;
        });
    });

    // get and shoe all the groups
    /* inside update group page */
    const tmp_section = clone_group_page.getElementsByTagName("section")[0].getElementsByTagName("div")[0];
    const list_cnt = clone_group_page.getElementsByClassName("id-group_pg_content_list")[0];
    fetch("/admin/admin_show_group").then((r)=>{
        r.json().then((r)=>{

            for(let i = 0; i < r.response.length; i++){
                const clone = tmp_section.cloneNode(true);
                clone.display = "block";

                //currency
                

                const name = r.response[i].name;
                
                const title = clone.getElementsByTagName("p")[0];
                title.innerHTML = name;

                //update_group page
                const a = clone.getElementsByTagName("a")[0];                
                a.onclick = ()=>{
                    const clone_group_page = update_page_group.cloneNode(true);
                    const clone_body = clone_group_page.getElementsByClassName("id_new_group_pg_content")[0];
                    clone_group_page.style.display = "block";

                    const section = clone_group_page.getElementsByTagName("section");
                    const a_group = clone_group_page.getElementsByClassName("id_new_group_pg_add_group")[0];
                    const a_prd = clone_group_page.getElementsByClassName("id_new_group_pg_a_prd")[0];
                    const cnt = clone_group_page.getElementsByClassName("id_new_group_pg_row_grid_cnt")[0];

                    //page title 
                    const title = clone_group_page.getElementsByClassName("page_title")[0];
                    title.innerText = name;


                    //group data
                    const group_list = [];

                    const main_checkbox = clone_group_page.getElementsByTagName("input")[0];

                    fetch("/admin/admin_group_list",{
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({name: name})
                    }).then((r)=>{
                        r.json().then((res)=>{
                            main_checkbox.checked = res.response.main;
                            for(let i = 0; i < res.response.group_list.length; i++){
                                group_list.push(res.response.group_list[i].id);
                            };
                            prdList_update(section,group_list,cnt);
                        })
                    });

                    // delete group
                    const delete_button = clone_group_page.getElementsByClassName("id-delete_group")[0];
                    delete_button.onclick = ()=>{
                        fetch("/admin/admin_delete_group",{
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({name: name})
                        }).then((r)=>{
                            r.json().then((res)=>{
                                if(res.response == "success"){
                                    group.onclick();
                                }else{
                                    alert("delete group error");
                                }
                            })
                        }).catch(()=>{
                            alert("delete group error");
                        });
                    };


                    //add product in the group
                    const a_prd_page = clone_group_page.getElementsByClassName("id_new_group_pg_list_page")[0];
                    a_prd.onclick = ()=>{

                        const old_window = document.getElementsByClassName("id_new_group_pg_list_page");
                        for(let i = 0; i < old_window.length; i++){
                            if(!old_window[i].classList.contains("hide_imp")){
                                old_window[i].remove();
                            }
                        }


                        const clone_a_prd_page = a_prd_page.cloneNode(true);
                        const a_prd_page_cnt = clone_a_prd_page.getElementsByTagName("div")[0];
                        clone_a_prd_page.classList.remove("hide_imp");

                        
                        const list = [];
                        
                        const list_without_group = product_list.filter((prd)=>{
                            return group_list.indexOf(prd.id) == -1;
                        });
                        
                        for(let i = 0; i < list_without_group.length; i++){
                            const prd = list_without_group[i];
                            const clone = section[1].cloneNode(true);
                            clone.style.display = "block";

                            const p = clone.getElementsByTagName("p");

                            const id = p[0];
                            id.textContent = prd.id;

                            const name = p[1];
                            name.textContent = prd.name;

                            const checkbox = clone.getElementsByTagName("input")[0];
                            checkbox.onchange = ()=>{
                                

                                if(checkbox.checked == true){
                                    list.push(prd.id);
                                }else{
                                    const indx = list.indexOf(prd.id);
                                    if(indx != -1){
                                        list.splice(indx,indx+1);
                                    }
                                };
                                
                            };
                            
                            a_prd_page_cnt.appendChild(clone);
                        };

                        //update displayed group list html element

                        const a = clone_a_prd_page.getElementsByTagName("a")[0];
                        a.onclick = ()=>{
                            
                            clone_a_prd_page.remove();
                            for(let i = 0; i < list.length; i++){
                                

                                if(group_list.indexOf(list[i]) == -1){ 
                                    group_list.push(list[i]);
                                }

                            };
                            prdList_update(section,group_list,cnt);

                        };

                        clone_body.appendChild(clone_a_prd_page);
                    };

                    //update group
                    a_group.onclick = ()=>{
                        const data = {
                            name: name,
                            main: main_checkbox.checked,
                            values: group_list
                        };
                        fetch("/admin/admin_update_group",{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        }).then((r)=>{

                            r.json().then((r)=>{
                                if(r.response == "success"){
                                    group.onclick();
                                }else{
                                    alert("update group error");
                                }
                            });
                        }).catch((e)=>{
                            alert("update group error");
                        });
                    }
                    ap_page(clone_group_page);

                };

                list_cnt.appendChild(clone);
            }
        })
    });


    /* create new products groups */
    const new_group_btn = clone_group_page.getElementsByClassName("id_create_group")[0];
    new_group_btn.onclick = ()=>{
        const clone_group_page = new_group.cloneNode(true);
        const clone_body = clone_group_page.getElementsByClassName("id_new_group_pg_content")[0];
        clone_group_page.style.display = "block";

        //group data
        let group_name = "";
        const group_list = [];

        const input_name = clone_group_page.getElementsByTagName("input")[0];
        input_name.onchange = ()=>{
            group_name = input_name.value;
        };

        const section = clone_group_page.getElementsByTagName("section");
        const a_group = clone_group_page.getElementsByClassName("id_new_group_pg_add_group")[0];
        const a_prd = clone_group_page.getElementsByClassName("id_new_group_pg_a_prd")[0];


        //add product in the new group
        const a_prd_page = clone_group_page.getElementsByClassName("id_new_group_pg_list_page")[0];
        a_prd.onclick = ()=>{

            const old_window = document.getElementsByClassName("id_new_group_pg_list_page");
            for(let i = 0; i < old_window.length; i++){
                if(!old_window[i].classList.contains("hide_imp")){
                    old_window[i].remove();
                }
            }


            const clone_a_prd_page = a_prd_page.cloneNode(true);
            const a_prd_page_cnt = clone_a_prd_page.getElementsByTagName("div")[0];
            clone_a_prd_page.classList.remove("hide_imp");
            
            const list = [];
            
            const list_without_group = product_list.filter((prd)=>{
                return group_list.indexOf(prd.id) == -1;
            });
            
            for(let i = 0; i < list_without_group.length; i++){
                const prd = list_without_group[i];
                const clone = section[1].cloneNode(true);
                clone.style.display = "block";

                const p = clone.getElementsByTagName("p");

                const id = p[0];
                id.textContent = prd.id;

                const name = p[1];
                name.textContent = prd.name;

                const checkbox = clone.getElementsByTagName("input")[0];
                checkbox.onchange = ()=>{
                    

                    if(checkbox.checked == true){
                        list.push(prd.id);
                    }else{
                        const indx = list.indexOf(prd.id);
                        if(indx != -1){
                            list.splice(indx,indx+1);
                        }
                    };
                    
                };
                  
                a_prd_page_cnt.appendChild(clone);
            };

            //update displayed group list html element
            const cnt = clone_group_page.getElementsByClassName("id_new_group_pg_row_grid_cnt")[0];

            const a = clone_a_prd_page.getElementsByTagName("a")[0];
            a.onclick = ()=>{
                
                clone_a_prd_page.remove();
                for(let i = 0; i < list.length; i++){
                    

                    if(group_list.indexOf(list[i]) == -1){ 
                        group_list.push(list[i]);
                    }

                };
                prdList_update(section,group_list,cnt);

            };

            clone_body.appendChild(clone_a_prd_page);
        };

        //add group
        const main_checkbox = clone_group_page.getElementsByTagName("input")[1];
        a_group.onclick = ()=>{
            const data = {
                name: group_name,
                main: main_checkbox.checked,
                values: group_list
            };
            
            fetch("/admin/admin_create_group",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((r)=>{
                r.json().then((r)=>{
                    
                    if(r.response == "success"){
                        group.onclick();
                    }else{
                        alert("update group error");
                    }
                });
            });
        }
        ap_page(clone_group_page);
    };

    /* // utility functions */
    //find name of product
    function find_name(id){
        let res = -1;
        for(let i = 0; i < product_list.length;i++){
            if(product_list[i].id == id){
                res = product_list[i].name;
                break;
            };
        };
        return res;
    }
    //update displayed group list
    function prdList_update(section,group_list,cnt,server_update = false){
        cnt.innerHTML = "";
        

        for(let i = 0; i < group_list.length; i++){
            const clone = section[0].getElementsByTagName("div")[0].cloneNode(true);
            
            const id = group_list[i];
            const name = find_name(id);

            const p = clone.getElementsByTagName("p");
            p[0].textContent = id;
            p[1].textContent = name;

            const a = clone.getElementsByTagName("a")[0];
            a.onclick = ()=>{
                clone.remove();
                const indx = group_list.indexOf(id);
                group_list.splice(indx,1);

                if(server_update == true){
                    fetch("/admin/admin_update_item_group",{
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({name: name, option: true,values:[id]})
                    });
                }
            };

            cnt.appendChild(clone);

        }
    }

    ap_page(clone_group_page);
}

//order page
const order_page = document.getElementById("orders_pg");
const order_view_page = document.getElementById("order_view_pg");
orders.onclick = async()=>{
    const clone_orders = order_page.cloneNode(true);
    clone_orders.style.display = "block";

    const request = await fetch("/admin/orders_list");
    const json_res = await request.json();

    const grid_list_div = clone_orders.getElementsByClassName("id_orders_pg_grid_list")[0];
    const div = clone_orders.getElementsByTagName("section")[0].getElementsByTagName("div");

    for(let i = 0; i < json_res.length; i++){
        const order = json_res[i];
        const clone = div[0].cloneNode(true);
        const p = clone.getElementsByTagName("p");
        p[0].textContent = order.id_key;
        p[1].textContent = order.user_email;
        p[3].textContent = order.date.split("T")[0];

        //get the currency
        const code = currency_code_founder(order.currency);
        p[2].textContent = order.total_amount/100+ code.symbol;


        //order view button 
        const a = clone.getElementsByTagName("a")[0];
        a.onclick = async()=>{

            const clone = order_view_page.cloneNode(true);
            clone.style.display = "block";

            const req = await fetch("/admin/order_view",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: order.id_key})
            });
            const res = await req.json();



            const p = clone.getElementsByClassName("id-p");
            p[0].textContent = order.id_key;
            p[1].textContent = order.total_amount/100+ code.symbol;
            p[2].textContent = order.date.split("T")[0];

            const address = JSON.parse(res.address);
            if(address){
                p[3].textContent = address.address.line1;
                p[4].textContent = address.address.line2;
                p[5].textContent = address.address.city;
                p[6].textContent = address.name;
                p[7].textContent = address.address.country;
                p[8].textContent = address.address.postal_code;
                p[9].textContent = address.address.state;
            }
            p[10].textContent = order.user_email; 
            p[11].textContent = res.phone;
            
            const grid_section = clone.getElementsByTagName("section")[0].getElementsByTagName("div")[0];
            const grid_parent = clone.getElementsByClassName("id-div_grid")[0];

            const order_list = JSON.parse(res.order_list);

            for(let i = 0; i < order_list.length; i++){
                const clone = grid_section.cloneNode(true);
                const p = clone.getElementsByTagName("p");
                p[0].textContent = order_list[i].id;
                let option = "";
                if(order_list[i].option != undefined){
                    order_list[i].option.map((e)=>{
                        if(e != "null"){
                            if(option == ""){
                                option = e;
                            }else{
                                option = option + ",  "+ e;
                            }
                        }
                    });
                };

                let price;
                if(order_list[i].price_data){
                    price = order_list[i].price_data.unit_amount;
                }else{
                    price = order_list[i].price.unit_amount;
                }
                p[1].textContent = option;
                p[2].textContent = order_list[i].quantity;
                p[3].textContent = price/100+ code.symbol;
                grid_parent.appendChild(clone);
            
            }
            


            ap_page(clone);
        };
        grid_list_div.appendChild(clone);
        
    }


    ap_page(clone_orders);
}

//web page
web_page.onclick = ()=>{
    window.open("/admin/template.html");
}

//payment
const payment_page = document.getElementById("payment_settings_page");
let shipping_address = "AC AD AE AF AG AI AL AM AO AQ AR AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CD CF CG CH CI CK CL CM CN CO CR CV CW CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HN HR HT HU ID IE IL IM IN IO IQ IS IT JE JM JO JP KE KG KH KI KM KN KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MK ML MM MN MO MQ MR MS MT MU MV MW MX MY MZ NA NC NE NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PY QA RE RO RS RU RW SA SB SC SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SZ TA TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG US UY UZ VA VC VE VG VN VU WF WS XK YE YT ZA ZM ZW ZZ";
shipping_address = shipping_address.split(" ");

const country_code_obj = {
    "andorra": "AD",
    "united arab emirates": "AE",
    "afghanistan": "AF",
    "antigua and barbuda": "AG",
    "anguilla": "AI",
    "albania": "AL",
    "armenia": "AM",
    "angola": "AO",
    "antarctica": "AQ",
    "argentina": "AR",
    "austria": "AT",
    "australia": "AU",
    "aruba": "AW",
    "azerbaijan": "AZ",
    "bosnia and herzegovina": "BA",
    "barbados": "BB",
    "bangladesh": "BD",
    "belgium": "BE",
    "burkina faso": "BF",
    "bulgaria": "BG",
    "bahrain": "BH",
    "burundi": "BI",
    "benin": "BJ",
    "saint barthelemy": "BL",
    "bermuda": "BM",
    "brunei": "BN",
    "bolivia": "BO",
    "brazil": "BR",
    "bahamas": "BS",
    "bhutan": "BT",
    "botswana": "BW",
    "belarus": "BY",
    "belize": "BZ",
    "canada": "CA",
    "democratic republic of the congo": "CD",
    "central african republic": "CF",
    "republic of the congo": "CG",
    "switzerland": "CH",
    "ivory coast": "CI",
    "cook islands": "CK",
    "chile": "CL",
    "cameroon": "CM",
    "china": "CN",
    "colombia": "CO",
    "costa rica": "CR",
    "cape verde": "CV",
    "curacao": "CW",
    "cyprus": "CY",
    "czech republic": "CZ",
    "germany": "DE",
    "djibouti": "DJ",
    "denmark": "DK",
    "dominica": "DM",
    "dominican republic": "DO",
    "algeria": "DZ",
    "ecuador": "EC",
    "estonia": "EE",
    "egypt": "EG",
    "western sahara": "EH",
    "eritrea": "ER",
    "spain": "ES",
    "ethiopia": "ET",
    "finland": "FI",
    "fiji": "FJ",
    "falkland islands": "FK",
    "faroe islands": "FO",
    "france": "FR",
    "gabon": "GA",
    "united kingdom": "GB",
    "grenada": "GD",
    "georgia": "GE",
    "guernsey": "GG",
    "ghana": "GH",
    "gibraltar": "GI",
    "greenland": "GL",
    "gambia": "GM",
    "guinea": "GN",
    "equatorial guinea": "GQ",
    "greece": "GR",
    "guatemala": "GT",
    "guam": "GU",
    "guinea-bissau": "GW",
    "guyana": "GY",
    "hong kong": "HK",
    "honduras": "HN",
    "croatia": "HR",
    "haiti": "HT",
    "hungary": "HU",
    "indonesia": "ID",
    "ireland": "IE",
    "israel": "IL",
    "isle of man": "IM",
    "india": "IN",
    "british indian ocean territory": "IO",
    "iraq": "IQ",
    "iceland": "IS",
    "italy": "IT",
    "jersey": "JE",
    "jamaica": "JM",
    "jordan": "JO",
    "japan": "JP",
    "kenya": "KE",
    "kyrgyzstan": "KG",
    "cambodia": "KH",
    "kiribati": "KI",
    "comoros": "KM",
    "saint kitts and nevis": "KN",
    "south korea": "KR",
    "kuwait": "KW",
    "cayman islands": "KY",
    "kazakhstan": "KZ",
    "laos": "LA",
    "lebanon": "LB",
    "saint lucia": "LC",
    "liechtenstein": "LI",
    "sri lanka": "LK",
    "liberia": "LR",
    "lesotho": "LS",
    "lithuania": "LT",
    "luxembourg": "LU",
    "latvia": "LV",
    "libya": "LY",
    "morocco": "MA",
    "monaco": "MC",
    "moldova": "MD",
    "montenegro": "ME",
    "saint martin": "MF",
    "madagascar": "MG",
    "macedonia": "MK",
    "mali": "ML",
    "myanmar": "MM",
    "mongolia": "MN",
    "macau": "MO",
    "mauritania": "MR",
    "montserrat": "MS",
    "malta": "MT",
    "mauritius": "MU",
    "maldives": "MV",
    "malawi": "MW",
    "mexico": "MX",
    "malaysia": "MY",
    "mozambique": "MZ",
    "namibia": "NA",
    "new caledonia": "NC",
    "niger": "NE",
    "nigeria": "NG",
    "nicaragua": "NI",
    "netherlands": "NL",
    "norway": "NO",
    "nepal": "NP",
    "nauru": "NR",
    "niue": "NU",
    "new zealand": "NZ",
    "oman": "OM",
    "panama": "PA",
    "peru": "PE",
    "french polynesia": "PF",
    "papua new guinea": "PG",
    "philippines": "PH",
    "pakistan": "PK",
    "poland": "PL",
    "saint pierre and miquelon": "PM",
    "pitcairn": "PN",
    "puerto rico": "PR",
    "palestine": "PS",
    "portugal": "PT",
    "paraguay": "PY",
    "qatar": "QA",
    "reunion": "RE",
    "romania": "RO",
    "serbia": "RS",
    "russia": "RU",
    "rwanda": "RW",
    "saudi arabia": "SA",
    "solomon islands": "SB",
    "seychelles": "SC",
    "sweden": "SE",
    "singapore": "SG",
    "saint helena": "SH",
    "slovenia": "SI",
    "svalbard and jan mayen": "SJ",
    "slovakia": "SK",
    "sierra leone": "SL",
    "san marino": "SM",
    "senegal": "SN",
    "somalia": "SO",
    "suriname": "SR",
    "south sudan": "SS",
    "sao tome and principe": "ST",
    "el salvador": "SV",
    "sint maarten": "SX",
    "swaziland": "SZ",
    "turks and caicos islands": "TC",
    "chad": "TD",
    "togo": "TG",
    "thailand": "TH",
    "tajikistan": "TJ",
    "tokelau": "TK",
    "east timor": "TL",
    "turkmenistan": "TM",
    "tunisia": "TN",
    "tonga": "TO",
    "turkey": "TR",
    "trinidad and tobago": "TT",
    "tuvalu": "TV",
    "taiwan": "TW",
    "tanzania": "TZ",
    "ukraine": "UA",
    "uganda": "UG",
    "united states": "US",
    "uruguay": "UY",
    "uzbekistan": "UZ",
    "vatican": "VA",
    "saint vincent and the grenadines": "VC",
    "venezuela": "VE",
    "british virgin islands": "VG",
    "vietnam": "VN",
    "vanuatu": "VU",
    "wallis and futuna": "WF",
    "samoa": "WS",
    "kosovo": "XK",
    "yemen": "YE",
    "mayotte": "YT",
    "south africa": "ZA",
    "zambia": "ZM",
    "zimbabwe": "ZW"
};

payment.onclick = async()=>{
    const clone = payment_page.cloneNode(true);
    clone.classList.remove("hide");

    const stripe_sk_input = clone.querySelector("#stripe_sk_input");
    const stripe_sk_button = clone.querySelector("#stripe_sk_button");

    //update stripe sk
    stripe_sk_button.onclick = async()=>{
        const val = stripe_sk_input.value;

        if(val.length != 0){
            const confirm_alert = confirm("Update your Stripe Key? \n An incorrect value can stop payments")
    
            if(confirm_alert == true){
                const req = await fetch("/admin/update/settings/data/sk",{
                    method: 'POST',
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        sk: val
                    })
                });

                if(req.status == 200){
                    alert("Stripe Key successfully updated")
                }else{
                    alert("UPDATE ERROR. \n Stripe Key update problem");
                }

            }
        
        }
    }
    
    
    //update shipping country
    const country_element_parent = clone.querySelector("#shipping_html_element_parent");
    const country_element = clone.querySelector("#shipping_html_element");
    country_element.remove();

    let shipping_value = [];

    function value_to_code(val){
        
        if(country_code_obj[val]){
            return [val,country_code_obj[val]];
        }else{
            const keys = Object.keys(country_code_obj);

            for(const k of keys){
                
                const obj_val = country_code_obj[k];
                if(val == obj_val){
                    return [k,val];
                }
            }
        }
    }

    function country_html_list(){


        country_element_parent.innerHTML = "";
        
        if(shipping_value){
            
            if(shipping_value.length == 0){
                createHtmlElement();
            }else{
                shipping_value.map(x=>{
                    
                    const val = value_to_code(x);
                    createHtmlElement(val);

                });
            }

        }else{
            createHtmlElement();
        }
    }

    function shipping_value_remove_element(code){
        
        if(shipping_value){
            
            const ind = shipping_value.indexOf(code);
            shipping_value.splice(ind,1);
            update_db();

        }
    }

    function createHtmlElement(val){

        if(val){
            const country_clone_elm = country_element.cloneNode(true);

            const name_cnt = country_clone_elm.querySelector("#shipping_name");
            const code = country_clone_elm.querySelector("#shipping_code");

            const name = val[0];
            const country_code_val = val[1];

            name_cnt.innerText = name;
            code.innerText = country_code_val;

            
            const remove_button = country_clone_elm.querySelector("#shipping_remove");

            remove_button.onclick = ()=>{
                
                country_clone_elm.remove();
                shipping_value_remove_element(country_code_val);
                country_html_list();

            }


            country_element_parent.appendChild(country_clone_elm);
        }else{

            country_element_parent.innerHTML = " all country ";

        }

    }

    async function update_db(){

        if(!shipping_value || shipping_value < 1){

            shipping_slect_cnt.classList.add("important_hide");
            select.value = "true"

            const update_req = await fetch("/admin/update/shipping_country",{
                method: 'POST',
                headers:{
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({all: true})
            });

        }else{

            return await fetch("/admin/update/shipping_country",{
                method: 'POST',
                headers:{
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    all: false,
                    list: shipping_value
                })
            });
        }
    }

    
    function update_value(val){

        if(val != null){
            
            if(shipping_value == null){

                if(typeof val == "array" || typeof val == "object"){
                    shipping_value = val;
                }else{
                    shipping_value = [val];
                }

            }else{

                if(typeof val == "array" || typeof val == "object"){
                    shipping_value = val;
                }else{
                    shipping_value.push(val);
                }
                
            }
            country_html_list();
        }else{
            shipping_value = null;
            country_html_list();
        }
    }

    const select = clone.querySelector("#shipping_select_all");
    const shipping_slect_cnt = clone.querySelector("#shipping_select_cnt");
    select.onchange = async()=>{

        if(select.value == "true"){
            shipping_slect_cnt.classList.add("important_hide");
            
            
            update_value(null);
            update_db();

        }else{
            shipping_slect_cnt.classList.remove("important_hide");
        }
    };

    const shipping_button = clone.querySelector("#shipping_code_button");
    const shipping_input = clone.querySelector("#shipping_code_input");

    shipping_button.onclick = async()=>{
        let val = shipping_input.value;
        shipping_input.value = "";
        val = val.replaceAll(" ", "");
        val = val.toUpperCase();

        if(val.length == 2){
            if(shipping_address.find((x,y)=> x == val) != undefined){
                
                //update
                update_value(val);
    
                let update_req = await update_db();
                update_req = await update_req.json();
                shipping_value = update_req.response;
                country_html_list();
    
    
            }else{
                alert("This value is not accepted or is incorrect.\n Value must be country code es: IT or it, \n ");
            }
        }else{

            val = val.toLowerCase();
            const code_arr = value_to_code(val);

            if(code_arr){
                update_value(code_arr[1]);

                let update_req = await update_db();
                update_req = await update_req.json();
                shipping_value = update_req.response;
                country_html_list();
            }



        }
    }

    let shipping_data_req = await fetch("/admin/shipping_country");
    shipping_data_req = await shipping_data_req.json();
    update_value(shipping_data_req.response);
    shipping_value = shipping_data_req.response;


    if(shipping_data_req.response == null){
        shipping_slect_cnt.classList.add("important_hide");

    }else{
        select.value = "false";
        shipping_slect_cnt.classList.remove("important_hide");
    }


    //currency
    const currency_select_tag = clone.querySelector("#Currency");
    
    currency_code.map(x=>{
        
        const option = document.createElement("option");
        const data = [x.currency,x.code,x.symbol];

        option.innerText = data.join("        ");

        option.value = x.code;

        if(x.code == gen_currency.code){
            option.selected = true;
        }

        currency_select_tag.appendChild(option);
    });


    currency_select_tag.onchange = async ()=>{


        let currency_obj = null;
        for(const obj of currency_code){
            
            if(obj.code == currency_select_tag.value){
                currency_obj = obj;
                break;
            }

        }


        let req = await fetch("/admin/update/currency",{
            method: 'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(currency_obj)
        });

        if(req.status == 200){
            gen_currency = currency_obj;
            
            if(!gen_currency.symbol){
                gen_currency.symbol = gen_currency.code;
            };
        }else{
            alert("currency configuration error")
        }

    }


    ap_page(clone);
};

//info settings
const info_set_page = document.getElementById("info_setting_page");

info_set.onclick = async ()=>{
    const clone = info_set_page.cloneNode(true);
    clone.classList.remove("hide");

    const input = clone.querySelectorAll("input");

    //img
    const img = clone.querySelectorAll("img");
    const img_page_tag = img[0];
    const img_logo_tag = img[1];


    const page_img = input[0];
    const logo_img = input[1];
    
    const linkedin = input[2];
    const twitter = input[3];
    const facebook = input[4];
    const instagram = input[5];

    const tel1 = input[6];
    const tel2 = input[7];
    const whatsapp = input[8];
    const mail = input[9];

    const address = input[10];
    const pIva = input[11];
    const privacy_policy = input[12];

    //current info
    let company_info = await fetch("/gen_info");
    company_info = await company_info.json();
    company_info = company_info.response;

    img_page_tag.src = "/product/"+ company_info.title_img;
    img_logo_tag.src = "/product/"+ company_info.logo_img;

    linkedin.value = company_info.link.linkedin;
    twitter.value = company_info.link.twitter;
    facebook.value = company_info.link.facebook;
    instagram.value = company_info.link.instagram;

    tel1.value = company_info.contacts.phone1;
    tel2.value = company_info.contacts.phone2;
    whatsapp.value = company_info.contacts.whatsapp;
    mail.value = company_info.contacts.email;

    address.value = company_info.address;
    pIva.value = company_info.p_iva;
    privacy_policy.value = company_info.privacy_policy_link;


    //update 
    page_img.onchange = async ()=>{

        const data = new FormData();
        data.append("img",page_img.files[0]);

        let req = await fetch("/admin/update/page_img",{
            method: 'POST',
            body: data
        });
        const res = await req.json();

        if(req.status == 200){
            img_page_tag.src = "/product/" + res.response.title_img;
        }else{
            alert("update error");
        }
    };

    logo_img.onchange = async ()=>{

        const data = new FormData();
        data.append("img",logo_img.files[0]);

        let req = await fetch("/admin/update/logo_img",{
            method: 'POST',
            body: data
        });
        const res = await req.json();

        if(req.status == 200){
            img_logo_tag.src = "/product/" + res.response.logo_img;
        }else{
            alert("update error");
        }
    };

    // contacts
    async function contact(type,val,input){

        const req = await fetch("/admin/update/contacts",{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contact: type,
                val: val,
            })
        });

        const res = await req.json();
        if(req.status == 200){
            input.value = res.response.contacts[type];
        }else{
            alert("update error");
        }
    };

    tel1.onchange = ()=>contact("phone1",tel1.value,tel1);
    tel2.onchange = ()=>contact("phone2",tel2.value,tel2);
    whatsapp.onchange = ()=>contact("whatsapp",whatsapp.value,whatsapp);
    mail.onchange = ()=>contact("email",mail.value,mail);


    //links
    async function link(type,val,input){

        const req = await fetch("/admin/update/link",{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                link: type,
                val: val,
            })
        });

        const res = await req.json();
        if(req.status == 200){
            input.value = res.response.link[type];
        }else{
            alert("update error");
        }
    };

    linkedin.onchange = ()=>link("linkedin",linkedin.value,linkedin);
    twitter.onchange = ()=>link("twitter",twitter.value,twitter);
    facebook.onchange = ()=>link("facebook",facebook.value,facebook);
    instagram.onchange = ()=>link("instagram",instagram.value,instagram);


    //address
    address.onchange = async ()=>{

        const req = await fetch("/admin/update/address",{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                address: address.value,
            })
        });

        const res = await req.json();
        if(req.status == 200){
            address.value = res.response.address;
        }else{
            alert("update error");
        }
    };

    //p_iva
    pIva.onchange = async ()=>{

        const req = await fetch("/admin/update/p_iva",{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                p_iva: pIva.value,
            })
        });

        const res = await req.json();
        if(req.status == 200){
            pIva.value = res.response.p_iva;
        }else{
            alert("update error");
        }
    };

    privacy_policy.onchange = async ()=>{

        const req = await fetch("/admin/update/privacy_policy_link",{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                privacy_policy_link: privacy_policy.value,
            })
        });

        const res = await req.json();
        if(req.status == 200){
            privacy_policy.value = res.response.privacy_policy_link;
        }else{
            alert("update error");
        }
    };




    ap_page(clone);
}

