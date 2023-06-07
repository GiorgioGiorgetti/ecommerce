
///// template_container
let page = document.getElementById('page');


window.addEventListener("load",()=>{

    page = page.contentWindow.document;
    page = page.querySelector("body");

    engine_template();
})



function engine_template(){
    
    ////// option container
    const option_area = document.getElementById('option');


    //option display
    const option_container = document.getElementById("option_cnt");
    function option_vis(value){
        if(value){
            option_container.classList.remove("option_hide");
        }else{
            option_container.classList.add("option_hide");
        }
    }

    let vis = true;
    window.onresize = ()=>{
        if(window.innerWidth <= 1000){
            vis = false;
            option_vis(vis);
        }else{
            vis = true
            option_vis(vis);
        }
    }

    page.onclick = ()=>{

        if(window.innerWidth <= 1000){
            if(vis == false){
                vis = true;
                option_vis(vis);
            }else{
                vis = false;
                option_vis(vis);
            }
        }
    }

    const remove_x_btn = document.getElementById("remove_option_div");
    remove_x_btn.onclick = ()=>{
        vis = false;
        option_vis(vis);
    };

    window.onresize();

    ///// avanti e indietro 
    const avanti = document.getElementById("forward");
    const indietro = document.getElementById("back");

    const download_btn = document.getElementById("web_page_download");

    (async()=>{

        //product
        let product = await fetch("/admin/admin_show_product");
        product = await product.json();
        product = product.response;

        //group
        let group = await fetch("/admin/admin_show_group");
        group = await group.json();
        group = group.response; 

        const options = {
            template_id: null,
            template_update_page: {
                header: null,
                pages: null,// [home_page,group_page,product_page] (length 3)
                footer: null
            }, 
            working_html_element: {
                template_area: page,
                option_area: option_area,
                next_btn: avanti,
                previous_btn: indietro,
                download_btn: download_btn,
            },
            product:{
                product: product,
                group: group,
            },
            group_url: "/page/html/products.html?group=",
            product_url: "/page/html/product.html?product=",
            media_path: "/page/media/",
            page_script: ["/engine.js"],
            render_functions:[
                {
                    value : "[tmpval_eng = prod]",
                    run_script : async (element)=>{
                        const product_list = element.querySelector("[tmpval_eng = prod]");                    
                        if(product_list.getAttribute("group") != undefined){

                            let group_list = await fetch("/client/group",{
                                method:"POST",
                                headers:{
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify({
                                    id_key: product_list.getAttribute("group")
                                })
                            });
                            group_list = await group_list.json();
                            
                            if(!group_list.error){

                                /// product template
                                const product_section_all = product_list.querySelectorAll("[tmpval_eng = prod-template]");
                                let product_section = product_section_all[0];
                                for(const elm of product_section_all){
                                    elm.remove();
                                }


                                group_list.forEach(element => {

                                    //product template clone
                                    const product_section_clone = product_section.cloneNode("true");
                                    product_section_clone.removeAttribute("style");
                    
                                    const img = product_section_clone.querySelector("img");
                                    img.src = "/product/"+ element.image;
                    
                                    const title = product_section_clone.querySelector("[tmpval_eng = prod-template-title]");
                                    title.innerText = element.name; 
                    
                                    const price = product_section_clone.querySelector("[tmpval_eng = prod-template-price]");
                                    price.innerText = element.price/100 + "€";
                    

                    
                                    product_list.appendChild(product_section_clone);

                                });
                            }


                        }
                        
                    },
                    rendering_script : (element)=>{

                        const product_list = element.querySelector("[tmpval_eng = prod]"); 
                        const product_section_all = product_list.querySelectorAll("[tmpval_eng = prod-template]");
                        let product_section = product_section_all[0];
                        for(const elm of product_section_all){
                            elm.remove();
                        }

                        const img = product_section.querySelector("img");
                        img.src = "/img/blank_img.jpg";

                        product_list.appendChild(product_section);
                        
                    }
                },
                {
                    value : "[tmpval_eng = prod-group]",
                    run_script : async (element)=>{

                        const product_list = element.querySelector("[tmpval_eng = prod-group]"); 
                                        
                        if(options.product.group[0] != undefined){

                            let group_list = await fetch("/client/group",{
                                method:"POST",
                                headers:{
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify({
                                    id_key: options.product.group[0].id_key
                                })
                            });
                            group_list = await group_list.json();
                            
                            if(!group_list.error){

                                /// product template
                                const product_section_all = product_list.querySelectorAll("[tmpval_eng = prod-group-template]");
                                let product_section = product_section_all[0];
                                for(const elm of product_section_all){
                                    elm.remove();
                                }


                                group_list.forEach(element => {

                                    //product template clone
                                    const product_section_clone = product_section.cloneNode("true");
                                    product_section_clone.removeAttribute("style");
                    
                                    const img = product_section_clone.querySelector("img");
                                    img.src = "/product/"+ element.image;
                    
                                    const title = product_section_clone.querySelector("[tmpval_eng = prod-group-template-title]");
                                    title.innerText = element.name; 
                    
                                    const price = product_section_clone.querySelector("[tmpval_eng = prod-group-template-price]");
                                    price.innerText = element.price/100 + "€";
                    

                    
                                    product_list.appendChild(product_section_clone);

                                });
                            }


                        }
                        
                    },
                    rendering_script : (element)=>{

                        const product_list = element.querySelector("[tmpval_eng = prod-group]"); 
                        const product_section_all = product_list.querySelectorAll("[tmpval_eng = prod-group-template]");
                        let product_section = product_section_all[0];
                        for(const elm of product_section_all){
                            elm.remove();
                        }

                        const img = product_section.querySelector("img");
                        img.src = "/img/blank_img.jpg";

                        product_list.appendChild(product_section);
                        
                    }
                },
                {
                    value : "[tmpval_eng = prod_pg_sec]",
                    run_script : async (element)=>{

                        if(options.product.product[0]){

                            let product = await fetch("/client/product",{
                                method:"POST",
                                headers:{
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify({id: options.product.product[0].id})
                            });

                            product = await product.json();
                            product = product.response;

                            const main_img = "/product/" + product.product.image;

                            const main_img_cnt = element.querySelector("#prd_main_img");
                            main_img_cnt.src = main_img;

                            //images
                            const img_cnt_parent = element.querySelector("#prd_img_parent");
                            const img_template_div = element.querySelector("#prd_img_tmp");

                            
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

                        }

                        
                        
                    },
                    rendering_script : (element)=>{

                        const blank_src = "/img/blank_img.jpg";

                        const main_img_cnt = element.querySelector("#prd_main_img");
                        main_img_cnt.src = blank_src;


                        //images
                        const img_cnt_parent = element.querySelector("#prd_img_parent");
                        const img_template_div = element.querySelector("#prd_img_tmp");

                        img_cnt_parent.innerHTML = "";
                        const img = img_template_div.querySelector("img");
                        img.src = blank_src;

                        img_cnt_parent.appendChild(img_template_div);
                    }
                }
            ]
                
            
        };

        //page sections
        let header = await fetch("/page/html/header.html");
        header = await header.text();

        let footer = await fetch("/page/html/footer.html");
        footer = await footer.text();

        //generic data
        let gen_info_data = await fetch("/gen_info");
        gen_info_data = await gen_info_data.json();
        gen_info_data = gen_info_data.response;

        const arr = template_data(gen_info_data,header,footer);
        //

        options.template_update_page.header = arr[0];
        options.template_update_page.footer = arr[1];


        const temp_html_parent = document.createElement("section");

        let home_page = await fetch("/page/html/home.html");
        home_page = await home_page.text();
        temp_html_parent.innerHTML = home_page;
        home_page = temp_html_parent.querySelectorAll("#work_section");

        let group_page = await fetch("/page/html/products.html");
        group_page = await group_page.text();
        temp_html_parent.innerHTML = group_page;
        group_page = temp_html_parent.querySelectorAll("#work_section");

        let product_page = await fetch("/page/html/product.html");
        product_page = await product_page.text();
        temp_html_parent.innerHTML = product_page;
        product_page = temp_html_parent.querySelectorAll("#work_section");


        options.template_update_page.pages = [home_page,group_page,product_page];


        /////// run the template engine
        const template = await edit_engine(options);
        
        
        //delete the old template
        await fetch("/admin/template/remove");

        //send the media file
        await Promise.all(
            template.file.map(async(element) => {
            
                const data = new FormData();
                data.append("media", element)
                await fetch("/admin/template/media",{
                    method:"POST",
                    body:data
                })
        
            })
        );
        

        //send the page file
        await Promise.all(
            template.pages.map(async(element) => {

                const data = new FormData();
                data.append("page", element)
                await fetch("/admin/template/page",{
                    method:"POST",
                    body:data
                })

            })
        );
        

        window.location.href = "/admin/home.html";


    })();

    function template_data(gen_info_data,header,footer){

        const section = document.createElement("section");
        section.innerHTML = header;

        header = section.querySelector("section");

        section.innerHTML = footer;
        footer = section.querySelector("section");
        

        const header_logo = header.querySelector("#nav_group_logo_img");
        const footer_logo = footer.querySelector("#footer_logo");
        if(gen_info_data.logo_img != null){
            header_logo.src = "/product/"+ gen_info_data.logo_img;
            footer_logo.src = "/product/"+ gen_info_data.logo_img;
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

        return [header,footer];
    }
}