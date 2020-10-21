  //Vamos a usar http://processingjs.org/
  // o https://p5js.org/reference/
  // Importamos las librerias
  let { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

  function make(data, attribute) {
    return Object.assign({}, data, attribute);
  }

  function forEach(l, f, index = 0) {
    if (!isEmpty(l)) {
      f(first(l), index);
      forEach(rest(l), f, index + 1);
    }
  }


  /**
   * Ejemplo de animación usando los evento de reloj del procesador. Es la animación mas simple. 
   * No requiere interacción con el usuario
   */
  const WIDTH = 400;
  const HEIGHT = 400;
  const SIZE = 40;
  let tomb = null;
  let FOTO = null;
  const mapa = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 2, 0, 0, 0, 0, 0, 0, 2, 1],
                [1, 0, 0, 0, 0, 0, 2, 0, 0, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 2, 1],
                [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 2, 0, 1],
                [1, 0, 2, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
  
  function sketchProc(processing) {
    /**
     * Esto se llama antes de iniciar el juego
     */
    processing.setup = function () {
      processing.frameRate(2);
      processing.size(WIDTH, HEIGHT);
      FOTO = processing.loadImage('images/muro.jpg');
      processing.state = {tomb: { x: 10, y: 1}, cookies: [{ x: 1, y: 2 }, { x: 2, y: 1 }] };
      tomb = processing.loadImage("images/tomb.png");
    }
    // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
    processing.drawGame = function (world) {
      processing.background(0, 0, 0);

  // el caso de que sea 1 en el mapa
      forEach(mapa, (row, i) => {
        forEach(row, (cell, j) => {
          if(cell == 1) {
            processing.fill(200, 0, 0);
            //processing.rect(j * SIZE, i * SIZE, SIZE, SIZE);
            processing.image(FOTO, j * SIZE, i * SIZE, SIZE, SIZE);
            //en el caso  de que sea 2
          } if (cell == 2) {
            processing.fill(250, 0, 200);
            processing.ellipse(j * SIZE + SIZE / 2, i * SIZE + SIZE / 2, SIZE / 3, SIZE / 3);
          }
        } );
      });


      if (world.time == 0)
        processing.image(tomb, world.tomb.x * SIZE, world.tomb.y);
      else
        processing.image(tomb, world.tomb.x * SIZE, world.tomb.y * SIZE, SIZE, SIZE);

     
      //Mostrar una imagen scalada
      //processing.translate(100 + SIZE / 2, 100 + SIZE / 2);
     // processing.rotate(Math.PI / 3.0);
      //processing.image(FOTO, 100 + SIZE / 2, 100 +  SIZE / 2 , SIZE, SIZE);

    }

    /**
     * Cambia la posición del objeto moviendolo 1 unidad a la derecha. 
     */
    processing.onTic = function (world) {
      return make(world, { time: world.time + 1, tomb: { x: world.tomb.x - 1, y: world.tomb.y } });
    }

    processing.onMouseEvent = function (world, event) {
      return make(world, {});
    }

    // ******************** De aquí hacia abajo no debe cambiar nada. ********************

    // Esta es la función que pinta todo. Se ejecuta n veces por segundo. 
    // No cambie esta función. Su código debe ir en drawGame
    processing.draw = function () {
      processing.drawGame(processing.state);
      processing.state = processing.onTic(processing.state);
    };

    // Esta función se ejecuta cada vez que presionamos una tecla. 
    // No cambie esta función. Su código debe ir en onKeyEvent
    processing.keyPressed = function () {
      processing.state = processing.onKeyEvent(processing.state, processing.keyCode);
    }

    // Esta función se ejecuta cada vez movemos el mouse. 
    // No cambie esta función. Su código debe ir en onKeyEvent
    processing.mouseMoved = function () {
      processing.state = processing.onMouseEvent(processing.state,
        { action: "move", mouseX: processing.mouseX, mouseY: processing.mouseY });
    }

    // Estas funciones controlan los eventos del mouse. 
    // No cambie estas funciones. Su código debe ir en OnMouseEvent
    processing.mouseClicked = function () {
      processing.state = processing.onMouseEvent(processing.state,
        { action: "click", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }

    processing.mouseDragged = function () {
      processing.state = processing.onMouseEvent(processing.state,
        { action: "drag", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }

    processing.mousePressed = function () {
      processing.state = processing.onMouseEvent(processing.state,
        { action: "press", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }

    processing.mouseReleased = function () {
      processing.state = processing.onMouseEvent(processing.state,
        { action: "release", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }
    // Fin de los eventos del mouse
  }

  var canvas = document.getElementById("canvas");

  // Adjuntamos nuestro sketch al framework de processing
  var processingInstance = new Processing(canvas, sketchProc);