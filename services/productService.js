const express = require('express');
const responseHelper = require(__base + 'helpers/response');
const compareHelper = require(__base + 'helpers/compareHelper');
const firebase = require(__base + 'modules/firebase');

// Firebase Setup
const refRoot = firebase.database().ref('products');

let productService = {};

async function getByName(name) {
    return (await refRoot.orderByChild("name").equalTo(name).once('value')).val();
}

function searchFilter(products, filterObj) {
    if (!Array.isArray(products))
        return null;

    return products.filter(function (product) {
        if (filterObj.name) {
            if (product.name.toLowerCase().indexOf(filterObj.name) == -1)
                return false;
        }
        if (filterObj.publisher) {
            if (!compareHelper.StringEqualIgnoredCase(product.publisher, filterObj.publisher))
                return false;
        }
        if (filterObj.priceStartAt) {
            if (product.price < filterObj.priceStartAt)
                return false;
        }
        if (filterObj.priceEndAt) {
            if (product.price > filterObj.priceEndAt)
                return false
        }
        if (filterObj.type) {
            if (!compareHelper.StringEqualIgnoredCase(product.type, filterObj.type))
                return false;
        }
        if (filterObj.onSale) {
            if (product.sale_date > new Date().getTime())
                return false;
        }

        return true;
    });
}

productService.get = async function (name) {
    let result = await getByName(name);

    if (result == null)
        return null;

    let key = Object.keys(result)[0];
    return result[key];
}

productService.search = async function (filterObj) {
    let products = await (await refRoot.once('value')).val();
    let result = searchFilter(products, filterObj);

    if (!result || result.length == 0)
        return null;

    return result;
}

productService.create = async function (requestPublisher) {
    let publisher = await getByName(requestPublisher.name);
    if (publisher)
        return responseHelper.error("Duplicate publisher.");

    let newPublisher = refRoot.push();
    await newPublisher.set(requestPublisher);

    return (await newPublisher.once('value')).val();
}

productService.update = async function (name, requestPublisher) {
    let publisher = await getByName(name);
    if (publisher == null)
        return responseHelper.error("Not found publisher.");

    let key = Object.keys(publisher)[0];
    await refRoot.child(key).update(requestPublisher);

    return await productService.get(requestPublisher.name);
}

productService.delete = async function (name) {
    let publisher = await getByName(name);
    if (publisher == null)
        return responseHelper.error("Not found publisher.");

    let key = Object.keys(publisher)[0];
    await refRoot.child(key).remove();

    return responseHelper.success("Publisher " + name + "has been deleted.");
}

module.exports = productService;