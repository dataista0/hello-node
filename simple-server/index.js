var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.iniciar;
handle["/iniciar"] = requestHandlers.iniciar;
handle["/subir"] = requestHandlers.subir;
handle["/init"] = requestHandlers.init;
//handle["/subscr"] = requestHandlers.subscr;

//server.iniciar(router.route, handle);
server.init(router.route, handle);

/*function decir(palabra) {
  console.log(palabra);
}

function ejecutar(algunaFuncion, valor) {
  algunaFuncion(valor);
}

ejecutar(function(x){console.log(x);}, "Hola");*/
