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



AppFrame.prototype.parseData = function( xmldata ) {
   var jsondata = convertToJson( xmldata.data );
   console.log( "parseData", jsondata );
   return jsondata;
};


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
