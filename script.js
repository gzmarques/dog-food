    /*
        Até 5Kg   - 160g
        Até 15Kg  - 320g
        Até 30Kg  - 530g
        Até 45Kg  - 730g
    */

$(function () {
    
    $('.weight').focus();
    
    var overall = 0,
        showOverall;
    
    $('.weight').blur(function () {
        var wgt = $(this);
        var correct = wgt.val().replace(',','.');
           
        wgt.val(correct);
        
        if (isNaN(wgt.val())) {
            wgt.css({'border': '1px solid red', 'background-color': '#f2dede'});
            wgt.val("Insira um número!");
            wgt.click(function () {
                wgt.val("");
            })
        } else {
            wgt.css({'border': '1px solid green', 'background-color': '#dff0d8'});
        }
        
    })
    
    $('button').click(function (event) {
        
        event.preventDefault();
        
        var wgt = $('.weight').val(),
            qty,
            maxQty,
            minQty = 0,
            maxWgt,
            minWgt = 0,
            factor;
        
        if (wgt < 5) {
            maxQty = 160;
            maxWgt = 5;
        } else {
            if (wgt < 15) {
                maxQty = 320;
                minQty = 160;
                maxWgt = 15;
                minWgt = 5;
            } else {
                if (wgt < 30) {
                    maxQty = 530;
                    minQty = 320;
                    maxWgt = 30;
                    minWgt = 15
                } else {
                    if (wgt < 45) {
                        maxQty = 730;
                        minQty = 530;
                        maxWgt = 45;
                        minWgt = 30;
                    } else {
                        qty = wgt * 16.22222222222222222222;
                    }
                }
            }
        }
        
        if (wgt < 45) {
        
            factor = ((maxQty - minQty) / (maxWgt - minWgt)) * (maxWgt - wgt);

            qty = maxQty - factor;
            
        }
        
        qty = Math.round(qty);
        
        overall = overall + qty;
        
        showOverall = Math.round(overall);
        
        var $select = $('select option:selected');
        
        $('<div class="pull-left dogs"></div>').attr('id', $select.text()).html($select.text()+ '<br>' + '<span class="value">' + qty + '</span>' + ' g').appendTo('.result');
        
        $('.total').html("Total<br><span class='value'>" + showOverall + "</span> g");
        
        $('.weight').val("");
        $('select').focus();
        
    });
    
    $('select').change(function () {
        $('.weight').focus();
    });
    
    $('button').mousedown(function () {
        $(this).css('background-color', 'darkred');
    });
    
    $('button').mouseup(function () {
        $(this).css('background-color', 'red');
    });
    
    $('.result').on('click', '.dogs', function () {
        
        var minus = $(this).children().text();
        minus = parseFloat(minus);
        
        var $total = $('.total span').text();
        $total = parseFloat($total);
        
        overall = $total - minus;
        showOverall = Math.round(overall);
        
        $('.total').children().text(showOverall);
        
        $(this).remove();
    });
    
    
})