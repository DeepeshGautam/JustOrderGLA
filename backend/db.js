const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://deepeshgautam44:JustOrder1@cluster0.ga8t4eh.mongodb.net/JustOrder?retryWrites=true&w=majority&appName=Cluster0";

const mongoDb = async () => {
    try {
        // Connect to the database
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to DB");

        // Fetch data from the collection
        const fetched_data = mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();

        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        if (data.length > 0) {
            global.food_items = data;
        } else {
            console.log("No data found in the food_items collection.");
        }

        if (catData.length > 0) {
            global.foodCategory = catData;
        } else {
            console.log("No data found in the foodCategory collection.");
        }

    } catch (err) {
        console.error("Error connecting to DB or fetching data:", err);
    }
}

// yahan pe database se data fetch kraya aur unhein food_item and foodCategory naam ke global variables m store kra diya
// aur inko res.send se inke data ko FE pe bhej diya

module.exports = mongoDb;
