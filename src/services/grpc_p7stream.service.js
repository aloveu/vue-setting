// const grpc = require('grpc');
const { StakeUpdateRequest } = require('../proto/p7stream_pb.js');
const { StakeNotificationClient, StakeNotificationPromiseClient } = require('../proto/p7stream_grpc_web_pb.js');

const client = new StakeNotificationClient('https://ip-10-133-2-50.ec2.internal:5001/');
const client2 = new StakeNotificationPromiseClient('https://ip-10-133-2-50.ec2.internal:5001/');

const gprcP7Stream = {
    stakeUpdate: () => {
        const request = new StakeUpdateRequest();

        request.setUpdatetype(0);
        request.setStakeprogress(1);
        request.setStakeid(1);
        request.setReferenceid(231);
        request.setSoldpercent(30123);
        request.setOfferedpercent(1);

        client.stakeUpdate(request, {}, (err, res) => {
            console.log(res);
            console.log(err);
        });
    },
    promiseStakeupdate: async () => {
        try {
            const request = new StakeUpdateRequest();

            request.setUpdatetype(0);
            request.setStakeprogress(1);
            request.setStakeid(1);
            request.setReferenceid(231);
            request.setSoldpercent(30123);
            request.setOfferedpercent(1);
            return await client2.stakeUpdate(request, {});
        } catch (e) {
            throw Error(e);
        }
    },
};

export default gprcP7Stream;
