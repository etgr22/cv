String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};

BW.init = function () {


    
    $('.click-first').find('td').click(function () {
        if ($(this).find('a').length == 0) {
            document.location.href = $($(this).parent().find('a')[0]).attr('href');
        } else document.location.href = $($(this).find('a')[0]).attr('href');
        
       
    });

    $('.click-first').find('a').click(function (e) { e.stopPropagation(); });

}



BW.initExclusions = function () {
    $('.ex svg').click(function (e) {

        if ($(this).hasClass('icon-other')) { $(this).removeClass('icon-other'); $(this).css('fill', 'rgb(220, 54, 69)'); $(this).addClass('icon-lead'); $(this).find('use').attr('xlink:href', '#icon-lead'); }
        else if ($(this).hasClass('icon-lead')) { $(this).removeClass('icon-lead'); $(this).addClass('icon-account'); $(this).find('use').attr('xlink:href', '#icon-account'); }
        else if ($(this).hasClass('icon-account')) { $(this).removeClass('icon-account'); $(this).addClass('icon-fire'); $(this).find('use').attr('xlink:href', '#icon-fire'); }
        else if ($(this).hasClass('icon-fire')) { $(this).removeClass('icon-fire'); $(this).addClass('icon-trash'); $(this).find('use').attr('xlink:href', '#icon-trash'); }
        else if ($(this).hasClass('icon-trash')) { $(this).removeClass('icon-trash'); $(this).css('fill', '#d0d0d0'); $(this).addClass('icon-other'); $(this).find('use').attr('xlink:href', '#icon-other'); }

        var domain = $(this).parent().parent().attr('data-domain');
        BW.exclusion(domain);
        e.stopPropagation();
    });

}


var timers = [];

var clickers = [];
var DELAY = 800;

BW.exclusion = function (dom) {


    if (typeof (timers[dom]) != "undefined") clearTimeout(timers[dom]);

    timers[dom] = setTimeout(function () {

        var type = $('tr[data-domain="' + dom + '"]').find('use').attr('xlink:href').split('-')[1];

        $.getJSON('/report.asmx?T=EXCLUSION&DOM=' + dom + '&ETYPE=' + type);

    }, DELAY);


}



BW.metaTable = function () {
    $('[data-domain]').click(function () {

        if (typeof ($(this).attr('data-hash')) != "undefined") {

            if ($('[data-domain-loaded="' + $(this).attr('data-domain') + '"]').length == 0) {
                $(this).after('<tr class="no-hover" data-domain-loaded="' + $(this).attr('data-domain') + '"><td colspan="5" class="border-top-0"><div class="loading text-center"><img class="mt-2 mb-4" src="//builtwith.com//img//svg//loading.svg" style="height:32px;margin-top: -4px;"/></div></td></tr>');

                $(this).find('use').last().attr('xlink:href', '#icon-chevron-up');

                $($('[data-domain-loaded="' + $(this).attr('data-domain') + '"]').find('td')[0]).load('//pro.builtwith.com/ajax/meta.aspx?DOM=' + $(this).attr('data-domain') + '&HASH=' + $(this).attr('data-hash'));
            } else {
                $('[data-domain-loaded="' + $(this).attr('data-domain') + '"]').toggle();



                if ($('[data-domain-loaded="' + $(this).attr('data-domain') + '"]').css('display') == 'none') { $(this).find('use').last().attr('xlink:href', '#icon-chevron-down'); } else $(this).find('use').last().attr('xlink:href', '#icon-chevron-up');


            }

        }
    });

}

BW.ds = function () {
    $.ajax({
        url: 'https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver',
        dataType: 'script',
        cache: true, // or get new, fresh copy on every page load
        success: function () {
            new IOlazy();
        }
    });

    
}

BW.showError = function (title, message) {

    BW.alert(title, message, 'danger');
};

BW.showMessage = function (title, message) {

    BW.alert(title, message, 'warning');
};


BW.alert = function (_title, _message, _type) {

    $('.alert').remove();

    if ($('form').length >= 1) {
        $('form').last().prepend(
            Mustache.render('<div class="alert alert-{{ type }} alert-dismissible text-center fade show" role="alert"><strong>{{ title }}</strong> {{ message }}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>', { title: _title, message: _message, type: _type })
        );
    } else {
        if ($('.breadcrumb').length > 0) {

            $($('.breadcrumb')[0]).parent().parent().parent().append(
                Mustache.render('<div class="mt-2 alert alert-{{ type }} alert-dismissible text-center fade show" role="alert"><strong>{{ title }}</strong> {{ message }}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>', { title: _title, message: _message, type: _type })
            );
        } else {
            $($('.container')[2]).prepend(
                Mustache.render('<div class="mt-2 alert alert-{{ type }} alert-dismissible text-center fade show" role="alert"><strong>{{ title }}</strong> {{ message }}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>', { title: _title, message: _message, type: _type })
            );
        }
    }
};


BW.hasLS = function ( ) {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}


BW.prevDBL = function (b) {

    if (!$('#mainForm')[0].checkValidity()) return true;

    if ($(b).hasClass('disabled')) {
        return false;
    } else {
        $(b).addClass('disabled');
    }
}


BW.detailed = function () {
    if (BW.hasLS()) {
        $('#hideOld')[0].checked = localStorage['bw_ht']==='yes';
        if ($('#hideOld')[0].checked) $('.old').hide();


        $('#hideFree')[0].checked = localStorage['bw_hf']==='yes';
        if ($('#hideFree')[0].checked) $('.free').hide();

        $('#hideEst')[0].checked = localStorage['bw_he'] === 'yes';
        if ($('#hideEst')[0].checked) $('.est').hide();
    }

}

var sum = function (a, b) { return a + b };










var _createClass = function () {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }
    return function (e, r, n) {
        return r && t(e.prototype, r), n && t(e, n), e
    }
}();

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
"IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype && !("isIntersecting" in IntersectionObserverEntry.prototype) && Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
    get: function () {
        return this.intersectionRatio > 0
    }
}), window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function (t, e) {
    e = e || window;
    for (var r = 0; r < this.length; r++) t.call(e, this[r], r, this)
});
var IOlazy = function () {
    function t() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            r = e.image,
            n = void 0 === r ? ".ll" : r,
            i = e.threshold,
            o = void 0 === i ? .006 : i,
            s = e.rootMargin,
            a = void 0 === s ? "0px" : s;
        _classCallCheck(this, t), this.threshold = o, this.rootMargin = a, this.image = document.querySelectorAll(n), this.observer = new IntersectionObserver(this.handleChange.bind(this), {
            threshold: [this.threshold],
            rootMargin: this.rootMargin
        }), this.lazyLoad()
    }
    return _createClass(t, [{
        key: "handleChange",
        value: function (t) {
            var e = this;
            t.forEach(function (t) {
                t.isIntersecting && (t.target.classList.add("visible"), t.target.getAttribute("data-srcset") && (t.target.srcset = t.target.getAttribute("data-srcset")), t.target.getAttribute("data-src") && (t.target.src = t.target.getAttribute("data-src")), e.observer.unobserve(t.target))
            })
        }
    }, {
        key: "lazyLoad",
        value: function () {
            var t = this;
            this.image.forEach(function (e) {
                t.observer.observe(e)
            })
        }
    }]), t
}();