function AppFrame () {}
 
AppFrame.prototype.getArraySubObjects = function( data ) {
    if (data.constructor != Array) {
        var temp = [];
        temp.push(data)
        return temp;
    } else
        return data;
};

AppFrame.prototype.isArray= function( variable ) {
  if( Object.prototype.toString.call( variable ) === '[object Array]' ) {
    return true;
	}
};