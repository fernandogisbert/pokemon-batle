
// Traerme entrenadores pokemon aleatorios


const getRandomUser = async () => {
    try {
        const myRandomUser = await fetch('https://randomuser.me/api/?results=2');
        const userData = await myRandomUser.json();
        
        console.log('Mi usuario es', userData.results[0]);
        console.log('Mi usuario es', userData.results[1]);

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


/////////////////////////////////////////////////////////////////////////////////

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
                    

                    aMeter+= `<p>Squirtel ataca a Bulbasur y lo deja con ${vidaBulbasur} de vida</p>
                    <p>Bulbasur ataca a Squirtel y lo deja con ${vidaEsquirtel} de vida</p>`;

                    paraIntroducir.innerHTML = aMeter; 
                    

                    console.log(aMeter);
                    console.log(vidaEsquirtel, vidaBulbasur);

                    
                }else{
                    
                    clearInterval(luchaIntervalo);

                    esquirtel = document.getElementById('squirtelId');
                    bulbasur = document.getElementById('bulsaurId');

                    if (vidaEsquirtel > 0){
                        vencedor = vencedor + 'El ganador es Squirtel';
                        bulbasur.classList.remove('ganador__tamano');
                        esquirtel.classList.add('ganador__tamano');
                    }else{
                        vencedor = vencedor + 'El ganador es bulbasur';
                        esquirtel.classList.remove('ganador__tamano');
                        bulbasur.classList.add('ganador__tamano');
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