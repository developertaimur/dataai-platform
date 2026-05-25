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


function updatePassword(req, res){

    const userId = req.body.userId;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    const checkSql = "SELECT * FROM users WHERE id = ?";

    db.query(checkSql, [userId], function(error, result){

        if(error){
            return res.status(500).json({
                message: "Password update failed"
            });
        }

        if(result.length === 0){
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        if(user.password !== currentPassword){
            return res.status(401).json({
                message: "Current password is incorrect"
            });
        }

        const updateSql = "UPDATE users SET password = ? WHERE id = ?";

        db.query(updateSql, [newPassword, userId], function(error){

            if(error){
                return res.status(500).json({
                    message: "Password could not be updated"
                });
            }

            res.status(200).json({
                message: "Password updated successfully"
            });

        });

    });

}

function deleteAccount(req, res){

    const userId =
    req.params.id;

    const sql =
    "DELETE FROM users WHERE id = ?";

    db.query(sql, [userId], function(error, result){

        if(error){

            return res.status(500).json({
                message: "Account deletion failed"
            });

        }

        if(result.affectedRows === 0){

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({
            message: "Account deleted successfully"
        });

    });

}


function updateProfile(req, res){

    const userId =
    req.body.userId;

    const name =
    req.body.name;

    const email =
    req.body.email;

    const sql =
    "UPDATE users SET name = ?, email = ? WHERE id = ?";

    db.query(
        sql,
        [name, email, userId],

        function(error, result){

            if(error){

                return res.status(500).json({
                    message: "Profile update failed"
                });

            }

            res.status(200).json({
                message: "Profile updated successfully"
            });

        }

    );

}

// forgot pass api 

function forgotPassword(req, res){

    const email =
    req.body.email;

    const resetToken =
    Math.random().toString(36).substring(2, 15);

    const expiryTime =
    new Date(Date.now() + 60 * 60 * 1000);

    const sql =
    "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?";

    db.query(sql, [resetToken, expiryTime, email], function(error, result){

        if(error){
            return res.status(500).json({
                message: "Something went wrong"
            });
        }

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: "Email not found"
            });
        }

        res.status(200).json({
            message: "Password reset link generated",
            resetLink: `http://127.0.0.1:5501/frontend/auth/reset-password.html?token=${resetToken}`
        });

    });

}


// reset password api 

function resetPassword(req, res){

    const token =
    req.body.token;

    const newPassword =
    req.body.newPassword;

    const sql =
    "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()";

    db.query(sql, [token], function(error, result){

        if(error){
            return res.status(500).json({
                message: "Something went wrong"
            });
        }

        if(result.length === 0){
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        const user =
        result[0];

        const updateSql =
        "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?";

        db.query(updateSql, [newPassword, user.id], function(error){

            if(error){
                return res.status(500).json({
                    message: "Password reset failed"
                });
            }

            res.status(200).json({
                message: "Password reset successfully"
            });

        });

    });

}



module.exports = {
    registerUser,
     loginUser,
      updatePassword,
      deleteAccount,
      updateProfile,
      forgotPassword,
      resetPassword
};