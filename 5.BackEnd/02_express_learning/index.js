import express from 'express';

const app = express();
const port = 3000;


// app.get('/', (req, res) => {
//     res.send("Hello from Biksh and my apple store!!")
// });

// app.get('/about', (req, res) => {
//     res.send("Hello, I am Bikash Adhikari, I am full stack developer!!")
// });

// app.get('/contact', (req, res) => {
//     res.send("Hello, my email of biksh.dev@gmail.com!!")
// });

app.use(express.json());  // middleware(for JSON parsing) that get data from Front-End

//Design a simple application that stores my data in an array:
let appleData = [];
let nextId = 1;


//Add a new apple product to appleData array[]
app.post("/apples", (req, res) => {
    const { name, price } = req.body;
    const newApple = { id: nextId++, name, price };  //new apple object
    appleData.push(newApple);
    res.status(201).send(newApple);
});


// List all data from the appleData array[]
app.get('/apples', (req, res) => {
    res.status(200).send(appleData);
});



// list a sigle apple-product by ID
app.get('/apples/:id', (req, res) => {
    const appl = appleData.find(a => a.id === parseInt(req.params.id)) // everything from url is string

    if (!appl) {
        return res.status(404).send("Apple product not found");
    }

    res.status(200).send(appl);
});


//Update/Edit apple-product
app.put('/apples/:id', (req, res) => {
    const appl = appleData.find(a => a.id === parseInt(req.params.id))   //grab the id as str and convert to int

    if (!appl) {
        return res.status(404).send("Apple product not found");
    }

    const { name, price } = req.body;
    appl.name = name;
    appl.price = price;
    res.status(200).send(appl);

});



//delete apple-product
app.delete('/apples/:id', (req, res) => {
    const index = appleData.findIndex(a => a.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).send("Apple product to be deleted is not found");
    }
    appleData.splice(index, 1)
    res.status(204).send("Deleted");
});







app.listen(port, () => {
    console.log(`Server is running at port: ${port} ....`)
});


