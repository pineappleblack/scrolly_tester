
 
 // using d3 for convenience
 var main = d3.select("main");
 var scrolly = main.select("#scrolly");
 var figure = scrolly.select("figure");
 var article = scrolly.select("article");
 var step = article.selectAll(".step");

 // initialize the scrollama
 var scroller = scrollama();

 // generic window resize listener event
 function handleResize() {

    
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.7);
    step.style("height", stepH + "px");

    frame = d3.select(".flourish-embed iframe")
    if (frame.node() !== null) {
        var figureHeight = frame.node().getBoundingClientRect().height;
        var figureMarginTop = (window.innerHeight - figureHeight) / 2;

        figure.style("height", figureHeight + "px").style("top", figureMarginTop + "px");

        // 3. tell scrollama to update new element dimensions
        scroller.resize();
    }
 }

 // scrollama event handlers
 function handleStepEnter(response) {
     // response = { element, direction, index }
     
     var iframe = document.querySelector("#scrolly iframe");
     slide_num = response.index + 1
     iframe.src = iframe.src.replace(/#slide-.*/, "") + "#slide-" + slide_num;
 }

 function setupStickyfill() {
     d3.selectAll(".sticky").each(function () {
         Stickyfill.add(this);
     });
 }

 function init() {

     setupStickyfill();

     // 1. force a resize on load to ensure proper dimensions are sent to scrollama
     handleResize();

     // 2. setup the scroller passing options
     // 		this will also initialize trigger observations
     // 3. bind scrollama event handlers (this can be chained like below)
     scroller
         .setup({
             step: "#scrolly article .step",
             offset: 0.5,
             debug: false,
         })
         .onStepEnter(handleStepEnter);
    
     // setup resize event
     window.addEventListener("resize", handleResize);

    var checkCreditExist = setInterval(function() {
        credit = d3.select(".flourish-credit")
        if (credit !== 'null') {
           credit.remove()
           clearInterval(checkCreditExist)
        }
     }, 100); // check every 100ms

     var checkIframeExist = setInterval(function() {
        frame = d3.select(".flourish-embed iframe")
        if (credit !== 'null') {
            var figureHeight = frame.node().getBoundingClientRect().height;
            var figureMarginTop = (window.innerHeight - figureHeight) / 2;

            figure.style("height", figureHeight + "px").style("top", figureMarginTop + "px");
            scroller.resize();
            clearInterval(checkIframeExist)
        }
     }, 100); // check every 100ms
 }

 // kick things off
 init();