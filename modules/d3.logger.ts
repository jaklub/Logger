/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/d3/d3.d.ts" />
/// (amd-dependency path=”d3” /)

// Ambient declarations for 'require' and 'define'
//declare var require: Require;
//declare var requirejs: Require;
//declare var req: Require;
//declare var define: RequireDefine;

interface iLogOptions {
    loggerStyle: string;
}

interface iLogMessage {
    message: string;
}


interface iLog {
    d3: D3.Base;
    options: iLogOptions;
    messages: string[];
    logElement: D3.Selection;
    wrapper: D3.Selection;
    lastLogTime: number;
    timeOut: number;
    init(iLoggerOptions):  void;
    logMessage(iLogMessage):  void;

}


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['d3'], factory);
    }
}(this, function (d3 : D3.Base) {



    console.log("d3.logger loaded!");

    var Logger = function(d3 : D3.Base){
        var self: iLog  = <any>this;
        self.options = {loggerStyle: "background-color: aqua;"};
        self.d3 = d3;
        self.messages = [];
        self.timeOut;

        // Init the logger
        self.init = function(options: iLogOptions){
            //self.options = options;
            self.lastLogTime = new Date().valueOf();

            d3.select("body")
            //d3.select("#wrapper")
                .append('div')
                .attr('id','logger')
                .attr('style',"position: fixed; bottom: -32px; width: 80%; z-index: 1001; left: 10%;")
                .append('span')
                .classed('log-wrapper hidden', true)
                .attr('style','opacity: 0; background-color: #555555; display: block; height: 17px; overflow: hidden; border-radius: 10px; padding-top: 10px; padding-bottom: 10px;; color: white; box-sizing: content-box');

            self.logElement = self.d3.select("#logger");
            self.wrapper = self.d3.select("#logger").select('.log-wrapper');
            self.logElement.on('click',function(arg1,arg2){
                toggleExpand(self.wrapper);
            });

            // Show logger on mouse over
            self.logElement.on('mouseover',function(arg1,arg2){
                showLogger();
            });
        };

        // Call to show a message
        self.logMessage = function(message : string){
            console.log("logMessage: " + message);
            addMessage(message);
        };


        function addMessage(message : string){


            if(self.wrapper.classed('hidden')) {
                self.wrapper.classed('hidden', false).transition().duration(500).style('opacity', '1');
                self.logElement.transition().duration(500).style('bottom', '10px');
            }

            self.messages.push(message);
            var log = self.logElement.select('.log-wrapper').selectAll('div').data(self.messages);

            var newMess = log.enter()
                .insert('div', ':first-child')
                .classed('message-wrapper', true)
                .style('margin-bottom', '0px')
                .style('margin-top', '-28px')
                .style('padding-top', '10px')
                .style('padding-bottom', '10px')
                .style('padding-left', '10px')
                .style('background-color', 'rgb(85, 85, 85)')
                .style('background-color',function(d,i) {
                    //console.log("i = " + i + ", self.messages.length = " + self.messages.length);
                    if (i % 2 == 1 && self.wrapper.classed('expanded')) {
                        return "rgb(80, 80, 80)";
                    } else {
                        return "rgb(85, 85, 85)";
                    }
                })
                .style('padding-top',function(d,i) {
                    if (self.wrapper.classed('expanded')) {
                        return "10px";
                    } else {
                        return "0px";
                    }
                })
                .append('span')
                .classed('message', true)
                .text(function(d){
                    return d;
                });

            newMess
                .transition()
                .style('margin', '1px');

            self.logElement.selectAll('.message-wrapper')
                .transition()
                .style('margin-top', '0px');

            self.lastLogTime = new Date().valueOf();
            checkAndHideLogger();
        }

        function checkAndHideLogger(){
            console.log('checkAndHideLogger()');
            //var timeOut;
            if(!self.wrapper.classed('expanded')){
                clearTimeout(self.timeOut);
                self.timeOut = setTimeout(function(){
                    var time = new Date().valueOf();
                    if(((time - self.lastLogTime) > 2000) && !self.wrapper.classed('expanded')) {
                        self.wrapper.classed('hidden',true).transition().duration(500).style('opacity', '0');
                        self.logElement.transition().duration(500).style('bottom', '-32px');
                    }
                    else{
                        checkAndHideLogger();
                    }
                }, 5000);
            }
            else{
                clearTimeout(self.timeOut);
                self.timeOut = setTimeout(function(){
                    var time = new Date().valueOf();
                    checkAndHideLogger();
                }, 10000);
            }

        }

        function toggleExpand(wrapper){
            if(!wrapper.classed('expanded')){ // Expand
                wrapper.classed('expanded',true).transition().style('height', '250px').style('overflow', 'auto').style('padding-top', '0px');
                wrapper.selectAll('.message-wrapper').style('padding-top', '10px').transition().duration(1000).style('background-color',function(d,i){
                    var a = "";
                    if((self.messages.length - i) % 2 == 0){
                        return "rgb(80, 80, 80)";
                    }else{
                        return "rgb(85, 85, 85)";
                    }
                });
            }else{ // Collapse
                wrapper.classed('expanded',false).transition().style('height', '17px').style('overflow', 'hidden').style('padding-top', '10px');
                wrapper.selectAll('.message-wrapper').transition().style('background-color', 'rgb(85, 85, 85)').style('padding-top', '0px');
            }

        }

        function showLogger(){
            //console.log("mouse over");
            if(self.wrapper.classed('hidden')){
                self.wrapper.classed('hidden',false).transition().duration(500).style('opacity', '1');
                self.logElement.transition().duration(500).style('bottom', '10px');
            }else{
                //self.wrapper.classed('hidden',true).transition().duration(500).style('opacity', '0');
            }

            self.lastLogTime = new Date().valueOf();
            checkAndHideLogger();
        }


        function getTime(){
            var date = new Date();
            return ((date.getHours() < 10)?"0":"") + date.getHours() +":"+ ((date.getMinutes() < 10)?"0":"") + date.getMinutes() +":"+ ((date.getSeconds() < 10)?"0":"") + date.getSeconds();
        }


    };
    return new Logger(d3);
}));
