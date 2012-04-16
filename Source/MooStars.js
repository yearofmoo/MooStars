var MooStars;

(function($) {

MooStars = new Class({

  Binds : ['hover','blur'],

  Implements : [Options, Events],

  options : {
    stars : 10,
    starWidth : 20,
    starHeight : 20,
    className : 'moostars',
    ratedClassName : 'rated',
    starClassName : 'star',
    barClassName : 'bar',
    activeClassName : 'hover',
    barZIndex : 5,
    starZIndex : 10,
    barFxOptions : {
      link : 'cancel'
    }
  },

  initialize : function(element,options) {
    this.element = $(element);
    this.setOptions(options);
    this.build();
    this.setupEvents();
  },

  build : function() {

    var total = this.getTotalStars();
    this.getElement().set({
      'styles':{
        'position':'relative',
        'width':this.getTotalStarWidth(),
        'height':this.getStarHeight()
      },
    }).addClass(this.options.className);

    this.bar = new Element('div',{
      'class':this.options.barClassName,
      'styles':{
        'z-index':this.options.barZIndex,
        'height':this.getStarHeight(),
        'position':'absolute',
        'top':0,
        'left':0,
      }
    }).inject(this.element);

    this.animator = new Fx.Morph(this.bar,this.options.barFxOptions);

    this.stars = [];
    for(var i=0;i<this.getTotalStars();i++) {
      var x = i * this.getStarWidth();
      var star = new Element('a',{
        'href':'#',
        'class':this.options.starClassName,
        'styles':{
          'position':'absolute',
          'top':0,
          'left':x,
          'display':'block',
          'z-index':this.options.starZIndex,
          'width':this.getStarWidth(),
          'height':this.getStarHeight()
        }
      }).inject(this.element);

      star.store('index',this.stars.length);
      this.stars.push(star);
    }

    this.animateSelectStars(this.getTotalStars());
  },

  setupEvents : function() {
    this.getElement().addEvents({
      'mouseenter':this.hover,
      'mouseleave':this.blur
    });
    var that = this;
    this.getStars().each(function(star) {
      star.addEvents({
        'click':function(event) {
          event.stop();
          that.clickStar(this);
        },
        'mouseenter':function(event) {
          event.stop();
          that.hoverStar(this);
        }
      });
    });
  },

  getStars : function() {
    return this.stars;
  },

  getStarHeight : function() {
    return this.options.starHeight;
  },

  getStarWidth : function() {
    return this.options.starWidth;
  },

  getTotalStarWidth : function() {
    return this.getTotalStars() * this.getStarWidth();
  },

  getTotalStars : function() {
    return this.options.stars;
  },

  getCurrentStars : function() {
    return this.currentStars || 0;
  },

  setCurrentStars : function(stars) {
    this.currentStars = stars;
  },

  setTotalstars : function(stars) {
    this.options.stars = stars;
  },

  animateSelectStars : function(stars) {
    var x = stars * this.getStarWidth();
    this.animator.start({
      'width':x
    });
  },

  selectStars : function(stars) {
    var x = stars * this.getStarWidth();
    this.animator.set({
      'width':x
    });
  },

  animateSelectDefault : function() {
    var current = this.getCurrentStars();
    this.animateSelectStars(current);
  },

  selectDefault : function() {
    var current = this.getCurrentStars();
    this.selectStars(current);
  },

  clickStar : function(star) {
    var index = star.retrieve('index');
    this.currentStars = index + 1;
    this.fireEvent('click',[this.currentStars]);
    this.blur();
  },

  hoverStar : function(star) {
    var index = star.retrieve('index');
    var stars = index + 1;
    this.animateSelectStars(stars);
    this.fireEvent('hover',[stars]);
    this.setAsRated();
  },

  hover : function() {
    this.element.addClass(this.options.activeClassName);
  },

  blur : function() {
    this.element.removeClass(this.options.activeClassName);
    this.animateSelectDefault();
  },

  setAsRated : function() {
    this.element.removeClass(this.options.activeClassName);
    this.element.addClass(this.options.ratedClassName);
  },

  setAsNotRated : function() {
    this.element.addClass(this.options.activeClassName);
    this.element.removeClass(this.options.ratedClassName);
  },

  getElement : function() {
    return this.element;
  },

  toElement : function() {
    return this.getElement();
  }

}); 

})(document.id);
