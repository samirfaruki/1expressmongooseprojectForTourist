// const router = require("express");
const Natours = require("../models/tourmodel");

const APIFeatures = require("./../utils/apiFeatures");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Natours.find(), req.query)
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

exports.getOne = (req, res) => {
  Natours.findById(req.params.id)
    .then((Natours) => {
      if (!Natours) {
        return res.status(404).send();
      }
      res.send(Natours);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.createPost = async (req, res) => {
  console.log(req.body.title);
  const thing = new Natours({
    name: req.body.name,
    duration: req.body.duration,
    maxGroupSize: req.body.maxGroupSize,
    difficulty: req.body.difficulty,
    ratingsAverage: req.body.ratingsAverage,
    ratingsQuantity: req.body.ratingsQuantity,
    price: req.body.price,
    summary: req.body.summary,
    images: req.body.images,
    imageCover: req.body.imageCover,
    startDates: req.body.startDates,
  });
  thing
    .save()
    .then(() => {
      res.status(201).send("Post saved successfully!");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.delete = (req, res) => {
  Natours.findByIdAndDelete(req.params.id)
    .then((Natours) => {
      if (!Natours) {
        return res.status(404).send();
      }
      res.send(Natours);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.patch = (req, res) => {
  Natours.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((Natours) => {
      if (!Natours) {
        return res.status(404).send();
      }
      res.send(Natours);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.Average = async (req, res) => {
  try {
    const stats = await Natours.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          tourSum: { $sum: 1 },

          averageprice: { $avg: `$price` },
          maxprice: { $max: `$price` },
          minprice: { $min: `$price` },
          averagrating: { $avg: `$ratingsAverage` },
          maxratingsAverage: { $max: `$ratingsAverage` },
          minratingsAverage: { $min: `$ratingsAverage` },
        },
      },

      // { $sort : { … } }
    ]);
    res.status(200).json({
      status: "success",
      results: stats.length,
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.monthlyplan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const topTen = await Natours.aggregate([
      { $unwind: `$startDates` },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numOfMonth: { $sum: 1 },
          tours: { $push: `$name` },
        },
      },
      {
        $sort: { numOfMonth: -1 },
      },
      { $limit: 10 },
    ]);
    res.status(200).json({
      status: "success",
      results: topTen.length,
      monthlypanes: {
        topTen,
      },
    });
  } catch (err) {
    console.log(err),
      res.status(404).json({
        status: "fail",
        message: err,
      });
  }
};
