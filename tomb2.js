//Vamos a usar http://processingjs.org/
  // o https://p5js.org/reference/

  // Importamos las librerias si es necesario usar listas
  const { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

  function make(data, attribute) {
    return Object.assign({}, data, attribute);
  }
  
  /**
   * Se definen los mundos
   * let, var, const namne = null; 
   * No requiere interacción con el usuario
   */
  //const WIDTH = 400;
  //const HEIGHT = 400;
  const SIZE  = 40;  
  const MAPA  = [[1,1,1,1,1,1,1,1,1,1],
                 [1,0,0,0,0,0,0,0,0,1],
                 [1,0,0,2,1,0,0,0,0,1],
                 [1,0,0,0,1,0,2,0,0,1],
                 [1,0,1,0,1,0,1,0,0,1],
                 [1,0,1,0,1,0,1,1,0,1],
                 [1,0,0,0,0,2,0,1,0,1],
                 [1,0,0,1,1,1,1,1,0,1],
                 [1,0,0,2,0,0,0,0,0,1],
                 [1,1,1,1,1,1,1,1,1,1]];
  let muro  = null;
  let tomb = null; 




  function sketchProc(processing) {

    /**
     * Esto se llama antes de iniciar (espacio de trabajo)
     */
    processing.setup = function () {
      processing.frameRate(80);
      processing.size(400,400);
      muro = processing.loadImage('images/muro.jpg');
      processing.state = { time:0, tomb:{ x:8, y:2}, galletas:{x:2, y:2}};
    }
    

    // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
    processing.drawGame = function (world) {
      processing.background(0,0,0);


      function recursiveList(l,f,index=0){
        if(!isEmpty(l)){
          f(first(l),index);
          recursiveList(rest(l),f, index+1)
        }
      }    
    

    recursiveList(MAPA,(row, i) => {
      recursiveList(row,(cell, j)=> {
        if(cell==1){//es para los muros del laberinto
          // nombre de imagen, tamaño columna, tamaño fila, ancho maximo, largo maximo.
      processing.image(muro, j * SIZE, i * SIZE, SIZE,SIZE); 
        }
        if (cell==2){ //este es para galletas 
          //tamaño de la columna, tomaño de la fila, ancho, largo 
          processing.ellipse(j * SIZE + SIZE/2, i * SIZE + SIZE/2, SIZE/2, SIZE/2);

        }
      });
    });

  
    if (world.time == 0)
     processing.ellipse(world.tomb.x * SIZE + SIZE/2, world.tomb.y * SIZE + SIZE/2, SIZE,SIZE);
    else 
     processing.ellipse(world.tomb.x * SIZE + SIZE/2, world.tomb.y * SIZE + SIZE/2, SIZE,SIZE);

    }


    // Actualiza el mundo despues de cada frame. En este ejemplo, no cambia nada, solo retorna una copia del mundo
    processing.onTic = function (world) {
      return make(world, {});
    }

    //Implemente esta función si quiere que su programa reaccione a eventos del mouse
    processing.onMouseEvent = function (world, event) {
      // Por ahora no cambia el mundo. Solo retorna una copia del mundo actual
      return make(world, {});
    };

    //Implemente esta función si quiere que su programa reaccione a eventos del teclado
    processing.onKeyEvent = function (world, keycode) {
      //keycode
      if (keycode == processing.LEFT){
        return make(world, {tomb:{x:world.tomb.x-1, y:world.tomb.y}});
      }else 
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