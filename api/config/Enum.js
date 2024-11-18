module.exports={
    HTTP_CODES:{     
        CONTINUE: 100, 
        SWITCHING_PROTOCOLS:101,
        OK:200,
        CREATED:201,
        ACCEPTED:202,
        NO_CONTENT:204,        
        MOVED_PERMANENTLY:301,
        FOUND:302,
        NOT_MODIFIED :304,       
        BAD_REQUEST:400,
        UNAUTHORIZED:401,
        FORBIDDEN:403,
        NOT_FOUND:404,
        METHOD_NOT_ALLOWED:405,
        REQUEST_TIMEOUT:408,
        CONFLICT:409,       
        INT_SERVER_ERROR:500,
        NOT_IMPLEMENTED:501,
        BAD_GATEWAY:502,
        SERVICE_UNAVAILABLE:503,
        GATEWAY_TIMEOUT :504        

    },
    PASS_LENGTH:8,
    SUPER_ADMIN:"SUPER_ADMIN",
    LOG_LEVELS:{
        "INFO":"INFO",
        "WARN":"WARN",
        "ERROR":"ERROR",
        "DEBUG":"DEBUG",
        "VERBOSE":"VERBOSE",
        "HTTP":"HTTP"
    }

}