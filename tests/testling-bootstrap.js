var jasmineEnv = jasmine.getEnv()
jasmineEnv.addReporter(new TAPReporter(function(msg){
  console.log(msg)
}))
jasmineEnv.execute()