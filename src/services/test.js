// const grpc = require('grpc');
const { StakeUpdateRequest } = require('../proto/p7stream_pb.js');
const { StakeNotificationClient } = require('../proto/p7stream_grpc_web_pb.js');

const client = new StakeNotificationClient('https://ip-10-133-2-50.ec2.internal:5001/');

const test = {
    stakeUpdate: () => {
        const request = new StakeUpdateRequest();

        request.setUpdatetype(0);
        request.setStakeid(1);
        request.setReferenceid(231);
        request.setSoldpercent(30);
        request.setOfferedpercent(1);

        client.stakeUpdate(request, (err, res) => {
            console.log(err, res);
        });
    },
};
export default test;
