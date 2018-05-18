var mssql = require("../mssql");

var appRouter = function (app) {
  app.get("/", function (req, res) {
    res.status(200).send({ message: 'hello world' });
  });

  app.get("/thing", function (req, res) {
    mssql.Read(data => {
      res.status(200).send(data)
    });
  });

  app.post("/thing/add", function (req, res) {
    mssql.Write(req.body, (data) => {
      res.status(200).send({"status": true});
    });
  });

  app.get("/thing/remove/:num", function (req, res) {
    var num = req.params.num;

    mssql.Remove(num, (data) => {
      res.status(200).send({"status": true});
    });
  });
}

module.exports = appRouter;