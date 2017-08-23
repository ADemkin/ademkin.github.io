function getPressure() {
    var width = document.getElementById('width'),
        weight = document.getElementById('weight'),
        result = document.getElementById("result"),
        psi = 0,
        bar = 0;


    //0.45359237 kgs in 1 lb
    // 	Tire Width=20: Pressure(psi) = (0.33 * Rider Weight in lbs) + 63.33 
    // Tire Width=23: Pressure(psi) = (0.33 * Rider Weight in lbs) + 53.33 
    // Tire Width=25: Pressure(psi) = (0.33 * Rider Weight in lbs) + 43.33 
    // Tire Width=28: Pressure(psi) = (0.33 * Rider Weight in lbs) + 33.33 

    if (width.value == 23) {
        psi = weight.value * 0.726 + 53.33;

    } else if (width.value == 25) {
        psi = weight.value * 0.726 + 43.33;

    } else if (width.value == 28) {
        psi = weight.value * 0.726 + 33.33;

    } else {
        psi = 'unknown';
    }

    bar = psiToBar(psi).toFixed(1);
    psi = psi.toFixed(1);
    result.innerHTML = 'Recomended tyre pressure is ' + psi + ' psi or ' + bar + ' bar.';

}

function psiToBar(bar){
	return (psi * 0.0689476);
    
}