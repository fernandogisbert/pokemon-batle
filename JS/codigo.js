
// Traerme entrenadores pokemon aleatorios


const getRandomUser = async () => {
    try {
        const myRandomUser = await fetch('https://randomuser.me/api/?results=2');
        const userData = await myRandomUser.json();

        // constructor de entrenadores
        class Entrenador {
            constructor(nombre, apellido, apodo){
                this.nombre = nombre;
                this.apellido = apellido;
                this.nick = apodo;
            }
        }
        // Instacias entrenadores 
        let entrenadorA = new Entrenador(userData.results[0].name.first, userData.results[0].name.last, userData.results[0].login.username);
        let entrenadorB = new Entrenador(userData.results[1].name.first, userData.results[1].name.last, userData.results[1].login.username);

        // los metemos en el dom
        let selectorEntrenadorA = document.getElementById('entrenador1');
        infoEntrenadorA = ` <div>
                                <p>Maestro Pokemon: ${entrenadorA.nombre} ${entrenadorA.apellido}.</p> 
                                <p>Alias: ${entrenadorA.nick}</p>
                            </div>
                            <img src="${userData.results[0].picture.large}" alt="foto">`;
                            
        selectorEntrenadorA.innerHTML = infoEntrenadorA

        let selectorEntrenadorB = document.getElementById('entrenador2');
        infoEntrenadorB = `<div>
                                <p>Maestro Pokemon: ${entrenadorB.nombre} ${entrenadorB.apellido}.</p> 
                                <p>Alias: ${entrenadorB.nick}</p>
                            </div>
                            <img src="${userData.results[1].picture.large}" alt="foto">`;
        selectorEntrenadorB.innerHTML = infoEntrenadorB

    }catch(error){
        console.log(error)
    }


};
getRandomUser();


// fin entrenadores/////////////////////////////////////////////////////////////////////////////////

const botonLuchar = document.getElementById('boton__luchar');


var vidaEsquirtel;
var vidaBulbasur;



function lucha (){

    // parámetros esquirtel
    vidaEsquirtel = document.getElementById('vida__esquirtel').value;
    let ataqueEsquirtel = document.getElementById('ataque__esquirtel').value;
    let defensaEsquirtel = document.getElementById('defensa__esquirtel').value;

    // parámetros bulbasur

    vidaBulbasur = document.getElementById('vida__bulbasur').value;
    let ataqueBulbasur = document.getElementById('ataque__bulbasur').value;
    let defensaBulbasur = document.getElementById('defensa__bulbasur').value;


    // parámetros de lucha 

    function player1(){
        vidaEsquirtel = vidaEsquirtel - (ataqueBulbasur - defensaEsquirtel);
    }

    function player2(){
        vidaBulbasur = vidaBulbasur - (ataqueEsquirtel - defensaBulbasur);
    }

    let aMeter = "";

    let ring = document.getElementById('battle__ring');
    ring.classList.add('fondoNaranja');

    // aquí ocurre la lucha

    var luchaIntervalo = setInterval(function(){ 

            if( (vidaBulbasur && vidaEsquirtel) > 0){

                player1();
                
                player2();

                let paraIntroducir = document.getElementById('battle__transcurso');
                

                aMeter+= `<p>Player1 ataca a Player2 y lo deja con ${vidaBulbasur} de vida</p>
                <p>Player2 ataca a Player1 y lo deja con ${vidaEsquirtel} de vida</p>`;

                paraIntroducir.innerHTML = aMeter; 
                // console.log(aMeter);
                // console.log(vidaEsquirtel, vidaBulbasur);
            }else{
                
                clearInterval(luchaIntervalo);

                let jugador1 = document.getElementById('jugador1');
                let jugador2 = document.getElementById('jugador2');

                if (vidaEsquirtel > 0){
                    vencedor = vencedor + 'El ganador es Player1';
                    jugador2.classList.remove('ganador__tamano');
                    jugador1.classList.add('ganador__tamano');
                }else{
                    vencedor = vencedor + 'El ganador es Player2';
                    jugador1.classList.remove('ganador__tamano');
                    jugador2.classList.add('ganador__tamano');

                }

                let resultado = document.getElementById('battle__result');

                let aInsertar = `
                    <h3>${vencedor}</h3>
                    `;

                resultado.innerHTML = aInsertar;
                
                let ring = document.getElementById('battle__ring');
                ring.classList.add('fondoNaranja');
                    
            }
    }, 500);

}

// vencedor
let vencedor = '';



botonLuchar.addEventListener('click', () => {
    lucha();
  });

botonLuchar.addEventListener('click', () => {

    localStorage.setItem("nombre", "Horse-Luis");
    sessionStorage.setItem("perico", "el de los palotes");
})


// Traigo Pokemos desde la api para jugador 1

const getPokemons = async () =>{
    try{

        let llamoPokeApi = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=4');
        let pokeList = await llamoPokeApi.json();

        // array de resultados
        let pokeArr = pokeList.results;

        let pokeContent= '';
        let pokeContentB = '';
        for(let i of pokeArr.slice(0,5)){
                // saco los nombres de los pokemons
            let pokeNombre = i.name;
            // console.log(pokeNombre);

            // llamo a la api personal de cada uno para sacar su imagen
            let llamoPokemonPage = await fetch(i.url);
            let pokePage = await llamoPokemonPage.json();
            let pokeImage = pokePage.sprites.other.dream_world.front_default;
            // console.log(pokePage);
            let pokeId = pokePage.id;
            
            pokeContent += `<div id="${pokeId}">
                                <h5 class="pokeName">${pokeNombre}</h5>
                                <img class="pokePhoto" src=${pokeImage} alt=${pokeNombre}>
                            </div>`;

            let etiquetaPokelist = document.getElementById('pokelist');

            etiquetaPokelist.innerHTML = pokeContent;
        }
        for(let i of pokeArr.slice(5)){
        let pokeNombre = i.name;
        let llamoPokemonPage = await fetch(i.url);
        let pokePage = await llamoPokemonPage.json();
        let pokeImage = pokePage.sprites.other.dream_world.front_default;
        let pokeId = pokePage.id;
        pokeContentB += `<div id="${pokeId}">
                            <h5 class="pokeName">${pokeNombre}</h5>
                            <img class="pokePhoto" src=${pokeImage} alt=${pokeNombre}>
                        </div>`;

        let etiquetaPokelistB = document.getElementById('pokelistB');

        etiquetaPokelistB.innerHTML = pokeContentB;
    }

    }catch(error){
        console.log(error)
    }
}

getPokemons();


// SELECCIONAR POKEMON JUGADOR 1

let jugador1 = document.getElementById('jugador1');


setTimeout(function(){
    let charmeleon = document.getElementById('5');
    // console.log(charmeleon);
    charmeleon.addEventListener('click',()=>{
        jugador1.innerHTML = charmeleon.outerHTML ; 
    });
}, 3000);

setTimeout(function(){
    let charizard = document.getElementById('6');
    charizard.addEventListener('click',()=>{
        jugador1.innerHTML = charizard.outerHTML ; 
    });
}, 3000);

setTimeout(function(){
    let squirtle = document.getElementById('7');
    squirtle.addEventListener('click',()=>{
        jugador1.innerHTML = squirtle.outerHTML ; 
    });
}, 3000);

setTimeout(function(){
    let wartortle = document.getElementById('8');
    wartortle.addEventListener('click',()=>{
        jugador1.innerHTML = wartortle.outerHTML ; 
    });
}, 3000);

setTimeout(function(){
    let blastoise = document.getElementById('9');
    blastoise.addEventListener('click',()=>{
        jugador1.innerHTML = blastoise.outerHTML ; 
    });
}, 3000);



// SELECCIONAR POKEMON JUGADOR 2

let jugador2 = document.getElementById('jugador2');


setTimeout(function(){
    let caterpie = document.getElementById('10');
    caterpie.addEventListener('click',()=>{
        jugador2.innerHTML = caterpie.outerHTML ; 
    });
}, 3000);

setTimeout(function(){
    let metapod = document.getElementById('11');
    metapod.addEventListener('click',()=>{
        jugador2.innerHTML = metapod.outerHTML ; 
    });
}, 3000);

setTimeout(function(){
    let buterfree = document.getElementById('12');
    buterfree.addEventListener('click',()=>{
        jugador2.innerHTML = buterfree.outerHTML ; 
    });
}, 3000);

setTimeout(function(){
    let weedle = document.getElementById('13');
    weedle.addEventListener('click',()=>{
        jugador2.innerHTML = weedle.outerHTML ; 
    });
}, 3000);

setTimeout(function(){
    let kakuna = document.getElementById('14');
    kakuna.addEventListener('click',()=>{
        jugador2.innerHTML = kakuna.outerHTML ; 
    });
}, 3000);


