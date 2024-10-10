const uuid = require('uuid').v4;

const StatType = [
    "Perception et gestion des émotions",
    "Interaction sociale et communication",
    "Sensibilité sensorielle et besoin de réconfort",
    "Flexibilité cognitive et adaptation aux changements",
    "Centres d'intérêt spécifiques et intensité"
];
class User {
    constructor(id=null) { 
        this.id = id || uuid();
    }
}

class Session {
    constructor(user) {
        this.user = user;
        this.current_question = 0;
        this.question_history = [];
        this.stats = new Stats();
    }

    formatToGraph() {
        const data = {
            labels: StatType,
            datasets: [
                {
                    label: "Résultats",
                    backgroundColor: "rgba(50, 150, 132, 0.75)",
                    fill: true,
                    data: [
                        this.stats.get_total_by_type(StatType[0]),
                        this.stats.get_total_by_type(StatType[1]),
                        this.stats.get_total_by_type(StatType[2]),
                        this.stats.get_total_by_type(StatType[3]),
                        this.stats.get_total_by_type(StatType[4]),
                    ],
                    borderColor: "#73fa79",
                    pointRadius: "5",
                    lineTension: 0,
                    pointBackgroundColor: "#008f00",
                    pointBorderColor: "#73fa79",
                    pointBorderWidth: 2,
                },
            ],
        }

        return {
            data: data,
            total: this.stats.get_total(),
        }

    }
}

class Stats {
    constructor() {
        this.stats = {};
    }

    get_total() {
        return Object.values(this.stats).flat().reduce((acc, operation) => {
            if (!(operation instanceof Operation)) {
                console.error("Expected an instance of Operation but got:", operation);
                return acc;
            }
            return acc + operation.value;
        }, 0);
    }

    get_total_by_type(type) {
        return Object.values(this.stats).flat().reduce((acc, operation) => {
            if (operation.type === type) return acc + operation.value;
            return acc;
        }, 0);
    }

    add_stat(questionIndex, type, value) {
        if (!this.stats[questionIndex]) this.stats[questionIndex] = [];
        this.stats[questionIndex].push(new Operation(type, value));
    }

    remove_stat(questionIndex) {
        if (!this.stats[questionIndex]) return;
        this.stats[questionIndex].pop();
    }
}

class Question {
    constructor(question, answers, info=null) {
        this.question = question;
        this.answers = answers;
        this.info = info;
    }
}

class Answer {
    constructor(answer, operations) {
        this.answer = answer;
        this.operations = operations;
    }
}

class Operation {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

function parseQuestionsToObjects(questions) {
    return questions.map((question) => {
        const answers = Object.entries(question.answers).map(([score, operations]) => {
            let _operations = [];
            if (operations) {
                _operations = operations.map((operation) => {
                    return new Operation(operation.stat, operation.operation);
                });
            }
            return new Answer(score, _operations);
        });
        return new Question(question.question, answers, question.info);
    });
}

exports.User = User;
exports.Session = Session;
exports.Stats = Stats;
exports.Question = Question;
exports.Answer = Answer;
exports.parseQuestionsToObjects = parseQuestionsToObjects;