const pino = require('pino');
const pinoHttp = require('pino-http');
const {randomUUID} = require('node:crypto')

const pinoLogger = pino({transport: {target: 'pino-pretty'}});

exports.default = pinoLogger;
exports.reqLogger = () => pinoHttp({
    logger: pinoLogger,
    genReqId: function (req, res) {
        const existingID = req.id ?? req.headers["x-request-id"]
        if (existingID) return existingID
        const id = randomUUID()
        res.setHeader('X-Request-Id', id)
        return id
    }
})