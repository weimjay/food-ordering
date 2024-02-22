import {model, models, Schema} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {
        type: String,
        required: true,
        // min: [6, 'Password must be at least 6, got {VALUE}'],
    },
}, {timestamps: true});

UserSchema.post('validate', function (user) {
    const pwd = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(pwd, salt);
});

export const User = models?.User || model('User', UserSchema);