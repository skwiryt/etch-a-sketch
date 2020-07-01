document.addEventListener('DOMContentLoaded', () => {
    const boardWidth = 540;
    const startNumber = 64;
    const maxNumber = 120;
    let light = 50;
    let numberInRow;
    let isDrawing = false;
    function generateGrid(boardWidth, inRow = startNumber){
        let board = document.querySelector('.board');
        let elementWidth = boardWidth / inRow;
        for (let i = 1; i <= inRow * inRow; i++){
            let pseudoPixel = document.createElement('div');
            pseudoPixel.classList.add('pseudo-pixel');
            
            pseudoPixel.style.width = `${elementWidth}px`;
            board.appendChild(pseudoPixel);
        }    
    }    
    generateGrid(boardWidth);
    document.querySelector('.board').addEventListener('mousedown', toggleDrawing); 
    
    function toggleDrawing(){
        let pseudoPixels = document.querySelectorAll('.pseudo-pixel');
        if(isDrawing) {            
            pseudoPixels.forEach(p => {
                p.removeEventListener('mouseover', draw);                
            });            
            isDrawing = false;
          }
          else {
            console.log('start');
            pseudoPixels.forEach(p => {
                p.addEventListener('mouseover', draw);                
            });
            isDrawing = true;      
          }    
    } 
    document.querySelector('.board').addEventListener('mouseleave', () => { 
        if (isDrawing) {
            toggleDrawing();
        }
    });    
    function draw() {
        this.style.backgroundColor = light === 0 ? "black" : `hsl(${randomHue()}, 100%, ${light}%)`;
    } 
    let randomHue = () => Math.round(Math.random() * 360);
    
    document.querySelector('.clear-button').addEventListener('click', () => {    
        let pseudoPixels = document.querySelectorAll('.pseudo-pixel');
        pseudoPixels.forEach(p => p.style.backgroundColor = '');
    });
    document.querySelector('.set-button').addEventListener('click', () => callSetBox(false));
    function callSetBox(error = false){
        console.log('hi from call')
        console.log(error);        
        if (error){            
            document.querySelector('label').textContent = `You must insert a number smaller than ${maxNumber}!`;        
        }
        else {
            document.querySelector('.set-modal').classList.add('visible');
            document.querySelector('.shadow').classList.add('visible');
            document.querySelector('#rows').value = numberInRow ?? startNumber;
            document.querySelector('#rainbow').checked = (light === 50);
        }
    }
    document.querySelector('#ok-button').addEventListener('click', setNewGrid);
    function setNewGrid() {
        console.log('hi from set')
        let inRow = Number(document.querySelector('#rows').value);
        console.log(inRow);
        if (isNaN(inRow) || inRow > maxNumber){            
            callSetBox(true);            
        }
        else{            
            let board = document.querySelector('.board');
            board.innerHTML = '';
            generateGrid(boardWidth, inRow);
            numberInRow = inRow
            if (document.getElementById('rainbow').checked){
                light = 50;
            }
            else {
                light = 0;
            }
            removeSetBox();
        }        
    }
    document.querySelector('#cancel-button').addEventListener('click', removeSetBox);
    function removeSetBox(){
        document.querySelector('.set-modal').classList.remove('visible');
        document.querySelector('.shadow').classList.remove('visible');
        document.querySelector('label').textContent = "Please, set number of grid elements in a row";
    }
});