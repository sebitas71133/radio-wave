// src/services/xmlParser.js
import xml2js from "xml2js";

export const parseXML = (xmlString) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.SHOUTCASTSERVER); // Devuelve solo la parte que te interesa
      }
    });
  });
};
