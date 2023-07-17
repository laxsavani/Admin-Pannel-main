const admins = require("../model/user");
const express = require("express");

exports.home = (req, res) => {
    res.render("userHome");
};
exports.register = (req, res) => {
    res.render("userRegister");
};
exports.login = (req, res) => {
    res.render("userLogin");
};
exports.registerPost = async (req, res) => {
    try {
      const { name, email, pass } = req.body;
      var data = await admins.findOne({ email });
      if (data == null) {
        var datas = await admins.create({
          name,
          email,
          pass,
        });
        if (datas) {
          console.log("Data Added Successfully!!!");
          req.flash("success", "Register SuccessFully");
          res.redirect("/user/login");
        } else {
          console.log("Data Not Added");
          req.flash("success", "Data Not Added");
          res.redirect("back");
        }
      } else {
        req.flash("success", "Email Already Exist");
        res.redirect("back");
        console.log("Email Already Exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  exports.loginPost = async (req, res) => {
    var email = req.body.email;
    var pass = req.body.pass;
  
    var data = await admins.findOne({ email });
    if (data == null) {
      console.log("Email Not Found");
      req.flash("success", "Email Not Found");
      res.redirect("back");
    } else {
      if (email == data.email) {
        if (pass == data.pass) {
          res.redirect("/user/home");
        } else {
          res.redirect("back");
          console.log("password Is Worng");
          req.flash("success", "password Is Worng");
        }
      } else {
        res.redirect("back");
        console.log("email Is Worng");
        req.flash("success", "email Is Worng");
      }
    }
  };

  exports.product = (req, res) => {
    res.render("userProduct");
};
  exports.cart = (req, res) => {
    res.render("userCart");
};