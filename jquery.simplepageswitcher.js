/**
 * jQuery Simple Page Switcher plugin version: 1.0.1, date: 10/10/2011
 *
 * Copyright (c) 2011 Pavel Voznenko (p.voznenko@gmail.com)
 * https://github.com/fosco-maestro/Simple-Page-Switcher
 * http://plugins.jquery.com/project/simple-page-switcher
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
(function( $, undefined ) {
    $.fn.simplePageSwitcher = function( options ) {
        var settings = {
            'perPage'        : 5,
            'effectDuration' : 'slow',
            'effectFade'     : false,
            'effects'        : false,
            'effectOnStart'  : false,
            'cssClassRow'    : 'spp-block-row',
            'cssClassLeft'   : 'spp-go-left',
            'cssClassRight'  : 'spp-go-right',
            'cssClassFirst'  : 'spp-go-first',
            'cssClassLast'   : 'spp-go-last',
            'cssClassMain'   : 'spp-block',
            'arrowLeft'      : '\u2190',
            'arrowRight'     : '\u2192'
        },
        $this = $( this );
                        
        var methods = {
            'init' : function ( options ) {
                if ( options !== undefined ) {
                    switch ( typeof options ) {
                        case 'object' :
                            $.extend( settings, options );
                            break;
                        case 'string' :
                            settings.cssClassRow = options; 
                            break;
                        case 'number' :
                            settings.perPage = options; 
                            break;
                    }
                    
                    if ( !settings.effects && !settings.effectFade ) {
                        settings.effectDuration = false;
                    }
                }
                return true;
            },
            'showRows' : function ( options ) {
                $( elObj ).hide();
                if ( options === undefined ) {
                    options = {
                        'from' : 0, 
                        'to'   : settings.perPage
                    };
                }
                if ( !settings.effectOnStart ) {
                    var tmpEffectFade = [settings.effectFade, settings.effectFade = false][0],
                        tmpEffectDuration = [settings.effectDuration, settings.effectDuration = false][0]; 
                }
                for ( var i = options.from; i < options.to; i++ ) {
                    if ( elObj[i] !== undefined ) {
                        if ( settings.effectFade ) {
                            $( elObj[i] ).fadeIn( settings.effectDuration );
                        }
                        $( elObj[i] ).show( settings.effectDuration );
                    }
                }
                if ( !settings.effectOnStart ) {
                    settings.effectFade = tmpEffectFade;
                    settings.effectDuration = tmpEffectDuration;
                    settings.effectOnStart = true;
                }
                
            }
        };
                    
        methods.init( options );  
                        
        var elObj = $( '.' + settings.cssClassRow, $this );
        
        if ( elObj.length == 0 ) {
            elObj = $this.children();
            if ( $this[0].tagName == 'TABLE' ) {
                elObj = elObj.find('tr');
            }
        }
        
        var elCount = elObj.length;
                        
        if ( elCount > settings.perPage ) {
            var pages = elCount % settings.perPage == 0 ? elCount / settings.perPage : parseInt( elCount / settings.perPage ) + 1;

            methods.showRows( );

            $this.append( '\
                <div class="' + settings.cssClassMain + '">\n\
                    <a href="#go-to-first" class="' + settings.cssClassFirst + '">1</a> \n\
                    <a href="#go-left" class="' + settings.cssClassLeft + '">' + settings.arrowLeft + '</a> \n\
                    <span>1</span> \n\
                    <a href="#go-right" class="' + settings.cssClassRight + '">' + settings.arrowRight + '</a> \n\
                    <a href="#go-to-last" class="' + settings.cssClassLast + '">' + pages + '</a>\n\
                </div>\n\
            ' );

            $( '.' + settings.cssClassFirst, $this ).click(function() {
                var options = {
                    'from' : 0,
                    'to'   : settings.perPage
                };
                                
                methods.showRows( options );
                            
                $( '.' + settings.cssClassMain + ' span', $this ).show().text( '1' );
                $( '.' + settings.cssClassFirst + ', .' + settings.cssClassLeft, $this ).hide();
                $( '.' + settings.cssClassLast + ', .' + settings.cssClassRight, $this ).show();
                            
                return false;
            })
            .hide();

            $( '.' + settings.cssClassLast, $this ).click(function() {
                var options = { 
                    'from' : (pages * settings.perPage - elCount == 0 ? elCount - settings.perPage : (pages - 1) * settings.perPage),
                    'to'   : elCount
                };
                                
                methods.showRows( options );
                            
                $( '.' + settings.cssClassMain + ' span', $this ).show().text( pages );
                $( '.' + settings.cssClassFirst + ', .' + settings.cssClassLeft, $this ).show();
                $( '.' + settings.cssClassLast + ', .' + settings.cssClassRight, $this ).hide();
                            
                return false;
            });

            $( '.' + settings.cssClassLeft, $this ).click(function() {
                var currentPage = parseInt( $( '.' + settings.cssClassMain + ' span', $this ).text() ),
                    newPage     = currentPage - 1 > 1 ? currentPage - 1 : 1,
                    options     = {
                        'from' : (newPage == 1 ? 0 : (newPage - 1) * settings.perPage),
                        'to'   : (newPage * settings.perPage >= elCount ? elCount : newPage * settings.perPage)
                    };

                methods.showRows( options );

                $( '.' + settings.cssClassMain, $this ).children().show();    
                $( '.' + settings.cssClassMain + ' span', $this ).text( newPage );

                if ( newPage == 1 ) {
                    $( '.' + settings.cssClassFirst + ', .' + settings.cssClassLeft, $this ).hide();
                }
                            
                return false;
            })
            .hide();

            $( '.' + settings.cssClassRight, $this ).click(function() {
                var currentPage = parseInt($('.' + settings.cssClassMain + ' span', $this ).text()),
                    newPage     = currentPage + 1 < pages ? currentPage + 1 : pages,
                    options     = {
                        'from' : (newPage == pages ? (pages * settings.perPage - elCount == 0 ? elCount - settings.perPage : (pages - 1) * settings.perPage) : currentPage * settings.perPage),
                        'to'   : (newPage * settings.perPage >= elCount ? elCount : newPage * settings.perPage)
                    };
                    
                methods.showRows( options );

                $( '.' + settings.cssClassMain, $this ).children().show();    
                $( '.' + settings.cssClassMain + ' span', $this ).text( newPage );

                if ( newPage == pages ) {
                    $( '.' + settings.cssClassLast + ', .' + settings.cssClassRight, $this ).hide();
                }
                            
                return false;
            });
        }
    }
})( jQuery );