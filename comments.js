// Create web server using express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Importing routes
const commentsRoutes = require('./routes/comments');

// Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup routes
app.use('/comments', commentsRoutes);

// Setup server port
app.listen(3000, () => {
    console.log('Server is up and running on port number 3000');
});

// Path: routes/comments.js
// Create router for comments
const express = require('express');
const router = express.Router();

// Importing controller
const commentsController = require('../controllers/comments');

// Setup router for each path
router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getCommentById);
router.post('/', commentsController.createComment);
router.put('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);

// Export router to use in app.js
module.exports = router;

// Path: controllers/comments.js
// Importing model
const Comment = require('../models/comment');

// Get all comments
exports.getAllComments = (req, res) => {
    Comment.find((err, comments) => {
        if (err) {
            return res.json({
                error: err
            });
        }
        return res.json({
            comments: comments
        });
    });
}

// Get comment by id
exports.getCommentById = (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            return res.json({
                error: err
            });
        }
        return res.json({
            comment: comment
        });
    });
}

// Create new comment
exports.createComment = (req, res) => {
    let comment = new Comment({
        name: req.body.name,
        content: req.body.content
    });

    comment.save((err) => {
        if (err) {
            return res.json({
                error: err
            });
        }
        return res.json({
            message: 'Comment created successfully'
        });
    });
}

// Update comment
exports.updateComment = (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (err, comment) => {
        if (err) {
            return res.json({
                error: err
            });
        }
