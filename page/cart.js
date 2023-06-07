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
        if(shop_cart){
            return JSON.parse(shop_cart);
        }
        
    }

    let current_cart = shop_cart();
    function update_cart(){
        sessionStorage.setItem("cart", JSON.stringify(current_cart));
        header_counter_function()
        current_cart = shop_cart();
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
    const nav_group = document.querySelector("#nav_group");

    const request_groups = await fetch("/client/group_list");
    let response = await request_groups.json();
    response = response.response;

    for(let i = 0; i < response.length; i++){
        
        const list = document.createElement("li");
        const a = document.createElement("a");

        a.href = "/page/html/products.html?name="+ response[i].name;
        a.innerText = response[i].name;

        list.appendChild(a);
        nav_group.appendChild(list)

    };

    ////////// SHOP CART ///////////////

    //cart template
    const cart_section = document.getElementById("cart_template");
    const cart_section_parent = cart_section.parentNode;

    //// total
    const total = document.getElementById("cart_total");
    function update_total(){
        let value = 0;
        current_cart.cart_list.product_list.map(x=>{
            const e = current_cart.cart_list.order[x];
            if(e.single_element == true){
                value +=  e.price * e.quantity;
            }else{
                e.product_array.map(x1=>{
                    value += x1.price * x1.quantity;
                });
            }
        });

        total.innerText = value/100 + code.symbol;

    }
    update_total()

    current_cart.cart_list.product_list.map((x)=>{

        if(current_cart.cart_list.order[x].single_element == true){

            const clone = cart_section.cloneNode("true");

            const element = {
                id: x,
                img: current_cart.cart_list.order[x].img,
                name: current_cart.cart_list.order[x].name,
                price: current_cart.cart_list.order[x].price,
                quantity: current_cart.cart_list.order[x].quantity,
                options: current_cart.cart_list.order[x].options,
            }

            update_cart_elment(clone, cart_section_parent, element);

        }else{


            current_cart.cart_list.order[x].product_array.map((x1)=>{

                const clone = cart_section.cloneNode(true);

                const element = {
                    id: x,
                    img: current_cart.cart_list.order[x].img,
                    name: current_cart.cart_list.order[x].name,
                    price: x1.price,
                    quantity: x1.quantity,
                    options: x1.options,
                }

                update_cart_elment(clone, cart_section_parent, element);
            })
        }
    });

    function update_cart_elment(clone, parentNode, element){


        const img = clone.querySelector("#template_img");
        img.src = "/product/" + element.img;
        
        const title = clone.querySelector("#template_title");
        title.innerText = element.name

        const option = clone.querySelector("#template_option");
        if(element.options){option.innerText = element.options.join(", ")}

        const price = clone.querySelector("#template_price");
        price.innerText = element.price/100 + code.symbol;

        const quantity = clone.querySelector("#template_quantity");
        quantity.value = element.quantity;
        quantity.onchange = ()=>{

            const number = parseInt(quantity.value);
            if(number != NaN && number >= 1){
                quantity.value = number;
                if(current_cart.cart_list.order[element.id].single_element == true){
                    current_cart.cart_num = current_cart.cart_num + (number - current_cart.cart_list.order[element.id].quantity)
                    current_cart.cart_list.order[element.id].quantity = number;
                }else{
                    for(let i = 0; i < current_cart.cart_list.order[element.id].product_array.length; i++){
                        
                        if(current_cart.cart_list.order[element.id].product_array[i].options.join("") == element.options.join("")){
                            current_cart.cart_num = current_cart.cart_num + (number - current_cart.cart_list.order[element.id].product_array[i].quantity);
                            current_cart.cart_list.order[element.id].product_array[i].quantity = number;
                            break;
                        }
                    }
                }
                
                update_total();
                update_cart();
            }else{

                if(current_cart.cart_list.order[element.id].single_element == true){
                    quantity.value = current_cart.cart_list.order[element.id].quantity;
                }else{
                    for(let i = 0; i < current_cart.cart_list.order[element.id].product_array.length; i++){
                        
                        if(current_cart.cart_list.order[element.id].product_array[i].options.join("") == element.options.join("")){
                            quantity.value = current_cart.cart_list.order[element.id].product_array[i].quantity;
                            break;
                        }
                    }
                }
            }

        }

        const subtract_btn = clone.querySelector("#template_subtract_btn");
        subtract_btn.onclick = ()=>{
            const number = parseInt(quantity.value);
            if(number != NaN && number > 1){
                quantity.value = number - 1;
                quantity.onchange();
            }
        }

        const add_btn = clone.querySelector("#template_add_btn");
        add_btn.onclick = ()=>{
            const number = parseInt(quantity.value);
            if(number != NaN && number >= 1){
                quantity.value = number + 1;
                quantity.onchange();
            }
        }

        const remove_btn = clone.querySelector("#template_remove");
        remove_btn.onclick = ()=>{

            if(current_cart.cart_list.order[element.id].single_element == true){

                current_cart.cart_num = current_cart.cart_num - current_cart.cart_list.order[element.id].quantity;
                current_cart.cart_list.product_list = current_cart.cart_list.product_list.filter(x => x != element.id)

                delete current_cart.cart_list.order[element.id];

            }else{

                /// find the index of the product array
                let array_index = -1;
                const option_tmp_list = ["null","null","null"];
                element.options.map((x,y)=>{option_tmp_list[y] = x});
                for(let i = 0; i < current_cart.cart_list.order[element.id].product_array.length; i++){

                    const tmp_option_list = current_cart.cart_list.order[element.id].product_array[i].options;
                    if(tmp_option_list[0] == element.options[0] && tmp_option_list[1] == element.options[1] && tmp_option_list[2] == element.options[2]){
                        array_index = i;
                        break;
                    }
                }
    
                if(current_cart.cart_list.order[element.id].product_array.length > 2){

                    current_cart.cart_num = current_cart.cart_num - current_cart.cart_list.order[element.id].product_array[array_index].quantity;
                    current_cart.cart_list.order[element.id].product_array.splice(array_index,1);

                }else{

                    current_cart.cart_num = current_cart.cart_num - current_cart.cart_list.order[element.id].product_array[array_index].quantity;
                    current_cart.cart_list.order[element.id].product_array.splice(array_index,1);


                    current_cart.cart_list.order[element.id].single_element = true;
                    current_cart.cart_list.order[element.id].quantity = current_cart.cart_list.order[element.id].product_array[0].quantity;
                    current_cart.cart_list.order[element.id].options = current_cart.cart_list.order[element.id].product_array[0].options;
                    current_cart.cart_list.order[element.id].price = current_cart.cart_list.order[element.id].product_array[0].price;

                    delete current_cart.cart_list.order[element.id].product_array;
                }
            }


            update_total();
            update_cart();
            clone.remove();
        }

        parentNode.appendChild(clone);
    }

    cart_section.remove();


    // check out
    const checkout_btn = document.getElementById("chekout_btn");
    checkout_btn.onclick = async()=>{

        const cart_list_tmp = {...current_cart.cart_list};

        cart_list_tmp.product_list.map((x)=>{

            delete cart_list_tmp.order[x].img;
            delete cart_list_tmp.order[x].name;
    
            if(cart_list_tmp.order[x].single_element == true){
                delete cart_list_tmp.order[x].price;
            }else{
                cart_list_tmp.order[x].product_array.map(x1=>{
                    delete x1.price;
                })
            }
    
        });

        // request
        let buy_now_req = await fetch("/client/order",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cart_list_tmp)
        });

        buy_now_req = await buy_now_req.json();

        if(buy_now_req.error != true){
            window.location.href = buy_now_req.url;
        }else{
            alert("product error");
        }



    }


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
    if(gen_info_data.logo_img != null){
        header_logo.src = "/product/"+ gen_info_data.logo_img;
    };


})();