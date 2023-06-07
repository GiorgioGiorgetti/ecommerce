const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('submit');

submit.onclick = ()=>{
    fetch("/admin/login",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    }).then((r)=>{
        r.json().then((r)=>{
            if(r.response == "success"){
                window.location.href = r.url;
            }else{
                alert("wrong email or password");
            }
        });
    });
};