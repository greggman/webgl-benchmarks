require(["benchmark-utils"], function() {

  function start() {
    var bu = BenchmarkUtils;
    window.bu = BenchmarkUtils;

    var numRuns = 10;
    var numIterations = 100;
    var maxTime = 100;
    var gl = bu.create3DContext();
    var testIndex = 0;
    
    runNextTest();
    
    function runNextTest() {
      var test = tests[testIndex++];
      test.init(gl);
    
      var minIPS;
      var maxIPS;
      var totalIPS = 0;
    
      for (var r = 0; r < numRuns; ++r) {
        var loopCount = 0;
        var start = Date.now();
        while (Date.now() - start < maxTime) {
          ++loopCount;
          for (var it = 0; it < numIterations; ++it) {
            test.test(gl);
          }
        }
        var secondsElapsed = (Date.now() - start) * 0.001;
        var totalIterations = loopCount * numRuns;
        var iterationsPerSecond = Math.floor(totalIterations / secondsElapsed);
    
        if (r == 0) {
          minIPS = iterationsPerSecond;
          maxIPS = iterationsPerSecond;
        } else {
          minIPS = Math.min(minIPS, iterationsPerSecond);
          maxIPS = Math.max(maxIPS, iterationsPerSecond);
        }
        totalIPS += iterationsPerSecond;
      }
      var err = gl.getError();
      if (err) {
        bu.fail(bu.glEnumToString(gl, err));
      }
    
      var averageIPS = Math.floor(totalIPS / numRuns);
      bu.output(test.name + ': average = ' + averageIPS +
             'ips, min = ' + minIPS +
             'ips, max = ' + maxIPS +
             'ips');
    
      if (testIndex < tests.length) {
        setTimeout(runNextTest, 100);
      }
    }
    
  }


  require.ready(start);
});
