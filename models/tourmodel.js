const mongoose = require("mongoose");
// const express = require("express");

const Natours = mongoose.Schema;

const natoursSchema = new Natours(
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
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
natoursSchema.virtual("weeks").get(function () {
  return this.duration / 7;
});

module.exports = mongoose.model("Natours", natoursSchema);
