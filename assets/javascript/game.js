var game = {
  charactersAvailable: {
    lukeskywalker: {
      displayName: "Luke Skywalker",
      attackPower: 8,
      counterAttack: 6,
      health: 156,
      image: 'assets/images/luke.png',
    },
    masteryoda: {
      displayName: "Master Yoda",
      attackPower: 8,
      counterAttack: 10,
      health: 160,
      image: 'assets/images/yoda.png',
    },
    darthvader: {
      displayName: "Darth Vader",
      attackPower: 10,
      counterAttack: 12,
      health: 180,
      image: 'assets/images/vader.png',
    },
    darthsidious: {
      displayName: "Darth Sidious",
      attackPower: 8,
      counterAttack: 10,
      health: 140,
      image: 'assets/images/sidious.png',
    }
  },
  message: '',
  startGame: function () {
    $('.characters-section').show()
    $('div').remove('.characters-available')
    $('div').remove('.selected-character')
    $('.selected-defender').remove()
    $('.your-character-section').hide()
    $('.enemies-available-section').hide()
    $('.defense-section').hide()
    $('.fight-section').hide()
    $('.restart-section').hide()
    $('#battle-info-section').hide()
    $('#attacker-death').hide()
    $('#defender-death').hide()
    game.showCharactersAvailable()

  },
  showCharactersAvailable: function () {
    $.each(game.charactersAvailable, function (key, value) {
      $(".characters-section").append(
        '<div id="' +
        key +
        '" class="characters-available">' +
        game.charactersAvailable[key].displayName +
        '<img class="character-image" src= "' + game.charactersAvailable[key].image + '"></img>' +
        '<h3 class="health">' + game.charactersAvailable[key].health + '</h3>' +
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
          game.attacker.health = game.charactersAvailable[selectedCharacter.id].health
          $("#your-character-title").after(
            '<div class="selected-character" id="' +
            key +
            '" >' +
            game.charactersAvailable[key].displayName +
            '<img class="character-image" src= "' + game.charactersAvailable[key].image + '"></img>' +
            "</div>"
          );
        } else {
          $("#enemies-available-title").after(
            '<div class="enemies-available" id="' +
            key +
            '">' +
            game.charactersAvailable[key].displayName +
            '<img class="character-image" src= "' + game.charactersAvailable[key].image + '"></img>' +
            "</div>"
          );
        }
      });
      game.attacker.alive = true
      game.attacker.attackerID = selectedCharacter.id
      game.attacker.attackPower = game.charactersAvailable[selectedCharacter.id].attackPower
      game.hideCharactersAvailable()
      $('.your-character-section').show()
      $('.enemies-available-section').show()

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
        $('.defense-section').show()
        $.each(game.charactersAvailable, function (key, value) {
          if (key == selectedDefender.id) {
            game.defender.defenderID = selectedDefender.id
            game.defender.health = game.charactersAvailable[key].health
            game.defender.counterAttack = game.charactersAvailable[key].counterAttack
            $(".defense-section").append(
              '<div class="selected-defender" id="">' + game.charactersAvailable[key].displayName +
              '<img class="character-image" src= "' + game.charactersAvailable[key].image + '"></img>' +
              "</div>"
            );
          }

          $('.fight-section').show()
          $('.enemies-available-section').hide()
          $('#attacker-death').hide()
          $('#defender-death').hide()
          $('#defender-health').text(game.defender.health)
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
          $('#defender-death').show()
          $('.fight-section').hide()
          $('.enemies-available-section').show()
          if ($('.enemies-available').length === 0) {
            $('.restart-section').show()
            game.restart()
          }
        } else if ((game.attacker.health <= 0)) {
          game.attacker.alive = false
          $('#attacker-death').show()
          $('.fight-section').hide()
          $('.restart-section').show()
          game.restart()
        } else {
          game.defender.health = game.defender.health - game.attacker.attackPower
          game.attacker.health = game.attacker.health - game.defender.counterAttack
          if (game.defender.health < 0) {
            game.defender.health = 0
          }
          if (game.attacker.health < 0) {
            game.attacker.health = 0
          }
          game.attacker.attackPower = Math.floor(game.attacker.attackPower * 1.2)
          game.updateStats()
        }
      }
    })
  },
  updateStats: function (message) {
    $('#battle-info-section').show()
    $('#attacker-health').text(game.attacker.health)
    $('#defender-health').text(game.defender.health)
  },
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
        $('.your-character-section').hide()
        $('.enemies-available-section').hide()
        $('.defense-section').hide()
        $('.fight-section').hide()
        $('.restart-section').hide()
        $('#battle-info-section').hide()
        $('#attacker-death').hide()
        $('#defender-death').hide()
        game.showCharactersAvailable()
        game.attacker = {}
        game.defender = {
          alive: false
        }
        wins = 0
        losses = 0
      }
    )
  }
};
$(document).ready(function () {
  game.startGame();
  game.selectDefender()
});