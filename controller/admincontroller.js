const admins = require("../model/admins");
const express = require("express");
const jwt = require('jsonwebtoken')
const cloudnary = require('../helper/cloudinary')

// exports.register = (req, res) => {
//   res.render("register");
// };
exports.home = (req, res) => {
  res.render("dashboard");
};
exports.formElenents = (req, res) => {
  res.render("formElenents");
};
exports.tableGeneral = async (req, res) => {
  var data = await admins.find({});
  res.render("tableGeneral", { data });
};
exports.profile = (req, res) => {
  res.render("profile");
};
exports.register = (req, res) => {
  res.render("register");
};
exports.registerPost = async (req, res) => {
  try {
    const { name, email, adminsname, pass } = req.body;
    var data = await admins.findOne({ email });
    if (data == null) {
      var datas = await admins.create({
        name,
        email,
        adminsname,
        pass,
      });
      if (datas) {
        console.log("Data Added Successfully!!!");
        req.flash("success", "Register SuccessFully");
        res.redirect("back");
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
exports.login = (req, res) => {
  res.render("login");
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

        var token = await jwt.sign({userId:data._id},process.env.KEY)
        res.cookie("jwt", token, {
          expires:new Date(Date.now() + 24*60*60*1000)
        })

        res.redirect("/admin/");
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
exports.faq = (req, res) => {
  res.render("faq");
};
exports.update = async (req, res) => {
  var obj = await admins.findById(req.params.id);
  res.render("update", { obj });
  // console.log(req.parems.id);
};
exports.updatePost = async (req, res) => {
 
  try {
    var deletess = await admins.findById(req.params.id)
      if(deletess.imgId)
      {
        var ss=await cloudnary.uploader.destroy(deletess.imgId,(err,data)=>{
          if(err)
          {
            console.log(err);
          }
          console.log(data);
        })
      }
      else
      {
        console.log("image id not define");
      }
    console.log(req.file);
      if(req.file){
        var data = await cloudnary.uploader.upload(req.file.path)
      console.log(data,"data");
      req.body.img = data.secure_url
      req.body.imgId = data.public_id
      var update = await admins.findByIdAndUpdate(req.params.id, req.body);
      if (update) { 
        console.log("Data Updated Successfully!!!");
        req.flash("success", "Data Updated Successfully!!!");
        res.redirect("/admin/tableGeneral");
      } else {
        console.log("Data Not Update");
        req.flash("success", "Data Not Update");
        res.redirect("back");
      }
      }
      else
      {
        var update = await admins.findByIdAndUpdate(req.params.id,req.body);
        if(update)
        {
          res.redirect('tableGeneral')
        }
        else
        {
          res.redirect('back')
        }
      }
  } catch (error) {
    console.log(error);
  }

}
const nodemailer = require("nodemailer");

exports.mail = async (req, res) => {
  var data = await admins.findById(req.params.id);

  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "laxsavani4259@gmail.com",
      pass: "zypxhxzjudxwvfmu", 
    },
  });

  var otp = Math.floor(100000 + Math.random() * 900000);
  var info = transport.sendMail({
    from: "laxsavani4259@gmail.com",
    to: data.email,
    subject: "OTP",
    html: `OTP:- ${otp}`,
  });
  console.log(otp);

  if (info) {
    console.log("OTP Send Successfully"); 
    req.flash("success", "OTP Send Successfully");
    res.redirect('back')
  } else {
    console.log("OTP Not Send");
    req.flash("success", "OTP Not Send");
    res.redirect('back')
  }
}

exports.deletes = async (req, res) => {
  var data = await admins.findByIdAndDelete(req.params.id);
  if (data) {
    console.log("Data Deleted Successfully!!!");
    req.flash("success", "Data Deleted Successfully!!!");
    res.redirect("back");
  } else {
    console.log("Data Not Deletes");
    req.flash("success", "Data Not Deletes");
    res.redirect("back");
  }
}