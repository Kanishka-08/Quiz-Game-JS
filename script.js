const questions=[
    {
        question: "which is largest animal in world?",
        answers: [
            {text:"Shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },

    {
        question: "which is the smallest country in the world?",
        answers: [
            {text:"Vatican City",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"Shri Lanka",correct:false},
        ]
    },

    {
        question: "which is the smallest continent in the world?",
        answers: [
            {text:" Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Arctic",correct:false},
            {text:"Africa",correct:false},
        ]
    },

    {
        question: "which is the largest desert in the world?",
        answers: [
            {text:" Kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Sahara",correct:false},
            {text:"Antarctica",correct:true},
        ]
    }

    

];

const questionelement=document.getElementById("question");
const answerbuttons=document.getElementById("answer-buttons")
const nextbutton=document.getElementById("next-button");


let currentquestionindex=0;
let score=0;

function startquiz(){
    currentquestionindex=0;
    score=0;
    nextbutton.innerHTML="Next";
    showquestion();
}

function showquestion(){
    resetstate();
    let currentquestion=questions[currentquestionindex];
    let questionNo=currentquestionindex+1;
    questionelement.innerHTML=questionNo+". "+currentquestion.question;

    currentquestion.answers.forEach(answer=>{
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    });
}

function resetstate(){
    nextbutton.style.display="none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn=e.target;
    const iscorrect=selectedbtn.dataset.correct === "true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextbutton.style.display="block";
}

function showscore(){
    resetstate();
    questionelement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextbutton.innerHTML="Play Again";
    nextbutton.style.display="block";
}

nextbutton.addEventListener("click",()=>{
    if(currentquestionindex<questions.length){
        handlenextbutton();
    }
    else{
        startquiz();
    }
});

function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex<questions.length){
        showquestion();
    }else{
        showscore();
    }
}


startquiz();
