let compareHelper = {};

compareHelper.StringEqualIgnoredCase = function (val1, val2) {
    let string1 = typeof val1 == "string" ? val1 : val1.toString || "";
    let string2 = typeof val2 == "string" ? val2 : val2.toString || "";

    return string1.toLowerCase() == string2.toLowerCase();
}

module.exports = compareHelper;