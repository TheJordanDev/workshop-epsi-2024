const uuid = require('uuid').v4;

const StatType = [
    "",
    "",
    ""
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
}

class Stats {
    constructor() {
        this.stats = {};
    }

    add_stat(stat, value) {
        if (!this.stats[stat]) this.stats[stat] = 0;
        this.stats[stat] += value;
    }
}

class Question {
    constructor(question, answers) {
        this.question = question;
        this.answers = answers;
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
            return new Answer(score, operations);
        });
        return new Question(question.question, answers);
    });
}

exports.User = User;
exports.Session = Session;
exports.Stats = Stats;
exports.Question = Question;
exports.Answer = Answer;
exports.parseQuestionsToObjects = parseQuestionsToObjects;