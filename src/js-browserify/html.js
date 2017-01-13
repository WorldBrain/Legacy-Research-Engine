/* eslint-disable max-len */

var WHITELIST_STRIP_LINEBREAKS = /[^A-Za-z\x80-\xFF 0-9 \u2018\u2019\u201C|\u201D\u2026 \u00C0-\u1FFF \u2C00-\uD7FF \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~'-\w]*/g  // eslint-disable-line max-len

var cheerio = require( 'cheerio' )
  , fs = require( 'fs' )
  ;

function extractFromText( data, callback ) {
  var $, text;

  text = data.toString()
    .replace( /< *(br|p|div|section|aside|button|header|footer|li|article|blockquote|cite|code|h1|h2|h3|h4|h5|h6|legend|nav)((.*?)>)/g, '<$1$2|||||' )
    .replace( /< *\/(td|a|option) *>/g, ' </$1>' ) // spacing some things out so text doesn't get smashed together
    .replace( /< *(a|td|option)/g, ' <$1' ) // spacing out links
    .replace( /< *(br|hr) +\/>/g, '|||||<$1\\>' )
    .replace( /<\/ +?(p|div|section|aside|button|header|footer|li|article|blockquote|cite|code|h1|h2|h3|h4|h5|h6|legend|nav)>/g, '|||||</$1>' );

  text = '<textractwrapper>' + text + '<textractwrapper>';

    $ = cheerio.load( text );
    $( 'script' ).remove();
    $( 'style' ).remove();
    $( 'noscript' ).remove();

    text = $( 'textractwrapper' ).text().replace( /\|\|\|\|\|/g, '\n' )
      .replace( /(\n\u00A0|\u00A0\n|\n | \n)+/g, '\n' )
      .replace( /(\r\u00A0|\u00A0\r|\r | \r)+/g, '\n' )
      .replace( /(\v\u00A0|\u00A0\v|\v | \v)+/g, '\n' )
      .replace( /(\t\u00A0|\u00A0\t|\t | \t)+/g, '\n' )
      .replace( /[\n\r\t\v]+/g, '\n' )
      .replace( WHITELIST_STRIP_LINEBREAKS, ' ' )
      .replace( / (?! )/g, '' )
      .replace( /[ \t\v\u00A0]{2,}/g, ' ' )
      .replace(/[^a-zA-Z0-9]+/g, " ")
      ;

      
    callback(null,text);

}


module.exports = {
  types: [
    'text/html',
    'text/xml',
    'application/xml'
  ],
  extractFromText: extractFromText
};
