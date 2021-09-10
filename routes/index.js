const { Router, response } = require('express');
const { get } = require('https');
const axios = require("axios");
const router = new Router();


async function getData(url) {
    const response = await axios.get(url,
    );
  
    const resp = response.data;
    return resp;
  }

router.get('/', (req, res) => {
    res.render("index.ejs", {
        action: "/"
    });
});


router.post('/', (req, res) => {
    if(req.body.action=="users"){
        res.redirect("/users");
    }
    else if(req.body.action=="cities"){
        res.redirect("/cities");
    }
}); 

router.route('/users').get(async (req, res) => {
    let url = "https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/20764/users";
    var resp = {};
    resp = await getData(url);
    res.render("users.ejs", {
        action: "/users/personal_info",
        data: resp
    });
});


router.route('/cities').get(async (req, res) => {
    let url = "https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/20764/cities";
    var resp = {};
    resp = await getData(url);
    res.render("cities.ejs", {
    action: "/cities/city_info",
    data: resp
    });
});


router.route('/users/personal_info').post(async (req, res) => {
    const uid = req.body.action;
    let url = "https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/20764/users/"+ uid;
    let url2 = "https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/20764/users/"+ uid+"/credit-cards";
    let url3 = "https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/20764/users/"+ uid+"/addresses";
    var resp = {};
    var resp2 = {};
    var resp3 = {};
    resp = await getData(url);
    resp2 = await getData(url2);
    resp3 = await getData(url3);
    res.render("personal_info.ejs", {
        action: "/users/city_info",
        data: resp,
        data2: resp2,
        data3: resp3
    });
});


router.route('/users/city_info').post(async (req, res) => {
    const uid = req.body.action;
    console.log(uid);
    res.render("city_info.ejs");
});


module.exports = router;