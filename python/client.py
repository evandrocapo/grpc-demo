from __future__ import print_function
import logging

import grpc

import helloworld_pb2
import helloworld_pb2_grpc


def run():
    target = "localhost:50051"
    user = "Evandro"
    lastName = "Capovilla"

    with grpc.insecure_channel(target) as channel:
        stub = helloworld_pb2_grpc.GreeterStub(channel)
        response = stub.SayHello(helloworld_pb2.HelloRequest(name=user, lastName=lastName))
        print("Greeting: " + response.message)
        print("Your full name is: " + response.full_name)
        response = stub.SayGoodBye(helloworld_pb2.GoodByeRequest())
        print(response.message)


if __name__ == '__main__':
    logging.basicConfig()
    run()
