$(document).ready(function () {
    //VARIABLES
    var contenedor = $('.contenedor');
    var orden = [];
    var top_puntajes = [];
    var puntaje = $('#puntaje');
    var tiempo = $('#tiempo');
    var intervalo_tiempo;
    var tiempo_restante;
    var musica_fondo;
    var input;
    var btn;

    //VARIABLES PUNTAJES Y NOMBRES

    var puntaje_uno = $('#puntaje_uno');
    var puntaje_dos = $('#puntaje_dos');
    var puntaje_tres = $('#puntaje_tres');
    var puntaje_cuatro = $('#puntaje_cuatro');
    var puntaje_cinco = $('#puntaje_cinco');

    var nombre_uno = $('#nombre_uno');
    var nombre_dos = $('#nombre_dos');
    var nombre_tres = $('#nombre_tres');
    var nombre_cuatro = $('#nombre_cuatro');
    var nombre_cinco = $('#nombre_cinco');

    //SONIDOS

    var cuphead = $('#cuphead')[0];
    var coin = $('#coin')[0];
    var song1 = $('#song1')[0];
    var song2 = $('#song2')[0];
    var game_over_sound = $('#game_over_sound')[0];
    var victory_sound = $('#victory_sound')[0];



    // EVENTO PRESS START

    $(document).on('keypress', (e) => {

        if (e.keyCode === 13) {
            cuphead.play();

            $('.press_start').fadeOut(1600, () => {
                ordenarCartas();
                posicionarImagenes();
                musicaRandom();
                timear();
                $(document).off('keypress');
            });
        }
    });




    //VOLUMEN COIN
    coin.volume = 0.7;

    //FUNCION TOPSCORES

    function topScores() {
        for (var i = 0; i < localStorage.length; i++) {

            let clave = localStorage.key(i);
            let valor = localStorage.getItem(clave);

            top_puntajes.push({
                nombre: clave,
                puntaje: valor
            });
        }

        top_puntajes.sort(function (a, b) {
            return (b.puntaje - a.puntaje);
        });

        if (localStorage.length > 5) {

            localStorage.removeItem(localStorage.key(5));
        }
        console.log(top_puntajes);

        // INSERTAR NOMBRES Y PUNTAJES

        for (var i = 0; i < top_puntajes.length; i++) {

            if (i == 0) {
                puntaje_uno.html(top_puntajes[0].puntaje + 'pts');
                nombre_uno.html('<p class="mayus">' + top_puntajes[0].nombre + '</p>');
            } else if (i == 1) {
                puntaje_dos.html(top_puntajes[1].puntaje + 'pts');
                nombre_dos.html('<p class="mayus">' + top_puntajes[1].nombre + '</p>');

            } else if (i == 2) {
                puntaje_tres.html(top_puntajes[2].puntaje + 'pts');
                nombre_tres.html('<p class="mayus">' + top_puntajes[2].nombre + '</p>');

            } else if (i == 3) {
                puntaje_cuatro.html(top_puntajes[3].puntaje + 'pts');
                nombre_cuatro.html('<p class="mayus">' + top_puntajes[3].nombre + '</p>');

            } else if (i == 4) {
                puntaje_cinco.html(top_puntajes[4].puntaje + 'pts');
                nombre_cinco.html('<p class="mayus">' + top_puntajes[4].nombre + '</p>');
            }
        }
    }
    
    topScores();


    //FUNCION VICTORIA
    btn = $('#btn');

    function victoria(puntaje_final) {
        $('#score').html('YOUR SCORE WAS: ' + puntaje_final + 'pts');
        $('#victory').fadeIn(1000);
        victory_sound.play();


        // ********************************************************************

        input = document.getElementById('input');


        btn.on('click', (e) => {
            btn.off('click');
            input.value.trim();
            if (input.value == null || input.value == '') {
                return false;
            } else {
                localStorage.setItem(input.value, puntaje_final);
                topScores();

            }
        });
    }

    // victoria();


    // FUNCION PUNTAJE

    function puntuar(cronometro) {
        var decimal_tiempo = parseInt(cronometro / 10);
        var x;
        // PUNTAJE TOTAL = (80 + segx10) * x
        switch (decimal_tiempo) {
            case 5:
                x = 10;
                break;
            case 4:
                x = 8;
                break;
            case 3:
                x = 4;
                break;
            case 2:
                x = 2;
                break;
            case 1:
                x = 1.5;
                break;
            case 0:
                x = 1;
        }

        var puntaje_final = (80 + (cronometro * 10)) * x;
        //EFECTO PUNTAJE CON INTERVALOS

        //tiempo
        var int_punto_tiempo = setInterval(() => {
            tiempo.text('Tiempo: ' + cronometro);

            if (cronometro == 0) {
                clearInterval(int_punto_tiempo);
            }

            cronometro--;
        }, 100);

        //puntaje


        var punto = 80;
        var int_punto = setInterval(() => {
            puntaje.html("Puntaje: " + punto);
            coin.play();

            if (punto >= puntaje_final) {
                clearInterval(int_punto);
                victoria(puntaje_final);
            }

            punto = punto + 10;
        }, 20);
    }



    // FUNCION TIEMPO

    function timear() {
        tiempo_restante = 59;
        intervalo_tiempo = setInterval(() => {
            tiempo.text('Tiempo: ' + tiempo_restante);

            if (tiempo_restante == 0) {
                clearInterval(intervalo_tiempo);
                musica_fondo.pause();

                //FUNCION GAME OVER

                $('#game_over').fadeIn(1000);
                game_over_sound.play();
            }
            tiempo_restante--;
        }, 1000);
    }

    //FUNCION MUSICA RANDOM

    function musicaRandom() {
        // $('#btn').off('click');
        musicas = [song1, song2];
        let numeroRandom = Math.floor(Math.random() * 2);
        musica_fondo = musicas[numeroRandom];
        musica_fondo.volume = 0.2;
        musica_fondo.play();

    }


    //CREACION DE CARTAS
    for (let i = 0; i < 16; i++) {
        var card = $('<div></div>').attr('class', 'card').html('<img src="img/fondo.png" class="front_face">');
        contenedor.append(card);
    }

    //ARRAY DE IMAGENES
    var imagenes = [{
            src: 'img/manu.png'
        },
        {
            src: 'img/arya.png'
        },
        {
            src: 'img/chuqui.png'
        },
        {
            src: 'img/argos.png'
        },
        {
            src: 'img/cris.png'
        },
        {
            src: 'img/mascu.png'
        },
        {
            src: 'img/ottu.png'
        },
        {
            src: 'img/rusa.png'
        }
    ]

    //FUNCION GENERAR ORDEN RANDOM

    function ordenarCartas() {
        var numRandom = 0;
        var r = [];
        var u = 0;

        for (let i = 0; i < 16; i++) {

            if (i == 0) {
                numRandom = Math.floor(Math.random() * 16);
                orden[0] = numRandom;
                r[0] = numRandom;
            } else {
                do {
                    u = 0;

                    numRandom = Math.floor(Math.random() * 16);

                    for (let i = 0; i < r.length; i++) {
                        if (numRandom == r[i]) {
                            u = 1;
                        }
                    }

                } while (u != 0);

                r[i] = numRandom;
                orden[i] = numRandom;
            }
        }
    }

    //FUNCION POSICIONAR IMAGENES

    function posicionarImagenes() {
        var k = 0;
        var arrayImagen = [];

        for (let i = 0; i < 16; i++) {

            arrayImagen[i] = $('<img>').attr({
                'src': imagenes[k].src
            }).css({
                'display': 'none'
            });

            if (i == 7) {
                k = 0;
            } else {
                k++;
            }

            contenedor.children().eq(orden[i]).append(arrayImagen[i]);
        }
    }

    //FUNCION COINCIDENCIA

    var m = 0;
    var carta_dos;
    var carta_uno;
    var contador_puntaje = 0;

    function coincidencia(click) {

        //ASIGNAMOS CARTA 1 Y CARTA 2
        if (m % 2 == 0 || m == 0) {

            carta_uno = click;

        } else if (m % 2 == 1) {

            carta_dos = click;
            let image_carta_uno = carta_uno.children().last().attr('src');
            let image_carta_dos = carta_dos.children().last().attr('src');


            //SE VERIFICA SI SON IGUALES O NO
            if (image_carta_uno == image_carta_dos) {

                //ANIMACIÓN PUNTAJE VERDE

                click.off('click');

                contador_puntaje += 10;
                puntaje.html("Puntaje: " + contador_puntaje + '<span class="puntaje_verde"> +10</span>');

                var puntaje_verde = $('.puntaje_verde');

                puntaje_verde.animate({
                    marginLeft: '10px'
                }, 500, () => {
                    puntaje_verde.fadeOut(500);
                });

                //EFECTO DE SONIDO

                coin.play();



                //ANIMACION DE VICTORIA
                if (contador_puntaje == 80) {
                    musica_fondo.pause();
                    clearInterval(intervalo_tiempo);
                    puntuar(tiempo_restante, );


                }
            } else {
                setTimeout(() => {

                    carta_uno.children().last().css({
                        'display': 'none'
                    });
                    carta_dos.children().last().css({
                        'display': 'none'
                    });
                    carta_uno.children().first().css({
                        'display': 'inline'
                    });
                    carta_dos.children().first().css({
                        'display': 'inline'
                    });

                }, 500);
            }
        }

        m++;
    }


    //ADD EVENT LISTENER


    contenedor.children().on('click', function () {



        $(this).children().last().css({
            'display': 'inline'
        });


        $(this).children().first().css({
            'display': 'none'
        });

        coincidencia($(this));
    });

    //LLAMADA DE LAS FUNCIONES
});