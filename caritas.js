//Vamos a usar http://processingjs.org/
  // o https://p5js.org/reference/

  // Importamos las librerias si es necesario usar listas
  //let { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

  function make(data, attribute) {
    return Object.assign({}, data, attribute);
  }

  let m1 = null;
  let m2 = null;
  let m3 = null;
  let m4 = null;
  /**
   * No requiere interacción con el usuario
   */

  function sketchProc(processing) {

    /**
     * Esto se llama antes de iniciar (espacio de trabajo)
     */
    processing.setup = function () {
      processing.frameRate(1);
      //processing.size(240, 290); //tamaño del contorno
      processing.size(300, 300);
      m1 = processing.loadImage("images/m1.png");
      m2 = processing.loadImage("images/m2.png");
      m3 = processing.loadImage("images/m3.png");
      m4 = processing.loadImage("images/m4.png");

      processing.state = 1;
    }



    // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
    processing.drawGame = function (world) {
      //processing.background(0, 255, 255);
      if (world == 1)
            processing.image(m1, 0, 0);
      if (world == 2)
            processing.image(m2, 0, 0);
      if (world == 3)
            processing.image(m3, 0, 0);
      if (world == 4)
            processing.image(m4, 0, 0);
    }

    // Actualiza el mundo despues de cada frame. En este ejemplo, no cambia nada, solo retorna una copia del mundo
    processing.onTic = function (world) {
      return Math.ceil(Math.random()*4);
    }

    //Implemente esta función si quiere que su programa reaccione a eventos del mouse
    processing.onMouseEvent = function (world, event) {
      // Por ahora no cambia el mundo. Solo retorna una copia del mundo actual
      return make(world, {});
    };

    //Implemente esta función si quiere que su programa reaccione a eventos del teclado
    processing.onKeyEvent = function (world, event) {
      // Por ahora no cambia el mundo. Solo retorna una copia del mundo actual
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