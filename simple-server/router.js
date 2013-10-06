function route(handle, pathname, response, postData) {
  console.log("A punto de rutear una peticion para " + pathname);

  if(handle.hasOwnProperty(pathname) && typeof handle[pathname] === 'function') //redundancia pedagogica
  {
    handle[pathname](response, postData);  
  }
  else
  {
    console.log("Path %s not found",  pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 Not found");
    response.end();
  }

  
}

exports.route = route;
