//Vamos a usar http://processingjs.org/
  // o https://p5js.org/reference/

  // Importamos las librerias si es necesario usar listas
  let { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

  function make(data, attribute) {
    return Object.assign({}, data, attribute);
  }
  
  //const espacioAncho = 400;
  //const espacioLargo = 400;
  
  //definir imagen
  //m1 = null;

  /**
   * No requiere interacción con el usuario
   */

  function sketchProc(processing) {

    /**
     * Esto se llama antes de iniciar (espacio de trabajo)
     */
    processing.setup = function () {
      processing.frameRate(60);
      
      //llamar imagen
      //m1 = processing.loadImage("images/m1.png");

      //processing.size(espacioAncho, espacioLargo);
      processing.size(400, 400);
      processing.state = { x: 1, y: 100, ancho: 50, alto: 50, dirx: 1, diry: 1};
    } // dirx y diry se usan para la velocidad
    //ancho y alto es el temaño de cuadro 


    // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
    processing.drawGame = function (world) {
      
      processing.background(10, 200, 50);
      //processing.fill(240, 240, 240);
      processing.rect(world.x, world.y, world.ancho, world.alto);

      //poner imagen en ves de rectangulo
      //processing.image(m1, world.x, world.y, world.ancho, world.alto);
    }


    processing.onTic = function (world) {
      //if( world.x + world.ancho >= espacioAncho)
        if( world.x + world.ancho >= 400)
        return make(world, { x: world.x - world.dirx, dirx: -world.dirx});
      else {
        if( world.x <= 0) {
          return make(world, { x: world.x - world.dirx, dirx: -world.dirx});
        }
      }
       
      //if( world.x + world.ancho >= espacioLargo)
      if( world.y + world.alto >= 400)
        return make(world, { y: world.y - world.diry, diry: -world.diry});
      else {
        if( world.y <= 0) {
          return make(world, { y: world.y - world.diry, diry: -world.diry});
        }
      }
      
      return make(world, { x: world.x + world.dirx, y: world.y + world.diry});
      
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