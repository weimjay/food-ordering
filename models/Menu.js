import mongoose, {model, models, Schema} from "mongoose";

const ExtraPriceSchema = new Schema({
   name: String,
   price: Number,
});

const MenuSchema = new Schema({
    image: {type: String},
    name: {type: String, required: true},
    description: {type: String},
    category: {type: mongoose.Types.ObjectId},
    basePrice: {type: Number},
    sizes: {type: [ExtraPriceSchema]},
    extraIngredients: {type: [ExtraPriceSchema]},
    tag: {type: String},
}, {timestamps: true});

export const Menu = models?.Menu || model('Menu', MenuSchema);