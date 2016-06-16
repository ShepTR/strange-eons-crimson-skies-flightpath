/*
 * namedobj.js
 *
 * This script is normally called from the main plug-in script.
 * It defines an object to contain fonts and other shared resources,
 * and then registers it as a named object. A named object is an
 * object that can be created in one script, and used from another
 * script that is run at a later time.
 */

useLibrary( 'fontutils' );
useLibrary( 'imageutils' );
useLibrary( 'markup' );

importClass( resources.ResourceKit );

// Note that anything that we put in 'this' while inside this function will
// be available from our named object later.
function CSkiesObject() {
	this.GAME_CODE = 'CS';
	
	const base = 'crimson-skies/';
	this.base = base;
	
	// Register the fonts needed for our cards, and store the family names
    var bank_gothic = new Array( 'crimson-skies/fonts/bank-gothic-md-bt.ttf' );
    var kimberly = new Array( 'crimson-skies/fonts/kimberley-bl.ttf' );
    var eurostile = new Array( 'crimson-skies/fonts/eurostile-lt-std.otf' );
    var cskies = new Array( 'crimson-skies/fonts/crimson-skies-symbols.ttf' );
    var cskiesships = new Array( 'crimson-skies/fonts/xwing-miniatures-ships.ttf' );
    		
	this.headingFamily = FontUtils.registerFontFamilyFromResources.apply( this, bank_gothic );
	this.numberFamily = FontUtils.registerFontFamilyFromResources.apply( this, kimberly );
	this.abilityFamily = FontUtils.registerFontFamilyFromResources.apply( this, eurostile );
	this.iconFamily = FontUtils.registerFontFamilyFromResources.apply( this, cskies );
	this.shipFamily = FontUtils.registerFontFamilyFromResources.apply( this, cskiesships );	
	
	// The font we use for stats like Pilot skill and Upgrade bar; when you draw text
	// using one of the sheet's text drbloodhawk methods, you need to create
	// a Font object for it; when you draw text in a markup box, you
	// set the font's family name (e.g., 'Arial'), style, and size using
	// TextStyles (see the definition of titleBox, for example).
	this.iconFont = new Font( this.iconFamily, Font.PLAIN, 7 );
	this.shipFont = new Font( this.shipFamily, Font.PLAIN, 7 );
	this.numberFont = new Font( this.numberFamily, Font.PLAIN, 7 );
	
	//
	// Define some helper functions for creating markup boxes
	//
		
	/**
	 * headingBox( sheet, size )
	 * Creates a new markup box for title areas.
	 *
	 * sheet : the sheet to create the box for
	 * size : font size
	 */
	this.headingBox = function titleBox( sheet, size ) {
		var box = markupBox( sheet );
		
		box.defaultStyle = new TextStyle(
			FAMILY, this.headingFamily,
			COLOR, Color.BLACK,
			SIZE,   size
		);
		
		iconStyle = new TextStyle(
			FAMILY,		this.iconFamily,
			SIZE,		size,
			COLOR,		Color(0,0,0),
			WEIGHT,		WEIGHT_REGULAR,
			WIDTH,		WIDTH_REGULAR,
			POSTURE,	POSTURE_REGULAR
		);
		box.setStyleForTag('icon',iconStyle);
		box.setReplacementForTag( 'uni', '<icon>u</icon>');
		box.setReplacementForTag( 'epic', '<icon><u+0029></icon>');
		
		box.alignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		box.headlineAlignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		
		box.lineTightness = -0.5;
		box.tightnessLimit = -0.5;
		
		box.textFitting = box.FIT_SCALE_TEXT;
		
		return box;
	};
	
	this.abilityBox = function bodyBox( sheet, size ) {
		var box = markupBox( sheet );

		box.defaultStyle = new TextStyle(
			FAMILY,		this.abilityFamily,
			SIZE,		size,
			COLOR,		Color(0,0,0),
			WEIGHT,		WEIGHT_LIGHT,
			WIDTH,		WIDTH_CONDENSED,
			POSTURE,	POSTURE_REGULAR
		);
		
		iconStyle = new TextStyle(
			FAMILY,		this.iconFamily,
			SIZE,		size,
			COLOR,		Color(0,0,0),
			WEIGHT,		WEIGHT_REGULAR,
			WIDTH,		WIDTH_REGULAR,
			POSTURE,	POSTURE_REGULAR
		);
		box.setStyleForTag('icon',iconStyle);
		
		box.setReplacementForTag( 'focus', '<icon>f</icon>');
		box.setReplacementForTag( 'evade', '<icon>e</icon>');
		box.setReplacementForTag( 'boost', '<icon>b</icon>');
		box.setReplacementForTag( 'roll', '<icon>r</icon>');
		box.setReplacementForTag( 'lock', '<icon>l</icon>');
		box.setReplacementForTag( 'cloak', '<icon>k</icon>');
		box.setReplacementForTag( 'slam', '<icon>s</icon>');
		box.setReplacementForTag( 'drift', '<icon>g</icon>');
		box.setReplacementForTag( 'repair', '<icon>K</icon>');
		box.setReplacementForTag( 'reinforce', '<icon>i</icon>');
		box.setReplacementForTag( 'recover', '<icon>v</icon>');
		box.setReplacementForTag( 'coordinate', '<icon>o</icon>');
		box.setReplacementForTag( 'jam', '<icon>j</icon>');
		box.setReplacementForTag( 'hit', '<icon>d</icon>');
		box.setReplacementForTag( 'damage', '<icon>d</icon>');
		box.setReplacementForTag( 'critical', '<icon>c</icon>');
		box.setReplacementForTag( 'crit', '<icon>c</icon>');
		box.setReplacementForTag( 'straight', '<icon>8</icon>');
		box.setReplacementForTag( 'leftturn', '<icon>4</icon>');
		box.setReplacementForTag( 'rightturn', '<icon>6</icon>');
		box.setReplacementForTag( 'leftbank', '<icon>7</icon>');
		box.setReplacementForTag( 'rightbank', '<icon>9</icon>');
		box.setReplacementForTag( 'leftloop', '<icon>1</icon>');
		box.setReplacementForTag( 'rightloop', '<icon>3</icon>');
		box.setReplacementForTag( 'leftroll', '<icon>:</icon>');
		box.setReplacementForTag( 'rightroll', '<icon>;</icon>');
		box.setReplacementForTag( 'kturn', '<icon>2</icon>');
		box.setReplacementForTag( 'stationary', '<icon>5</icon>');
		box.setReplacementForTag( 'astromech', '<icon>A</icon>');
		box.setReplacementForTag( 'bomb', '<icon>B</icon>');
		box.setReplacementForTag( 'cannon', '<icon>C</icon>');
		box.setReplacementForTag( 'crew', '<icon>W</icon>');
		box.setReplacementForTag( 'missile', '<icon>M</icon>');
		box.setReplacementForTag( 'system', '<icon>S</icon>');
		box.setReplacementForTag( 'team', '<icon>T</icon>');
		box.setReplacementForTag( 'elite', '<icon>E</icon>');
		box.setReplacementForTag( 'torpedo', '<icon>P</icon>');
		box.setReplacementForTag( 'turret', '<icon>U</icon>');
		box.setReplacementForTag( 'hardpoint', '<icon>H</icon>');
		box.setReplacementForTag( 'team', '<icon>T</icon>');
		box.setReplacementForTag( 'cargo', '<icon>G</icon>');
		box.setReplacementForTag( 'salvaged', '<icon>V</icon>');
		box.setReplacementForTag( 'illicit', '<icon>I</icon>');
		box.setReplacementForTag( 'tech', '<icon>X</icon>');
		box.setReplacementForTag( 'modification', '<icon>m</icon>');
		box.setReplacementForTag( 'title', '<icon>t</icon>');
		box.setReplacementForTag( 'airframe', '<icon>D</icon>');
		box.setReplacementForTag( 'engine', '<icon>F</icon>');
		box.setReplacementForTag( 'ammo', '<icon>J</icon>');

		shipStyle = new TextStyle(
			FAMILY,		this.shipFamily,
			SIZE,		size,
			COLOR,		Color(0,0,0),
			WEIGHT,		WEIGHT_REGULAR,
			WIDTH,		WIDTH_REGULAR,
			POSTURE,	POSTURE_REGULAR
		);
		box.setStyleForTag('ship',shipStyle);
		
		box.setReplacementForTag( 'bloodhawk', '<ship>a</ship>');
		box.setReplacementForTag( 'bwing', '<ship>b</ship>');
		box.setReplacementForTag( 'vt49', '<ship>d</ship>');
		box.setReplacementForTag( 'ewing', '<ship>e</ship>');
		box.setReplacementForTag( 'firespray31', '<ship>f</ship>');
		box.setReplacementForTag( 'hwk290', '<ship>h</ship>');
		box.setReplacementForTag( 'attackshuttle', '<ship>h</ship>');
		box.setReplacementForTag( 'aggressor', '<ship>i</ship>');
		box.setReplacementForTag( 'kwing', '<ship>k</ship>');
		box.setReplacementForTag( 'lambdashuttle', '<ship>l</ship>');
		box.setReplacementForTag( 'yt1300', '<ship>m</ship>');
		box.setReplacementForTag( 'yt2400', '<ship>o</ship>');
		box.setReplacementForTag( 'vcx100', '<ship>m</ship>');
		box.setReplacementForTag( 'kihraxz', '<ship>r</ship>');
		box.setReplacementForTag( 'm3a', '<ship>s</ship>');
		box.setReplacementForTag( 'g1a', '<ship>s</ship>');
		box.setReplacementForTag( 'yv666', '<ship>t</ship>');
		box.setReplacementForTag( 'starviper', '<ship>v</ship>');
		box.setReplacementForTag( 'jumpmaster', '<ship>t</ship>');
		box.setReplacementForTag( 'xwing', '<ship>x</ship>');
		box.setReplacementForTag( 't70xwing', '<ship>w</ship>');
		box.setReplacementForTag( 'ywing', '<ship>y</ship>');
		box.setReplacementForTag( 'headhunter', '<ship>z</ship>');
		box.setReplacementForTag( 'tieadvanced', '<ship>A</ship>');
		box.setReplacementForTag( 'tieprototype', '<ship>A</ship>');
		box.setReplacementForTag( 'tiebomber', '<ship>B</ship>');
		box.setReplacementForTag( 'tiedefender', '<ship>D</ship>');
		box.setReplacementForTag( 'tiefighter', '<ship>F</ship>');
		box.setReplacementForTag( 'tiefofighter', '<ship>O</ship>');
		box.setReplacementForTag( 'tieinterceptor', '<ship>I</ship>');
		box.setReplacementForTag( 'tiepunisher', '<ship>N</ship>');
		box.setReplacementForTag( 'tiephantom', '<ship>P</ship>');

		box.alignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		box.headlineAlignment = box.LAYOUT_CENTER;
		box.lineTightness = 1.5;	
		box.textFitting= box.FIT_SCALE_TEXT;

		return box;		
	};
	
	this.flavorBox = function bodyBox( sheet, color, size, posture ) {
		var box = markupBox( sheet );

		box.defaultStyle = new TextStyle(
			FAMILY,		this.abilityFamily,
			SIZE,		6.5,
			COLOR,		Color(125/255,125/255,125/255),
			WEIGHT,		WEIGHT_LIGHT,
			WIDTH,		WIDTH_CONDENSED,
			POSTURE,	POSTURE_OBLIQUE
		);

		box.alignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		box.headlineAlignment = box.LAYOUT_CENTER;
		box.lineTightness = 1.5;	
		box.textFitting= box.FIT_SCALE_TEXT;

		return box;		
	};
			
	/**
	 * attributeValue( sheet, size )
	 * Creates a new markup box for title areas.
	 *
	 * sheet : the sheet to create the box for
	 * size : font size
	 */
	this.attributeValue = function numberBox( sheet, color, size ) {
		var box = markupBox( sheet );
		
		box.defaultStyle = new TextStyle(
			FAMILY, this.numberFamily,
			COLOR, color,
			SIZE,   size
		);
	
		box.alignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		box.headlineAlignment = box.LAYOUT_CENTER;
		
		box.lineTightness = 4;
		box.textFitting = box.FIT_SCALE_TEXT;
		
		return box;
	};
	
	if( $Affiliation == 'alliance' || $Affiliation == 'resistance' ) {
		primaryFaction = 'rebel';
	} else if( $Affiliation == 'empire' || $Affiliation == 'firstorder' ) {
		primaryFaction = 'imperial';
	} else {
		primaryFaction = 'scum';
	}	
	
	this.getPrimaryFaction = function getPrimaryFaction( affiliation ) {
		if( affiliation == 'alliance' ) {
			return 'rebel';
		} else if ( affiliation == 'resistance' ) {
			return 'rebel';
		} else if ( affiliation == 'empire' ) {
			return 'imperial';
		} else if ( affiliation == 'firstorder' ) {
			return 'imperial';
		} else if ( affiliation == 'scum' ) {
			return 'scum';
		} else {
			return '-';
		}
	};

	this.getColor = function getColor( keyword ) {
		if( keyword == 'rebel' ) {
			color = Color(239/255,12/255,45/255);
		} else if ( keyword == 'imperial' ) {
			color = Color(154/255,216/255,30/255);
		} else if ( keyword == 'scum' ) {
			color = Color(218/255,164/255,22/255);
		} else if ( keyword == 'skill' ) {
			color = Color(251/255,135/255,12/255);
		} else if ( keyword == 'attack' ) {
			color = Color(239/255,12/255,45/255);
		} else if ( keyword == 'energy' ) {
			color = Color(214/255,177/255,211/255);
		} else if ( keyword == 'agility' ) {
			color = Color(154/255,216/255,30/255);		
		} else if ( keyword == 'hull' ) {
			color = Color(247/255,244/255,5/255);		
		} else if ( keyword == 'shield' ) {
			color = Color(140/255,220/255,235/255);		
		} else {
			color = Color(1,1,1);
		}
		return color;
	};
		
	this.textToIconChar = function textToIconChar( text ) {
		iconChar = 'f';
		switch( String( text ) ) {
		    case 'focus': iconChar = 'f'; break;
		    case 'evade': iconChar = 'e'; break;
		    case 'boost': iconChar = 'b'; break;
		    case 'roll': iconChar = 'r'; break;
		    case 'lock': iconChar = 'l'; break;
		    case 'cloak': iconChar = 'k'; break;
		    case 'slam': iconChar = 's'; break;
		    case 'drift': iconChar = 'g'; break;
		    case 'repair': iconChar = 'K'; break;
		    case 'reinforce': iconChar = 'i'; break;
		    case 'recover': iconChar = 'v'; break;
		    case 'coordinate': iconChar = 'o'; break;
		    case 'jam': iconChar = 'j'; break;
		    case 'hit': iconChar = 'd'; break;
		    case 'damage': iconChar = 'd'; break;
		    case 'critical': iconChar = 'c'; break;
		    case 'crit': iconChar = 'c'; break;
		    case 'straight': iconChar = '8'; break;
		    case 'leftturn': iconChar = '4'; break;
		    case 'rightturn': iconChar = '6'; break;
		    case 'leftbank': iconChar = '7'; break;
		    case 'rightbank': iconChar = '9'; break;
		    case 'leftloop': iconChar = '1'; break;
		    case 'rightloop': iconChar = '3'; break;
		    case 'leftroll': iconChar = ':'; break;
		    case 'rightroll': iconChar = ';'; break;
		    case 'kturn': iconChar = '2'; break;
		    case 'stationary': iconChar = '5'; break;
		    case 'astromech': iconChar = 'A'; break;
		    case 'bomb': iconChar = 'B'; break;
		    case 'cannon': iconChar = 'C'; break;
		    case 'crew': iconChar = 'W'; break;
		    case 'missile': iconChar = 'M'; break;
		    case 'system': iconChar = 'S'; break;
		    case 'team': iconChar = 'T'; break;
		    case 'elite': iconChar = 'E'; break;
		    case 'torpedo': iconChar = 'P'; break;
		    case 'turret': iconChar = 'U'; break;
		    case 'hardpoint': iconChar = 'H'; break;
		    case 'team': iconChar = 'T'; break;
		    case 'cargo': iconChar = 'G'; break;
		    case 'salvaged': iconChar = 'V'; break;
		    case 'illicit': iconChar = 'I'; break;
		    case 'tech': iconChar = 'X'; break;
		    case 'modification': iconChar = 'm'; break;
		    case 'title': iconChar = 't'; break;
		    case 'airframe': iconChar = 'D'; break;
		    case 'engine': iconChar = 'F'; break;
		    case 'ammo': iconChar = 'J'; break;
		}		
		return iconChar;
	};
	
	this.textToShipChar = function textToShipChar( text ) {
		iconChar = 'x';
		switch( String( text ) ) {
		    case 'bloodhawk': iconChar = 'a'; break;
		    case 'bwing': iconChar = 'b'; break;
		    case 'vt49': iconChar = 'd'; break;
		    case 'ewing': iconChar = 'e'; break;
		    case 'firespray31': iconChar = 'f'; break;
		    case 'hwk290': iconChar = 'h'; break;
		    case 'attackshuttle': iconChar = 'h'; break;
		    case 'aggressor': iconChar = 'i'; break;
		    case 'kwing': iconChar = 'k'; break;
		    case 'lambdashuttle': iconChar = 'l'; break;
		    case 'yt1300': iconChar = 'm'; break;
		    case 'yt2400': iconChar = 'o'; break;
		    case 'vcx100': iconChar = 'm'; break;
		    case 'kihraxz': iconChar = 'r'; break;
		    case 'm3a': iconChar = 's'; break;
		    case 'g1a': iconChar = 's'; break;
		    case 'yv666': iconChar = 't'; break;
		    case 'jumpmaster': iconChar = 't'; break;
		    case 'starviper': iconChar = 'v'; break;
		    case 'xwing': iconChar = 'x'; break;
		    case 't70xwing': iconChar = 'w'; break;
		    case 'ywing': iconChar = 'y'; break;
		    case 'headhunter': iconChar = 'z'; break;
		    case 'tieadvanced': iconChar = 'A'; break;
		    case 'tieprototype': iconChar = 'A'; break;
		    case 'tiebomber': iconChar = 'B'; break;
		    case 'tiedefender': iconChar = 'D'; break;
		    case 'tiefighter': iconChar = 'F'; break;
		    case 'tiefofighter': iconChar = 'O'; break;
		    case 'tieinterceptor': iconChar = 'I'; break;
		    case 'tiepunisher': iconChar = 'N'; break;
		    case 'tiephantom': iconChar = 'P'; break;
		}		
		return iconChar;
	};
}

//
// Create the object and place it in the named object database;
// then we can look it up from other scripts in the same way, e.g.:
//
// const CSkies = Eons.namedObjects.CSkies;
// println( CSkies.titleFamily );
//

Eons.namedObjects.CSkies = new CSkiesObject();