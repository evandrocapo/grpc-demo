const PROTO_PATH = './protos/helloworld.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  const target = 'localhost:50051';
  const user = 'Evandro'
  const lastName = 'Capovilla'

  var client = new hello_proto.Greeter(target, grpc.credentials.createInsecure());

  client.sayHello({name: user, lastName: lastName}, function(err, response) {
    console.log('Greeting:', response.message);
    console.log('Your full name is: ', response.full_name)
  });

  client.sayGoodBye({}, (err, response)=>{
    console.log(response?.message);
  })
}

main();
