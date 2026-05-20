const db = require("../config/db");
const jwt = require("jsonwebtoken");

function registerUser(req, res){

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], function(error, result){

        if(error){
            return res.status(500).json({
                message: "User registration failed",
                error: error
            });
        }

        res.status(201).json({
            message: "User registered successfully"
        });

    });

}


// login 

function loginUser(req, res){

    const email = req.body.email;
    const password = req.body.password;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], function(error, result){

        // if(error){
        //     return res.status(500).json({
        //         message: "Login failed"
        //     });
        // }

        if(error){
    return res.status(500).json({
        message: "Login failed",
        error: error
    });
}

        if(result.length === 0){
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        if(user.password !== password){
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // res.status(200).json({
        //     message: "Login successful",
        //     user: user
        // });

        const token = jwt.sign(
    {
        id: user.id,
        email: user.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
);

res.status(200).json({
    message: "Login successful",
    token: token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email
    }
});

    });

}

module.exports = {
    registerUser,
     loginUser
};