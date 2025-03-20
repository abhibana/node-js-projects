import { model, Schema } from "mongoose";
import { createHmac, randomBytes } from 'crypto'
import { createTokenForUser } from "../services/authentication.js";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: "images/user_default.jpg"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = generateHash(salt, user.password)

    this.salt = salt;
    this.password = hashedPassword;
    
    next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (undefined == user) 
        throw Error("User not found");

    const hashForGivenPassword = generateHash(user.salt, password)
    if (user.password !== hashForGivenPassword) 
        throw Error("Invalid credentials");

    return createTokenForUser(user);
});

function generateHash(salt, password) {
    return createHmac("sha256", salt)
                .update(password)
                .digest("hex");
}

export const User = model("user", userSchema);