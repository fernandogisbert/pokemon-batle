

const botonLuchar = document.getElementById('boton__luchar');



function luchar() {


    // parámetros esquirtel
    var vidaEsquirtel = document.getElementById('vida__esquirtel').value;
    let ataqueEsquirtel = document.getElementById('ataque__esquirtel').value;
    let defensaEsquirtel = document.getElementById('defensa__esquirtel').value;

    // parámetros bulbasur

    var vidaBulbasur = document.getElementById('vida__bulbasur').value;
    let ataqueBulbasur = document.getElementById('ataque__bulbasur').value;
    let defensaBulbasur = document.getElementById('defensa__bulbasur').value;

    // vencedor

    let vencedor = '';

    // parámetros de lucha 

    function player1(){
        vidaEsquirtel = vidaEsquirtel - (ataqueBulbasur - defensaEsquirtel);
    }

    function player2(){
        vidaBulbasur = vidaBulbasur - (ataqueEsquirtel - defensaBulbasur);
    }

    let aMeter = "";
    
    
    while( (vidaBulbasur && vidaEsquirtel) > 0) {

        // setInterval(function(){ 
            player1();
            
            player2();

            let paraIntroducir = document.getElementById('battle__transcurso');
            

            aMeter+= `<p>Squirtel ataca a Bulbasur y lo deja con ${vidaBulbasur} de vida</p>
            <p>Bulbasur ataca a Squirtel y lo deja con ${vidaEsquirtel} de vida</p>`;

            paraIntroducir.innerHTML = aMeter; 
            

            console.log(aMeter);

            // aquí ocurre la lucha
            console.log(vidaEsquirtel, vidaBulbasur);
    //     }, 3000);
    }

    //  frase sale final segun quien gana
    //  caracteristicas imagen del ganador 
    
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

botonLuchar.addEventListener('click', luchar);
