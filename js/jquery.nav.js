/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */
!function(t,e,i,n){var s=function(n,s){this.elem=n,this.$elem=t(n),this.options=s,this.metadata=this.$elem.data("plugin-options"),this.$win=t(e),this.sections={},this.didScroll=!1,this.$doc=t(i),this.docHeight=this.$doc.height()};s.prototype={defaults:{navItems:"a",currentClass:"current",changeHash:!1,easing:"swing",filter:"",scrollSpeed:750,scrollThreshold:.5,begin:!1,end:!1,scrollChange:!1},init:function(){return this.config=t.extend({},this.defaults,this.options,this.metadata),this.$nav=this.$elem.find(this.config.navItems),""!==this.config.filter&&(this.$nav=this.$nav.filter(this.config.filter)),this.$nav.on("click.onePageNav",t.proxy(this.handleClick,this)),this.getPositions(),this.bindInterval(),this.$win.on("resize.onePageNav",t.proxy(this.getPositions,this)),this},adjustNav:function(t,e){t.$elem.find("."+t.config.currentClass).removeClass(t.config.currentClass),e.addClass(t.config.currentClass)},bindInterval:function(){var e,t=this;t.$win.on("scroll.onePageNav",function(){t.didScroll=!0}),t.t=setInterval(function(){e=t.$doc.height(),t.didScroll&&(t.didScroll=!1,t.scrollChange()),e!==t.docHeight&&(t.docHeight=e,t.getPositions())},250)},getHash:function(t){return t.attr("href").split("#")[1]},getPositions:function(){var i,n,s,e=this;e.$nav.each(function(){i=e.getHash(t(this)),s=t("#"+i),s.length&&(n=s.offset().top,e.sections[i]=Math.round(n))})},getSection:function(t){var e=null,i=Math.round(this.$win.height()*this.config.scrollThreshold);for(var n in this.sections)this.sections[n]-i<t&&(e=n);return e},handleClick:function(i){var n=this,s=t(i.currentTarget),a=s.parent(),o="#"+n.getHash(s);a.hasClass(n.config.currentClass)||(n.config.begin&&n.config.begin(),n.adjustNav(n,a),n.unbindInterval(),n.scrollTo(o,function(){n.config.changeHash&&(e.location.hash=o),n.bindInterval(),n.config.end&&n.config.end()})),i.preventDefault()},scrollChange:function(){var i,t=this.$win.scrollTop(),e=this.getSection(t);null!==e&&(i=this.$elem.find('a[href$="#'+e+'"]').parent(),i.hasClass(this.config.currentClass)||(this.adjustNav(this,i),this.config.scrollChange&&this.config.scrollChange(i)))},scrollTo:function(e,i){var n=t(e).offset().top;t("html, body").animate({scrollTop:n},this.config.scrollSpeed,this.config.easing,i)},unbindInterval:function(){clearInterval(this.t),this.$win.unbind("scroll.onePageNav")}},s.defaults=s.prototype.defaults,t.fn.onePageNav=function(t){return this.each(function(){new s(this,t).init()})}}(jQuery,window,document);