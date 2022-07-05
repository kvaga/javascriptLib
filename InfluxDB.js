
        function influxdbSend2(metric, influxdbUrl, influxdbToken, log, logError){
        	try{
                	let client = new XMLHttpRequest();

                    // Important: you must 
                	//   1. add 'internet' privilege in the config.xml
                	//   2. set policy  access for your full url and set 'allow subdomain' to 'true'
                    var html = '';
                    /* Assign request type and server path */
                    client.open("POST", influxdbUrl, true);
        			client.setRequestHeader('Authorization', 'Token '+influxdbToken);
                    client.setRequestHeader('Content-Type', 'text/plain; charset=utf-8');
                    client.setRequestHeader('Accept','application/json');
                    	client.onerror = function(e) { // происходит, только когда запрос совсем не получилось выполнить
                    	  logError('Connection error for url ['+influxdbUrl+']. e: ' + e + ', e.target.status: ' + e.target.status);
                    	};
client.onprogress = function(event) { // запускается периодически
                    	  // event.loaded - количество загруженных байт
                    	  // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
                    	  // event.total - количество байт всего (только если lengthComputable равно true)
                    	  log('Loaded '+event.loaded+' from '+event.total);
                    	};
                    
                    client.onreadystatechange = function() {//Вызывает функцию при смене состояния. 
                        if(client.readyState === XMLHttpRequest.DONE) { 
                        	if(client.status === 200 || client.status === 204){
                        		// Запрос завершён. Здесь можно обрабатывать результат.
                                log('Sent request successfull ' + client.responseText);
                        	}else{
                        		log('XMLHttpRequest.DONE: ' + client.status);
                        	}
                        }else if(client.readyState===XMLHttpRequest.HEADERS_RECEIVED){
                        	log('HEADERS_RECEIVED: ' + client.getAllResponseHeaders());
                        }else if(client.readyState===XMLHttpRequest.OPENED){
                        	log('CONNECTION OPENED ['+influxdbUrl+']');
                        }else if(client.readyState===XMLHttpRequest.LOADING){
                        	log('Loaded '+event.loaded+' from '+event.total);
                        }else{
                        	logError("["+XMLHttpRequest.DONE+"] client.state: " + client.readyState + ", client.status: " + client.status);
                        }
                    };
                   
                    metric = metric + ' ' + Math.floor( new Date() / 1000 )+'000000000';
                    log('sent metric: ' + metric);
                    client.send(metric);
        	}catch(err){
        		logError('Exception on influxdbSend2', err);
        	}
         }
