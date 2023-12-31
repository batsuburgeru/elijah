$(document).ready(function () {
    initWorks();
});

var initWorks = function () {
    const position = {
            x: 0,
            y: 0
    }

    interact('.js_workDraggable').draggable({
            inertia: true,
            modifiers: [
                    interact.modifiers.restrictRect({
                            restriction: 'parent'
                    })
            ],
            listeners: {
                    start(event) {
                            $('.js_workDraggable').closest('.el').addClass('locked');
                    },
                    move(event) {
                            position.x += event.dx

                            event.target.style.transform =
                                    `translate(${position.x}px, 0px)`
                    },
                    end(event) {
                            $('.js_workDraggable').addClass('end');
                            setTimeout(function () {
                                    $('.js_workDraggable').closest('.el').removeClass('locked');
                            }, 10);
                    },
            }
    })

    $('.works').find('.logo').each(function () {
            var container = this;
            var arr = container.innerHTML.split('');
            var str = '';

            for (var i = 0; i < arr.length; i++) {
                    if (arr[i]) {
                            arr[i] = '<span><span>' + arr[i] + '</span></span>';
                    }
            }

            container.innerHTML = arr.join('');
    });

    var _scroll = function () {
            $('.works').find('.el').each(function () {
                    var hold = $(this);

                    if (hold.offset().top < ($(window).scrollTop() + $(window).outerHeight())) {
                            hold.addClass('visible');
                    }
            });

            $('.works').find('.logo').each(function () {
                    var hold = $(this);

                    if (hold.offset().top < $(window).scrollTop() + $(window).outerHeight() - hold.outerHeight() / 2) {
                            hold.addClass('visible');
                    }
            });
    };

    setTimeout(function () {
            _scroll();
    }, 500);
    $(window).on('scroll', _scroll);

};

(function($) {
    
        var T, 
        write = {
          settings: {
            letters: $('.text'),
          },
          init: function() {
            T = this.settings;
              var self=this;
              
      
            this.putIntab();
          },
          putIntab: function(){
            for(var i=0;i<T.letters.length;i++){
      
              var tableau= $.trim(T.letters[i].innerHTML).split(/(?=[^>]*(?:<|$))/);
              //tableau=["te","st"];
              //efface le texte existant
              T.letters[i].innerText=" ";
              //affiche le nouveau texte caractere par caractère
              this.afficheDelay(i,tableau);
             }
          },
          afficheDelay: function(champ,texte){
                  var y = 0;
            var self = this;
            //parcours le tableau dans un interval donné en 2nd param
            var affiche = setInterval(function(){
              //ajoute dans le texte d'id champ, la lettre y du tableau
              var lettre = texte[y];
              $("<span>"+lettre+"<span>").appendTo(self.settings.letters[champ]);
              y++;
              if (y==texte.length){
                clearInterval(affiche)
              }
            },60);//temps entre chaque caracteres
          },
        };
        write.init();
      })(jQuery);

      const images = document.getElementsByClassName("image");

let globalIndex = 0,
    last = { x: 0, y: 0 };

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = "active";

  last = { x, y };
}

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
}

const handleOnMove = e => {
  if(distanceFromLast(e.clientX, e.clientY) > (window.innerWidth / 20)) {
    const lead = images[globalIndex % images.length],
          tail = images[(globalIndex - 5) % images.length];

    activate(lead, e.clientX, e.clientY);

    if(tail) tail.dataset.status = "inactive";
    
    globalIndex++;
  }
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
