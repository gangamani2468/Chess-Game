



// coin enter format //
// rook
// Ra1a2-> R-> coinName ,a1->from ,a2 ->target


let currentCoin;
let prevCoin="";
let prevRow;
let prevCol;
// let bishopCurrentPosition=[5,1];
// let rookCurrentPosition=[2,4];
// let knightCurrentPosition=[1,6];
// let queenCurrentPosition=[1,4];
// let kingCurrentPosition=[1,5];
// let pawnCurrentPosition=[2,2];
let color;
let fromCol;
let fromRow;
let colArray=['a','b','c','d','e','f','g','h'];
body=document.querySelector('body');
// initialization

drawBoard();            // drawboard
 
function possibleMove(coin,currenRow,currentCol){
    fromRow=parseInt(currenRow);     // assign fromRow currentRow
    fromCol=parseInt(currentCol);     // assign fromCol currentCol
    if(coin=="R"){   
        currentCoin="R";        // current coin assign
        rookPossibleMove();     // then show possible moves
    }
    else if(coin=="B"){        
        currentCoin="B";                 // current coin assign
        bishopPossibleMove();               // then show possible moves
    }
    else if(coin=="Q"){ 
        currentCoin="Q";
        queenPossibleMove();
    }
    else if(coin=="K"){
        currentCoin="K";
        kingPossibleMove();
    }
    else if(coin=="P"){
        currentCoin="P";
        pawnPossibleMove();
    }
    else if(coin=="N"){
        currentCoin="N";                 // current coin assign
        knightPossibleMove();               // then show possible moves
    }
    
}
function drawBoard(){

 
    let tableRow;       // table row
    let tableData;      // table data 
    color='white'       // first color start with
    let table=document.createElement('table');
    body.appendChild(table);
    let tableBody=document.createElement('tbody')
    table.appendChild(tableBody);
    for(let row=8;row>0;row--){
        tableRow=document.createElement('tr');
        tableBody.append(tableRow);
        for(let col=0;col<8;col++){
            tableData=document.createElement('td');
            tableData.setAttribute('id','row'+row+'col'+col);  // row and col id set
            tableData.setAttribute("data-row",""+row);
            tableData.setAttribute("data-col",""+col);
            tableData.onclick=onClick;
            tableData.style.backgroundColor=color;
            tableRow.append(tableData);
            colorToggle();      // color change function
        }
        colorToggle();
    }

    // rook init position place
    initPlace([1,0],"R")
    // knight init position place
    initPlace([1,1],"N");
    // bishop init position place
    initPlace([1,2],"B");
    // queen init position place
    initPlace([1,3],"Q");
    // // king init position place
    initPlace([1,4],"K");
    // bishop init position place
    initPlace([1,5],"B");
    // knight init position place
    initPlace([1,6],"N");
     // rook init position place
     initPlace([1,7],"R")
    // pawn 1
    initPlace([2,0],"P");
     // pawn 2
     initPlace([2,1],"P");
      // pawn 3
    initPlace([2,2],"P");
     // pawn 4
     initPlace([2,3],"P");
      // pawn 5
    initPlace([2,4],"P");
     // pawn 6
     initPlace([2,5],"P");
      // pawn 7
    initPlace([2,6],"P");
     // pawn 8
     initPlace([2,7],"P");
    

}
// coin init place;
function initPlace(currentPosition,coinName){
    let bishopInitId='row'+currentPosition[0]+'col'+currentPosition[1];
    element= document.getElementById(bishopInitId);
    element.innerHTML=coinName;
    color=element.style.backgroundColor;
    colorToggle();
    element.style.color=color;
}

// comman 
function colorToggle(){     //color change function
    if(color=='white'){
        color='black';
        return
    }
    color='white';
}
// comman
function highlight(element,backgroundColor){        // highlight that element and old color assign data color
 
    if(backgroundColor=="black"){
        element.style.backgroundColor="#008140";
        element.setAttribute("data-color",backgroundColor);
    }else if(backgroundColor=="white"){
        element.style.backgroundColor="#8be78b";
        element.setAttribute("data-color",backgroundColor);
    }
    
}

// comman // removepossible depend coinName
function dragElement(target,coinName,currentPosition){
   
    fromRow=currentPosition[0];         // row position get 
    fromCol=currentPosition[1];            // col position get
    let element=document.getElementById('row'+fromRow+'col'+fromCol);       //current position null
    element.innerHTML="";       // current position "";
    let toCol=parseInt(target[1]);         //target column get
    let toRow=parseInt(target[0]);           //target row get
    
    element=document.getElementById('row'+toRow+'col'+toCol);   // target element get
 

    color=element.style.backgroundColor;// background color get;
    colorToggle();                  //backgroundcolor oppsite set color variable
    element.style.color=color;      //color set
    element.innerHTML=coinName;              // rook text set
              // current position col change
   
//    init();
}  

// remove Possible
function removePossible(coinName,fromRow,fromCol){
    fromRow=parseInt(fromRow);
    fromCol=parseInt(fromCol);
    if(coinName=="R"){// rook 
        rookRemovePossible(fromRow,fromCol);       // highlight remove
        
    }else if(coinName=="B"){// bishop
        bishopRemovePossible(fromRow,fromCol);         // highlight remove
        
    }
    else if(coinName=="Q"){//Queen
        queenRemovePossible(fromRow,fromCol);
       
    }
    else if(coinName=="K"){// King
        kingRemovePossible(fromRow,fromCol);
    

    }
    else if(coinName=="P"){//pawn
        pawnRemovePossible();
      
    }
    else if(coinName=="N") {// knight
        knightRemovePossible(fromRow,fromCol);         // highlight remove
       
    }
    
}
// rook 
function rookValidCheck(target){
   
    let element=document.getElementById("row"+fromRow+"col"+fromCol);
    let toRow=parseInt(target[0]);
    let toCol=parseInt(target[1]);
   
   // checks
    if(fromRow==toRow&&fromCol==toCol){
        
        return false;
    }
    // horizontal move 
    if (fromRow == toRow && toCol>=0) {
        let iter;
        //right\
        
        for(iter=fromCol+1;iter<=toCol;iter++){
            element=document.getElementById("row"+fromRow+"col"+iter)
            if(element.innerHTML!=""){
                
                break;
              
            }
        }
        if(element.innerHTML==""){
            if (fromCol < toCol) {
                // Move right
              
               return true;
            }
        }
        
        
        //left
        for(iter=fromCol-1;iter>=toCol;iter--){
            element=document.getElementById("row"+fromRow+"col"+iter)
            if(element.innerHTML!=""){
                break; 
            }
        }
        if(element.innerHTML==""){
            if (fromCol > toCol) {
                // Move left
                return true;
            }
        }
        
       
    } else if (fromCol == toCol && toRow>0) {
        let iter;
        // Vertical move
        //up
        for(iter=fromRow+1;iter<=toRow;iter++){
            element=document.getElementById("row"+iter+"col"+fromCol)
            if(element.innerHTML!=""){
                break;
            }
        }
        if(element.innerHTML==""){
            if (fromRow < toRow) {
                // Move up 
               return true;
            }    
        }
        
        
        //down
        for(iter=fromRow-1;iter>=toRow;iter--){
            element=document.getElementById("row"+iter+"col"+fromCol)
            if(element.innerHTML!=""){
                break;
            }
        }
        
        if(element.innerHTML==""){
            if (fromRow > toRow) {
                // Move down
               return true;
            }  
        }
       

        
    } 
     
    return false;
    
   


}


// rook 
function rookRemovePossible(fromRow,fromCol){
    let horizontal;
    let vertical;
    let backgroundColor;


     // vertical
     // down
     for(let iter=fromRow-1;iter>0;iter--){
      

        vertical=document.getElementById("row"+iter+"col"+fromCol);
        if(vertical.innerText!=""){
             break;
        }
        if(iter<fromRow){
            backgroundColor= vertical.getAttribute("data-color");
            vertical.style.backgroundColor=backgroundColor;
         } 
     }
     //up
     for(let iter=fromRow;iter<8;iter++){
         vertical=document.getElementById("row"+(iter+1)+"col"+fromCol);
         if(vertical.innerText!=""){
             break;
         }
         
         if(iter+1<9){
            
            backgroundColor= vertical.getAttribute("data-color");
            vertical.style.backgroundColor=backgroundColor;
         }
   
     }
 
 
     // horizontal
     // left
     for(let iter=fromCol-1;iter>=0;iter--){
         horizontal=document.getElementById("row"+fromRow+"col"+iter);
         if(horizontal.innerText!=""){
             break;
         }
         if(iter<fromCol){
             
            
            backgroundColor=horizontal.getAttribute("data-color");
            horizontal.style.backgroundColor=backgroundColor;
         }
     }
     // right
     for(let iter=fromCol+1;iter<8;iter++){
         horizontal=document.getElementById("row"+fromRow+"col"+iter);
         if(horizontal.innerText!=""){
             break;
         }
         if(iter<8){
             
            backgroundColor=horizontal.getAttribute("data-color");
            horizontal.style.backgroundColor=backgroundColor;
         }
     }
     
}  


// rook
function rookPossibleMove(){
        
    let backgroundColor;
    let currentElement=document.getElementById("row"+fromRow+"col"+fromCol);
    let background=currentElement.style.backgroundColor;
    let horizontal;
    let vertical;
    
    // vertical
     // down
    for(let iter=fromRow-1;iter>0;iter--){
       vertical=document.getElementById("row"+iter+"col"+fromCol);
       if(vertical.innerText!=""){
            break;
       }
       if(iter<fromRow){   
            backgroundColor=vertical.style.backgroundColor;
            highlight(vertical,backgroundColor);
        } 
    }
    //up
    for(let iter=fromRow;iter<8;iter++){
        vertical=document.getElementById("row"+(iter+1)+"col"+fromCol);
        if(vertical.innerText!=""){
            break;
        }
        if(iter+1<9){
            backgroundColor=vertical.style.backgroundColor;
            highlight(vertical,backgroundColor);
        }
  
    }


    // horizontal
    // left
    for(let iter=fromCol-1;iter>=0;iter--){
        horizontal=document.getElementById("row"+fromRow+"col"+iter);
        if(horizontal.innerText!=""){
            break;
        }
        if(iter<fromCol){
            backgroundColor=horizontal.style.backgroundColor; 
            highlight(horizontal,backgroundColor);
        }
    }
    // right
    for(let iter=fromCol+1;iter<8;iter++){
        horizontal=document.getElementById("row"+fromRow+"col"+iter);
        if(horizontal.innerText!=""){
            break;
        }
        if(iter<8){
            backgroundColor=horizontal.style.backgroundColor;
            highlight(horizontal,backgroundColor);
        }
    }
    currentElement.style.backgroundColor=background;
}


//bishop
function  bishopValidCheck(target){
    let rowDirection;
    let colDirection;
    let row;
    let col;
    let element;
    let targetRow=parseInt(target[0]);
    let targetCol=parseInt(target[1]);
  

    if (targetRow < 1 || targetRow > 8 || targetCol < 0 || targetCol >= 8) {
       
        return false;
    }

// same position 
    if (targetRow === fromRow && targetCol === fromCol) {
        
        return false;
    }
    //digonal points filter
    if(Math.abs(targetRow-fromRow)!=Math.abs(targetCol-fromCol)){
        
        return false;
    }

  // find which direction target points have
    if(targetRow>fromRow){
        rowDirection=1;
    }
    else{
        rowDirection=-1;
    }
    if(targetCol>fromCol){
        colDirection=1;
    }
    else{
        colDirection=-1;
    }
    row=fromRow+rowDirection;
    col=fromCol+colDirection;
    // target direction iteration
    while(row!=targetRow && col!=targetCol){
        element=document.getElementById("row"+row+"col"+col);
        if(element.innerText!=""){
            
            return false;
        }
        row+=rowDirection;
        col+=colDirection;
    }
    element=document.getElementById("row"+row+"col"+col);
    if(element.innerText!=""){
       
        return false;
    }
    
    return true;



}

// bishop
function bishopRemovePossible(fromRow,fromCol){
 
    let backgroundColor;
    let elementId;
    let hoverRemoveElement;
    
    for(let position=1;position<8;position++){
        // x and y positive
        if(fromRow+position<9 && fromCol+position<8){                    // 9-->row positive so row ceil value below  and 8--> col positive so col ceil value below
            elementId="row"+(fromRow+position)+"col"+(fromCol+position);
            hoverRemoveElement=document.getElementById(elementId);
            if(hoverRemoveElement.innerText!=""){           // coin not have definately that element have ""
                break;
            }
            backgroundColor=hoverRemoveElement.getAttribute('data-color');
            hoverRemoveElement.style.backgroundColor=backgroundColor;
        }else{
            break;
        }
    }
       // x positive y negative

    for(let position=1;position<8;position++){
        if(fromRow-position>0 && fromCol+position<8 ){                   // 0-->row negative so row floor value above  and  8-->col positive so col ceil value below
            elementId="row"+(fromRow-position)+"col"+(fromCol+position);
            hoverRemoveElement=document.getElementById(elementId);
            if(hoverRemoveElement.innerText!=""){           // coin not have definately that element have ""
                break;
            }
            backgroundColor=hoverRemoveElement.getAttribute('data-color');
            hoverRemoveElement.style.backgroundColor=backgroundColor;
          }
          else{
            break;
          }
    }
      // x negative y positive

      for(let position=1;position<8;position++){
        if(fromRow+position<9 && fromCol-position>=0){                  // 9-->row positive so row ceil value below  and 0--> col negative so col floor value equal to above
            elementId="row"+(fromRow+position)+"col"+(fromCol-position);
            hoverRemoveElement=document.getElementById(elementId);
            if(hoverRemoveElement.innerText!=""){           // coin not have definately that element have ""
                break;
            }
            backgroundColor=hoverRemoveElement.getAttribute('data-color');
            hoverRemoveElement.style.backgroundColor=backgroundColor;
          }
          else{
            break;
          }
        }
      // x and y negative 
      for(let position=1;position<8;position++){
     
        if(fromRow-position>0  && fromCol-position>=0){                 // 0-->row negative so row floor value above  and 0--> col negative so col floor value equal to above
            elementId="row"+(fromRow-position)+"col"+(fromCol-position);
            hoverRemoveElement=document.getElementById(elementId);
            if(hoverRemoveElement.innerText!=""){           // coin not have definately that element have ""
                break;
            }
            backgroundColor=hoverRemoveElement.getAttribute('data-color');
            hoverRemoveElement.style.backgroundColor=backgroundColor;
          } 
          else{
            break;
          }
      }
    ///
}


// 
function bishopPossibleMove(){
   
    let backgroundColor;
    let elementId;
    let hoverElement;
    let currentElement=document.getElementById("row"+fromRow+"col"+fromCol);
    let background=currentElement.style.backgroundColor;
   
    // x nad y positive
    for(let position=1;position<8;position++){
        
        if(fromRow+position<9 && fromCol+position<8){               // 9-->row positive so row ceil value below  and 8--> col positive so col ceil value below
            elementId="row"+(fromRow+position)+"col"+(fromCol+position)
            hoverElement=document.getElementById(elementId);
            if(hoverElement.innerText!=""){
                break;
            }
            backgroundColor=hoverElement.style.backgroundColor;
            highlight(hoverElement,backgroundColor);
        }else{
            break
        }
    }
    // x positive y negative
   
    for(let position=1;position<8;position++){
       
        if(fromRow-position>0 && fromCol+position<8 ){                  // 0-->row negative so row floor value above  and  8-->col positive so col ceil value below
            elementId="row"+(fromRow-position)+"col"+(fromCol+position);
            hoverElement=document.getElementById(elementId);
            if(hoverElement.innerText!=""){
                break;
            }
            backgroundColor=hoverElement.style.backgroundColor;
            highlight(hoverElement,backgroundColor);
        }
        else{
            break;
        }
    }
    // x negative y positive
   
    for(let position=1;position<8;position++){ 
       
        if(fromRow+position<9 && fromCol-position>=0 ){                 // 9-->row positive so row ceil value below  and 0--> col negative so col floor value equal to above
            elementId="row"+(fromRow+position)+"col"+(fromCol-position);
            hoverElement=document.getElementById(elementId);
            if(hoverElement.innerText!=""){
                break;
            }
            backgroundColor=hoverElement.style.backgroundColor;
            highlight(hoverElement,backgroundColor);
        }
        else{
            break;
        }
    }
    // x and y negative 
   
    for(let position=1;position<8;position++){  
        
        if(fromRow-position>0  && fromCol-position>=0){                 // 0-->row negative so row floor value above  and 0--> col negative so col floor value equal to above
            elementId="row"+(fromRow-position)+"col"+(fromCol-position);
            hoverElement=document.getElementById(elementId);
            if(hoverElement.innerText!=""){
                break;
            }
            backgroundColor=hoverElement.style.backgroundColor;
            highlight(hoverElement,backgroundColor);
           
        }
        else{
           
            break;
        }
    }
    
    currentElement.style.backgroundColor=background;
}








/// knight 

// valid 

//knitht valid check
function  knightValidCheck(target){
    let element;
    let rowValue;
    let colValue;
    let targetRow=parseInt(target[0]);
    let targetCol=parseInt(target[1]);
 
    rowValue=fromRow-targetRow;     // it's get 1 or 2 and 1->1,-1 and 2->2,-2 
    colValue=fromCol-targetCol;         // it's also get 1 or 2 and 1->1,-1 and 2->2,-2 
    rowValue=Math.abs(rowValue);        //so -1 or -2 abs we get 1 or 2;
    colValue=Math.abs(colValue);        //so -1 or -2 abs we get 1 or 2;

    // note:  if rowValue=2 defnitely rowCol=1 so add two values we get 3
    // either if colValue=2 defnitely rowValue=1 so add two values we get 3  
    if(rowValue+colValue==3){
        element=document.getElementById("row"+targetRow+"col"+targetCol);
        if(element.innerText!=""){
            return false;
           
        }else{
           return true;
        }
    }
    else{
       return false;
    }

}




// knight possible moves;
function knightPossibleMove(){
    let twoStep=[2,2,-2,-2];
    let oneStep=[-1,1,-1,1];
    let possibleRow;
    let possibleCol;
    let highlightElement;
    let elementId;
    for(let index=0;index<4;index++){
         // right side and left side
        possibleRow=fromRow+twoStep[index];
        possibleCol=fromCol+oneStep[index];
        if(fromRow+twoStep[index]<9 &&fromCol+oneStep[index]<8){

            if(fromRow+twoStep[index]>0 &&fromCol+oneStep[index]>=0){

                elementId="row"+possibleRow+"col"+possibleCol;
                highlightElement=document.getElementById(elementId);
                if(highlightElement.innerText==""){

                    backgroundColor=highlightElement.style.backgroundColor;
                    highlight(highlightElement,backgroundColor);
                }
               
            }
            
        }
         // up side and down side
        possibleRow=fromRow+oneStep[index];
        possibleCol=fromCol+twoStep[index];
        if(fromRow+oneStep[index]<9 &&fromCol+twoStep[index]<8){

            if(fromRow+oneStep[index]>0 &&fromCol+twoStep[index]>=0){

                elementId="row"+possibleRow+"col"+possibleCol;
                highlightElement=document.getElementById(elementId);
                if(highlightElement.innerText==""){

                    backgroundColor=highlightElement.style.backgroundColor;
                    highlight(highlightElement,backgroundColor);
                }
            }
            
        }
    }
    
}
// knight remove possible moves
function knightRemovePossible(fromRow,fromCol){
    

    let twoStep=[2,2,-2,-2];
    let oneStep=[-1,1,-1,1];
    let possibleRow;
    let possibleCol;
    let hoverRemoveElement;
    let elementId;
    for(let index=0;index<4;index++){
         // right side and left side
        possibleRow=fromRow+twoStep[index];
        possibleCol=fromCol+oneStep[index];
        if(fromRow+twoStep[index]<9 &&fromCol+oneStep[index]<8){

            if(fromRow+twoStep[index]>0 &&fromCol+oneStep[index]>=0){

                elementId="row"+possibleRow+"col"+possibleCol;
                hoverRemoveElement=document.getElementById(elementId);
                
                if(hoverRemoveElement.innerText==""){

                    backgroundColor=hoverRemoveElement.getAttribute('data-color');
                    hoverRemoveElement.style.backgroundColor=backgroundColor;
                }
               
            }
            
        }
          // up side and down side
        possibleRow=fromRow+oneStep[index];
        possibleCol=fromCol+twoStep[index];
        if(fromRow+oneStep[index]<9 &&fromCol+twoStep[index]<8){

            if(fromRow+oneStep[index]>0 &&fromCol+twoStep[index]>=0){

                elementId="row"+possibleRow+"col"+possibleCol;
                hoverRemoveElement=document.getElementById(elementId);
             
                if(hoverRemoveElement.innerText==""){

                    backgroundColor=hoverRemoveElement.getAttribute('data-color');
                    hoverRemoveElement.style.backgroundColor=backgroundColor;
                }
            }
            
        }
    }
    
}

// queen
//possible move
function queenPossibleMove(){
    rookPossibleMove();
    bishopPossibleMove();
}
// remove possible
function queenRemovePossible(fromRow,fromCol){
   
    rookRemovePossible(fromRow,fromCol);
    bishopRemovePossible(fromRow,fromCol);
   
}
// valid check
function queenValidCheck(target){
    
   
    if(rookValidCheck(target) || bishopValidCheck(target)){
        return true;
    }else{
        return false;
    }
   
}


/// king
// possible move
function kingPossibleMove(){
    let kingPossiblePosition=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    let newRow;
    let newCol;
    let elementId;
    let element;
    let backgroundColor;
    for(let iter=0;iter<8;iter++){
        newRow=fromRow+kingPossiblePosition[iter][0];
        newCol=fromCol+kingPossiblePosition[iter][1];
        if(newRow>0&&newRow<=8 && newCol>=0&&newCol<8){
            elementId="row"+newRow+"col"+newCol;
            element=document.getElementById(elementId);
            if(element.innerHTML==""){
                backgroundColor=element.style.backgroundColor;
                highlight(element,backgroundColor);
            }
        }
      

    }
}


// king remove possible
function kingRemovePossible(fromRow,fromCol){
    let kingPossiblePosition=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    let newRow;
    let newCol;
    let elementId;
    let element;
    let backgroundColor;
    for(let iter=0;iter<8;iter++){
        newRow=fromRow+kingPossiblePosition[iter][0];
        newCol=fromCol+kingPossiblePosition[iter][1];
        if(newRow>0&&newRow<=8 && newCol>=0&&newCol<8){
            elementId="row"+newRow+"col"+newCol;
            element=document.getElementById(elementId);
            if(element.innerHTML==""){
                backgroundColor=element.getAttribute('data-color')
                element.style.backgroundColor=backgroundColor;
            }
        }
      

    }
}


// king Valid Check
function kingValidCheck(target){
    // code here  
    let targetRow=parseInt(target[0]);
    let targetCol=parseInt(target[1]); 
    let row;
    let col;
    row=Math.abs(fromRow-targetRow);
    col=Math.abs(fromCol-targetCol);
    // up, down, right, left, 
    if(row+col==1){
        return true;
    }
    // up right, up left, down right, down left
    if(row+col==2){
        return true;
    }
    // one case not handle 
    return false;
}

// pawn
// pawn possible moves
function pawnPossibleMove(){
    let elementId;
    let element;
    let backgroundColor;
    let direction=1;
    if(fromRow==2){
        elementId="row"+(fromRow+direction+1)+"col"+fromCol;
        element=document.getElementById(elementId);
        if(element.innerHTML==""){
            backgroundColor=element.style.backgroundColor;
            highlight(element,backgroundColor);
        }
    }
    if(fromRow+direction<9){
        elementId="row"+(fromRow+direction)+"col"+fromCol;
        element=document.getElementById(elementId);
        if(element.innerHTML==""){
            backgroundColor=element.style.backgroundColor;
            highlight(element,backgroundColor);
        }
    }

    // one case not handle opponent coin cross
}
//pawn remove Possible
function pawnRemovePossible(){
    let elementId;
    let element;
    let backgroundColor;
    let direction=1;
    if(fromRow==2){
        elementId="row"+(fromRow+direction+1)+"col"+fromCol;
        element=document.getElementById(elementId);
        if(element.innerHTML==""){
            backgroundColor=element.getAttribute('data-color')
            element.style.backgroundColor=backgroundColor;
        }
    }
    if(fromRow+direction<9){
        elementId="row"+(fromRow+direction)+"col"+fromCol;
        element=document.getElementById(elementId);
        if(element.innerHTML==""){
            backgroundColor=element.getAttribute('data-color')
            element.style.backgroundColor=backgroundColor;
        }
    }
    // one case not handle opponent coin cross
}
// valid check
function pawnValidCheck(target){
    let targetRow=parseInt(target[0]);
    let targetCol=parseInt(target[1]); 
  
    // first step
    if(fromRow+2==targetRow && fromCol==targetCol && fromRow==2){
        return true;
    }
    // normal moves 
    if(fromRow+1==targetRow && fromCol==targetCol){
        return true;
    }
    // one case not handle opponent coin cross
    return false;
}

/// valid check manipulation function
function validCheck(prevRow,prevCol,targetRow,targetCol){ 
    
    if(currentCoin=="R"){
        
        if(rookValidCheck([targetRow,targetCol])){
            dragElement([targetRow,targetCol],"R",[prevRow,prevCol]);
        }else{
            alert("target position wrong");
        }
    }else if(currentCoin=="B"){
        
        
        if(bishopValidCheck([targetRow,targetCol])){
            dragElement([targetRow,targetCol],"B",[prevRow,prevCol]);
        }else{
            alert("target position wrong");
        }
    }
    else if(currentCoin=="Q"){
        
        if(queenValidCheck([targetRow,targetCol])){
            dragElement([targetRow,targetCol],"Q",[prevRow,prevCol]);
        }else{
            alert("target position wrong");
        }
        
    }
    else if(currentCoin=="K"){
        
        if(kingValidCheck([targetRow,targetCol])){
            dragElement([targetRow,targetCol],"K",[prevRow,prevCol]);
        }else{
            alert("target position wrong");
        }
    }
    else if(currentCoin=="P"){
        
        if(pawnValidCheck([targetRow,targetCol])){
            dragElement([targetRow,targetCol],"P",[prevRow,prevCol]);
        }
        else{
            alert("target position wrong");
        }
    }
    else{
        
        if(knightValidCheck([targetRow,targetCol])){
            dragElement([targetRow,targetCol],"N",[prevRow,prevCol]);
        }else{
            alert("target position wrong");
        }
       
    }
}




// onclick 
function onClick(element){
    
    if(prevCoin!=""){
        
        removePossible(prevCoin,prevRow,prevCol);
    }
    if(this.innerHTML=="" && prevCoin!=""){ // this call valid check
      
        validCheck(prevRow,prevCol,this.getAttribute("data-row"),this.getAttribute("data-col"));
    }
    prevCoin=this.innerHTML;// prev ->we check previously
    prevRow=this.getAttribute("data-row");
    prevCol=this.getAttribute("data-col");
    if(this.innerHTML!=""){
        possibleMove(prevCoin,prevRow,prevCol);
    }
}
