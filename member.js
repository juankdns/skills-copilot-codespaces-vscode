function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'templates/skills-member.html',
    scope: {
      member: '='
    },
    controller: function($scope) {
      $scope.getSkillIcon = function(skill) {
        return 'images/skills/' + skill + '.png';
      };
    }
  };
}