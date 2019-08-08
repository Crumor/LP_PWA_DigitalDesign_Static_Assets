(function ($, undefined)
{
    
    $.fn.AnimationSvg =  function(options){
        
        var defaults = {
            spriteWidth:700,
            spriteHeight:120,
            areaWidth:100,
            areaHeight:100,
            steps:7,
            speedAnimation:100,
            urlImg:""
        };
        
        var opts = $.extend(true, {}, defaults, options);
        
        return this.each( function(){
            
            var imgSvgWidth = getWidthSprite();
            var positionInitX = 0;
            var content = $(this);
            var contentSprite = content.find(".icono");
            var startAnimation = false;
            var animation = null;
            
            contentSprite.css({
                'width':opts.areaWidth+'px',
                'height':getHeightContent()+'px',
                'background-size': imgSvgWidth+'px 100%'
            });
            
            content.hover( function(){
                _reset();
                startAnimation = true;
            });
            
            content.mouseleave( function(){
                _reset();
                startAnimation = false;
            });

            function _animation(){
                if( startAnimation ){
                    positionInitX -= opts.areaWidth;
                    contentSprite.css({'background-position-x':positionInitX+'px'});
                    if( positionInitX <= ( imgSvgWidth * -1 ) ){
                        positionInitX = 0;
                    }
                }
            };
            
            function _reset(){
                
                positionInitX = 0;
                contentSprite.css({'background-position-x':positionInitX+'px'});
            };
            function getWidthSprite(){
                return ( opts.areaWidth * opts.steps );
            }
            function getHeightContent(){
                var calculteScale = getWidthSprite() / opts.spriteWidth;
                return opts.spriteHeight * calculteScale;
            }
            animation = setInterval( _animation, opts.speedAnimation );

        });
    }

})(jQuery);