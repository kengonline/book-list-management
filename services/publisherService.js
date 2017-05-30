let express = require('express');
let responseHelper = require(__base + 'helpers/response');
let firebase = require(__base + 'modules/firebase');

// Firebase Setup
const refRoot = firebase.database().ref('publishers');

let publisherService = {};

async function getByName(name) {
    return (await refRoot.orderByChild("name").equalTo(name).once('value')).val();
}

publisherService.get = async function (name) {
    let result = await getByName(name);

    if (result == null)
        return null;

    let key = Object.keys(result)[0];
    return result[key];
}

publisherService.create = async function (user) {
    let publisher = await getByName(user.name);
    if (publisher)
        return responseHelper.error("Duplicate publisher.");

    let newPublisher = ref.push();
    await newPublisher.set(user);

    return (await newPublisher.once('value')).val();
}

publisherService.update = async function (name, user) {
    let publisher = await getByName(name);
    if (publisher == null)
        return responseHelper.error("Not found publisher.");

    let key = Object.keys(publisher)[0];
    delete user.name;
    await refRoot.child(key).update(user);

    return await publisherService.get(name);
}

publisherService.delete = async function (name) {
    let publisher = await getByName(name);
    if (publisher == null)
        return responseHelper.error("Not found publisher.");

    let key = Object.keys(publisher)[0];
    await refRoot.child(key).remove();

    return responseHelper.success("Publisher " + name + "has been deleted.");
}

module.exports = publisherService;