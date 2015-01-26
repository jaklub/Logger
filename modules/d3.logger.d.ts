/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/d3/d3.d.ts" />
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
    init(iLoggerOptions: any): void;
    logMessage(iLogMessage: any): void;
}
