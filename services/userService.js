var express = require('express');
var firebase = require(__base + 'modules/firebase');

// Firebase Setup
var db = firebase.database();

var userService = {};

userService.get = async function (name) {
    var ref = db.ref('users/' + name);
    return (await ref.once('value')).val();
}

userService.create = async function (user) {
  var ref = db.ref('users/' + user.username);
  var userFB = await ref.once('value');

  if (userFB.exists())
    return "Duplicate username";

  return (await ref.set(user));
}

module.exports = userService;