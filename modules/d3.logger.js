/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/d3/d3.d.ts" />
/// (amd-dependency path=”d3” /)
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['d3'], factory);
    }
}(this, function (d3) {
    console.log("d3.logger loaded!");
    var Logger = function (d3) {
        var self = this;
        self.options = { loggerStyle: "background-color: aqua;" };
        self.d3 = d3;
        self.messages = [];
        self.init = function (options) {
            //self.options = options;
            d3.select("body").append('div').attr('id', 'logger').attr('style', "position: absolute; bottom: 10px; width: 80%;").append('span').classed('log-wrapper hidden', true).attr('style', 'opacity: 0; background-color: #555555; display: block; height: 17px; overflow: hidden; border-radius: 10px; padding-top: 10px; padding-bottom: 10px;; color: white;');
            //self.logElement = self.d3.select("#logger > .log-wrapper");
            self.logElement = self.d3.select("#logger");
            self.wrapper = self.d3.select("#logger").select('.log-wrapper');
            self.logElement.on('click', function (arg1, arg2) {
                toggleExpand(self.wrapper);
            });
            self.logElement.on('mouseover', function (arg1, arg2) {
                //console.log("mouse over");
                if (self.wrapper.classed('hidden')) {
                    self.wrapper.classed('hidden', false).transition().duration(500).style('opacity', '1');
                }
                else {
                }
            });
        };
        self.logMessage = function (message) {
            console.log("logMessage: " + message);
            addMessage(message);
            //d3.tr
        };
        function addMessage(message) {
            if (self.wrapper.classed('hidden')) {
                self.wrapper.classed('hidden', false).transition().duration(500).style('opacity', '1');
            }
            self.messages.push(message);
            var log = self.logElement.select('.log-wrapper').selectAll('div').data(self.messages);
            var newMess = log.enter().insert('div', ':first-child').classed('message-wrapper', true).style({ 'margin-bottom': '0px', 'margin-top': '-28px', 'padding-top': '10px', 'padding-bottom': '10px', 'padding-left': '10px', 'background-color': 'rgb(85, 85, 85)' }).style('background-color', function (d, i) {
                console.log(i);
                if (i % 2 == 0 && self.wrapper.classed('expanded')) {
                    return "rgb(80, 80, 80)";
                }
                else {
                    return "rgb(85, 85, 85)";
                }
            }).append('span').classed('message', true).text(function (d) {
                return d;
            });
            newMess.transition().style('margin', '1px');
            self.logElement.selectAll('.message-wrapper').transition().style('margin-top', '0px');
        }
        function toggleExpand(wrapper) {
            if (!wrapper.classed('expanded')) {
                wrapper.classed('expanded', true).transition().style('height', '250px').style('overflow', 'auto');
                wrapper.selectAll('.message-wrapper').transition().duration(500).style('background-color', function (d, i) {
                    var a = "";
                    if (i % 2 == 0) {
                        return "rgb(80, 80, 80)";
                    }
                    else {
                        return "rgb(85, 85, 85)";
                    }
                });
            }
            else {
                wrapper.classed('expanded', false).transition().style('height', '17px').style('overflow', 'hidden').style('overflow', 'auto');
                wrapper.selectAll('.message-wrapper').transition().style('background-color', 'rgb(85, 85, 85)');
            }
        }
    };
    return new Logger(d3);
}));
//# sourceMappingURL=d3.logger.js.map