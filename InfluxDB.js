
        function influxdbSend2(metric, influxdbUrl, influxdbToken, log, logError){
        	try{
                       // log(`metric: ${metric}`);
                       // log(`influxdbUrl: ${influxdbUrl}`);
                       // log(`influxdbToken: ${influxdbToken}`);
                        log("point 1");

                	let client = new XMLHttpRequest();
                                                               
                        log("point 2");


                    // Important: you must 
                	//   1. add 'internet' privilege in the config.xml
                	//   2. set policy  access for your full url and set 'allow subdomain' to 'true'
                    var html = '';
                    /* Assign request type and server path */
                        log("point 3");

                    client.open("POST", influxdbUrl, true);
        			client.setRequestHeader('Authorization', 'Token '+influxdbToken);
                                                log("point 4");

                    client.setRequestHeader('Content-Type', 'text/plain; charset=utf-8');
                                                log("point 5");

                    client.setRequestHeader('Accept','application/json');
                                                log("point 6");

                    	client.onerror = function(e) { // происходит, только когда запрос совсем не получилось выполнить
                    	  logError('Connection error for url ['+influxdbUrl+']. e: ' + e + ', e.target.status: ' + e.target.status);
                    	};
                                                log("point 7");

client.onprogress = function(event) { // запускается периодически
                    	  // event.loaded - количество загруженных байт
                    	  // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
                    	  // event.total - количество байт всего (только если lengthComputable равно true)
                    	  log('Loaded '+event.loaded+' from '+event.total);
                    	};
                        log("point 8");

                    client.onreadystatechange = function() {//Вызывает функцию при смене состояния. 
                                                    log("point 9");

                        if(client.readyState === XMLHttpRequest.DONE) { 
                        	if(client.status === 200 || client.status === 204){
                                                                log("point 10");

                        		// Запрос завершён. Здесь можно обрабатывать результат.
                                log('Sent request successfull ' + client.responseText);
                                                                log("point 11");

                        	}else{
                                                                log("point 12");

                        		log('XMLHttpRequest.DONE: ' + client.status);
                                                                log("point 13");

                        	}
                        }else if(client.readyState===XMLHttpRequest.HEADERS_RECEIVED){
                                                        log("point 14");

                        	log('HEADERS_RECEIVED: ' + client.getAllResponseHeaders());
                        }else if(client.readyState===XMLHttpRequest.OPENED){
                                                        log("point 15");

                        	log('CONNECTION OPENED ['+influxdbUrl+']');
                        }else if(client.readyState===XMLHttpRequest.LOADING){
                                                        log("point 16");

                        	log('Loaded '+event.loaded+' from '+event.total);
                        }else{
                                                        log("point 17");

                        	logError("["+XMLHttpRequest.DONE+"] client.state: " + client.readyState + ", client.status: " + client.status);
                        }
                    };
                        log("point 18");

                    metric = metric + ' ' + Math.floor( new Date() / 1000 )+'000000000';
                                                log("point 19");

                    log('sent metric: ' + metric);
                    client.send(metric);
        	}catch(err){
        		logError('Exception on influxdbSend2' + err);
        	}
         }
