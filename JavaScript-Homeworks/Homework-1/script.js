const company = "SEDC Retail";
let address = "11th October St. 33a, Skopje 1000 MK";
let todayDate = String(Date()).slice(4, 15);
let invoiceNo = 1;
let customer = "Phone collectioners";
let item = "phone";
let noPhoneItems = 30;
let netPhonePrice = 119.95;
let taxRate = 1.05;
let tax = (netPhonePrice * (5 / 100)).toFixed(4);
let debt = 0;
// The tax rate is 5% but it cannot be displayed like that in JS, so i
// refactored it as a number which needs to be multiplied to the net Price
// in order to get the gross price of the requested item in this case the Phone
let grossPhonePrice = netPhonePrice + parseFloat(tax);
let totalPhonesAmount = noPhoneItems * grossPhonePrice;
console.log(
  `${company} \n ${address} \n Date: ${todayDate} \n Bill to: ${customer} \n Invoice Number: ${invoiceNo} \n Item: ${item.toUpperCase()} \n Net ${item} Price:${netPhonePrice}$ \n Tax rate: 5% per item is:${tax}$ \n Gross ${item} price:${grossPhonePrice}$ \n Total: ${noPhoneItems} ${
    noPhoneItems > 1 ? item + "s" : item
  } cost ${totalPhonesAmount}$ \n ${
    debt > 0 ? "Please pay your debt" : "Your debt until now is " + debt + "$"
  } \n Thanks for shopping with us \n Terms and Conditions \n Payment is due within 15 days`
);
