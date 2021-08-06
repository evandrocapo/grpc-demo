const PROTO_PATH = './protos/helloworld.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// Adiciona a função sayHello
function sayHello(call, callback) {
  if(call.request.lastName)
    callback(null, { message: 'Hello World, ' + call.request.name + ' ' + call.request.lastName, full_name: call.request.name + ' ' + call.request.lastName });
  else
    callback(null, { message: 'Hello World, ' + call.request.name, full_name: call.request.name});
}

function sayGoodbye(call, callback) {
  callback(null, { message: 'Good bye, my friend :)'});
}

// Inicia o servidor na porta 50051
// Adiciona o serviço Say Hello;
function main() {
  var server = new grpc.Server();

  server.addService(hello_proto.Greeter.service, {SayHello: sayHello, SayGoodBye: sayGoodbye});

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();