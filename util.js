function readCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function getQS(qsParam)
{
    var qsVars = [];
    var hash;

    if(window.location.search.split(qsParam)[1])
    {
	    var hashes = window.location.search.slice(window.location.search.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        if(hash[0] == qsParam) {
	        	return parseInt(hash[1]);
	        }
	    }
	} else {
		return 0;
	}
}

function setQS(url, key, value) {   
	  if (key) {
	    var isQuestionMarkPresent = url && url.indexOf('?') !== -1;
	    var separator = isQuestionMarkPresent ? '&' : '?';
	    url += separator + key + '=' + value;
	  }
	  return url;
}
