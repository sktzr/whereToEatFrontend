import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['votes', 'finals'],

    isVoting: (function () {
        return (this.get('currentPath') === 'votes' || this.get('currentPath') === 'finals');
    }).observes('currentPath'),

    isFinals: (function () {
        return this.get('model.isFinals');
    }).property('model'),

    actions: {

        vote: function () {
            switch (this.get('currentPath')) {
                case 'votes':
                    this.get('controllers.votes').send('vote');
                    break;
                case 'finals':
                    this.get('controllers.finals').send('vote');
                    break;
                default:
                    return false;
            }
        },
        clearVotes: function () {
            this.get('store').findAll('restaurant').then(function (restaurants) {
                restaurants.forEach(function (restaurant) {
                    restaurant.set('votes', 0);
                    restaurant.save();
                });
            });
            this.get('model').set('isFinals', false);
            this.get('model').save();
            return false;
        },
        beginFinals: function () {
           var finalModel = this.get('model');
           this.get('store').findAll('restaurant').then(function(canidates){
             canidates.sortBy('vote').slice(0, 3);
             finalModel.set('isFinals', true);
             finalModel.get('finalists').then(function (finalists) {
                 finalists.replaceContent(0, 3, canidates);
                 finalModel.save();
             });
           });
           return false;
        }
    }
});
