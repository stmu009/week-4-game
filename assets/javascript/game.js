/* Move to defense section
$(document).on("click", ".enemies-available", function() {
  for (i = 0; i < charactersAvailable.length; i++) {
    if (this.id == i) {
      $(".defense-section").append(
        '<div class="" id="">' + charactersAvailable[i] + "</div>"
      );
    } else {
    }
  }
});
*/
var game = {
  charactersAvailable: {
    lukeskywalker: {
      displayName: "Luke Skywalker",
      attackPower: 154,
      counterAttack: 123,
      health: 156
    },
    masteryoda: {
      displayName: "Master Yoda",
      attackPower: 154,
      counterAttack: 123,
      health: 156
    },
    darthvader: {
      displayName: "Darth Vader",
      attackPower: 154,
      counterAttack: 123,
      health: 156
    },
    emperorpalpatine: {
      displayName: "Emperor Palpatine",
      attackPower: 154,
      counterAttack: 123,
      health: 156
    }
  },
  showCharactersAvailable: function () {
    $.each(game.charactersAvailable, function (key, value) {
      $(".characters-section").append(
        '<div id="' +
        key +
        '" class="characters-available">' +
        game.charactersAvailable[key].displayName +
        "</div>"
      );
    });
  },
  selectCharacter: function () {
    $(".characters-available").on("click", function () {
      selectedCharacter = this;
      $.each(game.charactersAvailable, function (key, value) {
        if (key == selectedCharacter.id) {
          $("#your-character-title").after(
            '<div id="' +
            key +
            '" >' +
            game.charactersAvailable[key].displayName +
            "</div>"
          );
        } else {
          $("#enemies-available-title").after(
            '<div class="enemies-available" id="' +
            key +
            '">' +
            game.charactersAvailable[key].displayName +
            "</div>"
          );
        }
      });
      game.attacker.attackerID = selectedCharacter.id
      game.hideCharactersAvailable()

    });
  },
  hideCharactersAvailable: function () {
    $('.characters-section').hide();

  },
  attacker: {
    alive: true
  },
  selectDefender: function () {
    $(document).on("click", ".enemies-available", function () {
      selectedDefender = this
      $.each(game.charactersAvailable, function (key, value) {
        if (key == selectedDefender.id) {
          game.defender.defenderID = selectedDefender.id
          $(".defense-section").append(
            '<div class="" id="">' + game.charactersAvailable[key].displayName + "</div>"
          );
        }
        game.removeDefenderSelected(selectedDefender.id)
      })
    })
  },
  removeDefenderSelected: function (key) {
    $('#' + key).remove()
  },
  defender: {
    alive: true
  },
  attack: function () {},
  counter: function () {},
  increaseAttack: function () {},
  decreaseHealth: function () {},
  updateStats: function () {},
  wins: 0,
  losses: 0,
  restart: function () {}
};
$(document).ready(function () {
  game.showCharactersAvailable();
  game.selectCharacter();
  game.selectDefender()
});