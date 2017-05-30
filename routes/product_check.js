// make this file export a function, import the function in the app, the function takes an argument (keyword as argument), function returns true or false

module.exports = (keyword, cb) => {


  const {OperationHelper} = require("apac");
  const opHelper = new OperationHelper({
      awsId:     process.env.awsId,
      awsSecret: process.env.awsSecret,
      assocId:   process.env.assocId
  });
  opHelper.execute("ItemSearch", {
    "SearchIndex": "MusicalInstruments",
    "SearchIndex": "Electronics",
    "SearchIndex": "LawnAndGarden",
    "SearchIndex": "PetSupplies",
    "SearchIndex": "Kitchen",

    "Keywords": keyword,
  })
    .then((response) => {
    console.log("response.result.ItemSearchResponse:", response)

      if (response.result.ItemSearchResponse.Items.Item) {
        cb(true)
      } else {
        cb(false)
      }
  }).catch((err) => {
      console.error("Something went wrong! ", err);
  });
}






