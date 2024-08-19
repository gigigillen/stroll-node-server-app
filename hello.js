
export default function Hello(app) {
    app.get('/hello', (req, res) => {
        res.send("hello <3");
    });


    app.get("/", (req, res) => {
        res.send("Your server is up and running ayeee");
    })
}