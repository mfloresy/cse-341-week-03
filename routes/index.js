const router = require("express").Router()

router.use("/", require("./swagger"))

router.get("/", (req, res) => {
    res.send("Official website")
})

router.use("/students", require("./students"))

module.exports = router