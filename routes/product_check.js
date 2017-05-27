// make this file export a function, import the function in the app, the function takes an argument (keyword as argument), function returns true or false

module.exports = function productCheck(keyword, cb) {

  const {OperationHelper} = require('apac');
  const opHelper = new OperationHelper({
      awsId:     'AKIAIAH3JPUF6SDIALLA',
      awsSecret: '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',
      assocId:   'heimvaa0f-20'
  });
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'MusicalInstruments',
    'SearchIndex': 'Electronics',
    'SearchIndex': 'LawnAndGarden',
    'SearchIndex': 'PetSupplies',
    'SearchIndex': 'Kitchen',

    'Keywords': keyword,
  })
    .then((response) => {
      if (response.result.ItemSearchResponse.Items.Item) {
        console.log(true)
      } else console.log(false);
  }).catch((err) => {
      console.error("Something went wrong! ", err);
  });

}



