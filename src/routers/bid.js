const express = require('express')
const router = new express.Router()
const Insta = require('instamojo-nodejs');
// var LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');

router.post('/pay', (req, res) => {
    
   
    const amount = req.body.paymentprice;
    Insta.setKeys(process.env.API_KEY, process.env.AUTH_KEY)
    const data = new Insta.PaymentData();
    Insta.isSandboxMode(true);
   
    const userdata = req.session.user
    if (userdata!= undefined) {
        
        data.purpose = 'Movie Payment';
        data.amount = amount;
        data.buyer_name = userdata[0].Fname + " " + userdata[0].Lname;
        data.redirect_url = 'https://apnashow.herokuapp.com/orders';
        data.email= userdata[0].Email;
        data.phone = '9876543210';
        data.send_email = false;
        data.webhook = 'https://apnashow.herokuapp.com/orders'
        data.send_sms = false;
        data.allow_repeated_payments = false; 

        Insta.createPayment(data, function (error, response) {
            if (error) {
                res.status(303).send(error)
            }
            else {
                const responseData = JSON.parse(response);
                const redirectUrl = responseData.payment_request.longurl;
                // res.status(200).json(response);
                res.redirect(redirectUrl);
            }
        });
    }

    

});


module.exports = router