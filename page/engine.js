//front-end request/resnder engine
(async()=>{

    //// CURRENCY /////
    let code = await fetch("/currency");
    code = await code.json();
    code = code.response;
    
    if(!code.symbol){
        code.symbol = code.code;
    }

    ///// CART /////

    if(sessionStorage.getItem("cart") == undefined){

        cart = {
            cart_num : 0,
            cart_list : {
                product_list:[],
                order:{}
            }
        }
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }

    function shop_cart(){
        const shop_cart = sessionStorage.getItem("cart");
        console.log(JSON.parse(shop_cart))
        if(shop_cart){
            return JSON.parse(shop_cart);
        }
        
    }
    
    function update_cart(current_cart){
        sessionStorage.setItem("cart", JSON.stringify(current_cart));
    }


    //////////// BODY ////////////
    const body = document.querySelector("body");


    /////////////////// HEADER ///////////////////////
    //header
    let header = await fetch("/page/html/header.html");
    header = await header.text();

    //inner header to the html body
    const tem_section = document.createElement("section");
    tem_section.innerHTML = header;

    
    //header
    header = tem_section.querySelector(".section_header");


    //cart counter
    const header_counter = header.querySelector("#nav_cart_counter");
    const header_counter_function = ()=>{
        header_counter.innerText = shop_cart().cart_num;
    };
    header_counter_function();


    // script
    const header_script = header.querySelector("script");
    header.removeChild(header_script);

    const header_script_tag = document.createElement("script");
    header_script_tag.innerHTML = header_script.innerHTML;

    //insert the header
    body.insertBefore(header,body.firstChild);

    header.appendChild(header_script_tag);

    
    

    //////////////// HEADER/NAV GROUP //////////////////////
    //nav_group_list
    const nav_group = header.querySelector("#nav_group");

    const request_groups = await fetch("/client/group_list");
    let response = await request_groups.json();
    response = response.response;

    for(let i = 0; i < response.length; i++){
        
        const list = document.createElement("li");
        const a = document.createElement("a");

        a.href = "/page/html/products.html?group="+ response[i].id_key;
        a.innerText = response[i].name;

        list.appendChild(a);
        nav_group.appendChild(list)

    };

    const nav_cart_alert = header.querySelector("#nav_cart_div");
    console.log(nav_cart_alert)
    function nav_alert_sh(){

        nav_cart_alert.classList.remove("hide");
        
    }

    //////////////// PRODUCT GROUP /////////////////////////
    //product section "prod"
    const product_list = document.querySelectorAll("[tmpval_eng = prod]");
    for(const prod of product_list){
        
        if(prod.getAttribute("group") != undefined){

            let group_list = await fetch("/client/group",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id_key: prod.getAttribute("group")
                })
            });
            group_list = await group_list.json();
            
            console.log(group_list)
            if(!group_list.error){

                /// product template
                const product_section = prod.querySelector("[tmpval_eng = prod-template]");
                product_section.remove();


                group_list.forEach(element => {

                    //product template clone
                    const product_section_clone = product_section.cloneNode("true");
                    product_section_clone.removeAttribute("style");
    
                    const img = product_section_clone.querySelector("img");
                    img.src = "/product/"+ element.image;
    
                    const title = product_section_clone.querySelector("[tmpval_eng = prod-template-title]");
                    title.innerText = element.name; 
    
                    const price = product_section_clone.querySelector("[tmpval_eng = prod-template-price]");
                    price.innerText = element.price/100 + code.symbol;
    
                    const link = product_section_clone.querySelector("[tmpval_eng = prod-template-link]");
                    link.onclick = ()=>{
                        window.location.href  = "/page/html/product.html?product="+ element.id;
                    }
    
    
                    const add_cart = product_section_clone.querySelector("[tmpval_eng = prod-template-cart]");
                    add_cart.onclick = ()=>{
                        
                        window.location.href  = "/page/html/product.html?product="+ element.id;
    
                    }
    
                    prod.appendChild(product_section_clone);
                });
            }


        }
    }

    /////////////// PRODUCT PAGE SECTION ////////////////
    //product page section
    const product_pg_sec = document.querySelector("[tmpval_eng = prod_pg_sec]");
    if(product_pg_sec != undefined){
        (async()=>{

            let id = new URLSearchParams(window.location.search);
            id = id.get("product");

    
            let product = await fetch("/client/product",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({id: id})
            })
    
            product = await product.json();
            product = product.response;
    
    
    
            //images
            const img_cnt_parent = product_pg_sec.querySelector("#prd_img_parent")
            const img_template_div = product_pg_sec.querySelector("#prd_img_tmp");
    
            //main image
            const main_img = product_pg_sec.querySelector("#prd_main_img");
            main_img.src = "/product/" + product.product.image;
            
            for(const img_data of product.img){
    
                const template_clone = img_template_div.cloneNode(true);
                const img = template_clone.querySelector("img");
                img.src = "/product/"+ img_data.img_id_key + "." +img_data.type;
    
                template_clone.onclick = ()=>{
                    main_img.src = img.src;
                }
    
                img_cnt_parent.appendChild(template_clone);
            };
    
            img_template_div.remove();
    
    
            //title
            const title = product_pg_sec.querySelector("#prd_title");
            title.innerText = product.product.name;
    
            //option 
            const option_cnt_parent_parent = product_pg_sec.querySelector("#prd_select_div_cnt");
            const option_cnt_parent = product_pg_sec.querySelector("#prd_select_div");
    
            const product_option_array = [product.product.option1,product.product.option2,product.product.option3];
            const section_arr = [];
    
            product_option_array.forEach((element,indx)=>{
    
                if(element != null){
    
                    const option_select_cnt_clone = option_cnt_parent.cloneNode(true);
    
                    
                    const option_title = option_select_cnt_clone.querySelector("p");
                    const option_select = option_select_cnt_clone.querySelector("select");
                    section_arr.push(option_select);
    
                    option_title.innerText = element;
    
                    let option_list_data = product.option[indx].description_list;
                    
                    option_list_data = option_list_data.slice(1);
                    option_list_data = option_list_data.slice(0, option_list_data.length - 1);
    
                    option_list_data = option_list_data.replaceAll('"' , "");
    
                    option_list_data = option_list_data.split(",");
    
                    option_list_data.map((x)=>{
                        const option_elm = document.createElement("option");
                        option_elm.value = x;
                        option_elm.innerText = x;
    
                        option_select.appendChild(option_elm);
                    });
    
                    option_cnt_parent_parent.appendChild(option_select_cnt_clone);
    
                }
            });
            option_cnt_parent.remove();

            //Price
            const price = product_pg_sec.querySelector("#prd_price");
            if(product.product.option != true){
                price.innerText = product.product.price/100 + code.symbol;
            }else{
                const price_val = current_obj();
                price.innerText = price_val.price/100 +(code.symbol);
            }

            function current_obj(){

                const options_val_array =  section_arr.map(x=>{
                    return x.value;
                });

                const lgn_option_list = ['null','null','null'];
                options_val_array.map((x,y)=>{
                    lgn_option_list[y] = x;
                });

                let obj = product.option_list.filter(x=>{
                    if(x.option1 == lgn_option_list[0] && x.option2 == lgn_option_list[1] && x.option3 == lgn_option_list[2]){
                        return x;
                    }
                });

                return obj[0];

            }

            section_arr.map(x=>{
                x.onchange = ()=>{
                    const price_val = current_obj().price;
                    price.innerText = price_val/100 + code.symbol;
                }
            });
    
    
    
            //// description
            const description_cnt = product_pg_sec.querySelector("#prd_description");

            if(product.product.description != undefined){
                description_cnt.innerHTML = product.product.description.replaceAll("\n","<br>");
            }
            
    
            ///cart
            const cart_btn = product_pg_sec.querySelector("#prd_cart_btn");
            cart_btn.onclick = ()=>{
    
                const current_cart = shop_cart();
                current_cart.cart_num ++;

    
                if(product.product.option == false){
    
                    if(current_cart.cart_list.order[product.product.id] == undefined){
                        current_cart.cart_list.order[product.product.id] = {
                            quantity: 1,
                            img: product.product.image,
                            name: product.product.name,
                            price: product.product.price,
                            single_element: true,
                        };
    
                        current_cart.cart_list.product_list.push(product.product.id)
                    }else{
                        current_cart.cart_list.order[product.product.id].quantity ++;
                    }

                }else{

                    const options_val_array =  section_arr.map(x=>{
                        return x.value;
                    });
    
                    const price = current_obj().price;
    
                    if(current_cart.cart_list.order[product.product.id] == undefined){
                        
                        current_cart.cart_list.order[product.product.id] = {
                            quantity: 1,
                            img: product.product.image,
                            name: product.product.name,
                            price: price,
                            options: options_val_array,
                            single_element: true,
                        };
    
                        current_cart.cart_list.product_list.push(product.product.id);
                    }else{
    
                        const cart_object = current_cart.cart_list.order[product.product.id];
    
                        if(cart_object.single_element == true){
                            
                            //if options are equal
                            let condition = true;
                            if(cart_object.options.length != options_val_array.length){
                                condition = false;
                            }else{
                                for(let i = 0; i < options_val_array.length; i++){
                                    if(options_val_array[i] != cart_object.options[i]){
                                        condition = false;
                                        break;
                                    }
                                }
                            }
    
                            if(condition == true){
                                cart_object.quantity ++
                            }else{
    
                                cart_object.single_element = false;
                                
                                cart_object.product_array = [
                                    {
                                        quantity: cart_object.quantity,
                                        options: cart_object.options,
                                        price: cart_object.price
                                    },
                                    {
                                        quantity: 1,
                                        options: options_val_array,
                                        price: price
                                    }
                                ]
    
                                delete cart_object.price;
                                delete cart_object.quantity;
                                delete cart_object.options;
                            }
                        }else{


                            ///check if exist a equal option
                            let arr_indx = -1;
                            for(let J = 0; J < cart_object.product_array.length; J++){

                                const x = cart_object.product_array[J];

                                //if options are equal
                                let condition = true;
                                if(x.options.length != options_val_array.length){
                                    condition = false;
                                }else{
                                    for(let i = 0; i < options_val_array.length; i++){
                                        if(options_val_array[i] != x.options[i]){
                                            condition = false;
                                            break;
                                        }
                                    }
                                }

                                if(condition == true){
                                    arr_indx = J;
                                };
                            }

                            if(arr_indx == -1){
                                cart_object.product_array.push({
                                    quantity: 1,
                                    options: options_val_array,
                                    price: price
                                });
                            }else{
                                cart_object.product_array[arr_indx].quantity ++;
                            }

    
                        }
                    }

                }


                    update_cart(current_cart);
                    header_counter_function();
                    nav_alert_sh();
    
            };
    
            ///boy now
            const  buy_now_btn = product_pg_sec.querySelector("#prd_bnow_btn");
            buy_now_btn.onclick = async()=>{

                const options_val_array =  section_arr.map(x=>{
                    return x.value;
                });

                //order data
                const order = {
                    product_list: [product.product.id],
                    order:{}
                }
                order.order[product.product.id] = {
                    quantity: 1,
                    options: options_val_array,
                    single_element: true
                }

                // request
                let buy_now_req = await fetch("/client/order",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(order)
                });

                buy_now_req = await buy_now_req.json();

                if(buy_now_req.error != true){
                    window.location.href = buy_now_req.url;
                }else{
                    alert("product error");
                }

            }
    
        })();
    }

    ///////////// PRODUCT GROUP
    const product_list_group = document.querySelectorAll("[tmpval_eng = prod-group]");
    for(const prod of product_list_group){

        let url_params = new URLSearchParams(window.location.search);
        url_params = url_params.get("group");
        
        if(url_params != undefined){

            let group_list = await fetch("/client/group",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id_key: url_params
                })
            });
            group_list = await group_list.json();



            /// product template
            const product_section = prod.querySelector("[tmpval_eng = prod-group-template]");
            product_section.remove();
            
            group_list.forEach(element => {

                //product template clone
                const product_section_clone = product_section.cloneNode("true");
                product_section_clone.removeAttribute("style");

                const img = product_section_clone.querySelector("img");
                img.src = "/product/"+ element.image;

                const title = product_section_clone.querySelector("[tmpval_eng = prod-group-template-title]");
                title.innerText = element.name; 

                const price = product_section_clone.querySelector("[tmpval_eng = prod-group-template-price]");
                price.innerText = element.price/100 + code.symbol;

                const link = product_section_clone.querySelector("[tmpval_eng = prod-group-template-link]");
                link.onclick = ()=>{
                    window.location.href  = "/page/html/product.html?product="+ element.id;
                }


                const add_cart = product_section_clone.querySelector("[tmpval_eng = prod-group-template-cart]");
                add_cart.onclick = ()=>{
                    
                    window.location.href  = "/page/html/product.html?product="+ element.id;

                }

                prod.appendChild(product_section_clone);
            });

        }
    }

    ////////////// FOOTER ///////////////////////
    let footer = await fetch("/page/html/footer.html");
    footer = await footer.text();

    let section = document.createElement("section");
    section.innerHTML = footer;

    footer = section.getElementsByTagName("section")[0];
    body.appendChild(footer);



    ///////// GENERIC DATA ////////
    let gen_info_data = await fetch("/gen_info");
    gen_info_data = await gen_info_data.json();
    gen_info_data = gen_info_data.response;

    console.log(gen_info_data);

    if(gen_info_data.title_img != null){
        const link = document.createElement("link");
        link.rel = "shortcut icon";
        link.type = "image/x-icon";
        link.href = "/product/" + gen_info_data.title_img;

        const head = document.querySelector("head");
        head.appendChild(link);
    };

    const header_logo = header.querySelector("#nav_group_logo_img");
    const footer_logo = footer.querySelector("#footer_logo");
    if(gen_info_data.logo_img != null){
        header_logo.src = "/product/"+ gen_info_data.logo_img;
        footer_logo.src = "/product/"+ gen_info_data.logo_img;
    };

    const link_cnt = footer.querySelector("#footer_link");
    const link = link_cnt.querySelectorAll("a");

    //facebook
    if(gen_info_data.link.facebook != null || gen_info_data.link.facebook != ""){
        link[0].href = gen_info_data.link.facebook;
    }else{
        link[0].classList.add("hide");
    };

    //instagram
    if(gen_info_data.link.instagram != null || gen_info_data.link.instagram != ""){
        link[1].href = gen_info_data.link.instagram;
    }else{
        link[1].classList.add("hide");
    };

    //linkedin
    if(gen_info_data.link.linkedin != null || gen_info_data.link.linkedin != ""){
        link[2].href = gen_info_data.link.linkedin;
    }else{
        link[2].classList.add("hide");
    };

    //twitter
    if(gen_info_data.link.twitter != null || gen_info_data.link.twitter != ""){
        link[3].href = gen_info_data.link.twitter;
    }else{
        link[3].classList.add("hide");
    };

    const contacts_cnt = footer.querySelector("#footer_contacts");
    const contacts = contacts_cnt.querySelectorAll("div");

    //phone1
    if(gen_info_data.contacts.phone1 != null || gen_info_data.contacts.phone1 != ""){
        const p = contacts[0].querySelector("p");
        p.innerText = gen_info_data.contacts.phone1;
    }else{
        contacts[0].classList.add("hide");
    };

    //whatsapp
    if(gen_info_data.contacts.whatsapp != null || gen_info_data.contacts.whatsapp != ""){
        const p = contacts[1].querySelector("p");
        p.innerText = gen_info_data.contacts.whatsapp;
    }else{
        contacts[1].classList.add("hide");
    };

    //phone2
    if(gen_info_data.contacts.phone2 != null || gen_info_data.contacts.phone2 != ""){
        const p = contacts[2].querySelector("p");
        p.innerText = gen_info_data.contacts.phone2;
    }else{
        contacts[2].classList.add("hide");
    };

    //email
    if(gen_info_data.contacts.email != null || gen_info_data.contacts.email != ""){
        const p = contacts[3].querySelector("p");
        p.innerText = gen_info_data.contacts.email;
    }else{
        contacts[3].classList.add("hide");
    };


    //p_iva address 
    const footer_p_info = footer.querySelector("#footer_p_iva_address");
    console.log(footer_p_info)

    if(gen_info_data.p_iva != null || gen_info_data.p_iva != ""){
        footer_p_info.innerText = gen_info_data.p_iva;
    }

    if(gen_info_data.address != null || gen_info_data.address != ""){
        const val = footer_p_info.innerText;
        if(val != ""){
            footer_p_info.innerText = val+ " - "+ gen_info_data.address;
        }else{
            footer_p_info.innerText = gen_info_data.address;
        }
    };

    //privacy_policy
    const privacy_policy = footer.querySelector("#footer_privacy_policy");
    console.log(gen_info_data.privacy_policy_link)
    
    if(gen_info_data.privacy_policy_link != null && gen_info_data.privacy_policy_link != ""){
        privacy_policy.href = gen_info_data.privacy_policy_link;
    }else{
        privacy_policy.remove()
    }



})();