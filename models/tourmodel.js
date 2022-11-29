const mongoose = require("mongoose");
// const express = require("express");

const Natours = mongoose.Schema;

const natoursSchema = new Natours([
  {
    name: { type: String, required: true },
  },
  {
    duration: { type: Number, required: true },
  },
  {
    maxGroupSize: { type: Number, required: true },
  },
  {
    difficulty: { type: String, required: true },
  },
  {
    ratingsAverage: { type: Number },
  },
  {
    ratingsQuantity: { type: Number },
  },
  {
    price: { type: Number },
  },
  {
    summary: { type: String },
  },
  {
    imageCover: { type: [String] },
  },
  {
    images: { type: [String] },
  },
  {
    startDates: { type: [Date] },
  },
]);

module.exports = mongoose.model("Natours", natoursSchema);
