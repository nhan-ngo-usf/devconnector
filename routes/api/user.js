const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const User = require('../../models/User')
// @route GET api/users
// @desc Register User
// @acess public

router.post('/', 
[
    check('name', 'This field must not be empty').not().isEmpty(),
    check('email', 'Please enter your email').isEmail(),
    check('password', 'Must be above 5 characters').isLength({ min: 5})
], async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password} = req.body
    try{
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({errors: [{ msg: 'User already exists '}]})
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token) => {
                if (err) throw err
                res.json({token})
            }
        )
        
    } catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }   
})

module.exports = router