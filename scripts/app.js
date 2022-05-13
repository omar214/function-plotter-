// store the plot configration in var
let parameters = {
    target: '#myFunction',
    data: [{
        fn: 'x^2',
        color: 'red',
    }],
    grid: true,
    yAxis: { domain: [-1, 1] },
    xAxis: { domain: [0, 2 * Math.PI] },
};

// function to check if ch is alpha
var isAlpha = function (ch) {
    return typeof ch === "string" && ch.length === 1
        && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}
// function to check if char is a sign
var isSign = function (ch) {
    let signs = "+-*/^";
    return signs.includes(ch);
}

// validate the input
let validate = (f) => {
    let state = true;

    // handle empty input
    if (f.trim() === '') {
        alert('function is empty you should enter a function')
        state = false
    }
    for (let index = 0; index < f.length; index++) {
        const ch = f[index];
        
        // check if containig alpha except for x 
        if (isAlpha(ch) && ((ch !== 'x' ))) {
            alert(`invalid input ${ch}`);
            state = false;
            break;
        }
        // handle if x is written then a number  eg. 'x2' , "xx" ...
        else if (index !== 0 && !isSign(ch)) {
            let prev = f[index - 1];
            if (prev === 'x' ) {
                alert(`invalid input : cant enter alpha digits ${prev}${ch}`)
                state = false;
                break;
            }
        }
    }
    // if ends with sign
    let lastChar = f[f.length - 1];
    if (isSign(lastChar)) {
        alert(`function cant end with sign "${lastChar}"`)
        state = false;
    }
    return state
}

function plot() {
    // read values from dom
    var f = document.querySelector("#function").value;
    var xMin = document.querySelector("#xMin").value;
    var xMax = document.querySelector("#xMax").value;
    var yMin = document.querySelector("#yMin").value;
    var yMax = document.querySelector("#yMax").value;
    var color = document.querySelector("#color").value;

    // validate input
    f= f.toLowerCase();
    let state = validate(f);
    if (!state) return;

    // edit plot configration
    parameters.data[0].fn = f;
    parameters.xAxis.domain = [xMin, xMax];
    parameters.yAxis.domain = [yMin, yMax];
    parameters.data[0].color = color;

    // plot the function
    functionPlot(parameters);
}




