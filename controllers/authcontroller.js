const Users = require("../models/usermodel");

const APIFeatures = require("./../utils/apiFeatures");

exports.getAllUsers = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Users.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// ???????????????
exports.signupUser = async (req, res) => {
  // console.log(req.body.title);
  const thing = new Users({
    name: req.body.name,
    email: req.body.email,

    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    profilePic: req.body.profilePic,
  });
  thing
    .save()
    .then(() => {
      res.status(201).send("Post saved successfully!");
    })
    .catch((error) => {
      if (error.code == 11000) {
        res.send("Duplicate Email");
      } else {
        res.send("Error");
      }
    });
};
