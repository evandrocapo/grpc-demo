from concurrent import futures
import logging

import grpc

import helloworld_pb2
import helloworld_pb2_grpc


class Greeter(helloworld_pb2_grpc.GreeterServicer):
    # Adiciona a função sayHello
    def SayHello(self, request, context):
        if request.lastName != None:
            return helloworld_pb2.HelloReply(message='Hello World, %s %s' % (request.name, request.lastName), full_name='%s %s' % (request.name, request.lastName))
        else:
            return helloworld_pb2.HelloReply(message='Hello World, %s' % request.name, full_name='%s' % (request.name))

    def SayGoodBye(self, request, context):
        return helloworld_pb2.GoodByeReply(message='Good bye, my friend :)')

# Inicia o servidor na porta 50051
# Adiciona o serviço Say Hello;
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    helloworld_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
