const mongoose = require("mongoose");

const bakeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: Number,
    calories: Number,
    isDairy: Boolean,
    expire: Date,
    bakeDate: { type: Date, default: new Date() },
    ingredients:[String]

})

 const Bake=mongoose.model("bakes",bakeSchema);//כדאי באות ראשונה גדולה כמו מחלקה
 module.exports=Bake;
//מי שאוכף את המבנה הזה ואת התקינות שלו זה המונגוס ולא הדטה בייס