function xml2json(xml) {
  var json = {};

  if (xml.nodeType == 1) { // element node
    if (xml.attributes.length > 0) {
      json['@attributes'] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        json['@attributes'][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text node
    return xml.nodeValue;
  }

  // deal with children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var child = xml.childNodes.item(i);
      var nodeName = child.nodeName;
      if (json[nodeName] == null) {
        json[nodeName] = xml2json(child);
      } else {
        if (json[nodeName].push == null) {
          var old = json[nodeName];
          json[nodeName] = [];
          json[nodeName].push(old);
        }
        json[nodeName].push(xml2json(child));
      }
    }
  }

  return json;
}
