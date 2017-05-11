
function gameStateService(deck, hand, field) {
	var _Deck = deck;
	var _Field = field;
	var _Hand = hand;
	var _stats = {};

	function getDeck() {
		return _Deck;
	}
	function getField() {
		return _Field;
	}
	function getHand() {
		return _Hand;
	}
	function getStats() {
		return _stats;
	}
	function setRemainingLandsCount(value) {
		_stats.remaningLands = value;
	}
	function getRemainingLandsCount() {
		return _stats.remaningLands;
	}
	function decRemainingLandsCount() {
		_stats.remaningLands--;
	}

	function setGenericManaCount(value) {
		_stats.genericManaCount = value;
	}
	function getGenericManaCount(value) {
		return _stats.genericManaCount;
	}
	function decGenericManaCount() {
		_stats.genericManaCount--;
	}
	function needGenericMana() {
		return _stats.genericManaCount > 0;
	}
	function setLastLandTapState(state) {
		_stats.lastLandTapped = state;
	}

	function isLastLandTapped() {
		return _stats.lastLandTapped;
	}

	function isOneLandLeft() {
		return _stats.remaningLands === 1;
	}

	function battleLandIsTapped() {
		return _Field.getBasicLandsCount() < 2;
	}

	function fastLandIsTapped() {
		return _Field.getLandsCount() > 2;
	}

	function showLandIsTapped(landColors) {
		function colorsMatch(colors, match) {
			return colors.some(function(color) {
				return (match.indexOf(color) !== -1);
			})
		}
		return !_Hand.getLands().some(function(land) {
			return (land.isBasicLand() && colorsMatch(landColors, land.colors))
		});
	}

	function setSpellsType(value) {
		return _stats.spellsType = value;
	}

	function getSpellsType() {
		return _stats.spellsType;
	}

	function isSpellType(value) {
		return _stats.spellsType === value;
	}

	function setCardsCount(count) {
		_stats.cardsCount = count;
	}
	function getCardsCount() {
		return _stats.cardsCount;
	}
	return {
		getDeck: getDeck,
		getField: getField,
		getHand: getHand,
		getStats: getStats,
		setRemainingLandsCount: setRemainingLandsCount,
		getRemainingLandsCount: getRemainingLandsCount,
		decRemainingLandsCount: decRemainingLandsCount,
		isOneLandLeft: isOneLandLeft,
		setGenericManaCount: setGenericManaCount,
		getGenericManaCount: getGenericManaCount,
		decGenericManaCount: decGenericManaCount,
		needGenericMana: needGenericMana,

		setLastLandTapState: setLastLandTapState,
		isLastLandTapped: isLastLandTapped,

		battleLandIsTapped: battleLandIsTapped,
		showLandIsTapped: showLandIsTapped,
		fastLandIsTapped: fastLandIsTapped,

		setSpellsType: setSpellsType,
		getSpellsType: getSpellsType,
		isSpellType: isSpellType,

		setCardsCount: setCardsCount,
		getCardsCount: getCardsCount

	}
};

module.exports = gameStateService;