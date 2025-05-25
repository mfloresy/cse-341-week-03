const swaggerAutogen = require("swagger-autogen")()

const doc = {
    info: {
        title: "Contacts",
        description: "Contacts API"
    },
    host: "localhost:3000",
    schems: ["https", "http"]
}

const outputFile = "./swagger.json"
const endpointFiles = ["./routes/index.js"]

swaggerAutogen(outputFile, endpointFiles, doc)