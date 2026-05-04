const errorController = (req, res, next) => {
  res.status(404).send(
    `<h1>
      <center>Error 404 Page Not Found</center>
      </h1>`,
  );
};

module.exports = errorController;
