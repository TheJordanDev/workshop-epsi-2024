const {User, Session, parseQuestionsToObjects} = require("./types");

const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors({
    origin: "*",
}));
app.use(express.json());
const server = http.createServer(app);

const users = [];
const sessions = [];
const questions = parseQuestionsToObjects(require("./questions.json"));

function get_user(id) {
    return users.find((user) => user.id == id);
}

function get_session(user_id) {
    return sessions[user_id];
}

app.post("/make_session", (req, res) => {
    const userId = req.headers.authorization;
    if (get_user(userId)) return res.json({ id: userId });
    const user = new User(req.headers.authorization);
    users.push(user);
    sessions[user.id] = new Session(user);
    res.json({ id: user.id });
});

app.post("/back", (req, res) => {

    if (!req.headers.authorization) return res.status(401).json({ error: "Unauthorized" });
    
    const user = get_user(req.headers.authorization);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const session = get_session(user.id);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    if (session.current_question == 0) return res.status(401).json({ error: "Unauthorized" });

    session.stats.remove_stat(session.current_question);
    session.current_question--;
    const question = questions[session.current_question];
    res.json({
        "total": questions.length,
        "current": session.current_question,
        "question": question.question,
    });
});

app.get("/questions", (req, res) => {
    if (!req.headers.authorization) return res.status(401).json({ error: "Unauthorized" });
    
    const user = get_user(req.headers.authorization);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    res.json(questions);
});

app.post("/answer", (req, res) => {
    if (!req.headers.authorization) return res.status(401).json({ error: "Unauthorized" });
    
    const user = get_user(req.headers.authorization);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const session = get_session(user.id);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    if (req.body?.answer) {
        const question = questions[session.current_question];
        const answer = question.answers.find((answer) => answer.answer == req.body.answer);
        if (answer) {
            answer.operations.forEach((operation) => {
                session.stats.add_stat(session.current_question, operation.type, operation.value);
            });
        }

        session.question_history.push(question);
        session.current_question++;
    }

    if (session.current_question >= questions.length) 
        return res.json({ result: true, session: session.formatToGraph() });

    const newQuestion = questions[session.current_question];
    res.json({
        "total": questions.length,
        "current": session.current_question,
        "question": newQuestion.question,
        "info": newQuestion.info,
    });
});

const PORT = process.env.PORT || 3949;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
