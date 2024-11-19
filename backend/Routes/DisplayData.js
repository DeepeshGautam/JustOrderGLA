const express = require('express')
const router = express.Router()

router.post('/foodData',(req,res)=>{
    try{
        res.send([global.food_items,global.foodCategory])  // dono fetched data ko combine in array kr diya
    }catch(error){
        console.error(error.message)
        res.send("Server Error")
    }
})
// idhar jo data fetch kiya and store kiya global varibles m unko by router API m daal diya
// abb iss API se data fetch krenge toh DB se data aa jeyaga
// jo Home.jsx m fetch kiya h by fetch method
module.exports = router;