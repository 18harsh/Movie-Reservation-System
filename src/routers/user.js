const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.get('/login', (req, res) => {
    if (!req.session.successlogin) {
        req.session.loginpage = true
        res.render('login', {
            loginsuccess: req.session.successlogin,
            loginpage: req.session.loginpage,
            error: req.session.error
        })
    } else {
        res.redirect('/');
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.Email,req.body.Password)
        const token = await user.generateAuthToken()
        req.session.user = await User.find({ Email: req.body.Email })
        req.session.successlogin = true
        
        res.redirect('/');
    } catch (e) {
        res.redirect('/login');
    }
})

router.get('/signup', (req, res) => {
    if (!req.session.successlogin) {
        req.session.loginpage = false
        res.render('signup', {
            loginsuccess: req.session.successlogin,
            loginpage: req.session.loginpage,
            error: req.session.error
        })
    }else {
        res.redirect('/');
    }
    
})

router.post('/signup', async (req, res) => {
    
    const data = {
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        Email: req.body.Email,
        Password: req.body.Password,
    }
        const user = new User(data)
    try {
        if (req.body.Password != req.body.RePassword) {
            throw "Password doesn't match!";
            }
            await user.save()
            res.redirect('/login');
        } catch (e) {
            req.session.error = true
            res.redirect('/signup');
        }
})


router.get('/logout', async (req,res) => {
    // try {
    //     req.user.tokens = req.user.tokens.filter((token) => {
    //         return token.token != req.token
    //     })
    //     await req.user.save()
    //     res.send()
    // } catch (e) {
    //     res.status(500).send()
    // }
    if (req.session.successlogin) {
        req.session.successlogin = false
        req.session.user = undefined
        res.redirect("/login");
    }
    else {
        res.redirect("*");
    }
})

// router.get('/users/me',auth ,async (req, res) => {
//     res.send(req.user)
// })

// router.patch('/update/:id', async (req, res) => { 
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['Fname', 'Lname', 'Email', 'Password']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
//     if (!isValidOperation) {
//         return res.status(400).send({error: 'Invalid Updates!'})
//     }
    
//     try {
//         const user = await User.findById(req.params.id)

//         updates.forEach((update) => user[update] = req.body[update])
//         await user.save()
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         console.log(req.body)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch(e) {
//         res.status(400).send(e)
//     }

// })

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
    
//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         return res.status(200).send()
//     } catch (e) {
//         res.status(500).send()
//     }
// })



module.exports = router