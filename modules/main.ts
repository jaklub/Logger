///<reference path='../typings/tsd.d.ts'/>
declare var module: {
    exports: any;
    require(id: string): any;
    id: string;
    filename: string;
    loaded: boolean;
    parent: any;
    children: any[];
};

"use strict";
module.exports = main;

var Deferred = require("promised-io/promise").Deferred;

function main(io: SocketIO.Server, secret: Secret.iSecret){
    return new Main(io, secret);

}

interface iMain {
    io: SocketIO.Server;
    sockets: SocketIO.Namespace;
}


function Main(io :SocketIO.Server, secret : Secret.iSecret) {
    var self: iMain  = <any>this;

}