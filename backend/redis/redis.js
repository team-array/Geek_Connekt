const redis = require('redis');

module.exports.client = null;

module.exports.connect = () => {
        
        const client = redis.createClient({
                host: process.env.redisUrl,
                port: 6379
        });

        // implementing cache based on least recently used eviction algorithum
        
        // CONFIG SET maxmemory-policy volatile-lru

        module.exports.client=client;
        
        client.config("SET","maxmemory-policy","volatile-lru",function(err,reply){
            if(err){
                console.log('Redis lru cache error: '+ err); 
            }
        });
        
        let reconnectTime = null;
        
        const TimeOutError = () => {
            reconnectTime = setTimeout(()=>{
                // throw new Error('Redis connection failed');
            },10000);
        }

        
        client.on("connect",function(){
            console.log("REDIS connected");
            clearTimeout(reconnectTime);
        });
        
        client.on('error', function(err){ 
            console.log('Redis error: '+ err); 
            TimeOutError();
        });
        
        client.on('end', () => {
            console.log('REDIS disconnected');
            TimeOutError();
        });
        client.on('reconnecting', () => {
            console.log('REDIS reconnecting');
            clearTimeout(reconnectTime);
        });
        
}