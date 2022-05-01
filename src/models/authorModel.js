const { default: mongoose } = require("mongoose")

//*--------AUTHOR MODEL----------------
const authorSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            enum: ["Mr", "Mrs", "Miss"]
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
    
    password: {
        type: String,
    required: true
} 
 }, { timestamps: true });

module.exports = mongoose.model('author', authorSchema)




















// { fname: { mandatory}, lname: {mandatory},
//  title: {mandatory, enum[Mr, Mrs, Miss]},
//  email: {mandatory, valid email, unique}, password: {mandatory} }
// validate: [validateEmail, 'Please fill a valid email address'],
// match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']