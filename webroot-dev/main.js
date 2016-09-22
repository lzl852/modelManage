  var basic = require('./js/app/basic.js');
  var modes = require('./js/app/modes.js');
  var fnBtn = require('./js/app/fnBtn.js');
  basic.initialize();
  modes.init();
  fnBtn.initialize();
  modes.init({
      cont_node: $('#activityMode'),
      url_modes: "js/getActiveData.json",
      url_htm: "js/getModesHtmData.json"
  });

