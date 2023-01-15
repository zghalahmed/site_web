//
// lib/lib.js
//
var Question = function (questionObj) {
    this.value = {
      text: "Question",
      answers: []
    };
  
    this.selectedAnswer = null;
    this.html = null;
    this.questionText = null;
    this.questionAnswers = null;
    this.questionFeedback = null;
  
    this.value = Object.assign(this.value, questionObj);
  
    this.onQuestionAnswered = ({ detail }) => {
      this.selectedAnswer = {
        value: detail.answer,
        html: detail.answerHtml
      };
      this.update();
  
      document.dispatchEvent(
        new CustomEvent("question-answered", {
          detail: {
            question: this,
            answer: detail.answer
          }
        })
      );
    };
  
    this.create = function () {
      this.html = document.createElement("div");
      this.html.classList.add("question");
  
      this.questionText = document.createElement("h2");
      this.questionText.textContent = this.value.text;
  
      this.questionAnswers = document.createElement("div");
      this.questionAnswers.classList.add("answers");
  
      for (let i = 0; i < this.value.answers.length; i++) {
        const ansObj = this.value.answers[i];
        let answer = createAnswer(ansObj);
  
        answer.onclick = (ev) => {
          if (this.selectedAnswer !== null) {
            this.selectedAnswer.html.classList.remove("selected");
          }
  
          answer.classList.add("selected");
  
          this.html.dispatchEvent(
            new CustomEvent("question-answered", {
              detail: {
                answer: ansObj,
                answerHtml: answer
              }
            })
          );
        };
  
        this.questionAnswers.appendChild(answer);
      }
  
      this.questionFeedback = document.createElement("div");
      this.questionFeedback.classList.add("question-feedback");
  
      this.html.appendChild(this.questionText);
      this.html.appendChild(this.questionAnswers);
      this.html.appendChild(this.questionFeedback);
  
      this.html.addEventListener("question-answered", this.onQuestionAnswered);
  
      return this.html;
    };
  
    this.disable = function () {
      this.html.classList.add("disabled");
      this.html.onclick = (ev) => {
        ev.stopPropagation();
      };
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      let answers = this.html.querySelectorAll(".answer");
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        answer.onclick = null;
      }
    };
  
    this.remove = function () {
      let children = this.html.querySelectorAll("*");
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        this.html.removeChild(child);
      }
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      this.html.parentNode.removeChild(this.html);
      this.html = null;
    };
  
    this.update = function () {
      let correctFeedback, incorrectFeedback;
      this.html = this.html || document.createElement("div");
  
      correctFeedback = "Nice! You got it right.";
      incorrectFeedback = "Oh! Not the correct answer.";
  
      if (this.selectedAnswer !== null) {
        if (this.selectedAnswer.value.isCorrect) {
          this.html.classList.add("correct");
          this.html.classList.remove("incorrect");
          this.questionFeedback.innerHTML = correctFeedback;
        } else {
          this.html.classList.add("incorrect");
          this.html.classList.remove("correct");
          this.questionFeedback.innerHTML = incorrectFeedback;
        }
      }
    };
  
    function createAnswer(obj) {
      this.value = {
        text: "Answer",
        isCorrect: false
      };
  
      this.value = Object.assign(this.value, obj);
  
      this.html = document.createElement("button");
      this.html.classList.add("answer");
  
      this.html.textContent = this.value.text;
  
      return this.html;
    }
  };
  
  //
  // main.js
  //
  
  let questionsData = [
    {
      text: "Ouvrez l’abréviation HTML",
      answers: [
        {
          text: "Hyper Text Modul Language",
          isCorrect: false
        },
        {
          text: "Hyper Text Markup Language",
          isCorrect: false
        },
        {
          text: "Hyperlink Markup Language",
          isCorrect: true
        }
      ]
    },
    {
        text: "Laquelle des balises de tableau suivantes est utilisée pour créer une cellule de données de tableau",
        answers: [
          {
            text: "<td>",
            isCorrect: false
          },
          {
            text: "<tr>",
            isCorrect: true
          },
          {
            text: "<th>",
            isCorrect: false
          }
        ]
      },
    {
        text: "Lequel des éléments suivants est un exemple d’un élément vide ",
        answers: [
          {
            text: "<img />",
            isCorrect: true
          },
          {
            text: "</ img>",
            isCorrect: false
          },
          {
            text: "<img> </img>",
            isCorrect: false
          }
        ]
      },
    {
        text: "On utilise la balise <br> pour",
        answers: [
          {
            text: "un espace",
            isCorrect: false
          },
          {
            text: "un saut de ligne",
            isCorrect: true
          },
          {
            text: "un saut de paragraphe",
            isCorrect: false
          }
        ]
      },
    {
        text: "Lorsque nous devons créer une liste non ordonnée, quel balisage nous devons utiliser",
        answers: [
          {
            text: "<ul>",
            isCorrect: false
          },
          {
            text: "<ol>",
            isCorrect: true
          },
          {
            text: "<li>",
            isCorrect: false
          }
        ]
      },
    {
        text: "Qui n'est pas un attribut HTML",
        answers: [
          {
            text: "target",
            isCorrect: false
          },
          {
            text: "alt",
            isCorrect: false
          },
          {
            text: "fontSize",
            isCorrect: true
          }
          
        ]
      },
    {
      text: "Quel est l’élément HTML pour afficher une image      ",
      answers: [
        {
          text: "<img>",
          isCorrect: true
        },
        {
          text: "<picture>",
          isCorrect: false
        },
        {
          text: "<image>",
          isCorrect: false
        },
        {
          text: "<pic>",
          isCorrect: false
        }
      ]
    },
    {
      text: "Comment écrire un commentaire HTML",
      answers: [
        {
          text: "// Ceci est un commentaire HTML",
          isCorrect: true
        },
        {
          text: '/* This is HTML comment */"',
          isCorrect: false
        },
        {
          text: "<!-- This is HTML comment -->",
          isCorrect: false
        }
      ]
    },
    {
      text: "Comment pouvez-vous mettre un texte en italique",
      answers: [
        {
          text: "<em>Quelque texte.</em>",
          isCorrect: false
        },
        {
          text: "<italic>Quelque texte.</italic>",
          isCorrect: false
        },
        {
          text: "<i>Quelque texte.</i>",
          isCorrect: false
        },
        {
          text: "<strong>Quelque texte.</strong>",
          isCorrect: true
        }
      ]
    },
    {
      text: "Quelle est la balise HTML correcte pour un nouveau paragraphe",
      answers: [
        {
          text: "<p>",
          isCorrect: true
        },
        {
          text: "<pre>",
          isCorrect: false
        },
        {
          text: "<paragraph>",
          isCorrect: false
        },
        {
          text: "<pr>",
          isCorrect: false
        }
      ]
    }
    
  ];
  
  // variables initialization
  let questions = [];
  let score = 0,
    answeredQuestions = 0;
  let appContainer = document.getElementById("questions-container");
  let scoreContainer = document.getElementById("score-container");
  scoreContainer.innerHTML = `Score: ${score}/${questionsData.length}`;
  
  /**
   * Shuffles array in place. ES6 version
   * @param {Array} arr items An array containing the items.
   */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  shuffle(questionsData);
  
  // creating questions
  for (var i = 0; i < questionsData.length; i++) {
    let question = new Question({
      text: questionsData[i].text,
      answers: questionsData[i].answers
    });
  
    appContainer.appendChild(question.create());
    questions.push(question);
  }
  
  document.addEventListener("question-answered", ({ detail }) => {
    if (detail.answer.isCorrect) {
      score++;
    }
  
    answeredQuestions++;
    scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;
    detail.question.disable();
  
    if (answeredQuestions == questions.length) {
      setTimeout(function () {
        alert(`Quiz completed! \nFinal score: ${score}/${questions.length}`);
      }, 100);
    }
  });
  
  console.log(questions, questionsData);
  