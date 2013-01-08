var jasmineEnv = jasmine.getEnv()
jasmineEnv.addReporter(new TAPReporter(function(msg){
  console.log(msg)
}))
window.onload = function() {
  jasmineEnv.execute()
}