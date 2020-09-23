const cambiaPantalla = (valor) => {

    //Ahora se a que pantalla quiero dirigirme al concatenar fase + valor que viene
    //por parámetro.
    let faseDestino = "fase" + valor;

    //A continuación creo un array con todas fases.
    let arrayFases = ["fase1","fase2","fase3"];

    //El siguiente paso es incluir en arrayfases, todas las fases MENOS la de destino, para ello usamos
    //filter.
    arrayFases = arrayFases.filter(val => !faseDestino.includes(val));

    //Primero habilitamos la fase a la que queremos ir

    document.getElementById(faseDestino).style.display = "block";

    //Finalmente deshabilitamos el resto

    for(let pantalla of arrayFases){
        document.getElementById(pantalla).style.display = "none";
    }
}

//contruir personaje
class personaje{
    constructor(nombre,vida,defensa,daño){
        this.nombre = nombre;
        this.vida = vida;
        this.defensa = defensa;
        this.daño = daño;

    }

    receiveDmg1(dmg){
        this.hp -= (dmg - this.armor);
    }
}

//Personajes del juego
let pers1 = new personaje("Goku",100,50,50);
let pers2 = new personaje("Vegeta",100,60,40);
let pers3 = new personaje("Freezer",100,30,50);
let pers4 = new personaje("Boo",100,60,50);

//Asignar jugadores
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let player3 = document.getElementById("player3");
let player4 = document.getElementById("player4");

