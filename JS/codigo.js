

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