
var getMousePos = (canvas, evt) => {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

// Take the position 'pos' and quantize it into a 12x12 grid.
var calculateGrid = (canvas, pos) => {
    var rect = canvas.getBoundingClientRect();
    var width = rect.width;
    var height = rect.height;

    let x = Math.floor(pos.x / width * 12);
    let y = Math.floor(pos.y / height * 12);    

    return {
        x: x,
        y: y
    };
};

let drawCircle = (context, pos) => {
    let radius = 10;
    context.beginPath();
    context.arc(pos.x, pos.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
}


// This program waits for the user to do something (click and drag the mouse). This function
// sets all the necessary event handlers to make the thing work.
var init = () => {
    const synth = new Tone.Synth().toMaster();
    let canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    let mouseDown = false;

    canvas.addEventListener('mousemove', e => {
        let pos = getMousePos(canvas, e);
        if (mouseDown) {
            let gridPos = calculateGrid(canvas, pos);
            let octave = gridPos.x;
            let notes = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
            let letter = notes[gridPos.y];

            // Because the variable 'letter' is a string, adding a number will automatically convert
            // the number into a string before concatinating the values. This is an example of 
            // "type coercion."
            let note = letter + octave;

            synth.triggerAttackRelease(note, .1); 

            drawCircle(context, pos);
        }
        
    });

    canvas.addEventListener('mousedown', e => {
        mouseDown = true;
    });

    canvas.addEventListener('mouseup', e => {
        mouseDown = false;
    })


};


// Note that nothing runs until we actually invoke this function.
init();