import { load } from 'protobufjs';

let AwesomeMessage;
let message;
let buffer;
let decoded;

load('awesome.proto', (err, root) => {
    if (err) throw err;

    // example code
    AwesomeMessage = root.lookupType('awesomepackage.LoginRequest');

    message = AwesomeMessage.create({ adminEmail: 'hello', password: 'saf' });
    console.log(`message = ${JSON.stringify(message)}`);

    buffer = AwesomeMessage.encode(message).finish();
    console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);

    decoded = AwesomeMessage.decode(buffer);
    console.log(`decoded = ${JSON.stringify(decoded)}`);
});

export default { message, buffer, decoded, AwesomeMessage };
