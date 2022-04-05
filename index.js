const mqtt = require('mqtt')
const tls = require('tls')
const fs = require('fs')
const path = require('path')
//const KEY = fs.readFileSync(path.join(__dirname, 'certs', 'server.key'))
//const CERT = fs.readFileSync(path.join(__dirname, 'certs','server.crt'))
//const TRUSTED_CA_LIST = fs.readFileSync(path.join(__dirname, 'certs','ca.crt')) 
//const PASSWORD = fs.readFileSync(path.join(__dirname, 'password', 'passwd_mqtt'))
//const USERNAME = 'user1'
//const CLIENT_KEY = fs.readFileSync(path.join(__dirname, 'client', 'client.key'))
//const CLIENT_CERT = fs.readFileSync(path.join(__dirname, 'client', 'client.crt'))


const PORT = 8883
const HOST = '192.168.1.104'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtts://${HOST}:${PORT}`


const options = {
  clientId,
  clean: true,
  port: PORT,
  //host: HOST,
  //key: KEY,
  //cert: CERT,
  //client_key: CLIENT_KEY,
  //client_cert: CLIENT_CERT,
  //password: PASSWORD,
  //username: USERNAME,
  rejectUnauthorized: false,
  // The CA list will be used to determine if server is authorized
  //ca: TRUSTED_CA_LIST,
  //protocol: 'mqtts',
  //protocolId: 'MQTT',
  //protocolVersion: 5,
  connectTimeout:1000, 
  debug:true
}

const client = mqtt.connect(connectUrl,options) 

client.on('connect', function () {
    console.log('Connected')
  })

client.on('error', function (error) {
    console.log(error)
  })
client.subscribe('messages')

client.publish('messages', 'Current time is: ' + new Date())
client.on('message', function (topic, message) {
  console.log(message)
})