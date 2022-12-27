console.log('');

// const packageDefinition = protoLoader.loadSync('@/proto/helloworld.proto', {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true,
// });
// const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// const routes = protoDescriptor.helloworld;

const test = () => {
    // const client = new routes.Greeter('localhost:5000', grpc.credentials.createInsecure());
    //
    // client.sayHello({ name: 'you' }, (err, response) => {
    //     console.log('Greeting:', response.message);
    // });
};

export default test;
