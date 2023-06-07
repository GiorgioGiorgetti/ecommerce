require('dotenv').config();
const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");
const cookieParser = require("cookie-parser");
const pg = require("pg");
const multer = require("multer");
const fs = require("fs");
const async_fs = require("fs/promises");
const stripe_rc = require("stripe");
const db = require("nedb");


///env. variables
const domain = process.env.DOMAIN;

//stripe setup
let stripe_sk = null;
let stripe = null;
let stripe_webhook = null;
let stripe_shipping = null;

let country_code = "AC AD AE AF AG AI AL AM AO AQ AR AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CD CF CG CH CI CK CL CM CN CO CR CV CW CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HN HR HT HU ID IE IL IM IN IO IQ IS IT JE JM JO JP KE KG KH KI KM KN KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MK ML MM MN MO MQ MR MS MT MU MV MW MX MY MZ NA NC NE NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PY QA RE RO RS RU RW SA SB SC SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SZ TA TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG US UY UZ VA VC VE VG VN VU WF WS XK YE YT ZA ZM ZW ZZ";
country_code = country_code.split(" ");


function sk_update(val){
    stripe_sk = val;
    stripe_update();
};
async function stripe_update(){
    
    stripe = await stripe_rc(stripe_sk);
    try{
        stripe_webhook = await stripe.webhookEndpoints.create({
            url: domain+"/client/order/webhook",
            enabled_events: ["checkout.session.completed"],
        })
        stripe_webhook = stripe_webhook.secret;
    }catch{
        stripe_webhook = null;
    }
};


//settings db setup
const gen_settings_db = new db("gen_info.db");
gen_settings_db.loadDatabase((err)=>{
    if(err){
        console.log(err);
    }
});

//general settings indormatino
let com_info = {
    title_img: null,
    logo_img: null,
    contacts:{
        phone1: null,
        phone2: null,
        email: null,
        whatsapp: null
    },
    link:{
        twitter: null,
        linkedin: null,
        instagram: null,
        facebook: null
    },
    p_iva: null,
    address: null,
    privacy_policy_link: null
};
let currency = null;
gen_settings_db.findOne({ _id:"stripe_setting"},(err,data)=>{
    if(!err){

        
        if(data.shipping_country != null){
            stripe_shipping = data.shipping_country;
        }else{
            stripe_shipping = country_code;
        };

        if(data.currency != null){
            currency = data.currency;
        };

        sk_update(data.sk);
    }else{
        console.log(err)
    }
});
gen_settings_db.findOne({ _id:"company_info"},(err,data)=>{
    if(!err){
        com_info.title_img = data.title_img;
        com_info.logo_img = data.logo_img;
        com_info.contacts = data.contacts;
        com_info.link = data.link;
        com_info.p_iva = data.p_iva;
        com_info.address = data.address;
        com_info.privacy_policy_link = data.privacy_policy_link;
        
    }
});


//server set up
const port = 5500;
const app = express();

// postgres client configuration
const product_client = new pg.Client({
    user:"server",
    password:"server_testing",
    database:"product",
});



// postgres connection
product_client.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connected to product database");
    }
});


// webhook middleware option
app.use((req, res, next) => {
    if (req.originalUrl === '/client/order/webhook') {
      next();
    } else {
        express.json()(req, res, next);
    }
  });//allow server recive json object
app.use(cookieParser());//manage the cookies


//// cookies names
// autentication => true or false if user is autenticated
// uscK => cookies session code 
// code => email confirm code
// Ac00 => admin cookies

app.use("/icon",express.static("./media/icon"));
app.use("/img",express.static("./media/img"));
app.use("/product",express.static("./media/product"));
app.use(express.static("./page"));//all te html page
app.use("/page/html",express.static("./page/template/page"));
app.use("/page/media",express.static("./page/template/media"));


//0 home page
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./page/template/page/home.html"));
});
app.get("/cart",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./page/cart.html"));
});
app.get("/gen_info",(req,res)=>{
    res.send({response: com_info});
});
app.get("/currency",(req,res)=>{
    res.send({response: currency});
})

/////////////////////////client group//////////////////////////
app.get("/client/group", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./page/client/group.html"));
})
// return the product
app.post("/client/product", async(req,res)=>{
    const id = req.body.id;

    try{
        const product = await product_client.query({
            text: "select * from products where id = $1",
            values: [id]
        });
        const data = product.rows[0];
        
        const images = await product_client.query({
            text: "select * from images where id = $1",
            values:[data.id]
        });

        if(product.rows.length == 1){
            if(data.option == true){
                const id_key = data.id_key;
                const option_list = await product_client.query({
                    text: "select option_name,option_id,description_list from option_list where id_key = $1",
                    values:[id_key]
                });
                const option_list_table = await product_client.query({
                    text: "select * from option_list_table where id_key = $1", values: [id_key] 
                });

                delete data.id_key;
                res.send({
                    response:{
                        product:data,
                        option: option_list.rows,
                        option_list: option_list_table.rows,
                        img: images.rows
                    }
                });
                
            }else{

                delete data.id_key;
                res.send({
                    response:{
                        product:data,
                        img: images.rows
                    }
                });

            }
        }else{
            res.send({error:"product not found"});
        }
    }catch(e){
        res.send({error:"product error"});
    }
})
//return main groups
app.get("/client/group_list",async (req,res)=>{

    try{
        const r = await product_client.query({text:"select name,id_key from group_list where main = true"})
        res.send({response:r.rows});
    }catch{
        res.send({error:true});
    }
});
//return group list
app.post("/client/group",async (req,res)=>{

    const data = req.body;
    try{
        const r = await product_client.query({text:"select * from group_list where id_key = $1",values:[data.id_key]});

        if(r.rows.length != 0){
            const id_key = r.rows[0].id_key;
            const response = await product_client.query({text:"select * from products join group_list_table on products.id = group_list_table.id and products.quantity > 0 and group_list_table.id_key = $1", values:[id_key]});
            res.send(response.rows);
            
        }else{
            res.send({error:true});
        }

    }catch{
        res.send({error:"request miss config"});
    }

});
//return all the products
app.get("/client/products",async (req,res)=>{
    try{
        const r = await product_client.query({text:"select * from products where quantity > 0"})
        res.send(r.rows);
    }catch{
        res.send({error:true});
    }
});
//stripe_webhook
app.post('/client/order/webhook', express.raw({type: 'application/json'}), async(req, res) => {
    
    const sig = req.headers['stripe-signature'];
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, stripe_webhook);
    } catch (err) {
      // On error, log and return the error message
      return res.sendStatus(400);
    }

    switch(event.type){
        case "checkout.session.completed":
            try{

                let order_list = await stripe.checkout.sessions.listLineItems(event.data.object.id);
                order_list = order_list.data;

                const insert_query = await product_client.query({
                    text: "insert into orders(stripe_cs_id,order_list,address,total_amount,user_email,phone,currency) values($1,$2,$3,$4,$5,$6,$7) returning id_key",
                    values: [event.data.object.id ,JSON.stringify(order_list),JSON.stringify(event.data.object.shipping_details) ,event.data.object.amount_total ,event.data.object.customer_details.email ,event.data.object.customer_details.phone,event.data.object.currency ]
                });

                order_list = await Promise.all(
                    order_list.map(async(x,y)=>{
                        
                        const obj = {
                            id: null,
                            quantity: x.quantity,
                            price_data:{
                                unit_amount: x.price.unit_amount,
                            }
                        }
                        const product = await stripe.products.retrieve(x.price.product);
                        
                        let description = product.description;
                        description = description.split(";");


                        // id 
                        const id = description[0].split(": ")[1];

                        obj.id = id;

                        const update_product_table = await product_client.query({
                            text: "update products set quantity = quantity - $1 where id = $2 returning *",
                            values:[x.quantity, id]
                        });

                        if(update_product_table.rows.length > 0){
                            if(update_product_table.rows[0].option == true){

                                const option = [null,null,null];
                                const option_value = description[1].split(": ")[1].split(", ");

                                option_value.map((x,y)=>{
                                    option[y] = x;
                                });

                                obj.option = option

                                product_client.query({
                                    text: "update option_list_table set quantity = quantity - $1 where option1 = $2 and option2 = $3 and option3 = $4 and id_key = $5",
                                    values: [x.quantity,option[0],option[1],option[2], update_product_table.rows[0].id_key]
                                });
                            }
                        }

                        return obj;
                    })
                );

                await product_client.query({
                    text: "update orders set order_list = $1 where id_key = $2",
                    values: [JSON.stringify(order_list), insert_query.rows[0].id_key]
                });
                res.sendStatus(200);
                
            }catch(e){
                res.sendStatus(400);
            }
    }


});
//order
app.post("/client/order", async(req,res)=>{
    const data = req.body;

    

    try{
        const product_list = await product_client.query({
            text:"select * from products where id = any($1)",
            values: [data.product_list]
        });

        const product_list_response = product_list.rows;
        
        let data_list_result = [];
        
        await Promise.all(
            product_list_response.map(async(x)=>{
                const stripe_product = async (options,quantity)=>{

                    const product = {
                        price_data:{
                            currency: currency.code,
                            product_data: {
                                description: null,
                                name: x.name,
                            },
                            unit_amount: null,
                        },
                        quantity: null,
                    } 


                    //description /order info
                    if(options != undefined){
                        product.price_data.product_data.description = "id: "+x.id+"; option: "+ options.join(", ");
                    }else{
                        product.price_data.product_data.description = "id: "+x.id;
                    }

                    const price = await (async()=>{
                        if(x.option == false){
                            return x.price;
                        }else{
                            const n = 3 - options.length
                            for(let i = 0; i < n; i++){
                                options.push("null");
                            }

                            try{
                                const option_price = await product_client.query({
                                    text: "select price,quantity from option_list_table where option1 = $1 and option2 = $2 and option3 = $3 and id_key = $4",
                                    values: [...options,x.id_key]
                                });
                                
                                if(option_price.rows.length != 0){
                                    x.quantity = option_price.rows[0].quantity;
                                    return option_price.rows[0].price;
                                }else{
                                    return null;
                                }
                            }catch(e){
                                return null;
                            }
                        }
                    })();
                    product.price_data.unit_amount = price;

                    //quantity check
                    if(quantity > x.quantity){
                        product.quantity = x.quantity;
                    }else{
                        product.quantity = quantity;
                    }

                    return product;  
                };

                if(data.order[x.id] != undefined){
                    if(data.order[x.id].single_element == true){
                        const product = await stripe_product(data.order[x.id].options,data.order[x.id].quantity);
                        data_list_result.push(product);
                    }else{

                        const map_product = await Promise.all(

                            data.order[x.id].product_array.map(async(element)=>{
                                const product = await stripe_product(element.options,element.quantity);
                                return product;
                            })
                        );

                        data_list_result = data_list_result.concat(map_product);

                    }
                }
            })
        );


        const filtered_data = (array)=>{
            const c = array.filter((x)=>{
                
                return x.price_data.unit_amount != null && x.quantity > 0;
            });
            return c;
        };

        

        const order_data = {
            success_url: domain,
            cancel_url:  domain,
            line_items: filtered_data(data_list_result),
            mode: 'payment',

            shipping_address_collection: {allowed_countries: stripe_shipping},
            
            customer_creation: "if_required",
            phone_number_collection: {
                enabled: true,
            },

        };

        


        try{
            const pay_session = await stripe.checkout.sessions.create(order_data);
            res.send({url:pay_session.url});
        }catch{
            delete order_data.shipping_address_collection;
            const pay_session = await stripe.checkout.sessions.create(order_data);
            res.send({url:pay_session.url});
        }
              

    } catch(e){
        
        res.send({error:true});
    }

});


////////////// admin page ////////////////
//admin setup
const code = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
function codegen(){
    let cd = "";
    for(let i = 0; i < 40; i++){
        cd = cd+code[Math.floor(Math.random()*58)];
    }
    return cd;
}

const upload = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"./media/product");
        },
        filename:(req,file,cb)=>{
            if(file.mimetype.split("/")[0] == "image"){
                const file_type = file.mimetype.split("/")[1];
                product_client.query({
                    text:"insert into images(id,type) values($1,$2) returning *",
                    values:[req.body.id,file_type]
                }).then((r)=>{
                    cb(null,r.rows[0].img_id_key+"."+file_type);

                    const img = r.rows[0].img_id_key + "." + r.rows[0].type;

                    if(req.body.is_first == "true"){
                        product_client.query({text:"update products set image = $1 where id = $2", values:[img,req.body.id]}).catch(()=>{});
                    }

                    req.img = img;
                });
            }
        }
    })
});

///admin login
let AC00 = null; //admin cookies
app.get("/admin/login",(req,res)=>{
    res.sendFile(__dirname+"/admin/admin_login.html");
});
app.post("/admin/login",(req,res)=>{
    req.body.email = req.body.email.toLowerCase();
    if(req.body.email == process.env.ADMIN_MAIL){
        if(bcrypt.compareSync(req.body.password,process.env.ADMIN_PASS)){
            const code = codegen() + codegen();
            AC00 = code;
            res.cookie("AC00",code,{httpOnly: true, sameSite:"strict"});
            res.send({response:"success", url:"/admin/home.html"});
        }else{
            res.send({response:"error"});
        }
    }else{
        res.send({response:"error"});
    }
});

///////// middleware
app.use("/admin",(req,res,next)=>{
    if(AC00 == null ||  req.cookies.AC00 != AC00){
        res.redirect("/admin/login");
    }else{
        next();
    }
});

///// statics
app.use("/admin",express.static("./admin"));
app.use("/admin/template/statics", express.static("./admin/template/statics"));
app.use("/admin/template/scripts", express.static("./admin/template/scripts"));
app.use("/admin/info/", express.static("./admin/info_page"));

//////// GET /////////
app.get("/admin/admin_home",(req,res)=>{
    res.sendFile(__dirname+"/admin/home.html");
});
app.get("/admin/admin_show_group",(req,res)=>{
    product_client.query({text:"select * from group_list"},(err,pg_res)=>{
        if(err){
            res.send({response:"error"});
        }else{
            res.send({response:pg_res.rows});
        }
    });
});
app.get("/admin/admin_show_product",(req,res)=>{
    product_client.query({text:"select * from products"},(err,pg_res)=>{
        if(err){
            res.send({response:"error"});
        }else{
            res.send({response:pg_res.rows});
        }
    })
});
app.get("/admin/dashboard_data",async(req,res)=>{
    const t_order_length = await product_client.query({text:"select count(*) from orders "});
    const td_order_length = await product_client.query({text:"select count(*) from orders where date >= now() - interval '1 day'"});
    const mth_order_length = await product_client.query({text:"select count(*) from orders where date >= now() - interval '1 month'"});
    const yr_order_length = await product_client.query({text:"select count(*) from orders where date >= now() - interval '1 year'"});
    
    
    const data = {
        orders:{
            all: t_order_length.rows[0].count,
            today: td_order_length.rows[0].count,
            month: mth_order_length.rows[0].count,
            year: yr_order_length.rows[0].count
        },
    }
    res.send(data);
});
app.get("/admin/orders_list",async(req,res)=>{
    const orders = await product_client.query({text:"select id_key,user_email,total_amount,date,currency from orders order by id_key desc"});
    res.send(orders.rows);
});
/////// POST /////////
//order
app.post("/admin/order_view",async(req,res)=>{
    const id = req.body.id;
    const query = await product_client.query({text:"select * from orders where id_key = $1",values:[id]});
    res.send(query.rows[0]);
});

//products
app.post("/admin/admin_create_product",async (req,res)=>{
    
    try{
        const data = req.body;
    
        

        let r = await product_client.query({text:"select * from products where id = $1", values:[data.id]})

        if(r.rows.length == 0){

            let r1 = await product_client.query({text:"insert into products(id,option,option1,option2,option3,name,description,quantity,price) values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id_key", values:[data.id,data.option,data.option1.title,data.option2.title,data.option3.title,data.name,data.description,data.quantity,data.price]});
            if(data.option == true){
                const id_key = r1.rows[0].id_key;
                await product_client.query({text:"insert into option_list(id_key,option_name,option_id,description_list) values($1,$2,$8,$3),($1,$4,$9,$5),($1,$6,$10,$7)",values:[id_key,data.option1.title,data.option1.list,data.option2.title,data.option2.list,data.option3.title,data.option3.list,1,2,3]});

                const promise = await Promise.all(
                    data.option_table.map(async(x)=>{
                        for(let c = 0; c < 3; c++){
                            if(x[c] == null){
                                x[c] = "null";
                            }
                        }
                        await product_client.query({text:"insert into option_list_table(id_key,option1,option2,option3,price,quantity) values($1,$2,$3,$4,$5,$6)", values: [id_key,...x]});
                    })
                )

                let total = await product_client.query({text:"select sum(quantity) as total from option_list_table where id_key = $1", values:[id_key]});
                total = total.rows[0].total;
                await product_client.query({text:"update products set quantity = $1 where id_key = $2", values:[total,id_key]});
                    
                
                res.send({response:"success"});
            }else if(data.option == false){
                res.send({response:"success"});
            }
        }else{
            res.send({response:"Product id already exist"});
        }
    }catch{
        res.send({response:"Product Error"});
    }


});
app.post("/admin/admin_update_product", async(req,res)=>{
    const data = req.body;
    try{
        const r = await product_client.query({text:"select id_key from products where id = $1",values:[req.body.id]});
        const id_key = r.rows[0].id_key;
        if(data.option == true){

            let set;

            if(data.mod.column == "quantity"){
                set = "quantity";
                let total = await product_client.query({text:"select sum(quantity) as total from option_list_table where id_key = $1", values:[id_key]});
                total = total.rows[0].total;
                
                await product_client.query({text:"update products set quantity = $1 where id_key = $2", values:[total,id_key]});
            }else if(data.mod.column == "price"){
                set = "price";
            }else{
                res.send({response:"error miss_config"});
            };

            if(set != undefined){
                await product_client.query({text:"update option_list_table set "+ set +" = $4 where option1 = $1 and option2 = $2 and option3 = $3 and id_key = $5",values:[data.mod.position.option1,data.mod.position.option2,data.mod.position.option3,data.mod.value,id_key]});
                
                if(set == "quantity"){
                    let total = await product_client.query({text:"select sum(quantity) as total from option_list_table where id_key = $1", values:[id_key]});
                    total = total.rows[0].total;
                    await product_client.query({text:"update products set quantity = $1 where id_key = $2", values:[total,id_key]});
                }
                
                res.send({response:"success"});
            }
        
        }else if(data.option == false){

            let set;

            if(data.mod.column == "id"){
                set = "id";
            }else if(data.mod.column == "description"){
                set = "description";
            }else if(data.mod.column == "quantity"){
                set = "quantity";
            }else if(data.mod.column == "price"){
                set = "price";
            }else if(data.mod.column == "name"){
                set = "name";
            }else{
                res.send({response:"error miss_config"});
            };

            if(set != undefined){
                await product_client.query({text:"update products set "+ set +"= $2 where id_key = $1",values:[id_key,data.mod.value]});
                res.send({response:"success"});
            }
        
        }else{
            res.send({response:"error"})
        }
    }catch(e){
        
        res.send({response:"error"})
    }
        
    
});
app.post("/admin/admin_delete_product",(req,res)=> {
    const data = req.body;

    product_client.query({text:"delete from products where id = $1 returning id_key",values:[data.id]}).then((r)=>{
        const id_key = r.rows[0].id_key;
        product_client.query({text:"delete from option_list_table where id_key = $1",values:[id_key]}).then(()=>{
            product_client.query({text:"delete from option_list where id_key = $1",values:[id_key]}).then(()=>{
                product_client.query({text:"delete from images where id = $1 returning img_id_key",values:[data.id]}).then((r)=>{
                    let er = false;
                    for(let i = 0; i < r.rows.length; i++){
                        const img_id_key = r.rows[i].img_id_key;
                        fs.rm('./media/product/'+img_id_key, { recursive:true }, (err) => {
                            if(err){
                                er = true;
                            }
                        });
                    }
                    if(er != false){
                        res.send({response:"error"});
                    }else{
                        res.send({response:"success"});
                    }
                });
            });
        });
    });
});
app.post("/admin/admin_get_product",(req,res)=>{
    const data = req.body;

    product_client.query({text:"select * from products where id = $1", values:[data.id]}).then((r0)=>{
        if(r0.rows.length > 0){
            const id_key = r0.rows[0].id_key;

            const res_data = {
                row_data : r0.rows[0],
                images: null,
                options_table: null
            };

            product_client.query({text:"select * from images where id = $1", values:[data.id]}).then((r1)=>{
                res_data.images = r1.rows;
                if(r0.rows[0].option != false){
                    product_client.query({text:"select * from option_list_table where id_key = $1", values:[id_key]}).then((r)=>{
                        res_data.options_table = r.rows;
                        res.send({response: res_data});
                    }).catch();
                }else{
                    res.send({response: res_data});
                }
            }).catch((e)=>{});


        }else{
            res.send({response:"error"});
        }

    }).catch((e)=>{ res.send({response:"error"})});
});

//product images
app.post("/admin/admin_upload_product_img",upload.single("img"),(req,res)=>{
    res.send({response:"success",img:req.img});
});

app.post("/admin/admin_update_product_img",(req,res)=>{
    const data = req.body;
    product_client.query({text:"update products set image = $1 where id = $2", values:[data.img_id_key,data.id]}).then(()=> res.send({response:"success"})).catch(()=> res.send({response:"error"}));
    
});

app.post("/admin/admin_delete_product_img",(req,res)=>{
    const data = req.body;

    product_client.query({text:"delete from images where id = $1 and img_id_key=$2 returning *",values:[data.id,data.img_id_key]}).then((r)=>{
        const img_id_key = r.rows[0].img_id_key;
        const type = r.rows[0].type;
        fs.rm('./media/product/'+img_id_key+"."+ type, { recursive:true }, (err) => {
            if(err){

                res.send({response:"error"});
            }else{
                res.send({response:"success"});
            }
        });
    }).catch((e)=>{

        res.send({response:"error"});
    });
});

//product group
app.post("/admin/admin_group_list",(req,res)=>{
    const data = req.body;
    product_client.query({text:"select * from group_list where name = $1",values:[data.name]}).then((r)=>{
        if(r.rows.length > 0){
            const id_key = r.rows[0].id_key;
            product_client.query({text:"select id from group_list_table where id_key = $1", values:[id_key]},(err,pg_res)=>{
                if(err){
                    res.send({response:"error"});
                }else{
                    res.send({response:{
                        group_list: pg_res.rows,
                        main: r.rows[0].main
                    }});
                }
            });
        }else{
            res.send({response:"error"});
        }
    });
});
app.post("/admin/admin_create_group",(req,res)=>{
    const data = req.body;

    product_client.query({text:"select from group_list where name = $1",values:[data.name]}).then((r)=>{
        if(r.rows.length > 0){
            res.send({response:"item already exist"});
        }else{
            product_client.query({text:"insert into group_list(name,main) values($1,$2) returning id_key", values:[data.name,data.main]}).then((r)=>{
                
                res.send({response:"success"});
                
                for(let i = 0; i < data.values.length; i++){
                    product_client.query({text:"insert into group_list_table(id_key,id) values($1,$2)", values:[r.rows[0].id_key,data.values[i]]}).catch();
                }

            });
        };
    });
});
app.post("/admin/admin_update_group",(req,res)=>{
    const data = req.body;
    product_client.query({text:"select id_key from group_list where name = $1", values:[data.name]}).then(async(r)=>{
        if(r.rows.length == 1){
            try{
                await product_client.query({text:"delete from group_list_table where id_key = $1", values:[r.rows[0].id_key]}).catch((e)=>{});
                for(let i = 0; i < data.values.length; i++){
                    await product_client.query({text:"insert into group_list_table(id_key,id) values($1,$2)", values:[r.rows[0].id_key, data.values[i]]});
                }
                
                if(r.rows[0].main != data.main){
                    await product_client.query({text:"update group_list set main = $1 where id_key = $2", values:[data.main,r.rows[0].id_key]});
                }

                res.send({response:"success"});

            }catch(e){
                res.send({response:"error"});
            }
        }
    }).catch(()=>{res.send({response:"group table error"})});
});
app.post("/admin/admin_delete_group",(req,res)=>{
    const data = req.body;
    product_client.query({text:"delete from group_list where name = $1 returning id_key", values:[data.name]}).then((r)=>{
        product_client.query({text:"delete from group_list_table where id_key = $1", values:[r.rows[0].id_key]}).then(()=> res.send({response:"success"})).catch(()=> res.send({response:"drop group table error"}));
    }).catch(()=>{res.send({response:"group table error"})});
});

//admin template
//delete the old template
app.get("/admin/template/remove", async(req,res)=>{
    try{
        //delete file
        //template/media
        const media_file = await async_fs.readdir(__dirname+"/page/template/media");
        for(const file of media_file){
            await async_fs.rm(__dirname+"/page/template/media/"+file);
        }

        //template/page
        const page_file = await async_fs.readdir(__dirname+"/page/template/page");
        for(const file of page_file){
            await async_fs.rm(__dirname+"/page/template/page/"+file);
        }

        res.sendStatus(200);

    }catch(e){
        res.sendStatus(400);
    }
})

const multer_media_template = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {

          cb(null, './page/template/media')
        },
      
        filename: function (req, file, cb) {

          cb(null,file.originalname)
        },
    })
})
app.post("/admin/template/media",multer_media_template.single("media"),async(req,res)=>{
    res.sendStatus(200)
});

const multer_page_template = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './page/template/page')
        },
      
        filename: function (req, file, cb) {

          cb(null,file.originalname)
        },
    })
})
app.post("/admin/template/page",multer_page_template.single("page"),async(req,res)=>{
    res.sendStatus(200)
});

//update stripe sk 
app.post("/admin/update/settings/data/sk",(req,res)=>{
    gen_settings_db.update({_id: "stripe_setting"},{$set:{ sk: req.body.sk }},{},(err)=>{
        if(err){
            res.sendStatus(400);
        }else{
            
            sk_update(req.body.sk);
            res.sendStatus(200);
        }
        gen_settings_db.persistence.compactDatafile();
    })
});

//shipping_country
app.get("/admin/shipping_country",(req,res)=>{
    gen_settings_db.findOne({_id:"stripe_setting"},(err,data)=>{
        if(err){
            res.sendStatus(400);
        }else{
            res.send({response:data.shipping_country});
        }
    })
});

app.post("/admin/update/shipping_country",(req,res)=>{

    if(req.body.all == true){
        stripe_shipping = country_code;
        gen_settings_db.update({_id: "stripe_setting"},{$set:{ shipping_country: null }},{},(err)=>{
            if(err){
                res.send({error:true});
            }else{
                res.sendStatus(200);
            }
            gen_settings_db.persistence.compactDatafile();
        });
    }else{
        let list = req.body.list;
        
    
        if(typeof list != "array" && list.length != 0){
            const values_not_accepted = [];
            list.map(x=>{
                if(country_code.findIndex(x1 => x == x1) == -1){
                    values_not_accepted.push(x);
                }
            });

            const filter_list = [];
            list.map(x=>{
                if(filter_list.findIndex(x1 => x == x1) == -1){
                    filter_list.push(x);
                }
            });
            
            list = filter_list;

            if(values_not_accepted.length == 0){
                
                stripe_shipping = list;
                gen_settings_db.update({_id: "stripe_setting"},{ $set:{shipping_country: list} },(err)=>{
                    if(err){
                        res.send({error:true});
                    }else{
                        res.send({response:stripe_shipping});
                    }

                    gen_settings_db.persistence.compactDatafile();
                });
                
            }else{
                res.send({
                    error: true,
                    values: values_not_accepted
                });
            }

        }else{
            res.send({error:true});
        }
    };

});

app.post("/admin/update/currency", (req,res)=>{
    gen_settings_db.update({_id: "stripe_setting"},{$set:{ currency: req.body }},{},(err)=>{
        if(err){
            res.sendStatus(400);
        }else{
            
            currency = req.body;
            res.sendStatus(200);
        }
        gen_settings_db.persistence.compactDatafile();
    })
});


//general info
app.post("/admin/update/page_img", upload.single("img"),(req,res)=>{
    const delete_img_id =com_info.title_img; 
    com_info.title_img = req.img;

    /// update
    gen_settings_db.update({_id: "company_info"},{$set:{ title_img: com_info.title_img }},{},(err)=>{
        
        if(err){
            res.sendStatus(400);
        }else{
            res.send({response:com_info});
            const delet_sql_id = parseInt(delete_img_id.split(".")[0])
            product_client.query({text:"delete from images where img_id_key = $1 returning img_id_key",values:[delet_sql_id]});
            async_fs.rm('./media/product/'+delete_img_id);
        }

        gen_settings_db.persistence.compactDatafile();
    });
});

app.post("/admin/update/logo_img", upload.single("img"),(req,res)=>{
    const delete_img_id =com_info.logo_img; 
    com_info.logo_img = req.img;
    /// update
    gen_settings_db.update({_id: "company_info"},{$set:{ logo_img: com_info.logo_img }},{},(err)=>{
        if(err){
            res.sendStatus(400);
        }else{
            res.send({response:com_info});
            const delet_sql_id = parseInt(delete_img_id.split(".")[0])
            product_client.query({text:"delete from images where img_id_key = $1 returning img_id_key",values:[delet_sql_id]});
            async_fs.rm('./media/product/'+delete_img_id);
        }
        gen_settings_db.persistence.compactDatafile();
    });
});

app.post("/admin/update/contacts",(req,res)=>{

    const contacts = ["phone1","phone2","email","whatsapp"];
    const indx = contacts.findIndex((x)=>x == req.body.contact);
    if(indx!= -1){
        com_info.contacts[contacts[indx]] = req.body.val;
    }

    // updates
    gen_settings_db.update({_id: "company_info"},{$set:{contacts: com_info.contacts}},{},(err)=>{
        if(err){
            res.sendStatus(400);
        }else{
            res.send({response:com_info});
        }
        gen_settings_db.persistence.compactDatafile();
    });
});

app.post("/admin/update/link", (req,res)=>{
    const links = ["twitter","linkedin","instagram","facebook"];
    const indx = links.findIndex((x)=>x == req.body.link);
    if(indx!= -1){
        com_info.link[links[indx]] = req.body.val;
    }

    //update
    gen_settings_db.update({_id: "company_info"},{$set:{link: com_info.link}},{},(err)=>{
        if(err){
            res.sendStatus(400);
        }else{
            res.send({response:com_info});
        }
        gen_settings_db.persistence.compactDatafile();
    });
});

app.post("/admin/update/p_iva",(req,res)=>{
    com_info.p_iva = req.body.p_iva;
    /// update
    gen_settings_db.update({_id: "company_info"},{$set:{p_iva: com_info.p_iva}},{},(err)=>{
        if(err){
            res.sendStatus(400);
        }else{
            res.send({response:com_info});
        }
        gen_settings_db.persistence.compactDatafile();
    });
});
app.post("/admin/update/address",(req,res)=>{
    com_info.address = req.body.address;

    ///update
    gen_settings_db.update({_id: "company_info"},{$set:{address: com_info.address}},{},(err)=>{
        if(err){
            res.sendStatus(400);
        }else{
            res.send({response:com_info});
        }
        gen_settings_db.persistence.compactDatafile();
    });
});

app.post("/admin/update/privacy_policy_link",(req,res)=>{
    com_info.privacy_policy_link = req.body.privacy_policy_link;

    ///update
    gen_settings_db.update({_id: "company_info"},{$set:{privacy_policy_link: com_info.privacy_policy_link}},{},(err)=>{
        if(err){
            res.sendStatus(400);
        }else{
            res.send({response:com_info});
        }
        gen_settings_db.persistence.compactDatafile();
    });
})




app.listen(port);