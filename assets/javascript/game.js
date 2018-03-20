var game = {
  charactersAvailable: {
    lukeskywalker: {
      displayName: "Luke Skywalker",
      attackPower: 8,
      counterAttack: 6,
      health: 156
    },
    masteryoda: {
      displayName: "Master Yoda",
      attackPower: 8,
      counterAttack: 10,
      health: 160
    },
    darthvader: {
      displayName: "Darth Vader",
      attackPower: 10,
      counterAttack: 12,
      health: 180
    },
    emperorpalpatine: {
      displayName: "Emperor Palpatine",
      attackPower: 8,
      counterAttack: 10,
      health: 140
    }
  },
  showCharactersAvailable: function () {
    console.log('Show CHARS')
    $.each(game.charactersAvailable, function (key, value) {
      $(".characters-section").append(
        '<div id="' +
        key +
        '" class="characters-available">' +
        game.charactersAvailable[key].displayName +
        "</div>"
      );
    });
    game.selectCharacter()
  },
  selectCharacter: function () {
    $(".characters-available").on("click", function () {
      selectedCharacter = this;
      $.each(game.charactersAvailable, function (key, value) {
        if (key == selectedCharacter.id) {
          $("#your-character-title").after(
            '<div class="selected-character" id="' +
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
      game.attacker.attackPower = game.charactersAvailable[selectedCharacter.id].attackPower
      game.attacker.health = game.charactersAvailable[selectedCharacter.id].health
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
      if (game.defender.alive === false) {
        $('.selected-defender').remove()
        $.each(game.charactersAvailable, function (key, value) {
          if (key == selectedDefender.id) {
            game.defender.defenderID = selectedDefender.id
            game.defender.health = game.charactersAvailable[key].health
            game.defender.counterAttack = game.charactersAvailable[key].counterAttack
            $(".defense-section").append(
              '<div class="selected-defender" id="">' + game.charactersAvailable[key].displayName + "</div>"
            );
          }
          game.defender.alive = true
          game.removeDefenderSelected(selectedDefender.id)
        })
        game.attack()
      }
    })
  },
  removeDefenderSelected: function (key) {
    $('#' + key).remove()
  },
  defender: {
    alive: false
  },
  attack: function () {
    $('#attack-button').on('click', function () {
      if (game.defender.alive == true && game.attacker.alive == true) {
        if (game.defender.health <= 0) {
          game.defender.alive = false
          console.log('Defender is dead')
        } else if ((game.attacker.health <= 0)) {
          game.attacker.alive = false
          console.log('Attacker is dead')
          game.restart()
        } else {
          game.defender.health = game.defender.health - game.attacker.attackPower
          game.attacker.health = game.attacker.health - game.defender.counterAttack
          game.attacker.attackPower = Math.floor(game.attacker.attackPower * 1.2)
          console.log('defender health:' + game.defender.health)
          console.log('attacker health:' + game.attacker.health)
        }
      }
    })
  },
  updateStats: function () {}//TODO
  ,
  wins: 0,
  losses: 0,
  restart: function () {
    $('#restart-button').on('click',
      function () {
        console.log('RESTART')
        $('.characters-section').show()
        $('div').remove('.characters-available')
        $('div').remove('.selected-character')
        $('.selected-defender').remove()
        game.showCharactersAvailable()
        game.attacker = {}
        game.defender = {}
        wins = 0
        losses = 0
      } 
    )}
};
$(document).ready(function () {
  game.showCharactersAvailable();
  game.selectDefender()
});