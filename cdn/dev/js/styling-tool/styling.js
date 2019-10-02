function loaded() {
    // Focus on message box
    var a = setInterval(function(){
        //console.log(tavultesoft['keymanweb']['getKeyboards']());
        $('#message').focus();        
        oskSize();
    },500);
    function oskSize() {
        $('.desktop.kmw-osk-frame').css('display','block');
        var appPos = $('#message').position();
        var appLeft = appPos.left;
        var appTop = appPos.top;
        p = new Object();
        p['width'] = 960;
        p['height'] = 382;
        p['left'] = appLeft;
        p['top'] = appTop;
        var kmw=window.keyman;
        kmw.setActiveKeyboard('us','eng');
        kmw.osk.show(true);
        kmw.osk.setRect(p);
        $('.screener').css('top',p['top']);
        if (kmw.osk.height == 344) {
            window.clearInterval(a);
        }
    }
    $('#edit-mode').click(function(){
        $('.screener').show();
        $('#edit-mode').addClass('selected');
        $('#test-mode').removeClass('selected');
        $('.mode-alert').fadeIn(200).children('h2').html('Edit Mode Selected');
        setTimeout(function(){
            $('.mode-alert').fadeOut(200);
        },1500);
    });
    $('#test-mode').click(function(){
        $('.screener').hide();
        $('#edit-mode').removeClass('selected');
        $('#test-mode').addClass('selected');
        $('.mode-alert').fadeIn(200).children('h2').html('Test Mode Selected');
	$('#message').focus();
        setTimeout(function(){
            $('.mode-alert').fadeOut(200);
        },1500);
    });
    
    // Control box functions
    $('.minus-control').click(function(){
        if ($(this).parent('.control').hasClass('percent')) {
            var value = $(this).siblings('input').val().replace('%', "");
            var value = Number(value) - 1;
            if (value >= 0) {
                $(this).siblings('input').val(value+'%');
            }
        }else{
            var value = $(this).siblings('input').val().replace('px', "");
            var value = Number(value) - 1;
            if (value >= 0) {
                $(this).siblings('input').val(value+'px');
            }
        }
    });
    $('.plus-control').click(function(){
        if ($(this).parent('.control').hasClass('percent')) {
            var value = $(this).siblings('input').val().replace('%', "");
            var value = Number(value) + 1;
            if (value >= 0) {
                $(this).siblings('input').val(value+'%');
            }
        }else{
            var value = $(this).siblings('input').val().replace('px', "");
            var value = Number(value) + 1;
            if (value >= 0) {
                $(this).siblings('input').val(value+'px');
            }
        }
    });
    
    // Add colorpicker and classygradient to selected divs/inputs
    $('#header-footer-background,#keyboard-background,#standard-keycap-font,#standard-keytext-font,#special-keytext-font,#special-keytext-font-selected').ColorPicker({
	onSubmit: function(hsb, hex, rgb, el) {
	    $(el).val('#'+hex);
	    $(el).ColorPickerHide();
	},
	onBeforeShow: function () {
	    $(this).ColorPickerSetColor(this.value);
	}
})
    
    // Special Key Styling
    $('.sc.special1,.sc.special2,.sc.special3,.sc.special4').hover(function(){
        $('.sc.special1,.sc.special2,.sc.special3,.sc.special4').css('background','rgba(252,114,0,0.4)'); 
    },
    function(){
        $('.sc.special1,.sc.special2,.sc.special3,.sc.special4').css('background','none');
    });
    $('.sc.special1,.sc.special2,.sc.special3,.sc.special4').click(function(){
        $('.styling-section').hide();
        $('.editor').children('h1').html('Special Keys Styling');
        $('.editor').fadeIn(300);
        $('#special-styling').show();
    });
    
    // Normal Key Styling
    $('.sc.normal1').hover(function(){
        $('.sc.normal1').css('background','rgba(185,32,52,0.4)'); 
    },
    function(){
        $('.sc.normal1').css('background','none');
    });
    $('.sc.normal1').click(function(){
        $('.styling-section').hide();
        $('.editor').children('h1').html('Standard Keys Styling');
        $('.editor').fadeIn(300);
        $('#standard-styling').show();
    });
    var s_b_g = $('#standard-bg').ClassyGradient({
        gradient: '0% #EEEEEE,100% #EEEEEE',
        target: '#standard-background',
        width: 250
    }).data('ClassyGradient').getCSS();
    var s_b_g_s = $('#standard-bg-selected').ClassyGradient({
        gradient: '0% #EEEEEE,100% #EEEEEE',
        target: '#standard-background-selected',
        width: 250
    }).data('ClassyGradient').getCSS();
    var sp_b_g = $('#special-bg').ClassyGradient({
        gradient: '0% #EEEEEE,100% #EEEEEE',
        target: '#special-background',
        width: 250
    }).data('ClassyGradient').getCSS();
    var sp_b_g_s = $('#special-bg-selected').ClassyGradient({
        gradient: '0% #EEEEEE,100% #EEEEEE',
        target: '#special-background-selected',
        width: 250
    }).data('ClassyGradient').getCSS();    
    
    // Header/Footer Body Styling
    $('.sc.header,.sc.footer').hover(function(){
        $('.sc.header,.sc.footer').css('background','rgba(105,183,210,0.8)'); 
    },
    function(){
        $('.sc.header,.sc.footer').css('background','none');
    });
    $('.sc.header,.sc.footer').click(function(){
        $('.styling-section').hide();
        $('.editor').children('h1').html('OSK Header/Footer Styling');
       $('.editor').fadeIn(300);
       $('#frame-styling').show();
    });
    $('#container-header-background').change(function(){
        $('#header-footer-background').val($(this).val());
    });
    $('#container-background').change(function(){
        $('#keyboard-background').val($(this).val());
    });
    $('#container-border-radius').change(function(){
        $('#keyboard-border-radius').val($(this).val());
    });
    
    // Editor js
    $('.close').click(function(){
        $('.styling-section').fadeOut(300);
        $('.editor').fadeOut(300);
    });

}
$(document).ready( function(){
   loaded(); 
});