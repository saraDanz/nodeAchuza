const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Bake = require("../models/bake");
//async / await--תחביר נוח יותר
//then cahtchלשימוש עם פרומסים במקום להשתמש ב
//זה נותן תחושה של קוד סיכנרוני
//אפילו שהקוד הוא אסינכורני


router.get("/", async (req, res) => {
    try {

        let allBakes = await Bake.find({})
        res.json(allBakes);
    }
    catch (err) {
        res.status(400).send("problem in getting all bakes")
    }
    //הקוד הקודם הוא במקום הקוד הבא שבהערה

    // Bake.find({}).then(data => {
    //     res.json(data);
    // }).catch(err => {
    //     res.status(400);
    //     throw new Error("שגיאה בקבלת המאפים")
    // })

})


router.get("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))//בדיקה שהפרמטר קוד ששלחו הוא פרמטר שיכול להיות קוד
        return res.status(400).send("invalid paramter id");

    try {
        let bake = await Bake.findOne({ _id: req.params.id });
        if (!bake)
            return res.status(404).send("no bake with such id");//אם לא מצא אף מאפה עם כזה קוד

        res.json(bake);//אם כן מצא מאפה
    }
    catch (err) {
        res.status(400).send("problem im getting bake id " + req.params.id)
    }
})

router.post("/", async (req, res) => {
    if (!req.body.name || !req.body.price) {
        res.status(404);
        throw new Error("missing paramters")//לכל שגיאה יש שדה מסג ומה שנשלח כאן ייכנס לשם אוטומטית
        //השגיאה הזאת נזרקת ואז המידלוואר שאחראי על לכידת שגיאות יקבל אותו
    }
    let myBake = new Bake({
        name: req.body.name
        , price: req.body.price
        , isDairy: req.body.isDairy
        , calories: req.body.calories
        , ingredients: req.body.ingredients

    })
    try {
        await myBake.save();
        res.status(201).json(myBake);
    } catch (err) {
        res.status(400).send("cannot create this bake")
    }

    //  { res.status(404).send("nissing parameters name or price") }

})

router.delete("/:id", (req, res) => {
    res.send(" delete bake with id: " + req.params.id)
})

router.put("/:id", (req, res) => {
    res.send("updated bake id: " + req.params.id + "to " + req.body.name)
})

module.exports = router;