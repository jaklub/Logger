require.config({
    baseUrl: 'javascripts',
        shim: {
            'd3': {
                exports: 'd3'
            },
            'bootstrap': {
                deps :['jquery'],
                exports: '$.fn.popover'
            }
        },    
    paths: {
        'client-main': 'client-main',
        'bootstrap': '/bootstrap/dist/js/bootstrap.min',        
        'jquery': '../jquery/dist/jquery.min',
        'd3': '../d3/d3.min',
        //socketio: 'libs/socket.io',
        'd3logger': '../d3.logger',
        'test': '../test',
        shim: {
            d3: {
                exports: 'd3'
            }
        }
    }
});


requirejs(["client-main"]);