class Luchador {

    constructor (nombre, vida, fuerza, defensa, ki, imagen){

        this.nombre = nombre;
        this.vida = vida;
        this.fuerza = fuerza;
        this.defensa = defensa;
        this.ki = ki;

        this.imagen = imagen;
    }

    //esto es un método ... empieza a atacar p1 a p2
    //la fuerza de p1 será la fuerza menos la defensa del p2
    golpear = (atacado) => {
        
        let damage = this.fuerza - atacado.defensa;
        
        if (damage < 0) {
            damage = 0;
        }
        
        atacado.vida = atacado.vida - damage;
        actBarrasVida();
        
        ganador();

        let textoSelBatalla = document.getElementById("textoSelBatalla");
        textoSelBatalla.innerText = 
        (`${this.nombre} ataca a 
        ${atacado.nombre} y le hace 
        ${damage} de daño`);
        
    }
}
let Goku = new Luchador ("Goku", 100,80,70,10,"img/SonGoku.png");
let Vegeta = new Luchador ("Vegeta",100,70,20,8,"img/Vegeta.png");
let Freezer = new Luchador ("Freezer",100,90,60,3,"img/freezer.png");
let Boo = new Luchador ("Boo",100,90,80,7,"img/kidboo.png");

//Asignamos variables a las diferentes fases del juego
let pantalla1 = document.getElementById("fase1");
let pantalla2 = document.getElementById("fase2");
let pantalla3 = document.getElementById("fase3");
let pantalla4 = document.getElementById("fase4");

const cambiaPantalla = (valor) => {
    let faseSiguiente= "fase" + valor;

//Array con las fases que tendra el juego
let arrayFases = ["fase1", "fase2", "fase3", "fase4"];
// Si la fase es a la que voy no la oculto (la meto en pantallasOcultar), si no, la oculto.
let pantallasOcultar = arrayFases.filter(fase=> {


    if (fase === faseSiguiente) {

        return false;

    }else {
        
        return true;
    }
});
//si estoy en la batalal de combate actualizo barras de vida
//y muestro pj
        
if (valor === 3) {
 
    actBarrasVida();
    muestraPersonaje();
};
//si estoy en la pantalla1, reseteo
if (valor === 1) { 
 
    reset();
};

//primero habilitamos la fase a la que queremos ir
    document.getElementById(faseSiguiente).style.display = "block";

//finalmente deshabilitamos el resto
    for(let pantalla of pantallasOcultar) {
        document.getElementById(pantalla).style.display ="none";
    }
    
}

//creo una variable impar para golpear();
let turno = 1;

//cada  vez que se llama a pulsaAtacar suma 1
//si el turno es par golpea p1 a p2, si el turno es impar p2 a p1
//cada vez que se ataca se actualiza la vida del personaje con muestraPersonaje()
const pulsaAtacar = () => {

    turno++;

    if (turno % 2 === 0) {
        
        player1.golpear(player2);
        muestraPersonaje();

    } else {

        player2.golpear(player1);
        muestraPersonaje();
    }
    


    //el boton de atacar se mostrará si la vida es mayor que 0
    if (player1.vida >= 1 || player2.vida >= 1) {

        let botonAtacar = document.getElementById("botonAtacar").style.display = "block";

    }else {

        let botonAtacar = document.getElementById("botonAtacar").style.display = "none";

    }

    //cuando la vida de p1 o p2 sea menor o igual a 0 cambia a pantalla final
    if (player1.vida <= 0 || player2.vida <= 0) {

        cambiaPantalla(4);
    } 

}
// asignamos personajeX a los divs de las diferentes imagenes de luchadores con su id
let personaje1 = document.getElementById("personaje1");
let personaje2 = document.getElementById("personaje2");
let personaje3 = document.getElementById("personaje3");
let personaje4 = document.getElementById("personaje4");

//creo dos variables vacias para llenarlas con pulsaPersonaje>idToPj
let player1 = "";
let player2 = "";

//el texto en fase2 empezará con Jugador1 eligiendo personaje
//se mostrará este texto al llegar a la fase2
let textoSeleccion = document.getElementById("textoSeleccion");
textoSeleccion.innerText = "Player 1, selecciona personaje";

// crea una función para que al pulsar jugador1 sobre un pj salte al jugador2.
const pulsaPersonaje = (ev) => {

    //selección será la id de cada personaje
    let seleccion = ev.target.id; 

    //si player1 está vacio, player1 no ha elegido todavía
    if (player1 === "") { 
        player1 = idToPj(seleccion);

        //se muestra texto cuando jugador 1 ya ha elegido
        let textoSeleccion = document.getElementById("textoSeleccion");
        textoSeleccion.innerText = "Player 2, selecciona personaje";

    }else{

        player2 = idToPj(seleccion);
        cambiaPantalla(3);//cuando p2 elige cambia de pantalla

    }

    //si el p2 elige el mismo pj que p1
    if (player2 === player1) {

        //salta un texto en rojo 
        let textoSeleccion = document.getElementById("textoSeleccion");
        textoSeleccion.innerText = "No puedes escoger el mismo personaje";
        textoSeleccion.style.color = "red";
        
        //se queda en la misma pantalla
        cambiaPantalla(2);
    }
}

//al hacer click sobre la imagen del personaje ejecuto pulsaPersonaje
personaje1.addEventListener("click", pulsaPersonaje)
personaje2.addEventListener("click", pulsaPersonaje)
personaje3.addEventListener("click", pulsaPersonaje)
personaje4.addEventListener("click", pulsaPersonaje)

//Creo una función para que me convierta la id del div a la class del personaje con sus atributos asignados
const idToPj = (id) => {

    switch (id) {

        case "personaje1":
            return Goku;
        
        case "personaje2":
            return Vegeta;

        case "personaje3":
            return Freezer;

        case "personaje4":
            return Boo;

        default:
            "No has escogido un personaje"
        break;
    }
}

// creo una función para que al elegir personaje en la fase2 se muestre en la fase 3
// con su imagen, nombre y vida
const muestraPersonaje = (ev) => {

    document.getElementById("imagenJugador1").src = player1.imagen;
    document.getElementById("nombreJugador1").innerText = player1.nombre;
    document.getElementById("vidaJugador1").innerText = player1.vida;
    
    document.getElementById("imagenJugador2").src = player2.imagen;
    document.getElementById("nombreJugador2").innerText = player2.nombre;
    document.getElementById("vidaJugador2").innerText = player2.vida;

}

//reseteo la partida
const reset = () => {

    player1 = "";
    player2 = "";


Goku = new Luchador ("Goku", 100,80,70,10,"img/SonGoku.png");
Vegeta = new Luchador ("Vegeta",100,70,20,8,"img/Vegeta.png");
Freezer = new Luchador ("Freezer",100,90,60,3,"img/freezer.png");
Boo = new Luchador ("Boo",100,90,80,7,"img/kidboo.png");

textoSeleccion.innerText = "Jugador 1, elige personaje";

}

const ganador = () => {
    
    if (player1.vida <= 0) {

        document.getElementById("ganador").src = player2.imagen;

        document.getElementById("textoGanador").innerText = `${player2.nombre}`;
  
    } else {
        
        document.getElementById("ganador").src = player1.imagen;

        document.getElementById("textoGanador").innerText = `${player1.nombre}`;
    }

}

const actBarrasVida = () => {

    document.getElementById("vidaJugador1").style.width = player1.vida + "%";
    document.getElementById("vidaJugador2").style.width = player2.vida + "%";

}
