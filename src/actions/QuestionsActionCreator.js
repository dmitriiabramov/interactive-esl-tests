var QuestionsActionCreator = {
    initialize: function() {
        QuestionsService.getQuestions(function(data) {
            console.log(data.questions);
            Dispatcher.handleServerAction({
                actionType: QuestionsConstants.INITIALIZE,
                questions: data.questions
            });
        }, function(error) {
            Dispatcher.handleServerAction({
                actionType: QuestionsConstants.ERROR,
                error: error
            });
        });
    }

};