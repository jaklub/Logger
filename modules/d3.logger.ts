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
    messages: [string];
    logElement: D3.Selection;
    wrapper: D3.Selection;
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
        self.messages = <[string]>[];

        self.init = function(options: iLogOptions){
            //self.options = options;
            d3.select("body")
                .append('div')
                .attr('id','logger')
                .attr('style',"position: absolute; bottom: 10px; width: 80%;")
                .append('span')
                .classed('log-wrapper hidden', true)
                .attr('style','opacity: 0; background-color: #555555; display: block; height: 17px; overflow: hidden; border-radius: 10px;padding: 10px; color: white;');

            //self.logElement = self.d3.select("#logger > .log-wrapper");
            self.logElement = self.d3.select("#logger");
            self.wrapper = self.d3.select("#logger").select('.log-wrapper');
            self.logElement.on('click',function(arg1,arg2){
                if(!self.wrapper.classed('expanded')){
                    self.wrapper.classed('expanded',true).transition().style('height','250px').style('overflow','auto');
                }else{
                    self.wrapper.classed('expanded',false).transition().style('height','17px').style('overflow','hidden').style('overflow','auto');
                }

            });

            self.logElement.on('mouseover',function(arg1,arg2){
                //console.log("mouse over");
                if(self.wrapper.classed('hidden')){
                    self.wrapper.classed('hidden',false).transition().duration(500).style('opacity', '1');
                }else{
                    //self.wrapper.classed('hidden',true).transition().duration(500).style('opacity', '0');
                }

            });



        };

        self.logMessage = function(message : string){
            console.log("logMessage: " + message);
            addMessage(message);
            //d3.tr
        };


        function addMessage(message : string){

            if(self.wrapper.classed('hidden')) {
                self.wrapper.classed('hidden', false).transition().duration(500).style('opacity', '1');
            }

            self.messages.push(message);
            var log = self.logElement.select('.log-wrapper').selectAll('div')
                .data(self.messages);

            var newMess = log.enter()
                .insert('div', ':first-child')
                .classed('message-wrapper', true)
                .style({'margin-bottom': '10px','margin-top': '-28px'})
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


        }

    }
    return new Logger(d3);
}));
