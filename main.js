// Select Elements
let qustionsCount = document.querySelector(".container .count");
let bullets = document.querySelector(".container .bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submetRequest = document.querySelector(".btn");
let result = document.querySelector(".result");
let spanres = document.querySelector(".result span");
let spanCount = document.querySelector(".result .res-count");


let currentIndex = 0;
let rightAnswer = 0;
function getQuestions() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            
            let qustionsObject = JSON.parse(this.responseText);
            let qCount = qustionsObject.length;


            // Append Questions Count To qustionsCount
            qustionsCount.append(qCount);

            // Create Spans Same As The qustionsCount
            for (let i =0;i<qustionsObject.length;i++) {
                let span = document.createElement("span");
                if (i === 0 ) {
                    span.className ='on';
                }
                bullets.appendChild(span);
            }

            // Add Question Data
            addQuestionData(qustionsObject[currentIndex], qCount);


            //click on submit
            submetRequest.onclick = () => {

                //get Right Answer
                let theRightAnswer = qustionsObject[currentIndex].right_answer;
                
                ///Increatse Index 
                currentIndex++;

                //check answer 
                chckAnswer(theRightAnswer, qCount);
                quizArea.innerHTML = '';
                answerArea.innerHTML = '';

                // Add Question Data
            addQuestionData(qustionsObject[currentIndex], qCount);

            //Handle Bullets Class
            handelBullets();
            // <span class="perfect">Perfect</span> You Answerd <span class="res-count"></span> From 5
            if (currentIndex == 4) {

                submetRequest.classList.add("stop-click");

                if (rightAnswer === 4) {
                    spanres.innerHTML="Perfect";
                    spanres.className="perfect";
                    spanCount.innerHTML=`${rightAnswer+1}`;
                }else if (rightAnswer >=2 && rightAnswer <4 ) {
                    spanres.innerHTML="Good";
                    spanres.className="good";
                    spanCount.innerHTML=`${rightAnswer+1}`;
                }else {
                    spanres.innerHTML="Bad";
                    spanres.className="bad";
                    spanCount.innerHTML=`${rightAnswer+1}`;
                }
                result.style.display = "block"
                
            }
            }
        }
    }
    myRequest.open("get", "qustions.json", true);
    myRequest.send()
}

getQuestions()

function addQuestionData(obj,count) {
    let qustiontitle= document.createElement("h3");
    //Add Title To H3

    qustiontitle.style.color="#0075ff";
    qustiontitle.textContent=obj['title'];

    quizArea.appendChild(qustiontitle);
    

    //Add Answers
    for (let i =1 ; i <= 4;i++) {
        //create Main Div
        let mainDiv = document.createElement("div");
        //Add class to main div
        mainDiv.className='answer';

        //create radio input
        let inputRad = document.createElement("input");
        // Add Type + name + id + Data-attribute
        inputRad.name="qustion";
        inputRad.type="radio";
        inputRad.id=`answer_${i}`;
        inputRad.dataset.answer = obj[`answer_${i}`];


        // Make First Radio Checked
        if (i === 1) {
            inputRad.checked=true;
        }

        // Create Lable
        let theLable = document.createElement("label");
        
        //Add For Attribute
        theLable.htmlFor = `answer_${i}`
        
        //create Text lable
        let theLableText =document.createTextNode(obj[`answer_${i}`]);
        
        //Add Text to the lable
        theLable.appendChild(theLableText);

        //add input + lable to main Div
        mainDiv.appendChild(inputRad);
        mainDiv.appendChild(theLable);

        //add Main Div to answer Area
        answerArea.appendChild(mainDiv);
    }
}

function chckAnswer(ranswer, count) {
    let answers = document.getElementsByName("qustion");
    let thechoosenAnswer;
    for (let i =0 ;i< answers.length;i++) {
        if (answers[i].checked) {
            thechoosenAnswer = answers[i].dataset.answer;
        }
    }
    if (ranswer === thechoosenAnswer) {
        rightAnswer++;
        
    }
}

function handelBullets() {
    let bulletsSpans = document.querySelectorAll(".container .bullets .spans span");
    let arrayofspans = Array.from(bulletsSpans);
    arrayofspans.forEach((span , index) => {
        if (currentIndex === index) {
            span.className= 'on';
        }
    });
}

