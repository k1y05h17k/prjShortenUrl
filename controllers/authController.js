const User = require('./../model/userModel');

// create a new user:
exports.signup = async(req, res) =>{
    
    const { firstName, lastName, userName, email, password, passwordConfirm } = req.body;

    try{
        const newUser = await User.create({
           firstName, lastName, userName, 
           email, password, passwordConfirm  
        });
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({error: error.message});
    }
}
