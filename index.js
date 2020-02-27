const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

let student = [{
    id: "5935512001",
    name: "Somchai",
    surname: "Khemklad",
    major: "CoE",
    gpa: 3.32
}, {
    id: "5935512002",
    name: "Yaya",
    surname: "Rakngam",
    major: "SE",
    gpa: 3
}]

app.get('/student', (req, res) => {
    res.json(student)
})

app.post('/student', (req, res) => {
    let result = student.findIndex((item)=>{
        return item.id == req.body.id
    })
    console.log(result);
    
    if(result==-1){
        const std = {}
        std.id = req.body.id
        std.name = req.body.name
        std.surname = req.body.surname
        std.major = req.body.major
        std.gpa = req.body.gpa
    
        student.push(std)
    
        res.json({
            message: "push success"
        })
    }else{
        res.json({
            message: "Have"
        })
    }
    
})

app.put('/student', (req, res) => {
    let idd = req.body.id
    let result = student.findIndex(std => (std.id == +idd))

    if (req.body.id) {
        student[result].id = req.body.id
    }
    if (req.body.name) {

        student[result].name = req.body.name
    }
    if (req.body.surname) {

        student[result].surname = req.body.surname
    }
    if (req.body.major) {

        student[result].major = req.body.major
    }
    if (req.body.gpa) {

        student[result].gpa = req.body.gpa
    }

    res.json({
        message: "complete"
    })
})

app.delete('/student/:id', (req, res) => {
    student = student.filter(st => st.id != req.params.id)
    res.json({
        message: "delete"
    })
})


app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(8000, () => {
    console.log("server is running");

})