const fetch = require("node-fetch");

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};


module.exports = async function (context, req) {

    const baseCurrency = req.query.base;
    const requiredCurrency = req.query.required;
    const currencyQuery = "https://api.exchangeratesapi.io/latest?symbols=" + requiredCurrency + "&base=" + baseCurrency;

    const currencyResponse = await getData(currencyQuery);

    const price = req.query.price;
    newPrice = price *  currencyResponse.rates[requiredCurrency];
    const responseMessage = currencyResponse 
        ? "Currency Query " + currencyQuery + "\n" +
        "Currency response " + currencyResponse  + "\n" +
        "Price " + price  + "\n" +
        "New price " + newPrice
        : "No currency response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

}