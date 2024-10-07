const User = require('../model/userModel.js');

//display
const getAllUsers = async (req, res, next) => {

    let users;

    // get all users
    try {
        users = await User.find()
    }
    catch (err) {
        console.log(err)
    }

    //no users
    if (!users) {
        return res.status(404).json({ message: "no users" })
    }

    //displaying all the users
    return res.status(200).json({ users })
}

//insert
// const addUsers = async (req, res, next) => {
//     const { name, userName, password, contactNumber, address, role, email, salary } = req.body;

//     let user;

//     try {
//         user = new User({
//             name,
//             userName,
//             password,
//             contactNumber,
//             address,
//             role,
//             email,
//             salary
//         });
//         await user.save();
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: "Failed to add user" });
//     }

//     // No users were added
//     if (!user) {
//         return res.status(404).json({ message: "No user added" });
//     }

//     res.status(200).json({ user });
// };

const addUsers = async (req, res, next) => {
    const { name, userName, password, contactNumber, address, role, email, salary } = req.body;

    // Check if a user with the same email or username already exists
    try {
        const existingUser = await User.findOne({
            $or: [{ email: email }, { userName: userName }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email or username already exists"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to check existing user" });
    }

    // Create a new user if no duplicates were found
    let user;
    try {
        user = new User({
            name,
            userName,
            password,
            contactNumber,
            address,
            role,
            email,
            salary
        });
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to add user" });
    }

    // If the user creation was successful, return the user
    res.status(200).json({ user });
};


//get by id
const getById = async (req, res, next) => {

    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id)

    } catch (err) {
        console.log(err)
    }
    //no users availabel
    if (!user) {
        res.status(404).json({ message: "no users" })
    }
    res.status(200).json({ user })
}

// Updating user
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, userName, password, contactNumber, address, role, email, salary, total_salary_with_OT } = req.body; // Include total_salary_with_OT

    let user;

    try {
        // Find and update user by ID with provided data
        user = await User.findByIdAndUpdate(id, {
            name,
            userName,
            password,
            contactNumber,
            address,
            role,
            email,
            salary,
            total_salary_with_OT // Update total_salary_with_OT
        }, { new: true }); // `new: true` returns the updated document

        // Check if user was found and updated
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // No need to call save() again as findByIdAndUpdate already saves the changes
        res.status(200).json({ user }); // Send the updated user details in the response
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update user" });
    }
};


//delete

const deleteUser = async (req, res, next) => {

    const id = req.params.id

    let user;

    try {
        user = await User.findByIdAndDelete(id)
    } catch (err) {
        console.log(err)
    }
    if (!user) {
        res.status(404).json({ message: "unabel to delete" })
    }
    res.status(200).json({ user })
}


exports.getAllUsers = getAllUsers
exports.addUsers = addUsers
exports.getById = getById
exports.updateUser = updateUser
exports.deleteUser = deleteUser