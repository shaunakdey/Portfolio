$(document).ready(function(){
    var $header_top = $('.header-top');
    var $nav = $('nav');
    var origAspectRatio = Math.floor(window.innerWidth / window.innerHeight);

    //Listeners
    $('#heading').find('a').on('click', function() {
        $(this).parent().toggleClass('open-menu');
    });

    $('#menu li a').on('click', function(){
        $('#heading').toggleClass('open-menu');
    });

    $('#shadow-fiend').on('click', function(){
        new Howl({src: ['assets/sounds/collection.mp3']}).play();
    });
    
    //Change flex-direction based on aspect-ratio
    var processLayout = function(aspectRatio) {
        if(aspectRatio == 0) {
            //Projects
            $('#projects').addClass('flex-column');

            //Contact
            $('#contact').removeClass('flex-row-reverse');
            $('#contact').addClass('flex-column');
        }
        else {
            //projects
            $('#projects').removeClass('flex-column');

            //Contact
            $('#contact').removeClass('flex-column');
            $('#contact').addClass('flex-row-reverse');
        }
    };
    processLayout(origAspectRatio);
    $(window).on('resize', function(){
        if(origAspectRatio != Math.floor(window.innerWidth / window.innerHeight)) {
            origAspectRatio = Math.floor(window.innerWidth / window.innerHeight);
            processLayout(origAspectRatio);
        }
    });

    //Scramble and Order
    var homeHiText = "Hi, I am Shaunak";
    var hiInnerHTML = "";
    var homeTitleText = "A Full Stack Web Developer";
    var titleInnerHTML = "";
    for(var i = 0; i < homeHiText.length; i++) {
        hiInnerHTML += "<div class='scramble'><h2 style='font-size: 48px;'>" + (homeHiText.charAt(i) == ' ' ? '&nbsp' : homeHiText.charAt(i)) + "</h2></div>";
    }
    for(var i = 0; i < homeTitleText.length; i++) {
        titleInnerHTML += "<div class='scramble'><h5 style='font-size: 32px;'>" + (homeTitleText.charAt(i) == ' ' ? '&nbsp' : homeTitleText.charAt(i)) + "</h5></div>";
    }
    $('.home-hi').html(hiInnerHTML);
    $('.home-title').html(titleInnerHTML);
    var scrambledLetters = $('.scramble');
    console.log(scrambledLetters);
    var scramble = function(){
        for(var i = 0; i < scrambledLetters.length; i++) {
            var style = "scale(" + (Math.random() * 0.75 + 0.5) + ") translate(" + (Math.random() * 1000 - 500) + "%, " + (Math.random() * 600 - 200) + "%)";
            scrambledLetters[i].style.transform = style;
        }
        $('.home-mischief').css('opacity','0');
        setTimeout(function(){
            $('.home-mischief').css('zIndex','-1');
        }, 550);
        $('.home-swear').css('zIndex', '1').css('opacity', '1');
        console.log('Scrambled');
    };
    var order = function(){
        for(var i = 0; i < scrambledLetters.length; i++) {
            scrambledLetters[i].style.transform = "scale(1) translate(0)";
        }
        $('.home-swear').css('opacity', '0');
        setTimeout(function(){
            $('.home-swear').css('zIndex','-1');
        }, 550);
        $('.home-mischief').css('zIndex', '1').css('opacity','1');
        console.log("Ordered");
    };
    scramble();
    $('.home-swear').click(order);
    $('.home-mischief').click(scramble);

    // FullPage Code
    $('#fullpage').fullpage({
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        sectionsColor: ['#121212', '#17202a', '#aeb6bf', 'white'],
        navigation: true,
        anchors: ['home', 'about', 'projects', 'contact'],
        menu: '#menu',
        scrollOverflow: true,
        touchSensitivity: 10,
        paddingTop: '5%',
        paddingBottom: '5%',

        afterLoad: function(anchorLink, index) {
        },
        
        onLeave: function(index, nextIndex, direction) {
            if(nextIndex.index == 1){
                //Animate About Me Section
                var animations = ['fadeInLeft', 'fadeInDown', 'fadeInRight', 'fadeInUp', 'fadeInLeft'];
                $('.panel').addClass('animated');
                var panels = $('.panel');
                for(var i = 0; i < panels.length; i++) {
                    panels[i].classList.add(animations[i]);
                    panels[i].style.animationDelay = 0.5 + 0.3 * i + 's';
                }
            }

            else if(nextIndex.index == 2) {
                //Change navigation color
                $('#heading h1 a').css('color', '#000');
                $('#heading a i').css('background-color', 'black');
                $('#fp-nav ul li a span').css('background-color', 'black');

                $('#projects-whoops').addClass('animated fadeInDown').css('animation-delay', '0.2s');
                $('#projects-text').addClass('animated fadeInDown').css('animation-delay', '1s');
                $('.link-github').addClass('animated lightSpeedIn').css('animation-delay', '2s');
            }

            else if(nextIndex.index == 3) {
                $('#lets-cook').addClass('animated fadeInDown').css('animation-delay', '0.1s')
                $('#contact-text').addClass('animated fadeInDown').css('animation-delay', '0.4s');
                $('.social-icons').addClass('animated fadeInLeft');
                var socicons = $('.social-icons');
                for(var i = 0; i < socicons.length; i++) {
                    socicons[i].style.animationDelay = 0.8 + 0.3 * i + 's';
                }
            }

            if((nextIndex.index == 1) || (nextIndex.index == 0)){
                $('#heading h1 a').css('color', '#fff');
                $('#heading a i').css('background-color', '#fff');
                $('#fp-nav ul li a span').css('background-color', '#fff');
            }
        }
    });
});