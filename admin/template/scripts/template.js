
/////edit_engine.js V0.0.1
async function edit_engine(options){


    ////  html page template
    const pages = [
        document.createElement("div"), // index 0 => home
        document.createElement("div"), // index 1 => group
        document.createElement("div") // index 2 => product
    ];
    const page_id = ["home_pg", "group_pg", "product_pg"];


    
    ///option elements
    let option_elements = await fetch("/admin/template/statics/template.json");
    option_elements = await option_elements.json();
    option_elements = option_elements.option;


    let style,template_data;

    ///static style request
    style = await fetch("/admin/template/statics/generic_body.css"); // style 
    style = await style.text();

    //// temaplte request
    template_data = options.template_update_page;

    /// insert the sections into the right page
    for(let i = 0; i < pages.length; i++){
        template_section(i, pages[i]);
    }

    function template_section(index, parent_element){

        let header = template_data.header.cloneNode(true);
        parent_element.appendChild(header);

        for(let i = 0; i < template_data.pages[index].length; i++){
            parent_element.appendChild(template_data.pages[index][i]);
        };

        let footer = template_data.footer.cloneNode(true);
        parent_element.appendChild(footer);

    }

    


    /////// current page
    let index = 0; 
    function update_index_page(value){
        if(value == -1){
            if(index > 0){
                index--
            }
        }else if(value == +1){
            if(index < pages.length-1){
                index++
            }
        }

        /// update the page
        update_current_page();
    }

    options.working_html_element.next_btn.onclick = ()=>{
        if(index < pages.length - 1){
            index ++;
            update_index_page();
        }
    }

    options.working_html_element.previous_btn.onclick = ()=>{
        if(index > 0){
            index --;
            update_index_page();
        }
    }

    /// update the page inside the main page
    function update_current_page (){

        options.working_html_element.template_area.innerHTML = "";

        
        const generic_style = document.createElement("style");
        generic_style.innerHTML = style;
        generic_style.rel = "stylesheet";


        options.working_html_element.template_area.appendChild(generic_style);
        
        
        options.working_html_element.template_area.appendChild(pages[index]);


        pg_onload(pages[index]);
    }





    ////////////// page manager 

    // color picker
    function color_pick(a){
        const pickr = Pickr.create({
            el: '.color-picker',
            theme: 'monolith', // or 'monolith', or 'nano'
            inline: true,
            useAsButton: true,
            default: a,
            components: {
        
                // Main components
                preview: true,
                opacity: true,
                hue: true,
        
                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: true,
                    input: true,
                    save: true
                }
            }
        });
        pickr.on('hide',()=>{
            pickr.destroyAndRemove();
            const div = document.createElement("div");
            div.className = "color-picker";
            hide_option.appendChild(div);
        })
        return pickr;
    }

    // render section
    function render_script(section){
    
        options.render_functions.map(async x =>{

            if(section.querySelectorAll(x.value).length != 0){
                await x.run_script(section);
                prevent_click(section);

                section.click();
            };
            
            
        });

    }

    pages.map(x=>{

        const sections = x.querySelectorAll("#work_section");

        for(const section of sections){
            render_script(section);
        }

    })

    //prevent click
    function prevent_click(section){

        // prevent redirect
        const a = section.querySelectorAll("a");
        const button = section.querySelectorAll("button");

        const prevent_array = [...a,...button];

        prevent_array.map(x =>{
            x.onclick = (evt)=>{
                evt.preventDefault();
            }
        })
    }


    function pg_onload(page){

        prevent_click(page)
        

        //options
        page = page.querySelectorAll("#work_section");


        //cgenerate option
        for(let i = 0; i < page.length; i++){

            const element = page[i];

            element.onclick = ()=>{

                const option_element_rm_child = options.working_html_element.option_area.querySelectorAll(".option_child");
                option_element_rm_child.forEach(element => {
                    element.remove();
                });        

                //create the oprion div
                let option_div = document.createElement("div");
                option_div.className = "option_child";

                /// title
                const title = element.querySelectorAll("[tmpVal = title]"); 
                for(let i = 0; i < title.length; i++){
                    let cont_div = document.createElement("div");
                    cont_div.className = "option_top_border";
                    cont_div.innerHTML = option_elements.title;
                    const input = cont_div.getElementsByTagName("input");
                    input[0].value = title[i].textContent;
                    input[0].onchange = ()=>{
                        title[i].textContent = input[0].value;
                    }

                    //color
                    let current_color = getComputedStyle(title[i]).color;
                    const color_btn = cont_div.querySelector("button");
                    color_btn.style.backgroundColor = current_color;

                    color_btn.onclick = ()=>{
                        const clPik = color_pick(current_color);
                        clPik.show();
                        clPik.on('save',(c)=>{
                            c = c.toRGBA();
                            current_color = "rgba("+Math.round(c[0])+","+Math.round(c[1])+","+Math.round(c[2])+","+c[3]+")";
                            color_btn.style.backgroundColor = current_color;
                            title[i].style.color = current_color;
                            clPik.hide();
                        });
                    }

                    option_div.appendChild(cont_div);

                    
                }

                ///editable-div
                const editable_div = element.querySelectorAll("[tmpVal = editable-div]");
                for(let i = 0; i < editable_div.length; i++){
                    let cont_div = document.createElement("div");
                    cont_div.className = "option_top_border";
                    cont_div.innerHTML = option_elements.editable_div;
                    const select = cont_div.getElementsByTagName("select");
                    const input_tag = cont_div.querySelectorAll('input[type="text"]')//$(cont_div).find("input:text");
                    const b_rad = [0,0,0,0];
                    const b_val = ["px","px","px","px"];
                    const index_fix = [0,1,3,2];
                    const cmp_style = getComputedStyle(editable_div[i]);
                    const curr_br = cmp_style.borderRadius.split(" ");
                    if(curr_br.length == 1){
                        if(curr_br[0].slice(-1) != "%"){
                            b_val.fill("px");
                            b_rad.fill(curr_br[0].slice(0,-2));
                        }else{
                            b_val.fill("%");
                            b_rad.fill(curr_br[0].slice(0,-1));
                        }
                    }else if(curr_br.length == 2){
                        for(let J = 0; J < 2; J++){
                            if(curr_br[J].slice(-1) != "%"){
                                b_val[J] = b_val[J+2]= "px";
                                b_rad[J] = b_rad[J+2] = curr_br[J].slice(0,-2);
                            }else{
                                b_val[J] = b_val[J+2] = "%";
                                b_rad[J] = b_rad[J+2] = curr_br[J].slice(0,-1);
                            }
                        
                        }
                    
                    }else if(curr_br.length <= 4){
                        if(curr_br.length == 3){
                            //curr_br.splice(2,0,curr_br[1]);
                            curr_br.push(curr_br[1]);
                        }
                        for(let J = 0; J < 4; J++){
                            if(curr_br[J].slice(-1) != "%"){
                                b_val[J] = "px";
                                b_rad[J] = curr_br[J].slice(0,-2);
                            }else{
                                b_val[J] = "%";
                                b_rad[J] = curr_br[J].slice(0,-1);
                            }
                        }
                    }
                    
                    function changeBd(){
                        const tmparr = [];
                        b_rad.map((x,y,z)=>{
                            tmparr.push(x+b_val[y]);
                        });
                        editable_div[i].style.borderRadius = tmparr.join(" ");
                    }
                    for(let J = 0; J < input_tag.length; J++){
                        input_tag[J].value = b_rad[index_fix[J]];
                        select[J].value = b_val[index_fix[J]];
                        input_tag[J].onchange = ()=>{
                            b_rad[index_fix[J]] = input_tag[J].value;
                            changeBd();
                        }
                        select[J].onchange = ()=>{
                            b_val[index_fix[J]] = select[J].value;
                            changeBd();
                        }
                    }

                    // select 
                    const obj = {
                        "img": cmp_style.backgroundImage,
                        "bc": cmp_style.backgroundColor
                    };
                    let c = document.createElement("div")
                    c.style.backgroundColor
                    function updateback(t){
                        if(t == "bc"){
                            editable_div[i].style.backgroundImage = "initial";
                            editable_div[i].style.backgroundColor = obj.bc;
                        }else if( t == "img"){
                            editable_div[i].style.backgroundImage = "url("+obj.img+")";
                        }
                    }
                    const col_img_cot_div = cont_div.getElementsByClassName("editale_div_background_div_div")[0].getElementsByTagName("div");
                    const color = col_img_cot_div[0];
                    const img = col_img_cot_div[1];
                    if(obj.img != "none"){
                        select[4].value = "image";
                        color.style.display = "none";
                        img.style.display = "flex";
                    }
                    select[4].onchange = ()=>{
                        if(select[4].value == "image"){
                            color.style.display = "none";
                            img.style.display = "flex";
                            updateback("img");
                        }else{
                            color.style.display = "flex";
                            img.style.display = "none";
                            updateback("bc");
                        }
                    }
                    const img_input = img.getElementsByTagName("input")[0];
                    img_input.onchange = ()=>{
                        const read = new FileReader();
                        read.onload = (rs)=>{
                            obj.img = read.result;
                            updateback("img");
                        }
                        read.readAsDataURL(img_input.files[0]);
                    }
                    const bc_input = color.getElementsByTagName("button")[0];
                    bc_input.style.backgroundColor = obj.bc;
                    bc_input.onclick = ()=>{
                        const clPik = color_pick(obj.bc);
                        clPik.show();
                        clPik.on('save',(c)=>{
                            c = c.toRGBA();
                            obj.bc = "rgba("+Math.round(c[0])+","+Math.round(c[1])+","+Math.round(c[2])+","+c[3]+")";
                            updateback("bc");
                            clPik.hide();
                            bc_input.style.backgroundColor = obj.bc;
                        });
                    }
                    
                    ///
                    option_div.appendChild(cont_div);
                }

                ///text
                const text = element.querySelectorAll("[tmpVal = text]");
                for(let i = 0; i< text.length; i++){                    
                    let cont_div = document.createElement("div");
                    cont_div.className = "option_top_border";
                    cont_div.innerHTML = option_elements.text;

                    const txt = cont_div.getElementsByTagName("textarea")[0];
                    txt.value = text[i].textContent;
                    const btn = cont_div.getElementsByTagName("button")[0];
                    btn.onclick = ()=>{
                        let f = txt.value.split("\n");
                        f = f.join("<br>");
                        text[i].innerHTML = f;

                    }
                    //end
                    option_div.appendChild(cont_div);
                }

                ///button
                const button = element.querySelectorAll("[tmpVal = button]");
                for(let i = 0; i < button.length; i++){
                    let cont_div = document.createElement("div");
                    cont_div.className = "option_top_border";
                    cont_div.innerHTML = option_elements.button;
                    const pEl = button[i].getElementsByTagName("p")[0];


                    const inp = cont_div.getElementsByTagName("input")[0];
                    inp.value = pEl.textContent;
                    inp.onchange = ()=>{
                        pEl.textContent = inp.value;
                        
                    }
                    const colors = cont_div.getElementsByTagName("button");
                    const aStyle = getComputedStyle(button[i]);
                    const pStyle = getComputedStyle(pEl);
                    const text_color = colors[0];
                    let text_color_cl = pStyle.color;

                    text_color.style.backgroundColor = text_color_cl;

                    text_color.onclick = ()=>{
                        const clPik = color_pick(text_color_cl);
                        clPik.show();
                        clPik.on('save',(c)=>{
                            c = c.toRGBA();
                            text_color_cl = "rgba("+Math.round(c[0])+","+Math.round(c[1])+","+Math.round(c[2])+","+c[3]+")";
                            button[i].style.borderColor = text_color_cl;
                            pEl.style.color = text_color_cl;
                            clPik.hide();
                            text_color.style.backgroundColor = text_color_cl;
                            
                        });
                    }


                    //// border radius
                    const select = cont_div.getElementsByTagName("select");
                    const input_tag = cont_div.getElementsByClassName("button_border_r_div_grid")[0].getElementsByTagName("input");
                    

                    const b_rad = [0,0,0,0];
                    const b_val = ["px","px","px","px"];
                    const index_fix = [0,1,3,2];
                    const curr_br = aStyle.borderRadius.split(" ");

                    if(curr_br.length == 1){
                        if(curr_br[0].slice(-1) != "%"){
                            b_val.fill("px");
                            b_rad.fill(curr_br[0].slice(0,-2));
                        }else{
                            b_val.fill("%");
                            b_rad.fill(curr_br[0].slice(0,-1));
                        }
                    }else if(curr_br.length == 2){
                        for(let J = 0; J < 2; J++){
                            if(curr_br[J].slice(-1) != "%"){
                                b_val[J] = b_val[J+2]= "px";
                                b_rad[J] = b_rad[J+2] = curr_br[J].slice(0,-2);
                            }else{
                                b_val[J] = b_val[J+2] = "%";
                                b_rad[J] = b_rad[J+2] = curr_br[J].slice(0,-1);
                            }
                        
                        }
                    
                    }else if(curr_br.length <= 4){
                        if(curr_br.length == 3){
                            //curr_br.splice(2,0,curr_br[1]);
                            curr_br.push(curr_br[1]);
                        }
                        for(let J = 0; J < 4; J++){
                            if(curr_br[J].slice(-1) != "%"){
                                b_val[J] = "px";
                                b_rad[J] = curr_br[J].slice(0,-2);
                            }else{
                                b_val[J] = "%";
                                b_rad[J] = curr_br[J].slice(0,-1);
                            }
                        }
                    }

                    function changeBd(){
                        const tmparr = [];
                        b_rad.map((x,y,z)=>{
                            tmparr.push(x+b_val[y]);
                        });
                        button[i].style.borderRadius = tmparr.join(" ");
                        
                    }
                    for(let J = 0; J < input_tag.length; J++){
                        input_tag[J].value = b_rad[index_fix[J]];
                        select[J].value = b_val[index_fix[J]];
                        input_tag[J].onchange = ()=>{
                            b_rad[index_fix[J]] = input_tag[J].value;
                            changeBd();
                        }
                        select[J].onchange = ()=>{
                            b_val[index_fix[J]] = select[J].value;
                            changeBd();
                        }
                    }

                    //// link group/product
                    const group_btn = cont_div.querySelector("#group_btn_lnk");
                    const product_btn = cont_div.querySelector("#product_btn_lnk");
                    const list_template = cont_div.querySelector("#list_btn_lnk");

                    const list_cnt = cont_div.querySelector("#list_cnt");

                    const group_list_cnt = document.createElement("div");
                    const product_list_cnt = document.createElement("div");

                    // group id
                    const url_id = button[i].getAttribute("href");

                    //group list
                    for(let J = 0; J < options.product.group.length; J++){
                        
                        options.product.group[J].id = options.product.group[J].id_key;
                            
                        const clone_lst_template = list_template.cloneNode(true);
                        clone_lst_template.setAttribute("id", options.product.group[J].id);
                        clone_lst_template.classList.remove("hide");

                        const check = clone_lst_template.querySelector("input");
                        const name = clone_lst_template.querySelector("p");
                        
                        name.innerText = options.product.group[J].name;

                        if(url_id == options.group_url + options.product.group[J].id){
                            check.checked = true;
                        }

                        check.onchange = ()=>{
                            check_link(options.product.group[J], options.group_url , check.checked);
                        }

                        group_list_cnt.appendChild(clone_lst_template);

                    }

                    //product_list
                    for(let J = 0; J < options.product.product.length; J++){
                            
                        const clone_lst_template = list_template.cloneNode(true);
                        clone_lst_template.setAttribute("id", options.product.product[J].id);
                        clone_lst_template.classList.remove("hide");

                        const check = clone_lst_template.querySelector("input");
                        const name = clone_lst_template.querySelector("p");

                        if(url_id == options.product_url + options.product.product[J].id){
                            check.checked = true;
                        }
                        
                        name.innerText = options.product.product[J].name;

                        check.onchange = ()=>{
                            check_link(options.product.product[J], options.product_url, check.checked);
                        }

                        product_list_cnt.appendChild(clone_lst_template);

                    }


                    group_btn.onclick = ()=>{
                        list_cnt.innerHTML = "";
                        list_cnt.appendChild(group_list_cnt);
                    }

                    product_btn.onclick = ()=>{
                        list_cnt.innerHTML = "";
                        list_cnt.appendChild(product_list_cnt);
                    }

                    function check_link(element, url, status){

                        // set the new url of the button
                        if(status == false){
                            button[i].setAttribute("href", "/");
                        }else{
                            button[i].setAttribute("href", url + element.id);
                        }


                        // remove all the old chek
                        const product_list = product_list_cnt.querySelectorAll("div");
                        const group_list = group_list_cnt.querySelectorAll("div");

                        group_list.forEach(el=>{

                            const input = el.querySelector("input");
                            if(el.getAttribute("id") != element.id){
                                input.checked = false;
                            }else if(url != options.group_url){
                                input.checked = false;
                            }

                        });

                        product_list.forEach(el=>{

                            const input = el.querySelector("input");
                            if(el.getAttribute("id") != element.id){
                                input.checked = false;
                            }else if(url != options.product_url){
                                input.checked = false;
                            }

                        });

                    };

                    group_btn.onclick();

                    //end
                    option_div.appendChild(cont_div);
                }

                ///button_ng_bk (no group background)
                const button_ng_bk = element.querySelectorAll("[tmpVal = button_ng_bk]");
                for(let i = 0; i < button_ng_bk.length; i++){
                    let cont_div = document.createElement("div");
                    cont_div.className = "option_top_border";
                    cont_div.innerHTML = option_elements.button_ng;
                    const pEl = button_ng_bk[i].getElementsByTagName("p")[0];


                    const inp = cont_div.getElementsByTagName("input")[0];
                    inp.value = pEl.textContent;
                    inp.onchange = ()=>{
                        pEl.textContent = inp.value;
                        
                    }
                    const colors = cont_div.getElementsByTagName("button");
                    const aStyle = getComputedStyle(button_ng_bk[i]);
                    const text_color = colors[0];
                    let text_color_cl = aStyle.backgroundColor;

                    text_color.style.backgroundColor = text_color_cl;

                    text_color.onclick = ()=>{
                        const clPik = color_pick(text_color_cl);
                        clPik.show();
                        clPik.on('save',(c)=>{
                            c = c.toRGBA();
                            text_color_cl = "rgba("+Math.round(c[0])+","+Math.round(c[1])+","+Math.round(c[2])+","+c[3]+")";
                            button_ng_bk[i].style.borderColor = text_color_cl;
                            button_ng_bk[i].style.backgroundColor = text_color_cl;
                            clPik.hide();
                            text_color.style.backgroundColor = text_color_cl;
                            
                        });
                    }


                    //// border radius
                    const select = cont_div.getElementsByTagName("select");
                    const input_tag = cont_div.getElementsByClassName("button_border_r_div_grid")[0].getElementsByTagName("input");
                    

                    const b_rad = [0,0,0,0];
                    const b_val = ["px","px","px","px"];
                    const index_fix = [0,1,3,2];
                    const curr_br = aStyle.borderRadius.split(" ");

                    if(curr_br.length == 1){
                        if(curr_br[0].slice(-1) != "%"){
                            b_val.fill("px");
                            b_rad.fill(curr_br[0].slice(0,-2));
                        }else{
                            b_val.fill("%");
                            b_rad.fill(curr_br[0].slice(0,-1));
                        }
                    }else if(curr_br.length == 2){
                        for(let J = 0; J < 2; J++){
                            if(curr_br[J].slice(-1) != "%"){
                                b_val[J] = b_val[J+2]= "px";
                                b_rad[J] = b_rad[J+2] = curr_br[J].slice(0,-2);
                            }else{
                                b_val[J] = b_val[J+2] = "%";
                                b_rad[J] = b_rad[J+2] = curr_br[J].slice(0,-1);
                            }
                        
                        }
                    
                    }else if(curr_br.length <= 4){
                        if(curr_br.length == 3){
                            //curr_br.splice(2,0,curr_br[1]);
                            curr_br.push(curr_br[1]);
                        }
                        for(let J = 0; J < 4; J++){
                            if(curr_br[J].slice(-1) != "%"){
                                b_val[J] = "px";
                                b_rad[J] = curr_br[J].slice(0,-2);
                            }else{
                                b_val[J] = "%";
                                b_rad[J] = curr_br[J].slice(0,-1);
                            }
                        }
                    }

                    function changeBd(){
                        const tmparr = [];
                        b_rad.map((x,y,z)=>{
                            tmparr.push(x+b_val[y]);
                        });
                        button_ng_bk[i].style.borderRadius = tmparr.join(" ");
                        
                    }
                    for(let J = 0; J < input_tag.length; J++){
                        input_tag[J].value = b_rad[index_fix[J]];
                        select[J].value = b_val[index_fix[J]];
                        input_tag[J].onchange = ()=>{
                            b_rad[index_fix[J]] = input_tag[J].value;
                            changeBd();
                        }
                        select[J].onchange = ()=>{
                            b_val[index_fix[J]] = select[J].value;
                            changeBd();
                        }
                    }

                    

                    //end
                    option_div.appendChild(cont_div);
                }
                
                ///button_ng (no group)
                const button_ng = element.querySelectorAll("[tmpVal = button_ng]");
                for(let i = 0; i < button_ng.length; i++){
                    let cont_div = document.createElement("div");
                    cont_div.className = "option_top_border";
                    cont_div.innerHTML = option_elements.button_ng;
                    const pEl = button_ng[i].getElementsByTagName("p")[0];


                    const inp = cont_div.getElementsByTagName("input")[0];
                    inp.value = pEl.textContent;
                    inp.onchange = ()=>{
                        pEl.textContent = inp.value;
                        
                    }
                    const colors = cont_div.getElementsByTagName("button");
                    const aStyle = getComputedStyle(button_ng[i]);
                    const pStyle = getComputedStyle(pEl);
                    const text_color = colors[0];
                    let text_color_cl = pStyle.color;

                    text_color.style.backgroundColor = text_color_cl;

                    text_color.onclick = ()=>{
                        const clPik = color_pick(text_color_cl);
                        clPik.show();
                        clPik.on('save',(c)=>{
                            c = c.toRGBA();
                            text_color_cl = "rgba("+Math.round(c[0])+","+Math.round(c[1])+","+Math.round(c[2])+","+c[3]+")";
                            button_ng[i].style.borderColor = text_color_cl;
                            pEl.style.color = text_color_cl;
                            clPik.hide();
                            text_color.style.backgroundColor = text_color_cl;
                            
                        });
                    }


                    //// border radius
                    const select = cont_div.getElementsByTagName("select");
                    const input_tag = cont_div.getElementsByClassName("button_border_r_div_grid")[0].getElementsByTagName("input");
                    

                    const b_rad = [0,0,0,0];
                    const b_val = ["px","px","px","px"];
                    const index_fix = [0,1,3,2];
                    const curr_br = aStyle.borderRadius.split(" ");

                    if(curr_br.length == 1){
                        if(curr_br[0].slice(-1) != "%"){
                            b_val.fill("px");
                            b_rad.fill(curr_br[0].slice(0,-2));
                        }else{
                            b_val.fill("%");
                            b_rad.fill(curr_br[0].slice(0,-1));
                        }
                    }else if(curr_br.length == 2){
                        for(let J = 0; J < 2; J++){
                            if(curr_br[J].slice(-1) != "%"){
                                b_val[J] = b_val[J+2]= "px";
                                b_rad[J] = b_rad[J+2] = curr_br[J].slice(0,-2);
                            }else{
                                b_val[J] = b_val[J+2] = "%";
                                b_rad[J] = b_rad[J+2] = curr_br[J].slice(0,-1);
                            }
                        
                        }
                    
                    }else if(curr_br.length <= 4){
                        if(curr_br.length == 3){
                            //curr_br.splice(2,0,curr_br[1]);
                            curr_br.push(curr_br[1]);
                        }
                        for(let J = 0; J < 4; J++){
                            if(curr_br[J].slice(-1) != "%"){
                                b_val[J] = "px";
                                b_rad[J] = curr_br[J].slice(0,-2);
                            }else{
                                b_val[J] = "%";
                                b_rad[J] = curr_br[J].slice(0,-1);
                            }
                        }
                    }

                    function changeBd(){
                        const tmparr = [];
                        b_rad.map((x,y,z)=>{
                            tmparr.push(x+b_val[y]);
                        });
                        button_ng[i].style.borderRadius = tmparr.join(" ");
                        
                    }
                    for(let J = 0; J < input_tag.length; J++){
                        input_tag[J].value = b_rad[index_fix[J]];
                        select[J].value = b_val[index_fix[J]];
                        input_tag[J].onchange = ()=>{
                            b_rad[index_fix[J]] = input_tag[J].value;
                            changeBd();
                        }
                        select[J].onchange = ()=>{
                            b_val[index_fix[J]] = select[J].value;
                            changeBd();
                        }
                    }

                    

                    //end
                    option_div.appendChild(cont_div);
                }

                ///button_ng_rp (no group repeat)
                let button_ng_rp = element.querySelector("[tmpVal = button_ng_rp]");
                (()=>{
                    if(button_ng_rp){
                        let cont_div = document.createElement("div");
                        cont_div.className = "option_top_border";
                        cont_div.innerHTML = option_elements.button_ng;

                        const pEl = button_ng_rp.querySelector("p");


                        const inp = cont_div.getElementsByTagName("input")[0];

                        inp.value = pEl.textContent;
                        inp.onchange = ()=>{
                            pEl.textContent = inp.value;
                            render_script(element);
                            
                        }
                        const colors = cont_div.getElementsByTagName("button");
                        const aStyle = getComputedStyle(button_ng_rp);
                        const pStyle = getComputedStyle(pEl);
                        const text_color = colors[0];
                        let text_color_cl = pStyle.color;

                        text_color.style.backgroundColor = text_color_cl;

                        text_color.onclick = ()=>{
                            const clPik = color_pick(text_color_cl);
                            clPik.show();
                            clPik.on('save',(c)=>{

                                c = c.toRGBA();
                                text_color_cl = "rgba("+Math.round(c[0])+","+Math.round(c[1])+","+Math.round(c[2])+","+c[3]+")";
                                button_ng_rp.style.borderColor = text_color_cl;
                                pEl.style.color = text_color_cl;
                                clPik.hide();
                                text_color.style.backgroundColor = text_color_cl;
                                render_script(element);
                                
                            });
                        }


                        //// border radius
                        const select = cont_div.getElementsByTagName("select");
                        const input_tag = cont_div.getElementsByClassName("button_border_r_div_grid")[0].getElementsByTagName("input");
                        

                        const b_rad = [0,0,0,0];
                        const b_val = ["px","px","px","px"];
                        const index_fix = [0,1,3,2];
                        const curr_br = aStyle.borderRadius.split(" ");

                        if(curr_br.length == 1){
                            if(curr_br[0].slice(-1) != "%"){
                                b_val.fill("px");
                                b_rad.fill(curr_br[0].slice(0,-2));
                            }else{
                                b_val.fill("%");
                                b_rad.fill(curr_br[0].slice(0,-1));
                            }
                        }else if(curr_br.length == 2){
                            for(let J = 0; J < 2; J++){
                                if(curr_br[J].slice(-1) != "%"){
                                    b_val[J] = b_val[J+2]= "px";
                                    b_rad[J] = b_rad[J+2] = curr_br[J].slice(0,-2);
                                }else{
                                    b_val[J] = b_val[J+2] = "%";
                                    b_rad[J] = b_rad[J+2] = curr_br[J].slice(0,-1);
                                }
                            
                            }
                        
                        }else if(curr_br.length <= 4){
                            if(curr_br.length == 3){
                                //curr_br.splice(2,0,curr_br[1]);
                                curr_br.push(curr_br[1]);
                            }
                            for(let J = 0; J < 4; J++){
                                if(curr_br[J].slice(-1) != "%"){
                                    b_val[J] = "px";
                                    b_rad[J] = curr_br[J].slice(0,-2);
                                }else{
                                    b_val[J] = "%";
                                    b_rad[J] = curr_br[J].slice(0,-1);
                                }
                            }
                        }

                        function changeBd(){
                            const tmparr = [];
                            b_rad.map((x,y,z)=>{
                                tmparr.push(x+b_val[y]);
                            });
                            button_ng_rp.style.borderRadius = tmparr.join(" ");
                            render_script(element);
                            
                        }

                        for(let J = 0; J < input_tag.length; J++){
                            input_tag[J].value = b_rad[index_fix[J]];
                            select[J].value = b_val[index_fix[J]];
                            input_tag[J].onchange = ()=>{
                                b_rad[index_fix[J]] = input_tag[J].value;
                                changeBd();
                            }
                            select[J].onchange = ()=>{
                                b_val[index_fix[J]] = select[J].value;
                                changeBd();
                            }
                        }

                        

                        //end
                        option_div.appendChild(cont_div);
                    }
                })();
                

                
                ///group_product
                const group_product = element.querySelectorAll("[tmpVal = prod]");
                for(let i = 0; i < group_product.length; i++){

                    let cont_div = document.createElement("div");
                    cont_div.className = "option_top_border";
                    cont_div.innerHTML = option_elements.product_group;


                    //// link group/product
                    const list_template = cont_div.querySelector("#list_btn_lnk");

                    const list_cnt = cont_div.querySelector("#list_cnt");

                    const group_list_cnt = document.createElement("div");

                    //group list
                    for(let J = 0; J < options.product.group.length; J++){
                        
                        options.product.group[J].id = options.product.group[J].id_key;
                            
                        const clone_lst_template = list_template.cloneNode(true);
                        clone_lst_template.setAttribute("id", options.product.group[J].id);
                        clone_lst_template.classList.remove("hide");

                        const check = clone_lst_template.querySelector("input");
                        const name = clone_lst_template.querySelector("p");
                        
                        name.innerText = options.product.group[J].name;

                        if(group_product[i].getAttribute("group") == options.product.group[J].id){
                            check.checked = true;
                        }

                        check.onchange = ()=>{
                            group_check_link(options.product.group[J], check.checked);
                            render_script(element);
                        }

                        group_list_cnt.appendChild(clone_lst_template);

                    }

                    list_cnt.appendChild(group_list_cnt);

                    function group_check_link(element,status){
                    
                        // set the new group 
                        if(status == false){
                            group_product[i].setAttribute("group", null);
                        }else{
                            group_product[i].setAttribute("group", element.id);
                        }


                        // remove all the old chek
                        const group_list = group_list_cnt.querySelectorAll("div");
                        group_list.forEach(el=>{

                            const input = el.querySelector("input");
                            if(el.getAttribute("id") != element.id){
                                input.checked = false;
                            }

                        });
                    }

                    //end
                    option_div.appendChild(cont_div);
                }

                ///end
                element.option = option_div;
                options.working_html_element.option_area.appendChild(element.option)
            }
        }

    }



    /////// run
    update_current_page();


    //clean end render function
    function clean_render_function(section){

        options.render_functions.map(async x =>{

            if(section.querySelectorAll(x.value).length != 0){
                await x.rendering_script(section);
            };
            
        });
    }


    /// end
    return new Promise((resolve)=>{

        options.working_html_element.download_btn.onclick = async()=>{

            //data
            const data = {
                file : [],
                pages : []
            }

            //old url
            const old_url = {

            };

            //clone all the page
            const page_clone = [];
            for(let i = 0; i < pages.length; i++){
                page_clone.push(pages[i].cloneNode(true));
            }

            page_clone.map(x=>{
                const sections = x.querySelectorAll("#work_section");

                for(const section of sections){
                    clean_render_function(section);
                }

            });

            //page name
            const page_name = ["home", "products", "product"];

            // remove the header and footer;
            for(let i = 0; i < page_clone.length; i++){
                const section_header = page_clone[i].querySelector(".section_header");
                const section_footer = page_clone[i].querySelector(".section-footer");
                section_header.remove();
                section_footer.remove();
            };
            const header = create_file(template_data.header.outerHTML, "text/html", "header");
            const footer = create_file(template_data.footer.outerHTML, "text/html", "footer");
            data.pages.push(header);  
            data.pages.push(footer);

            ///get all the images
            //get all the url
            const page_url = [];

            ///utility functoins
            async function url_to_file(e, index){

                let file;

                try{
                    
                    const Blob = dataURItoBlob(JSON.parse(e.replace(/&quot;/g,'"')));
                    file = new File([Blob], index.toString()+"."+Blob.type.split("/")[1]);

                }catch{
                    const URI = await getBase64Image(e);
                    
                    if(URI != false){
                        const Blob = dataURItoBlob(URI);
                        file = new File([Blob], index.toString()+"."+Blob.type.split("/")[1]);

                    }
                };

                return file;
            };

            async function getBase64Image(imgUrl) {

                return new Promise((res)=>{

                    const img = new Image();
            
                    // onload fires when the image is fully loadded, and has width and height
                
                    img.onload = function(){
                
                        const canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
                        const dataURL = canvas.toDataURL();

                        res(dataURL);

                    };
                
                    // set attributes and src 
                    img.setAttribute('crossOrigin', 'anonymous'); //
                    img.src = imgUrl;

                    img.onerror = ()=>{
                        res(false);
                    }
                })
            
            };

            function dataURItoBlob(dataURI){
                const decoded_url = window.atob(dataURI.split(",")[1]);
                
                const buffer = new ArrayBuffer(decoded_url.length);
                const Unit8_buffer = new Uint8Array(buffer);

                const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                for (let i1 = 0; i1 < decoded_url.length; i1++) {
                    Unit8_buffer[i1] = decoded_url.charCodeAt(i1);
                }
                
                return new Blob([buffer],{type: mimeString})
            };

            for(let i = 0; i < page_clone.length; i++){

                const sections = page_clone[i].querySelectorAll("#work_section");

                for(const [x,work_section] of sections.entries()){

                    //img element
                    const img = work_section.querySelectorAll("img");
                    for(const [t,J] of img.entries()){

                        if(!old_url[J.getAttribute("src")]){
                            const file = await url_to_file(J.getAttribute("src"), data.file.length);
                            if(file){
                                data.file.push(file);
                                old_url[J.getAttribute("src")] = file;

                                J.setAttribute("src", options.media_path + file.name);
                            }else{
                                J.setAttribute("src", "");
                            }

                        }else{
                            
                            J.setAttribute("src", options.media_path + old_url[J.getAttribute("src")].name);
                        }

                        
                    };


                    //backround url
                    let style = work_section.innerHTML;
                    style = style.split('url(');

                    let new_section_txt = style.shift();
                    for(const J of style){

                        let txt_split = J.split(')');
                        let url = txt_split.shift();
                        
                        txt_split = txt_split.join(')');

                        if(url[0] == '"' || url[0] == "'"){
                            url = url.substring(1,url.length-1)
                        }

                      
                        if(!old_url[url]){

                            const file = await url_to_file(url, data.file.length);
                            if(file){
                                data.file.push(file);
                                old_url[url] = file;


                                new_section_txt = new_section_txt + "url('"+ options.media_path + file.name+"')"+ txt_split;
                            }else{
                                new_section_txt = new_section_txt + "url('')"+ txt_split;
                            }

                        }else{
                            
                            new_section_txt = new_section_txt + "url('"+ options.media_path + old_url[url].name+"')"+ txt_split;
                        }
                    };

                    work_section.innerHTML = new_section_txt;
    
                }
                
            };


            ///create pages
            let blank_page = await fetch("/admin/template/statics/empty.html");
            blank_page = await blank_page.text();

            for(let i = 0; i < page_clone.length; i++){


                //html parser
                const parser = new DOMParser();
                const dom = parser.parseFromString(blank_page, "text/html");

                //change the page title
                const title = dom.querySelector("title");
                title.innerText = page_name[i];

                //body
                const body = dom.querySelector("body");

                //style
                const css_style = dom.createElement("style");
                css_style.innerHTML = style;
                body.appendChild(css_style);

                //page
                const page_div = dom.createElement("div");
                page_div.innerHTML = page_clone[i].innerHTML;
                body.appendChild(page_div);

                //html
                const html = dom.querySelector("html");
                options.page_script.map((x)=>{
                    const script = dom.createElement("script");
                    script.src = x;
                    html.appendChild(script);
                });

                const file = create_file(dom.documentElement.innerHTML, "text/html", page_name[i]);

                data.pages.push(file);
            }

            //create file function
            function create_file(content, type, title){
                const blob = new Blob([content], {type: type});
                const file = new File([blob], title +"."+ blob.type.split("/")[1]);
                return file;
            }


            resolve(data);
        }
    })
}